---
title: 1087 All Roads Lead to Rome
date: 2021-01-20 10:46:16
tags: [PAT, 算法, 最短路径, Dijkstra, dfs]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6onkf2aj318g0p0wmo.jpg
---

# 1087 All Roads Lead to Rome

## 题目

## 思路

本题和[1018 Public Bike Management](https://emhui.fun/2021/01/19/1018-Public-Bike-Management/)思路基本一致。通过`Dijkstra`+`DFS`结合。

- `Dijkstra`: 计算出起点到目标点的所有最短路径，使用`pre`存储。

```C++
void Dijkstra(int s) {
    fill(dis, dis + MAX, INF);
    dis[s] = 0;
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
        for (int v = 0; v < n; v++) { // 优化u-v
            if (!visited[v] && G[u][v] != INF) {
                if (dis[u] + G[u][v] < dis[v]) {
                    dis[v] = dis[u] + G[u][v];
                    pre[v].clear();
                    pre[v].push_back(u);
                } else if (dis[u] + G[u][v] == dis[v]) {
                    pre[v].push_back(u);
                }
            }
        }
    }
}
```

- `DFS`: 使用`dfs`对`pre`进行遍历，该操作是逆序的，从目标到起点。所以临界条件是到达起点。然后计算出最大幸福值，平均幸福值等。

```C++
void DFS(int v) { // 从终点去开始找起点
    if (v == city2id[startCity]) { // 临界条件
        leastNum++;
        tempPath.push_back(v);
        int size = tempPath.size();
        int maxHappy = 0;
        double avgHappy = 0;
        for (int i = 0; i < size; i++) // startcity的happy是0，因为path是倒序，所以最后一个是起点
        {
            maxHappy += happines[tempPath[i]];
        }
        avgHappy = 1.0 * maxHappy / (size - 1);
        if (maxHappy > ansHappy) {
            ansHappy = maxHappy;
            ansAvgHappy = avgHappy;
            path = tempPath;
        } else if (maxHappy == ansHappy && ansAvgHappy < avgHappy) {
            ansAvgHappy = avgHappy;
            path = tempPath;
        }
        tempPath.pop_back();
        return;
    }
    tempPath.push_back(v);
    for (int i = 0; i < pre[v].size(); i++) {
        DFS(pre[v][i]);
    }
    tempPath.pop_back();
}
```

⚠️

- 本题需要注意将`城市名`和`ID`建立映射，这里使用两个`map`.
- 存储最短路径的路线`pre`是倒序输出。最后答案也要倒序输出
- 起始点没有幸福值，因此在计算平均幸福值的时候，经过的城市数量应该-1.

## 代码

```C++
#include <cstdio>
#include <vector>
#include <map>
#include <algorithm>
#include <string>
#include <iostream>
using namespace std;

// 分析
// Dijkstra 求出最短路径的条数
// 再使用DFS求出最大的happines和avehappines

const int MAX = 210;
const int INF = 987654321;

int G[MAX][MAX], dis[MAX], happines[MAX];
map<string, int> city2id;
map<int, string> id2city;
int numCity = 0;
bool visited[MAX] = {false};
int n, k;
string startCity;
vector<int> tempPath, path;
vector<int> pre[MAX];
int ansHappy = -1, leastNum = 0;
double ansAvgHappy = -1;

void Dijkstra(int s) {
    fill(dis, dis + MAX, INF);
    dis[s] = 0;
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
        for (int v = 0; v < n; v++) { // 优化u-v
            if (!visited[v] && G[u][v] != INF) {
                if (dis[u] + G[u][v] < dis[v]) {
                    dis[v] = dis[u] + G[u][v];
                    pre[v].clear();
                    pre[v].push_back(u);
                } else if (dis[u] + G[u][v] == dis[v]) {
                    pre[v].push_back(u);
                }
            }
        }
    }
}

void DFS(int v) { // 从终点去开始找起点
    if (v == city2id[startCity]) { // 临界条件
        leastNum++;
        tempPath.push_back(v);
        int size = tempPath.size();
        int maxHappy = 0;
        double avgHappy = 0;
        for (int i = 0; i < size; i++) // startcity的happy是0，因为path是倒序，所以最后一个是起点
        {
            maxHappy += happines[tempPath[i]];
        }
        avgHappy = 1.0 * maxHappy / (size - 1);
        if (maxHappy > ansHappy) {
            ansHappy = maxHappy;
            ansAvgHappy = avgHappy;
            path = tempPath;
        } else if (maxHappy == ansHappy && ansAvgHappy < avgHappy) {
            ansAvgHappy = avgHappy;
            path = tempPath;
        }
        tempPath.pop_back();
        return;
    }
    tempPath.push_back(v);
    for (int i = 0; i < pre[v].size(); i++) {
        DFS(pre[v][i]);
    }
    tempPath.pop_back();
}

int main(){
    cin >> n >> k >> startCity;
    happines[0] = 0;
    city2id[startCity] = 0;
    id2city[0] = startCity;
    string city;
    int happy;
    for (int i = 1; i < n; i++) { // 输入n-1个城市和它的幸福值
        cin >> city >> happy;
        happines[i] = happy;
        city2id[city] = i;
        id2city[i] = city;
    }
    string city1, city2;
    int cost;
    fill(G[0], G[0] + MAX*MAX, INF);
    for (int i = 0; i < k; i++) {
        cin >> city1 >> city2 >> cost;
        G[city2id[city1]][city2id[city2]] = G[city2id[city2]][city2id[city1]] = cost;
    }
    Dijkstra(city2id[startCity]);
    // for (int i = 0; i < n; i++) { cout << dis[i] << " ";}
    DFS(city2id["ROM"]);
    cout << leastNum << " " << dis[city2id["ROM"]] << " " << ansHappy << " " << (int)ansAvgHappy << endl;
    for (int i = path.size() - 1; i >= 0; i--) {
        cout << id2city[path[i]];
        if (i > 0) cout << "->";
    }
    printf("\n");
    return 0;
}

```
