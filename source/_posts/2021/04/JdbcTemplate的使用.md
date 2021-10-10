---
title: JdbcTemplate的使用
date: 2021-04-17 20:40:17
tags: [Sping Boot, Java, Sping]
categories: [Spring Boot]
---

# JdbcTemplate的使用

> Accessing Relational Data using JDBC with Spring

目标：使用`JdbcTemplate`实现对数据库的操作

这里使用`h2-databse`，该数据库将数据存储在内存中

项目所需要依赖

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

首先为了项目简单，这里使用一个简单的的`Coustomer`类作为映射

```java
package com.example.accessingrelationaldatausingjdbcwithspring;

public class Customer {
    private Long id;
    private String firstName, lastName;

    public Customer() {
    }

    public Customer(Long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}

```

接下来在主类中，继承`CommandLineRunner`，该类的作用是在程序运行的时候执行它的`run`方法。

主类如下

```java
package com.example.accessingrelationaldatausingjdbcwithspring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class AccessingRelationalDataUsingJdbcWithSpringApplication implements CommandLineRunner {
    private Logger log = LoggerFactory.getLogger(AccessingRelationalDataUsingJdbcWithSpringApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(AccessingRelationalDataUsingJdbcWithSpringApplication.class, args);
    }

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        log.info("创建一个表");
        // 使用jdbcTemplate创建表
        // 若存在则将表删除
        jdbcTemplate.execute("DROP TABLE customers IF EXISTS");
        // 新建一张表
        jdbcTemplate.execute("CREATE TABLE customers (" +
                "id INTEGER , first_name VARCHAR(255), last_name VARCHAR(255)" +
                ")");
        // 准备需要加载数据
        // 数据格式是 List<Object[]> batchArgs
        List<Object[]> batchArgs = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            String[] obj = {"f" + i, "l" + i};
            batchArgs.add(obj);
        }
        jdbcTemplate.batchUpdate("INSERT INTO customers(first_name, last_name) VALUES (?, ?)", batchArgs);
        // 开始查询
        log.info("开始查询f开头");
        jdbcTemplate.query("SELECT * FROM customers",
                // rs, 每行数据， row 行号
                (rs, rowNum) -> new Customer(
                        rs.getLong("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name")))
        .forEach(customer -> {
            log.info(customer.toString());
        });
    }
}

```

解释：

在JdbcTemplate的实现主要分下面几个步骤

1. 自动装载`JdbcTemplate`

```java
@Autowired
JdbcTemplate jdbcTemplate;
```

2. 使用`jdbcTemplate.excute(sql)`创建一个表

```java
// 若存在则将表删除
jdbcTemplate.execute("DROP TABLE customers IF EXISTS");
// 新建一张表
jdbcTemplate.execute("CREATE TABLE customers (" +
		"id INTEGER , first_name VARCHAR(255), last_name VARCHAR(255)" +
		")");
```

3. 准备数据，并使用`jdbcTemplate.batchUpdate(sql)`批量更新数据


查看`batchUpdate`源码可以知道，它需要传入的第二个参数是一个`List<Object[]> batchArgs`,因此我们需要准备一批数组对象进行传入,具体传入方式如下。

```java
// 准备需要加载数据
// 数据格式是 List<Object[]> batchArgs
List<Object[]> batchArgs = new ArrayList<>();
for (int i = 0; i < 10; i++) {
	String[] obj = {"f" + i, "l" + i};
	batchArgs.add(obj);
}
jdbcTemplate.batchUpdate("INSERT INTO customers(first_name, last_name) VALUES (?, ?)", batchArgs);
```

4. 查询数据，使用`jdbcTemplate.query()`查询

查看`query`的源码可以发现，它的第一参数是`sql`语句，但是其他参数可以传递多个，一般第二个参数是回调函数。这里稍微看一下`query`存在多少种调用。

![fbArhi](https://gitee.com/yoyhm/oss/raw/master/uPic/fbArhi.png)

下面是官方的一种写法

```java
jdbcTemplate.query("SELECT * FROM customers",
		// rs, 每行数据， row 行号
		(rs, rowNum) -> new Customer(
				rs.getLong("id"),
				rs.getString("first_name"),
				rs.getString("last_name")))
.forEach(customer -> {
	log.info(customer.toString());
});
```

可以看到，第二个参数使用的是lambda表达式，其中

- 第一个参数`rs`是当前行的数据
- 第二个参数`rowNum` 表示当前第几行
