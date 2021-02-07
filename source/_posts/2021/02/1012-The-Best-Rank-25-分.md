---
title: 1012 The Best Rank (25 分)
date: 2021-02-04 10:26:45
tags: [PAT, 排序, 数组]
categories: [PAT]
---

# 1012 The Best Rank (25 分)

## 题目

![d1bn7Z](https://gitee.com/yoyhm/oss/raw/master/uPic/d1bn7Z.png)

## 分析

本题考察**结构体排序**。

求出每们成绩的排名。然后输出他们各个成绩中排名最佳的那个课程和排名。

因为有四个成绩，所有得分别对每个成绩进行排序，如果在查询的时候对他们排序，会出现超时，因此可以使用`Rank[1000000][4]`来预先对它们进行排名。

同时成绩最好按照`{'A', 'C', 'M', 'E'}`的顺序来先后排序。最后输出也是要按照这个优先级。

```C++
for (now = 0; now < 4; now++) {
	sort(stu, stu + n, cmp);
	Rank[stu[0].id][now] = 1;
	for (int i = 1; i < n; i++) {
		if (stu[i].grade[now] == stu[i - 1].grade[now]) { // 和之前排名一样
			Rank[stu[i].id][now] = Rank[stu[i - 1].id][now];
		} else {
			Rank[stu[i].id][now] = i + 1;
		}
	}
}
```

## 代码

```C++
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;
const int MAX = 2000;
struct Student{
    int id;
    int grade[4];
}stu[MAX];

int Rank[1000000][4] = {0}; // 每个用户的排名

int now = 0;

char course[4] = {'A', 'C', 'M', 'E'};

bool cmp(Student& a, Student &b) {
    return a.grade[now] > b.grade[now];
}

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) {
        scanf("%d%d%d%d",&stu[i].id, &stu[i].grade[1], &stu[i].grade[2], &stu[i].grade[3]);
        stu[i].grade[0] = round(1.0 * (stu[i].grade[1] + stu[i].grade[2] + stu[i].grade[3]) / 3);
    }

    // 开始排序并且设置排名
    for (now = 0; now < 4; now++) {
        sort(stu, stu + n, cmp);
        Rank[stu[0].id][now] = 1;
        for (int i = 1; i < n; i++) {
            if (stu[i].grade[now] == stu[i - 1].grade[now]) { // 和之前排名一样
                Rank[stu[i].id][now] = Rank[stu[i - 1].id][now];
            } else {
                Rank[stu[i].id][now] = i + 1;
            }
        }
    }
    int id;
    while (m--) {
        scanf("%d", &id);
        if (Rank[id][0] == 0) {
            printf("N/A\n");
        } else {
            int maxRank = 0;
            for (int i = 1; i < 4; i++) {
                if (Rank[id][maxRank] > Rank[id][i]) { // 找到排名最高的，就是值最小的
                    maxRank = i;
                }
            }
            printf("%d %c\n", Rank[id][maxRank], course[maxRank]);
        }
    }
}
```
