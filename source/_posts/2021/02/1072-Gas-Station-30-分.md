---
title: 1072 Gas Station (30 分)
date: 2021-02-09 14:40:39
tags: [PAT, 最短距离, 优先队列]
categories: [PAT]
---

# 1072 Gas Station (30 分)

## 题目

![p9LJlg](https://gitee.com/yoyhm/oss/raw/master/uPic/p9LJlg.png)

## 分析

求每个汽油站到各个城市的距离。

这一步是关键，使用邻接表存储数据，其中汽油站的结点放到城市的后面。

```C++
int getUid(string s) {
    if (s[0] != 'G') return stoi(s);
	// 汽油站放到 N的后面
    else return N + stoi(s.substr(1));
}
G.resize(N + M + 1); // 1-n , 1-m
dis.resize(N + M + 1); // 这里需要添加到汽油站到汽油站的距离，因为汽油站可以作为中转
visited.resize(N + M + 1);
```


然后对于每个最短距离进行判断,判断规则如下

- 题目要求汽油站离城市最远，因此需要求出距离汽油最短距离的最大的那个路线。
- 若最大路线相同，那么选择到达每个城市的距离只和平均值最小的路线
- 若平均距离也相同，那么就选汽油站ID编号最小的

```C++
// 这里是要寻找离汽油站尽量远的房子
// 所以这里是比较距离最小的房子，如果最小距离都很大，那么房子离得肯定远
if (minDis > ansMinDis) {
	ansDis = totalDis;
	ansGasId = i;
	ansMinDis = minDis;
} else if (minDis == ansMinDis && ansDis > totalDis) {
	ansGasId = i;
	ansDis = totalDis;
} else if (minDis == ansMinDis && ansDis == totalDis && ansGasId > i) {
	ansGasId = i;
}
```

## 代码

```C++
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
#include <queue>
#include <utility>
#include <cmath>
#include <algorithm>
using namespace std;

const int INF = 987654321;

int N, M, K, Ds;

vector<int> dis;
vector<int> visited;
vector<vector<pair<int,int>>> G;

int getUid(string s) {
    if (s[0] != 'G') return stoi(s);
    else return N + stoi(s.substr(1));
}

void Dijkstra(int s) {
    fill(dis.begin(), dis.end(), INF);
    fill(visited.begin(), visited.end(), false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dis[s] = 0;
    pq.push(make_pair(0, s));
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        if (visited[u]) continue;
        visited[u] = true;
        // 开始更新和u相关的边
        for (int i = 0; i < G[u].size(); i++) {
            int v = G[u][i].first, dist = G[u][i].second;
            if (!visited[v] && dis[u] + dist < dis[v]) {
                dis[v] = dis[u] + dist;
                pq.push(make_pair(dis[v], v));
            }
        }
    }

}

int main() {
    string P1, P2;
    int Dist;
    cin >> N >> M >> K >> Ds;
    G.resize(N + M + 1); // 1-n , 1-m
    dis.resize(N + M + 1); // 这里需要添加到汽油站到汽油站的距离，因为汽油站可以作为中转
    visited.resize(N + M + 1);
    int p1Uid, p2Uid;
    for (int i = 0; i < K; i++) {
        cin >> P1 >> P2 >> Dist;
        p1Uid = getUid(P1);
        p2Uid = getUid(P2);
        G[p1Uid].push_back(make_pair(p2Uid, Dist));
        G[p2Uid].push_back(make_pair(p1Uid, Dist));
    }

    // 开始从每个汽油站作为起点，求到每个城市的距离
    double ansDis = -1, ansMinDis = -1;
    int ansGasId = INF;
    bool overRange = false; // 判断该汽车站能否到达所有房子
    for (int i = N + 1; i <= N+M; i++) {
        Dijkstra(i);
        double totalDis = 0;
        int minDis = INF;
        overRange = false; // 判断该汽车站能否到达所有房子
        for (int j = 1; j <= N; j++) {
            if (dis[j] > Ds) {
                overRange = true;
                break;
            }
            minDis = min(minDis, dis[j]);
            totalDis += dis[j];
        }
        if (overRange) continue;
        // 这里是要寻找离汽油站尽量远的房子
        // 所以这里是比较距离最小的房子，如果最小距离都很大，那么房子离得肯定远
        // if (ansDis < totalDis) {
        if (minDis > ansMinDis) {
            ansDis = totalDis;
            ansGasId = i;
            ansMinDis = minDis;
        } else if (minDis == ansMinDis && ansDis > totalDis) {
            ansGasId = i;
            ansDis = totalDis;
        } else if (minDis == ansMinDis && ansDis == totalDis && ansGasId > i) {
            ansGasId = i;
        }
    }
    if (overRange) printf("No Solution\n");
    // round(a*100)/100
    // else printf("G%d\n%.1lf %.1lf\n", ansGasId - N, ansMinDis, round(10 * ansDis / N) / 10);
    else printf("G%d\n%.1lf %.1lf\n", ansGasId - N, ansMinDis, ansDis / N);
}


```
