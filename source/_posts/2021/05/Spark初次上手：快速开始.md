---
title: Spark初次上手：快速开始
date: 2021-05-26 11:18:32
tags: [教程, spark, yarn]
categories: 大数据
---

# Spark初次上手：快速开始

#@教程 #@spark

## 使用Spark Shell进行交互

> [软件下载地址](https://spark.apache.org/downloads.html)

### 基本

启动`Spark`，在刚刚下载的`Spark`包中解压，然后执行下面命令进行启动。

> 官方使用了Scala和Python两种语言都实现了一遍，如果是使用Python的话，则使用的是`pyspark`，且直接使用`pip install pyspark`安装即可使用。

```bash
./bin/spark-shell
```

读取文件操作

```shell
scala> val textFile = spark.read.text("README.md")
textFile: org.apache.spark.sql.DataFrame = [value: string]
scala> textFile.count()
res0: Long = 108
```

从上面可以看到，`Spark`读取文件，然后是以**行**作为单位的，因为`READM.md`文件中正好是108行。

读取第一行数据

```shell
scala> textFile.first()
res1: org.apache.spark.sql.Row = [# Apache Spark]
```

使用`filter`功能创建新的`Dataset`对象

```shell
scala> val linesWithSpark = textFile.filter(line => line.toString().contains("Spark"))
linesWithSpark: org.apache.spark.sql.Dataset[org.apache.spark.sql.Row] = [value: string]

scala> linesWithSpark.count()
res2: Long = 19
```

> - ⚠️： 官方这里使用的是`linesWithSpark = textFile.filter(line => line.contains("Spark"))`，但是可能是版本不支持之类的。`line`没有`contains`方法。因此使用上面的写法才是正确的。
> - 通过对`README.md`的统计，含有`Spark`的行的确是19行，因此上面的程序是✅。

使用`show`展示`Dataset`数据

> 默认展示20条，可以传递参数到`show`中展示指定数量的数据。

```shell
scala> textFile.show()
+--------------------+
|               value|
+--------------------+
|      # Apache Spark|
|                    |
|Spark is a unifie...|
|high-level APIs i...|
|supports general ...|
|rich set of highe...|
|MLlib for machine...|
|and Structured St...|
|                    |
|<https://spark.ap...|
|                    |
|[![Jenkins Build]...|
|[![AppVeyor Build...|
|[![PySpark Covera...|
|                    |
|                    |
|## Online Documen...|
|                    |
|You can find the ...|
|guide, on the [pr...|
+--------------------+
only showing top 20 rows
```





### 更多Dataset操作

1. 需求：找到有最多单词的那行。

```shell
scala> textFile.map(line => line.toString().split(" ").size).reduce((a, b) => if (a > b) a else b)
res3: Int = 16
```

解释：

- 首先使用`map(line => line.toString().split(" ").size)`操作，统计每行的单词数量。
- `reduce`调用`Dataset`方法来统计单词数量最多的那行。

使用下面的方法引入函数也能达到相同的效果。

```bash
scala> import java.lang.Math
import java.lang.Math

scala> textFile.map(line => line.toString().split(" ").size).reduce((a, b) => Math.max(a, b))
res22: Int = 16
```

2. 实现`mapreduce`的流程。

```shell
scala> val wordCounts = textFile.flatMap(line => line.split(" ")).groupByKey(identity).count()
wordCounts: org.apache.spark.sql.Dataset[(String, Long)] = [value: string, count(1): bigint]
```

解释：

- `flatMap`将行数据转化为单词数据。
- `groupByKey`和`Count`将数据中的单词转化为<String,Long>对。
- `collect`用于在shell中收集这些单词。

```shell
scala> val wordCounts = textFile.flatMap(line => line.toString().split(" ")).groupByKey(identity).count()
wordCounts: org.apache.spark.sql.Dataset[(String, Long)] = [key: string, count(1): bigint]

scala> wordCounts.collect
collect   collectAsList

scala> wordCounts.collect()
res24: Array[(String, Long)] = Array((given.],1), ([[run,1), (online,1), (graphs,1), (URL,],1), ([Spark,4), (Shell],2), (including],1), (documentation,3), (command,,2), (abbreviated,1), (using:],1), ([Please,4), (Build](https://amplab.cs.berkeley.edu/jenkins/job/spark-master-test-sbt-hadoop-2.7-hive-2.3/badge/icon)](https://amplab.cs.berkeley.edu/jenkins/job/spark-master-test-sbt-hadoop-2.7-hive-2.3)],1), (overview,1), (SparkPi],2), (set,2), (-DskipTests,1), (name,1), (stream,1), (not,1), (programs,2), (tests,1), (particular,2), ([for,2), ([in,1), (must,1), (using,3), (./build/mvn,1), (instructions.],1), (you,4), (Programs],1), (variable,1), (Note,1), (core,1), ([storage,1), ([#,1), (protocols,1), ([To,2), (guidance,2), (page](https://spark.apache.org/documenta...
```

## Caching 缓存

支持将数据放到内存缓存中。

 

## Self-Contained Applications 独立应用的程序

在Java中使用Spark API进行开发。

需求：编写一个统计包含`a`和包含`b`的行数数量。

1. 添加依赖

````xml
<dependencies>
  <dependency> <!-- Spark dependency -->
    <groupId>org.apache.spark</groupId>
    <artifactId>spark-sql_2.12</artifactId>
    <version>3.1.1</version>
    <scope>provided</scope>
  </dependency>
</dependencies>
````

2. 编写Java程序

```java
import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.SparkSession;

public class SimpleApp {
    private static final String logFile = "/usr/local/spark-3.1.1-bin-hadoop2.7/README.md";
    public static void main(String[] args) {
        // SparkSession Spark程序的入口
        SparkSession sparkSession = SparkSession.builder().appName("Simple App").getOrCreate();

        Dataset<String> dataset = sparkSession.read().textFile(logFile).cache();

        long numAs = dataset.filter((FilterFunction<String>) s -> s.contains("a")).count();
        long numBs = dataset.filter((FilterFunction<String>) s -> s.contains("b")).count();

        System.out.println("含有a的行数为：" + numAs);
        System.out.println("含有b的行数为：" + numBs);

        sparkSession.stop();

    }
}
```



3. 打包成Jar包

在项目的根目录下运行下面命令：

```bash
mvn package
```

4. 提交程序并且运行

```bash
/usr/local/spark-3.1.1-bin-hadoop2.7/bin/spark-submit --class "SimpleApp" --master local target/spark-learn-01-1.0-SNAPSHOT.jar
```

5. 运行结果查看

```bash
......
21/05/26 10:35:01 INFO DAGScheduler: Job 1 finished: count at SimpleApp.java:15, took 0.125818 s
含有a的行数为：64
含有b的行数为：32
21/05/26 10:35:01 INFO SparkUI: Stopped Spark web UI at http://emhuidembp.lan:4040
.......
```

## 其他学习

- [RDD Programing Guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
- [Spark SQL Programing Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)

- Spark 部署到集群中 [deployment overview](https://spark.apache.org/docs/latest/cluster-overview.html).
- Spark 自带案例运行

```
# For Scala and Java, use run-example:
./bin/run-example SparkPi

# For Python examples, use spark-submit directly:
./bin/spark-submit examples/src/main/python/pi.py

# For R examples, use spark-submit directly:
./bin/spark-submit examples/src/main/r/dataframe.R
```

## 【强化】部署到集群中运行

[根据官方文档](https://spark.apache.org/docs/latest/submitting-applications.html)，把它部署到集群中去

```bash
# Run on a YARN cluster
export HADOOP_CONF_DIR=XXX
./bin/spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master yarn \
  --deploy-mode cluster \  # can be client for client mode
  --executor-memory 20G \
  --num-executors 50 \
  /path/to/examples.jar \
  1000
```



根据上面进行改写

> ⚠️：提交任务前需要先使用 `export HADOOP_CONF_DIR=/usr/local/hadoop/etc/hadoop/`配置环境。

```bash
export HADOOP_CONF_DIR=/usr/local/hadoop/etc/hadoop/
echo $HADOOP_CONF_DIR # 验证是否成功
# 运行命令
/usr/local/spark-3.1.1-bin-hadoop2.7/bin/spark-submit --class "SimpleApp" --master yarn target/spark-learn-01-1.0-SNAPSHOT.jar
```

这里会报下面错误

```bash
Exception in thread "main" org.apache.spark.sql.AnalysisException: Path does not exist: hdfs://localhost:9000/usr/local/spark-3.1.1-bin-hadoop2.7/README.md
```

因此需要对程序进行改写

```java
public class SimpleApp {
    // private static final String logFile = "/usr/local/spark-3.1.1-bin-hadoop2.7/README.md";
    public static void main(String[] args) {
        // SparkSession Spark程序的入口
        SparkSession sparkSession = SparkSession.builder().appName("Simple App").getOrCreate();
      	// 修改为从参数中读取内容
        String logFile = args[0];

        // 读取数据
        Dataset<String> dataset = sparkSession.read().textFile(logFile).cache();

        long numAs = dataset.filter((FilterFunction<String>) s -> s.contains("a")).count();
        long numBs = dataset.filter((FilterFunction<String>) s -> s.contains("b")).count();

        System.out.println("含有a的行数为：" + numAs);
        System.out.println("含有b的行数为：" + numBs);

        sparkSession.stop();

    }
}
```

这里将运行命令也进行改写，同时需要指定输入参数。先把`README.md`文件放到HDFS中去。

```bash
(base) ➜  code hdfs dfs -mkdir spark
2021-05-26 11:11:34,856 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
(base) ➜  code hdfs dfs -put /usr/local/spark-3.1.1-bin-hadoop2.7/README.md spark
2021-05-26 11:11:54,876 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
(base) ➜  code hdfs dfs -ls spark
2021-05-26 11:12:08,403 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Found 1 items
-rw-r--r--   1 emhui supergroup       4488 2021-05-26 11:11 spark/README.md
```

将命令写成脚本`run.sh`运行:

```shell
(base) ➜  code cat script/run.sh
export HADOOP_CONF_DIR=/usr/local/hadoop/etc/hadoop/
/usr/local/spark-3.1.1-bin-hadoop2.7/bin/spark-submit --class SimpleApp --master yarn target/spark-learn-01-1.0-SNAPSHOT.jar spark/README.md
```

运行该命令

```bash
sh script/run.sh
```

可以看到结果也正确运行，且Yarn中也有该任务。

```bash
2021-05-26 11:14:22,526 INFO scheduler.DAGScheduler: Job 1 finished: count at SimpleApp.java:16, took 1.124766 s
含有a的行数为：64
含有b的行数为：32
2021-05-26 11:14:22,549 INFO server.AbstractConnector: Stopped Spark@55b5e331{HTTP/1.1, (http/1.1)}{0.0.0.0:4040}
```

![Ehv0I5](https://gitee.com/yoyhm/oss/raw/master/uPic/Ehv0I5.png)
