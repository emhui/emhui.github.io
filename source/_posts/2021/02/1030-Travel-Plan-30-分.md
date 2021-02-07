---
title: 1030 Travel Plan (30 分)
date: 2021-02-05 19:03:23
tags: [PAT, 最短路径, Dijkstra, 优先队列]
categories: [PAT]
---

# 1030 Travel Plan (30 分)

## 题目

![ZFsGSY](https://gitee.com/yoyhm/oss/raw/master/uPic/ZFsGSY.png)

## 分析

本题考察**求有附加条件的最短路径**和**打印出唯一最短路径**

最短路径求解模板如下

```C++
int n; // 结点数量
// pre 存储最短路径中，每一个结点的前一个结点
vector<int> pre, visited, dis;
int G[u][v]; // 邻接矩阵

void Dijkstra(int s) {
	dis[s] = 0;
	for (int i = 0; i < n; i++) pre[i] = i;
	priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
	pq.push(make_pair(0, s));
	while (!pq.empty()) {
		int u = pq.top().second;
		if (visited[u]) continue;
		visited[u] = true;
		for (int v = 0; v < n; v++) {
			if (!visited[v] && G[u][v] != INF && dis[u] + G[u][v] < dis[v]) {
				dis[v] = dis[u] + G[u][v];
				pre[v] = u; // 更新上一个结点
				pq.push(make_pair(dis[v], v));
			}
		}
	}
}
```

这里`pre`存储的是最短路径，打印的话需要使用后续遍历，从后往前打印，代码如下

```C++
void dfs(int v) {
	if (v == s) { // 如果到了起点
		printf("%d ", v);
		return;
	}
	dfs(pre[v]);
	printf("%d ", v);
}
```

本题中，若最短路径相同，则比较最小花费，所以只需要在更新`v`的参数这块进行判断，代码如下

```C++
for (int v = 0; v < n; v++) {
	if (!visited[v] && G[u][v] != INF) {
		if (dis[u] + G[u][v] < dis[v]) {
			dis[v] = dis[u] + G[u][v];
			cost[v] = cost[u] + Cost[u][v];
			pre[v] = u;
			pq.push(make_pair(dis[v], v));
		} else if (dis[u] + G[u][v] == dis[v]) {
			if (cost[u] + Cost[u][v] < cost[v]) {
				cost[v] = cost[u] + Cost[u][v];
				pre[v] = u;
				pq.push(make_pair(dis[v], v));
			}
		}
	}
}
```

## 代码

## 方法一：使用Priority_queue实现Dijkstra

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
#include <queue>
using namespace std;

const int MAX = 501;
const int INF = 987654321;

int G[MAX][MAX], Cost[MAX][MAX];
int n, m, s, d;
int dis[MAX], cost[MAX], pre[MAX];
bool visited[MAX] = {false};

void Dijkstra(int s) {
    fill(dis, dis + MAX, INF);
    fill(cost, cost + MAX, INF);
    // 最小堆
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    dis[s] = 0;
    cost[s] = 0;
    pq.push(make_pair(0, s));
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        if (visited[u]) continue;
        visited[u] = true;
        for (int v = 0; v < n; v++) {
            if (!visited[v] && G[u][v] != INF) {
                if (dis[u] + G[u][v] < dis[v]) {
                    dis[v] = dis[u] + G[u][v];
                    cost[v] = cost[u] + Cost[u][v];
                    pre[v] = u;
                    pq.push(make_pair(dis[v], v));
                } else if (dis[u] + G[u][v] == dis[v]) {
                    if (cost[u] + Cost[u][v] < cost[v]) {
                        cost[v] = cost[u] + Cost[u][v];
                        pre[v] = u;
                        pq.push(make_pair(dis[v], v));
                    }
                }
            }
        }
    }
}

void dfs(int x) {
    if (x == s) {
        printf("%d ", s);
        return;
    }
    dfs(pre[x]);
    printf("%d ", x);
}

int main() {
    cin >> n >> m >> s >> d;
    int id1, id2;
    fill(G[0], G[0] + MAX*MAX, INF);
    fill(Cost[0], Cost[0] + MAX*MAX, INF);
    for (int i = 0; i < m; i++) {
        cin >> id1 >> id2;
        cin >> G[id1][id2] >> Cost[id1][id2];
        G[id2][id1] = G[id1][id2];
        Cost[id2][id1] = Cost[id1][id2];
    }
    Dijkstra(s);
    dfs(d);
    printf("%d %d\n",dis[d], cost[d]);

    return 0;
}
```

### 方法二：传统Dijkstra

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
#include <queue>
using namespace std;

const int MAX = 501;
const int INF = 987654321;

int G[MAX][MAX], Cost[MAX][MAX];
int n, m, s, d;
int dis[MAX], cost[MAX], pre[MAX];
bool visited[MAX] = {false};

void Dijkstra(int s) {
    fill(dis, dis + MAX, INF);
    fill(cost, cost + MAX, INF);
    dis[s] = 0;
    cost[s] = 0;
    for (int i = 0; i < n; i++) pre[i] = i;
    for (int i = 0; i < n; i++) {
        int u = -1, MIN = INF;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && dis[j] < MIN) {
                u = j;
                MIN = dis[j];
            }
        }
        if (u == -1) return;
        visited[u] = true;
        for (int v = 0; v < n; v++) {
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

void dfs(int x) {
    if (x == s) {
        //printf("%d ", x);
        return;
    }
    dfs(pre[x]);
    printf("%d ", pre[x]);
}

int main() {
    cin >> n >> m >> s >> d;
    int id1, id2;
    fill(G[0], G[0] + MAX*MAX, INF);
    fill(Cost[0], Cost[0] + MAX*MAX, INF);
    for (int i = 0; i < m; i++) {
        cin >> id1 >> id2;
        cin >> G[id1][id2] >> Cost[id1][id2];
        G[id2][id1] = G[id1][id2];
        Cost[id2][id1] = Cost[id1][id2];
    }
    Dijkstra(s);
    // 打印出总花费
    vector<int> ans;
    // int sum = 0;
    int end = d;
    while (s != d) {
        d = pre[d];
        ans.push_back(d);
    }
    // ans.push_back(s);
    // 打印总距离，总成本
    for (int i = ans.size() - 1; i >= 0; i--) {
        printf("%d ", ans[i]);
    }
    printf("%d %d %d\n", end, dis[end], cost[end]);
    return 0;
}
```

## 相似题目

- [1111 Online Map (30分)](https://emhui.fun/2021/01/31/1111-Online-Map-30%E5%88%86/)
- [1087 All Roads Lead to Rome](https://emhui.fun/2021/01/20/1087-All-Roads-Lead-to-Rome/)
- [1018 Public Bike Management](https://emhui.fun/2021/01/19/1018-Public-Bike-Management/)
- [最短路径 Dijkstra模板](https://emhui.fun/2021/01/31/%E6%9C%80%E7%9F%AD%E8%B7%AF%E5%BE%84-Dijkstra%E6%A8%A1%E6%9D%BF/)
