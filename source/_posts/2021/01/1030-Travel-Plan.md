---
title: 1030 Travel Plan
date: 2021-01-19 18:49:28
tags: [PAT, 算法, Dijkstra, 图, dfs]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmrxboukrj21hc0u07df.jpg
---

# 1030 Travel Plan

## 题目

![re6TKW](https://gitee.com/yoyhm/oss/raw/master/uPic/re6TKW.png)

## 思路

和[1018 Public Bike Management](https://emhui.fun/2021/01/19/1018-Public-Bike-Management/)思路类似。也是要找到最短距离并记录最短距离经过的结点。可以使用`pre`来记录最短路径的该点的上一个点是谁。若最短距离相同,就比较第二个权值大小。上一题是比较点上面的权值，本题是比较边上的第二个权值`cost`。因此再设置一个`Cost[MAX][MAX]`来存储`cost`，同时在更新最短距离的时候更新`cost`值。

具体更新如下

```C++
for (int v = 0; v < n; v++) { // 优化u-v的路线
	if (!visited[v] && G[u][v] != INF) {
		if (dis[u] + G[u][v] < dis[v]) {
			dis[v] = dis[u] + G[u][v];
			cost[v] = cost[u] + Cost[u][v];
			pre[v] = u;
		} else if (dis[u] + G[u][v] == dis[v]) {
			if (cost[u] + Cost[u][v] < cost[v]) {
				cost[v] = cost[u] + Cost[u][v];
				pre[v] = u;
			}
		}
	}
}
```

本题采用`Dijkstra`计算最短距离和最小花费。也可以和之前的题目一样使用`dfs`去遍历，求最小花费。

## 代码

```C++
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
const int MAX = 510;
const int INF = 987654321;

int G[MAX][MAX], Cost[MAX][MAX], dis[MAX], cost[MAX];
bool visited[MAX] = {false};
int n, m, s, d;
int pre[MAX];
int minDis = INF, minCost = INF;

void Dijstra(int s) {
    fill(dis, dis + MAX, INF);
    fill(cost, cost + MAX, INF);
    dis[s] = 0;
    cost[s] = 0;
    for (int i = 0; i < n; i++) pre[i] = i;
    for (int i = 0; i < n; i++) {
        int u = -1, MIN = INF;
        for (int j = 0; j < n; j++) { // 找到距离最短
            if (!visited[j] && dis[j] < MIN) {
                u = j;
                MIN = dis[j];
            }
        }
        if (u == -1) return;
        visited[u] = true;
        for (int v = 0; v < n; v++) { // 优化u-v的路线
            if (!visited[v] && G[u][v] != INF) {
                if (dis[u] + G[u][v] < dis[v]) {
                    dis[v] = dis[u] + G[u][v];
                    cost[v] = cost[u] + Cost[u][v];
                    pre[v] = u;
                } else if (dis[u] + G[u][v] == dis[v]) {
                    if (cost[u] + Cost[u][v] < cost[v]) {
                        cost[v] = cost[u] + Cost[u][v];
                        pre[v] = u;
                    }
                }
            }
        }
    }
}

void dfs(int v) {
    if (v == s) {
        printf("%d ", pre[v]);
        return;
    }
    dfs(pre[v]);
    printf("%d ", v);
}
int main() {
    scanf("%d%d%d%d", &n, &m, &s, &d);
    fill(G[0], G[0] + MAX * MAX, INF);
    int u, v;
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &u, &v);
        scanf("%d%d", &G[u][v], &Cost[u][v]);
        G[v][u] = G[u][v];
        Cost[v][u] = G[u][v];
    }
    Dijstra(s);
    dfs(d); // 倒着输出
    printf("%d %d\n", dis[d], cost[d]);
}
```
