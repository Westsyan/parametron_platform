package controllers

import java.io.File
import javax.inject.Inject

import akka.stream.IOResult
import akka.stream.scaladsl.{FileIO, Sink}
import akka.util.ByteString
import dao._
import models.Tables.SpeciesRow
import org.apache.commons.io.FileUtils
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.libs.streams.Accumulator
import play.api.mvc.MultipartFormData.FilePart
import play.api.mvc._
import play.core.parsers.Multipart.{FileInfo, FilePartHandler}
import utils.Utils.windowsPath
import utils.{ExecCommand, Utils}

import scala.collection.JavaConverters._
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.Duration
import scala.concurrent.ExecutionContext.Implicits.global

class SpeciesController @Inject()(admindao: adminDao, projectdao: projectDao, sampledao: sampleDao,
                                  speciesdao: speciesDao) extends Controller {


  def toSpecies = Action { implicit request =>
    val user = getProname(request.session)
    Ok(views.html.species.addSpecies(user))
  }

  def getProname(session: Session): Seq[String] = {
    val userId = session.get("id").head.toInt
    val proname = Await.result(projectdao.getAllProject(userId), Duration.Inf)
    proname
  }

  case class speciesData(speciesname: String)

  val speciesForm = Form(
    mapping(
      "speciesname" -> text
    )(speciesData.apply)(speciesData.unapply)
  )

  private def handleFilePartAsFile: FilePartHandler[File] = {
    case FileInfo(partName, filename, contentType) =>

      val file = new File(Utils.tmpPath, Utils.random)
      val path = file.toPath
      val fileSink: Sink[ByteString, Future[IOResult]] = FileIO.toPath(path)
      val accumulator: Accumulator[ByteString, IOResult] = Accumulator(fileSink)
      accumulator.map {
        case IOResult(count, status) =>
          FilePart(partName, filename, contentType, file)
      }
  }

  def uploadSpecies = Action(parse.multipartFormData(handleFilePartAsFile)) { implicit request =>
    val userId = request.session.get("id").head.toInt
    val file = request.body.files
    val speciesname = speciesForm.bindFromRequest.get.speciesname
    val date = Utils.date
    val row = SpeciesRow(0, speciesname, userId, date, 0)
    Await.result(speciesdao.addSpecies(row), Duration.Inf)
    val s = Await.result(speciesdao.getByPosition(speciesname, userId), Duration.Inf)
    try {
      val run = Future {
        val id = s.head.id
        new File(Utils.speciesPath, id.toString).mkdir()
        val outPath = Utils.speciesPath + "/" + id

        val in1 = file.head.ref.getPath
        val in2 = file(1).ref.getPath
        val out1 = outPath + "/genome.fasta"
        val out2 = outPath + "/genome.gtf"

        Utils.getFile(in1,out1,file.head.filename)
        Utils.getFile(in2,out2,file.last.filename)
        runCmd(id)
      }
    } catch {
      case e: Exception => Await.result(speciesdao.updateState(s.head.id, 2), Duration.Inf)
    }
    Ok(Json.obj("valid" -> "true"))
  }


  def speciesInfo = Action { implicit request =>
    val user = getProname(request.session)
    Ok(views.html.species.speciesInfo(user))
  }

  def isRunCmd(speciesId: Int) = Action.async { implicit request =>
    speciesdao.getById(speciesId).map { x =>
      if (x.state == 0) {
        runCmd(x.id)
      }
      Ok(Json.obj("valid" -> "true"))
    }
  }

  def adminHome = Action.async { implicit request =>
    val id = request.session.get("id").head.toInt
    speciesdao.getByUserId(id).map { y =>
      if (y.size < 2) {
        Redirect(routes.SpeciesController.toAdminSpecies())
      } else {
        Redirect(routes.SpeciesController.adminSpeciesInfo())
      }
    }
  }

  def toAdminSpecies = Action { implicit request =>
    Ok(views.html.adminSpecies.addSpecies())
  }

  def adminSpeciesInfo = Action { implicit request =>
    Ok(views.html.adminSpecies.speciesInfo())
  }

  def home = Action.async { implicit request =>
    val id = request.session.get("id").head.toInt
    speciesdao.getByUserId(id).map { y =>
      if (y.size < 2) {
        Redirect(routes.SpeciesController.toSpecies())
      } else {
        Redirect(routes.SpeciesController.speciesInfo())
      }
    }


  }

  def runCmd(speciesId: Int) = {
    val path = Utils.speciesPath + "/" + speciesId
    val outpath = path + "/" + "genome.fasta"
    val dictpath = path + "/" + "genome.dict"
    val command1 = s"python ${Utils.toolPath}/hisat2-2.0.4/hisat2-build ${outpath} ${outpath}"
    val command2 = if (new File(windowsPath).exists()) {
      s"${Utils.toolPath}/samtools-0.1.19/samtools faidx ${outpath}"
    } else {
      s"samtools faidx ${outpath}"
    }
    val command3 = s"""java -jar ${Utils.toolPath}/CreateSequenceDictionary.jar R=${outpath} O=${dictpath} QUIET=true"""
    val command = new ExecCommand
    command.execs(command1, command2, command3)
    if (command.isSuccess) {
      Await.result(speciesdao.updateState(speciesId, 1), Duration.Inf)
      FileUtils.writeStringToFile(new File(path, "log.txt"), command.getErrStr)

    } else {
      Await.result(speciesdao.updateState(speciesId, 2), Duration.Inf)
      val log = command.getErrStr
      if (new File(path).exists()) {
        FileUtils.writeStringToFile(new File(path, "log.txt"), log)
      }
    }
  }

  def getAllSpecies = Action { implicit request =>
    val json = dealWithSpecies(request.session)
    Ok(Json.toJson(json))
  }

  def dealWithSpecies(session: Session) = {
    val userId = session.get("id").head.toInt
    val userS = Await.result(speciesdao.getByUserId(userId), Duration.Inf)
    val json = userS.sortBy(_.id).reverse.map { x =>
      val speciesname = x.speciesname
      val date = x.createdata.toLocalDate
      val state = if (x.state == 0) {
        "正在运行 <img src='/assets/images/timg.gif'  style='width: 20px; height: 20px;'><input class='state' value='" + x.state + "'>"
      } else if (x.state == 1) {
        "成功<input class='state' value='" + x.state + "'>"
      } else {
        "失败<input class='state' value='" + x.state + "'>"
      }
      val operation = if (x.state == 1) {
        s"""
           |  <button class="update" onclick="updateSpecies(this)" value="${x.speciesname}" id="${x.id}" title="修改物种名"><i class="fa fa-pencil"></i></button>
           |  <button class="update" onclick="openLog(this)" value="${x.id}" title="查看日志"><i class="fa fa-file-text"></i></button>
           |  <button class="delete" onclick="openDelete(this)" value="${x.speciesname}" id="${x.id}" title="删除物种"><i class="fa fa-trash"></i></button>
           """.stripMargin
      } else if (x.state == 2) {
        s"""<button class="delete" onclick="openDelete(this)" value="${x.speciesname}" id="${x.id}" title="删除任务"><i class="fa fa-trash"></i></button>
           |<button class="update" onclick="openLog(this)" value="${x.id}" title="查看日志"><i class="fa fa-file-text"></i></button>
         """.stripMargin
      } else {
        s"""<button class="delete" onclick="openDelete(this)" value="${x.speciesname}" id="${x.id}" title="删除任务"><i class="fa fa-trash"></i></button>"""
      }
      Json.obj("speciesname" -> speciesname, "state" -> state, "date" -> date, "operation" -> operation)
    }
    json

  }

  def deleteSpecies(id: Int) = Action.async { implicit request =>
    speciesdao.deleteById(id).map { x =>
      val run = Future {
        FileUtils.deleteDirectory(new File(Utils.speciesPath, id.toString))
      }
      Ok(Json.toJson("success"))
    }
  }

  def getLog(id: Int) = Action { implicit request =>
    val log = FileUtils.readLines(new File(Utils.speciesPath, id + "/log.txt")).asScala
    var html =
      """
        |<style>
        |   .logClass{
        |       font-size : 16px;
        |       font-weight:normal;
        |   }
        |</style>
      """.stripMargin
    html += "<b class='logClass'>" + log.mkString("</b><br><b class='logClass'>") + "</b>"
    val json = Json.obj("log" -> html)
    Ok(Json.toJson(json))
  }

  case class updateData(speciesId: Int, speciesname: String)

  val updateForm = Form(
    mapping(
      "speciesId" -> number,
      "speciesname" -> text
    )(updateData.apply)(updateData.unapply)
  )

  def updateSpeciesname = Action.async { implicit request =>
    val data = updateForm.bindFromRequest.get
    val speciesId = data.speciesId
    val newspecies = data.speciesname
    speciesdao.updateSpeciesname(speciesId, newspecies).map { x =>
      Ok(Json.toJson("success"))
    }
  }

  def checkSpecies = Action.async { implicit request =>
    val speciesname = speciesForm.bindFromRequest.get.speciesname
    val id = request.session.get("id").head.toInt
    speciesdao.getByPosition(speciesname, 1).flatMap { y =>
      speciesdao.getByPosition(speciesname, id).map { z =>
        val valid = if (y.size == 0 && z.size == 0) {
          "true"
        } else {
          "false"
        }
        Ok(Json.obj("valid" -> valid))
      }
    }
  }





  def getAllSpeciesname = Action.async { implicit request =>
    val id = request.session.get("id").head.toInt
    speciesdao.getByUserId(id).flatMap { y =>
      speciesdao.getByUserId(1).map { z =>
        val all = y ++ z
        val name = all.filter(_.state ==1).sortBy(_.speciesname).map(_.speciesname)
        Ok(Json.toJson(name))
      }
    }

  }

  def getDisk = Action { implicit request =>
    val sh = "sh /mnt/sdb/platform/getDisk.sh"
    val command = new ExecCommand
    command.exec(sh)
    val buffer = FileUtils.readLines(new File("/mnt/sdb/platform/disk.txt")).asScala
    val head = buffer.head.split(" ")
    val all = head.head
    val alls = all.split("T").head.toDouble
    val use = head.last
    val uses = use.split("T").head.split("G").head.toDouble
    val per = if (uses > 20) {
      uses / alls / 1024 * 100
    } else {
      uses / alls * 100
    }
    val json = Json.obj("all" -> all, "use" -> use, "per" -> per.formatted("%.2f"))
    Ok(Json.toJson(json))
  }

}
