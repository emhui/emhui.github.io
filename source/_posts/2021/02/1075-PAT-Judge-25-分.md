---
title: 1075 PAT Judge (25 分)
date: 2021-02-07 20:55:17
tags: [PAT, 排序]
categories: [PAT]
---

# 1075 PAT Judge (25 分)

## 题目

![gDRsJj](https://gitee.com/yoyhm/oss/raw/master/uPic/gDRsJj.png)

## 分析

本题查考 **结构体排序**

题目很简单，就是普通的结构体排序，每个题目的初始分数设置为`-2`,若分数为`-2`,则证明这道题没有提交，那么输出`-`,若分数为`-1`,证明提交但是没有编译通过，输出`0`。

但是部分用例无法通过，找了很久答案。终于发现是下面这个坑。

**有些人通过了，但是得了0分**(太坑了，怎么会有这种设定啊。)，这部分人也要算入排名中，所以需要在结构题中设置一个变量`isPass`，若这个人的分数大于等于0，设置`isPass = true;`并且不可逆.代码如下。

```C++
if (!users[userId].isPass) users[userId].isPass = score >= 0;
```

然后再将`isPass = false`的人的总分数设置为`-1`,这样通过的人总分数是`>= 0`,没有通过的人的总分数为`-1`. 这里的判断放在比较函数中。

```C++
bool cmp(node &a, node &b) {
	// 没有通过任何用例的人默认总分数为-1分
    int aTotalScore = a.isPass ? 0 : -1, bTotalScore = b.isPass ? 0 : -1;
    int aPerfect = 0, bPerfect = 0; // 满分题数量
    for (int i = 1; i <= k; i++) {
        if (a.p[i] >= 0) aTotalScore += a.p[i];
        if (b.p[i] >= 0) bTotalScore += b.p[i];
        if (a.p[i] == p[i]) aPerfect++;
        if (b.p[i] == p[i]) bPerfect++;
    }
    if (aTotalScore != bTotalScore) return aTotalScore > bTotalScore;
    else if (aPerfect != bPerfect) return aPerfect > bPerfect;
    else return a.id < b.id;
}

```

## 代码

```C++
#include <iostream>
#include <algorithm>
using namespace std;
const int MAX = 100000;
const int MAXP = 6;
struct node {
    int id;
    int p[MAXP];
    int totalScore;
    bool isPass;
    node() {
        isPass = false;
        totalScore = -1;
        for (int i = 0; i <= MAXP; i++) p[i] = -2;
    }
}users[MAX];
int Rank[MAX] = {0};
int n, m, k;
int p[MAXP] = {0};

bool cmp(node &a, node &b) {
    int aTotalScore = a.isPass ? 0 : -1, bTotalScore = b.isPass ? 0 : -1;
    int aPerfect = 0, bPerfect = 0;
    for (int i = 1; i <= k; i++) {
        if (a.p[i] >= 0) aTotalScore += a.p[i];
        if (b.p[i] >= 0) bTotalScore += b.p[i];
        if (a.p[i] == p[i]) aPerfect++;
        if (b.p[i] == p[i]) bPerfect++;
    }
    if (aTotalScore != bTotalScore) return aTotalScore > bTotalScore;
    else if (aPerfect != bPerfect) return aPerfect > bPerfect;
    else return a.id < b.id;
}

void show(int p[]) {
    for (int j = 1; j <= k; j++) {
        if (p[j] == -2) printf(" -");
        else if (p[j] == -1) printf(" 0");
        else printf(" %d", p[j]);
    }
    printf("\n");
}

int main() {
    cin >> n >> k >> m;
    for (int i = 1; i <= k; i++) {
        cin >> p[i];
    }
    int userId, pId, score;
    for (int i = 0; i < m; i++) {
        cin >> userId >> pId >> score;
        users[userId].id = userId;
        users[userId].p[pId] = max(users[userId].p[pId],score);
        // 若有的0就是得了0分。
        if (!users[userId].isPass)
        users[userId].isPass = score >= 0;
    }
    sort(users, users + MAX, cmp);
    for (int i = 0; i < n; i++) {
        int totalScore = 0;
        for (int j = 1; j < 6; j++) {
            if (users[i].p[j] > 0) totalScore += users[i].p[j];
        }
        users[i].totalScore = totalScore;
    }


    for (int i = 0; i < n; i++) {
        if (users[i].isPass) {
            if (i == 0) {
                Rank[users[i].id] = 1;
            } else if (users[i - 1].totalScore == users[i].totalScore) {
                Rank[users[i].id] = Rank[users[i - 1].id];
            } else {
                Rank[users[i].id] = i + 1;
            }
            printf("%0d %05d %d", Rank[users[i].id], users[i].id, users[i].totalScore);
            show(users[i].p);
        }
    }
    return 0;
}
```
