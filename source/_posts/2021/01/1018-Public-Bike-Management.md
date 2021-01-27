---
title: 1018 Public Bike Management
date: 2021-01-19 16:44:02
tags: [PAT, 算法, Dijkstra, dfs, 最短路径]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmrtcq1lfj21hc0u0qc1.jpg
---

# 1018 Public Bike Management

## 题目

![fg0RYG](https://gitee.com/yoyhm/oss/raw/master/uPic/fg0RYG.png)

## 思路

本题需要使用`Dijkstra`和`DFS`算法。

- `Dijkstra`: 找到起点到指定点的权值最短的路径。使用`vector<int> pre[max]`来记录该位置。
- `DFS`: 计算最短路径花费的

为了便于编写代码,不妨把每个点的点权(自行车数目)都减去Cmax /2,这样就可以用点权的正负来直接判断当前车站是需要补给还是需要带走额外的车辆。由于需要输出应从PBMC携带的自行车数目与从问题车站带回的自行车数目,因此对每个顶点来说需要增加两个属性:从PBMC到当前车站必须携带的自行车数目Need以及到达当前车站时手上多余的自行车数目Remain。显然,如果当前车站u的点权weightu为正,说明需要从该车站额外带走自行车,因此新的Remain等于旧的Remain加上weight[j;而如果当前车站u的点权weight[u]为负,说明当前车站需要补给自行车的数量为abs(weightu),此时如果Remain大于0,就可以用来补给当前车站,但如果Remain不够完全补给,剩余部分需要从PBMC携带,故Need增加这个数值。代码如下:

```C++
int need = 0, remain = 0;

for (int i = tempPath.size() - 1; i >= 0; i--)
{
	int id = tempPath[i];
	if (weight[id] > 0)
	{
		remain += weight[id];
	} else {
		if (remain > abs(weight[id])) {
			remain -= abs(weight[id]);
		} else {
			need += abs(weight[id]) - remain;
			remain = 0;
		}
	}
}
if (minNeed > need)
{
	minNeed = need;
	minRemain = remain;
	path = tempPath;
} else if (minNeed == need && minRemain > remain)
{
	minRemain = remain;
	path = tempPath;
}
```

显然,本题可以使用Djkstra + DFS的写法求解。具体做法是,先使用Dijkstra求出所有最短路径,然后用DFS从这些最短路径中选出need最小的(need相同时选remain 小)最路径的效E可以在Dijikstra部分顺便求出,也可以在DFS中边界条件处进行累计。
注意点

## 代码

```C++
// 1. 使用Dijkstra算法求得最短路径条数
// 2. 然后对最短路径条数使用DFS遍历获取need最小的值
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
const int MAX = 510;
const int INF = 987654321;
int n, m, sp, cmax;
int G[MAX][MAX], dis[MAX], weight[MAX];
bool visited[MAX] = {false};
vector<int> tempPath, path;
vector<int> pre[MAX]; // 存储开始结点到该结点的最短路径中，前一个结点。
int minNeed = INF, minRemain = INF;

void Dijkstra(int s) {
    fill(dis, dis + MAX, INF);
    dis[s] = 0; // 自己到自己的距离为0
    // visited[root] = true; // 访问自己
    for (int i = 0; i < n; i++) { // 开始依次找到最短距离. == n
        int u = -1, minDis = INF; // 找到最近的，且没有被访问的点
        for (int j = 0; j <= n; j++) {
            if (!visited[j] && minDis > dis[j]) {
                u = j;
                minDis = dis[j];
            }
        }
        if (u == -1) return; // 没有找到
        visited[u] = true; // 找到了，访问该结点。同时开始更新
        for (int v = 0; v <= n; v++) {
            if (!visited[v] && G[u][v] != INF) { // uv是可以访问
                if (dis[u] + G[u][v] < dis[v]) {
                    dis[v] = dis[u] + G[u][v];
                    pre[v].clear();
                    pre[v].push_back(u); // 存储的每个路径的最短的上一个结点
                } else if (dis[u] + G[u][v] == dis[v]) {
                    pre[v].push_back(u); // 存在多个最短路径的上一个结点
                }
            };
        }
    }
}

void dfs(int v) {
    if (v == 0) { // 找到了边界
        tempPath.push_back(v);
        int need = 0, remain = 0;

        for (int i = tempPath.size() - 1; i >= 0; i--)
        {
            int id = tempPath[i];
            if (weight[id] > 0)
            {
                remain += weight[id];
            } else {
                if (remain > abs(weight[id])) {
                    remain -= abs(weight[id]);
                } else {
                    need += abs(weight[id]) - remain;
                    remain = 0;
                }
            }
        }
        if (minNeed > need)
        {
            minNeed = need;
            minRemain = remain;
            path = tempPath;
        } else if (minNeed == need && minRemain > remain)
        {
            minRemain = remain;
            path = tempPath;
        }
        tempPath.pop_back();
        return;
    }
    tempPath.push_back(v); // 存储路径
    for (int i = 0; i < pre[v].size(); i++)
    {
        dfs(pre[v][i]);
    }

    tempPath.pop_back();
}

int main() {
    scanf("%d%d%d%d", &cmax, &n, &sp, &m);
    for (int i = 1; i <= n; i++) { // i从1开始
        scanf("%d", &weight[i]);
        weight[i] -= cmax / 2;
    }
    fill(G[0], G[0] + MAX * MAX, INF);
    int u, v;
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &u, &v);
        scanf("%d", &G[u][v]);
        G[v][u] = G[u][v];
    }
    Dijkstra(0);
    dfs(sp);
    printf("%d ", minNeed);
    for (int i = path.size() - 1; i >= 0; i--) {
        printf("%d", path[i]);
        if (i > 0) printf("->");
    }
    printf(" %d\n", minRemain);
    return 0;
}
```
