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
        (fpkm,count)
      }
      val q1 = q.map(_._1)
      val q2 = q.map(_._2)

      for(i <- 0 to q1.size){
        
      }

       val A1 = FileUtils.readLines(new File("D:\\workspace\\transcriptome_platform\\target\\universal/A1.genes.results")).asScala
       val A2 = FileUtils.readLines(new File("D:\\workspace\\transcriptome_platform\\target\\universal/A2.genes.results")).asScala
       val A3 = FileUtils.readLines(new File("D:\\workspace\\transcriptome_platform\\target\\universal/222.genes.results")).asScala

      val head = A1.map(_.split("\t").head)
      val a1 = A1.map(_.split("\t")(4))
      val a2 = A2.map(_.split("\t")(4))
      val a3 = A3.map(_.split("\t")(4))

      val a11 = A1.map(_.split("\t").last)
      val a21 = A2.map(_.split("\t").last)
      val a31 = A3.map(_.split("\t").last)

      val x =head.zip(a1).map(x=>(x._1+"\t"+x._2)).zip(a2).map(x=>(x._1+"\t"+x._2)).zip(a3).map(x=>(x._1+"\t"+x._2))

      val y =head.zip(a11).map(x=>(x._1+"\t"+x._2)).zip(a21).map(x=>(x._1+"\t"+x._2)).zip(a31).map(x=>(x._1+"\t"+x._2))
    }


}
