package controllers

import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import javax.inject.Inject

import play.api.data.Form
import play.api.data.Forms._
import dao._
import org.apache.commons.io.FileUtils
import play.api.libs.json.Json
import play.api.mvc._
import utils.{ExecCommand, Utils}
import models.Tables._

import scala.collection.mutable
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.Duration
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global

class TaskController @Inject()(admindao: adminDao, projectdao: projectDao, sampledao: sampleDao, taskdao: taskDao) extends Controller {


  def toTaskPage(proname: String): Action[AnyContent] = Action { implicit request =>
    val userId = request.session.get("id").head.toInt
    val allName = Await.result(projectdao.getAllProject(userId), Duration.Inf)
    Ok(views.html.task.taskPage(allName, proname))
  }


  def taskPage(proname: String) = Action { implicit request =>
    val ses = getUserIdAndProId(request.session, proname)
    val allName = Await.result(projectdao.getAllProject(ses._1), Duration.Inf)
    Ok(views.html.task.taskData(allName, proname))
  }

  case class taskData(proname: String, taskname: String, sample: Seq[String], library_type:String,
                          library_norm_method:String,hits_norm:String)

  val taskForm = Form(
    mapping(
      "proname" -> text,
      "taskname" -> text,
      "sample" -> seq(text),
      "library_type" -> text,
      "library_norm_method" -> text,
      "hits_norm" -> text
    )(taskData.apply)(taskData.unapply)
  )

  def saveDeploy = Action{implicit request=>
    val data = taskForm.bindFromRequest.get
    val proname = data.proname
    val taskname = data.taskname
    val ses = getUserIdAndProId(request.session, proname)
    val date = Utils.date
    val row = TaskRow(0, taskname, ses._1, ses._2, date, 0)
    Await.result(taskdao.addTaskInfo(Seq(row)), Duration.Inf)
    val run = Future{
      val task = Await.result(taskdao.getAllByPosition(ses._1, ses._2, taskname), Duration.Inf)
      val otupath = Utils.taskPath(ses._1, ses._2, task.id)
      new File(otupath).mkdirs()
      val deploy = mutable.Buffer(proname, taskname, data.sample.mkString(","),data.library_type,data.library_norm_method,
        data.hits_norm)
      FileUtils.writeLines(new File(otupath + "/deploy.txt"), deploy.asJava)
      runCmd(task.id)
    }

    val json = Json.obj("valid" -> "true")
    Ok(Json.toJson(json))
  }


  def getUserIdAndProId(session: Session, proname: String): (Int, Int) = {
    val userId = session.get("id").head.toInt
    val proId = Await.result(projectdao.getIdByProjectname(userId, proname), Duration.Inf)
    (userId, proId)
  }

  def getTime = Action { implicit request =>
    val now = new Date()
    val dateFormat = new SimpleDateFormat("yyMMddHHmmss")
    val date = dateFormat.format(now)
    Ok(Json.obj("date" -> date))
  }

  case class checkTasknameData(taskname: String)

  val checkTasknameForm = Form(
    mapping(
      "taskname" -> text
    )(checkTasknameData.apply)(checkTasknameData.unapply)
  )

  def checkName(proname: String) = Action.async { implicit request =>
    val data = checkTasknameForm.bindFromRequest.get
    val ses = getUserIdAndProId(request.session, proname)
    taskdao.getAllByPosi(ses._1, ses._2, data.taskname).map { x =>
      val valid = if (x.size == 0) {
        "true"
      } else {
        "false"
      }
      Ok(Json.obj("valid" -> valid))
    }
  }

  def runCmd(id:  Int) = {
    val row = Await.result(taskdao.getById(id),Duration.Inf)
    val userId = row.accountid
    val proId = row.projectid
    val path = Utils.taskPath(userId, proId, id)
    val deploy = FileUtils.readLines(new File(path, "deploy.txt")).asScala
    val samples = deploy(2).split(",").map { x =>
      val sample = Await.result(sampledao.getByPosition(userId, proId, x), Duration.Inf)
      val bam = Utils.outPath(userId, proId, sample.id) + "/hisat2_map_sorted.bam "
       bam
    }
    val project = Await.result(projectdao.getById(proId),Duration.Inf)
    val species = project.speciesid
    val gtf = Utils.speciesPath + "/" + species + "/genome.gtf"
    val command1 = s"perl ${Utils.toolPath}/cuffnorm.pl -output1 ${path}/genes.fpkm_table.txt -output2 "+
                  s"${path}/genes.count_table.txt -output3 ${path}/isoforms.fpkm_table.txt -output4 "+
                  s"${path}/isoforms.count_table.txt -param --no-update-check --quiet --num-threads=2 "+
                  s"--library-norm-method=${deploy(4)} --library-type=${deploy(3)} ${deploy(5)} "+
                  s"-L ${deploy(2)} ${gtf} ${samples.mkString(" ")}"

    val command = new ExecCommand
    val tmp = path + "/tmp"
    new File(tmp).mkdir()
    command.exe(command1, tmp)
    if (command.isSuccess) {
      Await.result(taskdao.updateState(id, 1), Duration.Inf)
      val log = command.getErrStr
      FileUtils.writeStringToFile(new File(path, "log.txt"), log)
      FileUtils.deleteDirectory(new File(tmp))
    } else {
      Await.result(taskdao.updateState(id, 2), Duration.Inf)
      val log = command.getErrStr
      if (new File(path).exists()){
        FileUtils.writeStringToFile(new File(path, "log.txt"), log)
      }
      FileUtils.deleteDirectory(new File(tmp))
    }
  }

  def isRunCmd(id: Int) = Action.async { implicit request =>
   taskdao.getById(id).map { x =>
      if (x.state == 0) {
        runCmd(x.id)
      }
      Ok(Json.toJson("success"))
    }
  }

  def getAllTask(proname: String) = Action { implicit request =>
    val json = dealWithSample(proname, request.session)
    Ok(Json.toJson(json))
  }

  def dealWithSample(proname: String, session: Session) = {
    val id = getUserIdAndProId(session, proname)
    val tasks = Await.result(taskdao.getAllTaskByPosition(id._1, id._2), Duration.Inf)
    val json = tasks.sortBy(_.id).reverse.map { x =>
      val taskname = x.taskname
      val date = x.createdata.toLocalDate
      val state = if (x.state == 0) {
        "正在运行 <img src='/assets/images/timg.gif'  style='width: 20px; height: 20px;'><input class='state' value='" + x.state + "'>"
      } else if (x.state == 1) {
        "成功<input class='state' value='" + x.state + "'>"
      } else {
        "失败<input class='state' value='" + x.state + "'>"
      }
      val results = if (x.state == 1) {
        s"""
           |<a class="fastq" href="/parametron/task/download?id=${x.id}&code=1" title="基因 reads count 矩阵"><b>genes.count_table.txt</b></a>,&nbsp;
           |<a class="fastq" href="/parametron/task/download?id=${x.id}&code=2" title="基因 fpkm 矩阵"><b>genes.fpkm_table.txt</b></a>,&nbsp;
           |<a class="fastq" href="/parametron/task/download?id=${x.id}&code=3" title="转录本 reads count 矩阵"><b>isoforms.count_table.txt</b></a>,
           |<a class="fastq" href="/parametron/task/download?id=${x.id}&code=4" title="转录本 fpkm 矩阵"><b>isoforms.fpkm_table.txt</b></a>
           """.stripMargin
      } else {
        ""
      }
      val operation = if (x.state == 1) {
        s"""
           |  <button class="update" onclick="restart(this)" value="${x.id}" title="重新运行定量过程"><i class="fa fa-repeat"></i></button>
           |  <button class="update" onclick="openLog(this)" value="${x.id}" title="查看日志"><i class="fa fa-file-text"></i></button>
           |  <button class="delete" onclick="openDelete(this)" value="${x.taskname}" id="${x.id}" title="删除任务"><i class="fa fa-trash"></i></button>
           """.stripMargin
      } else if (x.state == 2) {
        s"""<button class="delete" onclick="openDelete(this)" value="${x.taskname}" id="${x.id}" title="删除任务"><i class="fa fa-trash"></i></button>
           |<button class="update" onclick="openLog(this)" value="${x.id}" title="查看日志"><i class="fa fa-file-text"></i></button>
         """.stripMargin
      } else {
        s"""<button class="delete" onclick="openDelete(this)" value="${x.taskname}" id="${x.id}" title="删除任务"><i class="fa fa-trash"></i></button>"""
      }
      Json.obj("taskname" -> taskname, "state" -> state, "createdate" -> date, "results" -> results, "operation" -> operation)
    }
    json

  }

  def deleteTask(id: Int) = Action.async { implicit request =>
    taskdao.getById(id).flatMap { x =>
      taskdao.deleteTask(id).map { y =>
        val run = Future{
          val path = Utils.taskPath(x.accountid, x.projectid, id)
          FileUtils.deleteDirectory(new File(path))
        }
        Ok(Json.toJson("success"))
      }
    }
  }

  def getLog(id: Int) = Action { implicit request =>
    val row = Await.result(taskdao.getById(id), Duration.Inf)
    val path = Utils.taskPath(row.accountid, row.projectid, row.id)
    val log = FileUtils.readLines(new File(path, "log.txt")).asScala
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

  def download(id: Int, code: Int) = Action { implicit request =>
    val row = Await.result(taskdao.getById(id), Duration.Inf)
    val path = Utils.taskPath(row.accountid, row.projectid, id)
    val (file, name) = if (code == 1) {
      (new File(path, "genes.count_table.txt"), "genes.count_table.txt")
    } else if (code == 2) {
      (new File(path, "genes.fpkm_table.txt"), "genes.fpkm_table.txt")
    } else if(code == 3){
      (new File(path, "isoforms.count_table.txt"), "isoforms.count_table.txt")
    } else{
      (new File(path, "isoforms.fpkm_table.txt"), "isoforms.fpkm_table.txt")
    }
    Ok.sendFile(file).withHeaders(
      CACHE_CONTROL -> "max-age=3600",
      CONTENT_DISPOSITION -> ("attachment; filename=" + name),
      CONTENT_TYPE -> "application/x-download"
    )
  }

  case class updateTasknameData(taskId: Int, newtaskname: String)

  val updateTasknameForm = Form(
    mapping(
      "taskId" -> number,
      "newtaskname" -> text
    )(updateTasknameData.apply)(updateTasknameData.unapply)
  )

  def updateTaskname = Action.async { implicit request =>
    val data = updateTasknameForm.bindFromRequest.get
    val id = data.taskId
    val name = data.newtaskname
    taskdao.updateTaskName(id, name).map { x =>
      Ok(Json.obj("valid" -> "true"))
    }
  }

  def getDeploy(id: Int) = Action.async { implicit request =>
    val x = Await.result(taskdao.getById(id),Duration.Inf)
    val path = Utils.taskPath(x.accountid, x.projectid, x.id)
    val deploy = FileUtils.readLines(new File(path, "deploy.txt")).asScala
    val sample = deploy(2).split(",")
    taskdao.getById(id).flatMap { x =>
      val userId = x.accountid
      val proId = x.projectid
      sampledao.checkByPosition(userId, proId, deploy(2)).map { y =>
        val (valid, message) = if (sample.size == y.size) {
          ("true", "success")
        } else {
          val validSample = y.map(_.sample)
          val s = sample.diff(validSample)
          ("false", "样品" + s.mkString(",") + "已被删除")
        }
        val json = Json.obj("sample" -> deploy(2), "library_type" -> deploy(3), "library_norm_method" -> deploy(4),
          "hits_norm" -> deploy(5), "valid" -> valid, "message" -> message)
        Ok(Json.toJson(json))
      }
    }
  }


  case class resetData(taskIds:Int, library_type:String, library_norm_method:String,hits_norm:String)

  val resetForm = Form(
    mapping(
      "taskIds" -> number,
      "library_type" -> text,
      "library_norm_method" -> text,
      "hits_norm" -> text
    )(resetData.apply)(resetData.unapply)
  )

  def resetTask = Action.async { implicit request =>
    val data = resetForm.bindFromRequest.get
    val taskid = data.taskIds
    taskdao.getById(taskid).flatMap { x =>
      val path = Utils.taskPath(x.accountid, x.projectid, x.id)
      val buffer = FileUtils.readLines(new File(path, "deploy.txt")).asScala
      val b = mutable.Buffer(buffer(0), buffer(1), buffer(2),data.library_type,data.library_norm_method,data.hits_norm)
      new File(path, "deploy.txt").delete()
      FileUtils.writeLines(new File(path, "deploy.txt"), b.asJava)
      taskdao.updateState(x.id, 0).map { y =>
        Ok(Json.obj("valid" -> "true", "id" -> x.id))
      }
    }
  }

  def runResetCmd(id: Int) = Action.async { implicit request =>
    taskdao.getById(id).map { x =>
      runCmd(x.id)
      Ok(Json.toJson("success"))
    }
  }

  case class checkNewnameData(newtaskname: String)

  val checkNewnameForm = Form(
    mapping(
      "newtaskname" -> text
    )(checkNewnameData.apply)(checkNewnameData.unapply)
  )

  def checkNewname(proname: String) = Action.async { implicit request =>
    val data = checkNewnameForm.bindFromRequest.get
    val ses = getUserIdAndProId(request.session, proname)
    taskdao.getAllByPosi(ses._1, ses._2, data.newtaskname).map { x =>
      val valid = if (x.size == 0) {
        "true"
      } else {
        "false"
      }
      Ok(Json.obj("valid" -> valid))
    }
  }

}


