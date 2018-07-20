package test

import java.io.File

import org.apache.commons.io.FileUtils

import scala.collection.JavaConverters._

object test {

    def main(args: Array[String]): Unit = {

      val fi = Array("D:\\workspace\\transcriptome_platform\\target\\universal/A1.genes.results","D:\\workspace\\transcriptome_platform\\target\\universal/A2.genes.results","D:\\workspace\\transcriptome_platform\\target\\universal/222.genes.results")

      val q =fi.map{x=>
        val z = FileUtils.readLines(new File(x)).asScala
        val fpkm = z.map(_.split("\t").last)
        val count = z.map(_.split("\t")(4))
        val h = z.map(_.split("\t").head)
        (fpkm,count,h)
      }

      val id = q.map(_._3).head

      val q1 = q.map(_._1)
      val q2 = q.map(_._2)

      var p = id
      var p1 = id

      for(i <- 0 until  q1.size){
        val d =q1(i)
        val d1 = q2(i)
       p = p.zip(d).map(x=>(x._1+"\t"+x._2))
       p1 = p1.zip(d1).map(x=>(x._1+"\t"+x._2))
      }
      val head = "id\tA1\tA2\tA3"
      p = head +: p.drop(1)
      p1 = head +: p1.drop(1)
      println(p.mkString("\n"))
      println(p1.mkString("\n"))

    }


}
