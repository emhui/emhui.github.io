---
title: 1150 Travelling Salesman Problem
date: 2021-01-23 19:30:33
tags: [PAT, 算法]
categories: [PAT]
math: true
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg
---

# 1150 Travelling Salesman Problem (25分)

## 题目

![FcJdwU](https://gitee.com/yoyhm/oss/raw/master/uPic/FcJdwU.png)

## 思路

本题给定一个带路径无向图，在给出一系列的路径。让你计算出路径属于哪一类，路径的总长度。

上述示例中的无向图如下图所示

![vdd6GA](https://gitee.com/yoyhm/oss/raw/master/uPic/vdd6GA.png)

图中有三种路径类型，如何对三种路径判断是关键，同时还包括一种无法到达的路径。

- 首先需要判断无法到达的路径，题中示例$7-6-3- 2- 5- 4- 1- 6$中，$3-2$无法到达，令无法到达为`INF`，若最后`cnt > INF`证明无法到达该路径，输出`NA`.
- 接下来判断`Not a TS cycle`, 根据示例`4:1-2-5-1`和`7:6-1-2-5-4-3-1`可以知道，当**路径上没有所有城市**或**路径的起点城市和最终城市不一样**，属于`Not a TS cycle`
- 接下来是对`TS cycle`的判断，该类型是指部分城市访问过多次，所以必须满足`pn > n + 1`,即路径上的城市都访问到了，且不知访问依次
- 最后剩下的就是`TS simple cycle`类型

## 代码

```C++
#include <cstdio>
#include <vector>
#include <algorithm>
#include <cstring>
using namespace std;

const int MAX = 210;
const int INF = 987654321;

int G[MAX][MAX], path[MAX];
bool visited[MAX];

int main() {
    int n, m, k, c1, c2, dis, pn, minDis = INF, minPathId = INF;
    fill(G[0], G[0] + MAX * MAX, INF);
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; i++) {
        scanf("%d%d%d", &c1, &c2, &dis);
        G[c1][c2] = G[c2][c1] = dis;
    }
    scanf("%d", &k);
    for (int i = 1; i <= k; i++) {
        int cnt = 0;
        bool isAllVisited = true;
        memset(visited, false, sizeof(visited));
        scanf("%d", &pn);
        for (int j = 0; j < pn; j++) {
            scanf("%d", &path[j]);
            visited[path[j]] = true;
        }
        for (int j = 0; j < pn - 1; j++) {
            cnt += G[path[j]][path[j + 1]];
        }
        // 判断是否每个点都访问到了
        for (int j = 1; j <= n; j++) {
            if (!visited[j]) {
                isAllVisited = false;
                break;
            }
        }

        if (cnt > INF) {
            printf("Path %d: NA (Not a TS cycle)\n", i);
        } else if (!isAllVisited || path[0] != path[pn - 1]){
            printf("Path %d: %d (Not a TS cycle)\n", i, cnt);
        } else if (pn > n + 1) {
            // printf("Path %d: %d (TS simple cycle)\n", i, cnt);
            printf("Path %d: %d (TS cycle)\n", i, cnt);
            if (cnt < minDis) {
                minDis = cnt;
                minPathId = i;
            }
        } else{
            printf("Path %d: %d (TS simple cycle)\n", i, cnt);
             if (cnt < minDis) {
                minDis = cnt;
                minPathId = i;
            }
        }
    }
    printf("Shortest Dist(%d) = %d\n", minPathId, minDis);
    return 0;
}
```
