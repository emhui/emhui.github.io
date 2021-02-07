---
title: 1111 Online Map (30分)
date: 2021-01-31 21:37:14
tags: [PAT, priority_queue, 优先队列, 最短路径, dijkstra]
categories: [PAT]
---

# 1111 Online Map (30分)

## 题目

![dtuD9S](https://gitee.com/yoyhm/oss/raw/master/uPic/dtuD9S.png)

## 分析

给定一个有向图，找出两条路径，分别是

- 以距离为权变的最短路径
- 以时间为权边的最短路径

要求输出

> In case the shortest path is not unique, output the fastest one among the shortest paths, which is guaranteed to be unique. In case the fastest path is not unique, output the one that passes through the fewest intersections, which is guaranteed to be unique.

> 距离最短路径不唯一，则输出最短时间中最快的一条。所以需要使用一个变量记录所有的最短路径，找出时间最短的一条。
> 时间最短的路径不唯一，输出通过最少结点的路径。使用一个变量记录所有经历过的结点， 经过点最小的路径。

---

题目中给出的图如下所示

![FLzRUZ](https://gitee.com/yoyhm/oss/raw/master/uPic/FLzRUZ.png)

根据分析，这道题就变成了分别求两个最短路径：**以距离为边的权值最短距离**和**以时间为边的权值的最短距离**。

因此设置两个二维数组分别存储距离值和时间值

```C++
int D[MAX][MAX], T[MAX][MAX];
```

在建图的时候需要注意，这是一个有向图，需要判断方向。

其中题目要求输出唯一的最短路径。因为路径要求是唯一，可以参考

- [1030 Travel Plan](https://emhui.fun/2021/01/19/1030-Travel-Plan/)

如题目要求输出所有路径，则参考

- [1018 Public Bike Management](https://emhui.fun/2021/01/19/1018-Public-Bike-Management/)

## 代码

### 方法一

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
const int INF = 987654321;
const int MAX = 500;

int n, m;
int D[MAX][MAX]; // 最短距离图
int T[MAX][MAX]; // 最短时间图
vector<bool> visited; // 记录是否被访问
vector<int> dis, tim, tempPath, path, node;
// vector<int> preDis[MAX], preTime[MAX]; // pre记录路径
int preDis[MAX], preTime[MAX];

void dijkstra_dis(int s) {
    fill(dis.begin(), dis.end(), INF); // 初始化最短路径
    fill(tim.begin(), tim.end(), INF); // 初始化最短路径上的时间消费
    fill(visited.begin(), visited.end(), 0); // 初始化所有参观过的点
    dis[s] = 0; // 这里把dis设置为经过点的数量
    tim[s] = 0;

    // preDis[s].push_back(s); // 自己的前一个
    // 初始化所有的路径
    for (int i = 0; i < n; i++) preDis[i] = i;
    for (int i = 0; i < n; i++) {
        // 1. 找到最小的距离
        int u = -1, min = INF;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && min > dis[j]) {
                u = j;
                min = dis[j];
            }
        }
        if (u == -1) return;
        visited[u] = true;
        // 优化以u为结点的点
        for (int v = 0; v < n; v++) {
            if (!visited[v] && D[u][v] != INF) {
                if (dis[u] + D[u][v] < dis[v]) {
                    dis[v] = dis[u] + D[u][v];
                    tim[v] = tim[u] + T[u][v]; // 最短路径上的时间话费
                    preDis[v] = u;
                    // preDis[v].clear();
                    // preDis[v].push_back(u);
                } else if (dis[u] + D[u][v] == dis[v]) { // 存在多条最短路径
                    if (tim[u] + T[u][v] < tim[v]) { // 消耗时间最短
                        tim[v] = tim[u] + T[u][v];
                        preDis[v] = u;
                    }
                }
            }
        }
    }
}

void dijkstra_tim(int s) {
    fill(node.begin(), node.end(), INF); // 初始化最短路径
    fill(tim.begin(), tim.end(), INF); // 初始化最短路径上的时间消费
    fill(visited.begin(), visited.end(), 0); // 初始化所有参观过的点
    node[s] = 0; // 起点为0
    tim[s] = 0;
    // preDis[s].push_back(s); // 自己的前一个
    // 初始化所有的路径
    for (int i = 0; i < n; i++) preTime[i] = i;
    for (int i = 0; i < n; i++) {
        // 1. 找到最小的距离
        int u = -1, min = INF;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && min > tim[j]) {
                u = j;
                min = tim[j];
            }
        }
        if (u == -1) return;
        visited[u] = true;
        // 优化以u为结点的点
        for (int v = 0; v < n; v++) {
            if (!visited[v] && T[u][v] != INF) {
                if (tim[u] + T[u][v] < tim[v]) {
                    tim[v] = tim[u] + T[u][v];
                    node[v] = node[u] + 1; // 在u的基础上在走了一个点。
                    preTime[v] = u;
                } else if (tim[u] + T[u][v] == tim[v]) { // 存在多条最短路径
                    if (node[u] + 1 < node[v]) {
                        node[v] = node[u] + 1;
                        preTime[v] = u;
                    }
                }
            }
        }
    }
}

int main() {
    int v1,v2, one_way, length, time;
    cin >> n >> m;
    dis.resize(n);
    tim.resize(n);
    node.resize(n);
    visited.resize(n);
    fill(D[0], D[0] + MAX * MAX, INF);
    fill(T[0], T[0] + MAX * MAX, INF);
    for (int i = 0; i < m; i++) {
        cin >> v1 >> v2 >> one_way >> length >> time;
        D[v1][v2] = length;
        T[v1][v2] = time;
        if (one_way == 0) {
            D[v2][v1] = length;
            T[v2][v1] = time;
        }
    }
    int start, destination;
    cin >> start >> destination;
    dijkstra_dis(start);
    dijkstra_tim(start);


    // dfs(destination, start);
    vector<int> path_dis, path_time; // 记录最佳路径
    int i = start, j = destination;
    while (j != i) {
        path_dis.push_back(j);
        j = preDis[j];
    }
    path_dis.push_back(start); // 加入起点

    i = start, j = destination;
    while (j != i) {
        path_time.push_back(j);
        j = preTime[j];
    }
    path_time.push_back(start);

    if (path_dis == path_time) {
        printf("Distance = %d; Time = %d: ", dis[destination], tim[destination]);
        for (int i = path_dis.size() - 1; i >= 0; i--) {
            printf("%d", path_dis[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");
    } else {
        printf("Distance = %d: ", dis[destination]);

        for (int i = path_dis.size() - 1; i >= 0 ; i--) {
            printf("%d", path_dis[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");

        printf("Time = %d: ", tim[destination]);
        for (int i = path_time.size() - 1; i >= 0 ; i--) {
            printf("%d", path_time[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");
    }

}
```

### 方法二：使用`priority_queue`实现Dijkstra

```C++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
const int INF = 987654321;
const int MAX = 500;

int n, m;
int D[MAX][MAX]; // 最短距离图
int T[MAX][MAX]; // 最短时间图
vector<bool> visited; // 记录是否被访问
vector<int> dis, tim, tempPath, path, node;
int preDis[MAX], preTime[MAX];

void dijkstra_dis(int s) {
    fill(dis.begin(), dis.end(), INF); // 初始化最短路径
    fill(tim.begin(), tim.end(), INF); // 初始化最短路径上的时间消费
    fill(visited.begin(), visited.end(), 0); // 初始化所有参观过的点
    // 注意这里需要使用最小堆
    priority_queue<pair<int, int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push(make_pair(0, s));
    dis[s] = 0;
    tim[s] = 0;
    for (int i = 0; i < n; i++) preDis[i] = i;
    while (!pq.empty()) {
        int u_dis = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        if (visited[u]) continue;
        visited[u] = true;
        for (int v = 0; v < n; v++) {
            if (!visited[v] && D[u][v] != INF) {
                if (dis[u] + D[u][v] < dis[v]) {
                    dis[v] = dis[u] + D[u][v];
                    tim[v] = tim[u] + T[u][v]; // 时间
                    preDis[v] = u;
                    pq.push(make_pair(dis[v], v));
                } else if (dis[u] + D[u][v] == dis[v]) {
                    if (tim[u] + T[u][v] < tim[v]) {
                        tim[v] = tim[u] + T[u][v];
                        preDis[v] = u;
                        pq.push(make_pair(dis[v], v));
                    }
                }
            }
        }
    }
}

void dijkstra_tim(int s) {
    fill(node.begin(), node.end(), INF); //初始化经历过的结点数量
    fill(tim.begin(), tim.end(), INF); // 初始化最短路径上的时间消费
    fill(visited.begin(), visited.end(), 0); // 初始化所有参观过的点
    priority_queue<pair<int,int>, vector<pair<int, int>>, greater<pair<int,int>>> pq;
    pq.push(make_pair(0, s));
    node[s] = 0; // 起点为0
    tim[s] = 0;
    for (int i = 0; i < n; i++) preTime[i] = i;
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        if (visited[u]) continue;
        visited[u] = true;

        for (int v = 0; v < n; v++) {
            if (!visited[v] && T[u][v] != INF) {
                if (tim[u] + T[u][v] < tim[v]) {
                    tim[v] = tim[u] + T[u][v];
                    node[v] = node[u] + 1;
                    preTime[v] = u;
                    pq.push(make_pair(tim[v], v));
                } else if (tim[u] + T[u][v] == tim[v]) {
                    if (node[u] + 1 < node[v]) {
                        node[v] = node[u] + 1;
                        preTime[v] = u;
                        pq.push(make_pair(tim[v], v));
                    }
                }
            }
        }
    }
}

int main() {
    int v1,v2, one_way, length, time;
    cin >> n >> m;
    dis.resize(n);
    tim.resize(n);
    node.resize(n);
    visited.resize(n);
    fill(D[0], D[0] + MAX * MAX, INF);
    fill(T[0], T[0] + MAX * MAX, INF);
    for (int i = 0; i < m; i++) {
        cin >> v1 >> v2 >> one_way >> length >> time;
        D[v1][v2] = length;
        T[v1][v2] = time;
        if (one_way == 0) {
            D[v2][v1] = length;
            T[v2][v1] = time;
        }
    }
    int start, destination;
    cin >> start >> destination;
    dijkstra_dis(start);
    dijkstra_tim(start);


    // dfs(destination, start);
    vector<int> path_dis, path_time; // 记录最佳路径
    int i = start, j = destination;
    while (j != i) {
        path_dis.push_back(j);
        j = preDis[j];
    }
    path_dis.push_back(start); // 加入起点

    i = start, j = destination;
    while (j != i) {
        path_time.push_back(j);
        j = preTime[j];
    }
    path_time.push_back(start);

    if (path_dis == path_time) {
        printf("Distance = %d; Time = %d: ", dis[destination], tim[destination]);
        for (int i = path_dis.size() - 1; i >= 0; i--) {
            printf("%d", path_dis[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");
    } else {
        printf("Distance = %d: ", dis[destination]);

        for (int i = path_dis.size() - 1; i >= 0 ; i--) {
            printf("%d", path_dis[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");

        printf("Time = %d: ", tim[destination]);
        for (int i = path_time.size() - 1; i >= 0 ; i--) {
            printf("%d", path_time[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\n");
    }
}
```
