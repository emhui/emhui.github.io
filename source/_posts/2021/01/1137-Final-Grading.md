---
title: 1137 Final Grading
date: 2021-01-26 18:07:49
tags: [PAT, 算法, 排序, 数组]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6p96j71j31hc0u0qv5.jpg
---

# 1137 Final Grading (25分)

## 题目

![h30Mfq](https://gitee.com/yoyhm/oss/raw/master/uPic/h30Mfq.png)

## 思路

题目要求：给上数据结构这门课的同学发合格整数。其中合格证书需要满足，在线课程完成**大于等于200个任务点**并且**最后成绩G在60到100之间**。

本题是一个**构造结构体**和**数组排序**相结合的题目。但是需要注意过滤无效的数据。

具体步骤

1. 构建一个结构体，该结构如下

```C++
struct Student{
    string studentID;
    int Gp, Gm = -1, Gf = -1, G;
}stu[MAX];
```
2. 使用`map`建立一个**姓名-uid**的映射
3. 统计`Gp >= 200`的学生的`Gp, Gm, Gf`成绩，然后计算出`G`这个成绩。
4. 最后按照下面排序函数，对G和姓名进行排序,然后输出`G >= 60`的学生。

```C++
bool cmp(Student a, Student b) {
    if (a.G != b.G) return a.G > b.G;
    else return a.studentID < b.studentID;
}
```

注意，题目中写了，考试点通过200以上的才记录。

1. 建立姓名id的映射
2. 结构体

注意

1. 题目中要求的输出**G成绩在60-100之间**。这里的**G**不是**Gf**。即`Gp >= 200, G >> 60 and G <= 100`。
2. 过滤**Gp < 200**的学生。
3. 在`Gm, Gf`输入的过程中，部分学生是不存`Gp`成绩，所以这部分学生也要进行过滤。

## 代码

```C++
#include <iostream>
#include <map>
#include <algorithm>
#include <string>
#include <cmath>
using namespace std;

const int MAX = 10001;
map<string, int> studentID2Uid;
int vaildNum = 0;
struct Student{
    string studentID;
    int Gp, Gm = -1, Gf = -1, G;
}stu[MAX];

bool cmp(Student a, Student b) {
    if (a.G != b.G) return a.G > b.G;
    else return a.studentID < b.studentID;
}

int getUid(string s) {
    if (studentID2Uid.find(s) == studentID2Uid.end()) {
        studentID2Uid[s] = vaildNum;
        return vaildNum++;
    } else {
        return studentID2Uid[s];
    }
}

int main() {
    int p, m, n, val;
    string s;
    scanf("%d%d%d", &p, &m, &n);
    for (int i = 0; i < p; i++) {
        cin >> s >> val;
        if (val >= 200) {
            int uid = getUid(s);
            stu[uid].Gp = val;
            stu[uid].studentID = s;
        }
    }
    for (int i = 0; i < m; i++) {
        cin >> s >> val;
        if (studentID2Uid.find(s) == studentID2Uid.end()) continue;
        int uid = getUid(s);
        stu[uid].Gm = val;
    }
    for (int i = 0; i < n; i++) {
        cin >> s >> val;
        if (studentID2Uid.find(s) == studentID2Uid.end()) continue;
        int uid = getUid(s);
        stu[uid].Gf = val;
    }
    // 处理G
    for (int i = 0; i < vaildNum; i++){
        if (stu[i].Gm > stu[i].Gf) {
            stu[i].G = round(stu[i].Gm * 0.4 + stu[i].Gf * 0.6);
        } else {
            stu[i].G = stu[i].Gf;
        }
    }
    sort(stu, stu + vaildNum, cmp);
    for (int i = 0; i < vaildNum; i++) {
        if (stu[i].G >= 60)
        cout << stu[i].studentID << " " << stu[i].Gp << " " << stu[i].Gm << " " << stu[i].Gf << " " << stu[i].G << endl;
    }
    return 0;
}
```
