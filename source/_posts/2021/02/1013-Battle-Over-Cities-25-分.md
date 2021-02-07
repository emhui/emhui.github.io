---
title: 1013 Battle Over Cities (25 分)
date: 2021-02-04 11:05:31
tags: [PAT, 并查集, 算法, union-find]
categories: [PAT]
---

# 1013 Battle Over Cities (25 分)

## 题目

![NKatyr](https://gitee.com/yoyhm/oss/raw/master/uPic/NKatyr.png)

## 分析

本题考察 **去除某个结点后连通分量个数**。

先使用一个`vector<int, int> edges`记录所有的边。然后在查询中，绕过查询的结点，计算剩下结点的连通分量。连通分量使用并查集来求比较方便。

注意: 求到的连通分量需要-2

- 去除被敌人占据的结点
- n个连通分量需要n-1条边才能连通。


```C++
// 记录输入的值，每次重建并查集,同时计算连通分量，连通分量-2就是需要链接的数量。

#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int setCount;
vector<int> parent;
int n, m, k; // 题目给出

int find(int x) {
    if (x != parent[x]) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void merge(int u, int v) {
    u = find(u), v = find(v);
    if (u == v) return;
    parent[u] = v;
    setCount--;
}

void init() {
    setCount = n;
    for (int i = 0; i < n + 1; i++) parent[i] = i;
}

int main() {
    int u, v; // 待输入
    cin >> n >> m >> k;
    vector<pair<int,int>> edges;
    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        edges.push_back(make_pair(u,v));
    }
    // 处理父亲结点
    parent.resize(n + 1);

    int query;
    while (k--) {
        cin >> query;
        init();
        for (int i = 0; i < m; i++) {
            u = edges[i].first, v = edges[i].second;
            if (u == query || v == query) continue;
            if (find(u) != find(v)) {
                merge(u, v);
            }
        }
        // 求到的连通分量需要-2，去除被敌人占据的+n个连通分量需要n-1条边才能连通。
        printf("%d\n", setCount - 2);
    }
}
```
