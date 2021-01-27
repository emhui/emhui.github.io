---
title: 1003 Emergency
date: 2021-01-17 19:26:28
tags: [图, PAT, 算法, Dijkstra, 最短距离]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmmknznonj21hc0u01l1.jpg
---

# 1003 Emergency

## 题目

![ugQwkH](https://gitee.com/yoyhm/oss/raw/master/uPic/ugQwkH.png)

## 思路

本题主要是找出**给出一个带有点和边的权值无向图，求出两点之间最短路径的数量和到达最短路径的最大点权值**

本题主要求

- 给定两点之间的**最短距离数量**
- 在满足**最短距离**下的**最大点权值和**

因此设置两个数组分别记录**最短距离数量**，**最大点权值和**

- `path`
- `w`

找最短距离可以使用`Dijkstra`算法，在该算法的优化更新过程中对`path,w`进行优化,代码如下

```C++
for (int v = 0; v < n; v++) { // 开始进行优化u-v和s-v的最短距离。
	if (visited[v] == false && G[u][v] != INF) {
		// 判断最短路径
		if (d[u] + G[u][v] < d[v]) { // 如果存在还要短的路径，进行优化更新
			d[v] = d[u] + G[u][v];
			w[v] = w[u] + pw[v]; // 同时更新该点权值
			path[v] = path[u];// 更新路径数量,不存在多条一样的最短路径
		} else if (d[u] + G[u][v] == d[v]){ // 出现长度相同的路径
			path[v] += path[u];
			if (w[u] + pw[v] > w[v]) { // 若这条路径的点权值大，则进行更新。
				w[v] = w[u] + pw[v];
			}
		}
	}
}
```

## 代码

```C++
#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;

const int maxn = 510;
const int INF = 100000000;

int n, m, c1, c2, G[maxn][maxn];
int d[maxn], pw[maxn], path[maxn], w[maxn]; // d 路径, w 点权重, path 路径数量
bool visited[maxn] = {false};

void Dijkstra(int start) {
    // 1. 查询前的初始化操作
    fill(d, d + maxn, INF); // 初始化所有距离为INF
    memset(path, 0, sizeof(path)); // 初始化所有的路径为0
    memset(w, 0, sizeof(w)); // 初始化点权重为0
    path[start] = 1; // 自己到自己有一个路
    d[start] = 0; // 自己到自己的距离为0
    w[start] = pw[start]; // 默认点的权重是自己
    // 2. 开始找start到各个点的距离
    for (int i = 0; i < n; i++) {
        // 2.1 找到最短距离。
        int u = -1, MIN = INF; // 找到最近的那个点，开始遍历。
        for (int j = 0; j < n; j++) {
            if (visited[j] == false && d[j] < MIN) {
                u = j;
                MIN = d[j];
            }
        }
        if (u == -1) return;
        visited[u] = true; // 访问u
        for (int v = 0; v < n; v++) { // 开始进行优化u-v和s-v的最短距离。
            if (visited[v] == false && G[u][v] != INF) {
                // 判断最短路径
                if (d[u] + G[u][v] < d[v]) { // 如果存在还要短的路径，进行优化更新
                    d[v] = d[u] + G[u][v];
                    w[v] = w[u] + pw[v]; // 同时计算该点权值
                    path[v] = path[u];// 更新路径数量
                } else if (d[u] + G[u][v] == d[v]){ // 出现长度相同的路径
                    path[v] += path[u];
                    if (w[u] + pw[v] > w[v]) { // 若这条路径的点权值大，则进行更新。
                        w[v] = w[u] + pw[v];
                    }
                }
            }
        }
    }
}

int main() {
    scanf("%d%d%d%d", &n, &m, &c1, &c2);
    for (int i = 0; i < n; i++) { // 点权，每个城市的救护车数量
        scanf("%d", &pw[i]);
    }
    int v1, v2, dis;
    fill(G[0], G[0] + maxn * maxn, INF); // fill(首地址，尾地址，填充值);
    for (int i = 0; i < m; i++) { // 连通图
        scanf("%d%d%d", &v1, &v2, &dis);
        G[v1][v2] = dis;
        G[v2][v1] = dis;
    }
    Dijkstra(c1);
    printf("%d %d\n", path[c2], w[c2]);
    return 0;
}
```

## 其他

- `C++`中`memset`和`fill`区别

`memset`在`string.h`头文件中。`memset`只能填充字节，一般填充0或-1.填充其他数不适合。所以在使用初始化`bool`数组的可以使用。

`memset(数组,填充数据0/-1,数组大小)`

```C++
memset(visited, false, sizeof(visited));
```

`fill`在`algorithm`中，它可以填充任何值。使用方法`fill(首地址, 为地址,填充数据)`。

```C++
fill(G[0], G[0] + maxn * maxn, INF); // fill(首地址，尾地址，填充值);
```
