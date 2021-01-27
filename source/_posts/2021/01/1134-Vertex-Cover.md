---
title: 1134 Vertex Cover
date: 2021-01-27 10:30:35
tags: [PAT, 算法, 图]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmr3hgu9hj21hc0xcb2b.jpg
---

# 1134 Vertex Cover (25分)

## 题目

![ZLQp2s](https://gitee.com/yoyhm/oss/raw/master/uPic/ZLQp2s.png)

## 分析

题目意思

**vertex cover**是一个顶点集合，并且图中的每条边都和顶点集中的至少一个顶点关联。

现在给出一个图，和几组顶点集合，判断这几组顶点集合是否是**vertex cover**

思路

1. 使用一个`map<pair<int, int>, bool> edges`存储每组边，其中将顶点作为`key`。在初始化的时候，设置`edges[{u,v}] = false`，注意`u<v`.
2. 使用邻接表存储图.
3. 对于给定的顶点集，设置一个`visited = edges`变量，判断是否每条边都被访问过，遍历邻接表，将每个个顶点能访问的边都设置为`visited[{u, v}] = true`.（注意需要满足`u<v`）
4. 最后判断是否所有边都被访问了，若都被访问了则证明是**vertex cover**

下图是题目示例中给定的邻接图

![5Swo66](https://gitee.com/yoyhm/oss/raw/master/uPic/5Swo66.png)



## 代码

```C++
// 题目要求一个点的集合，能够访问到所有的边
// 目前如何判断该边访问过。可是使用 pair来实现
#include <vector>
#include <utility>
#include <iostream>
#include <map>
#include <algorithm>
using namespace std;

const int MAX = 10001;

vector<int> G[MAX]; // 邻接表

int main() {
    int n, m, k, u, v, cnt;
    cin >> n >> m;
    map<pair<int, int>, bool> edges; // 使用 unorder_map 无法使用
    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        if (u > v) swap(u, v); // 小的在前面
        edges[make_pair(u, v)] = false;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    cin >> k;
    while (k--) {
        cin >> cnt;
        map<pair<int, int>, bool> visited = edges;
        for (int i = 0; i < cnt; i++) {
            cin >> u;
            for (int v: G[u]) {
                int i = u, j = v;
                if (i > j) swap(i, j);
                visited[make_pair(i, j)] = true;
                // cout << i << " " << j << endl;
            }
        }
        bool flag = true;
        for (auto& it: visited) {
            // cout << it.second << endl;
            if (it.second == false) {
                flag = false;
                break;
            }
        }
        if (flag) printf("Yes\n");
        else printf("No\n");
    }
}
```

## 其他

为什么不用`unordered_map`，而是用`map`?

- `unordered_map`在这里不适用，因为`unordered_map`是哈希表，无法存储`pair`类型。
