---
title: 1126 Eulerian Path
date: 2021-01-28 17:57:27
tags: [PAT, 欧拉图, 算法, 图, union-find]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmro0m82gj21hc0u0do7.jpg
---

# 1126 Eulerian Path (25分)


## 题目

![tBt70U](https://gitee.com/yoyhm/oss/raw/master/uPic/tBt70U.png)

## 分析

**题目要求**

~~给定一个图~~

~~1. 以顶点索引，以为升序方式输出按每个顶点的度。~~

~~2. 判断该图是否是以下三种类型的图~~

~~- Eulerian: 从起点出发，一条路径可以遍历每条边，则**每条边访问1次**，并最终回到起点~~
~~- semi-Eulerian:从起点出发，一条路径可以遍历每条边，则每条边访问1次，但是无法回到起点。~~
~~- non-Eulerian: 不存在连通所有顶点的路径。~~

**分析**

> ~~转化成连通图问题，若n个顶点，没有连通，则是`non`,若n个顶点，连通，且边的个数为n-1。那么就是`semi-eulerian`如何判断每条边被访问过一次呢~~

分析个🔨，😠

题目都没看明白。其实本题很简单，重点是下面这句话

> It has been proven that connected graphs with all vertices of even degree have an Eulerian circuit, and such graphs are called Eulerian. If there are exactly two vertices of odd degree, all Eulerian paths start at one of them and end at the other. A graph that has an Eulerian path but not an Eulerian circuit is called semi-Eulerian.

翻译过来就是

- 所有顶点的度为偶数就是`Eulerian`
- 仅有两个顶点的度为奇数，其他度为偶数就是`semi-Eulerian`
- 其他条件下就是`non-Eulerian`

还有一个前提，就是判断该图是否连通所有顶点，若没有连通，则也属于`non-Eulerian`。判断是否全部连通，可以使用并查集来实现。

## 代码

```C++
// 如果一个连通图的所有结点的度都是偶数，那么它就是Eulerian
// 如果除了两个结点的度是奇数其他都是偶数，那么它就是Semi-Eulerian
// 否则就是Non-Eulerian
#include <iostream>
#include <vector>
using namespace std;

class UnionFind{
    private:
    vector<int> parent;
    int cnt; // 连通分量
    public:
    UnionFind(int n) {
        for (int i = 0; i < n; i++) {parent.push_back(i);}
        cnt = n;
    }
    int find(int n) {
        if (n != parent[n]) {
            parent[n] = find(parent[n]);
        }
        return parent[n];
    }
    void merge(int u, int v) {
        int uRoot = find(u), vRoot = find(v);
        if (uRoot == vRoot) return;
        parent[uRoot] = vRoot;
        cnt--;
    }
    int getCount() {
        return cnt;
    }
    bool isConnected(int u, int v) {
        return find(u) == find(v);
    }
};

int main() {
    int n, m, u, v;
    cin >> n >> m;
    vector<int> inDegree(n + 1);
    UnionFind uf(n + 1);
    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        inDegree[u]++;
        inDegree[v]++;
        if (!uf.isConnected(u, v)) {
            uf.merge(u, v);
        }
    }
    int cnt = 0; // 入度为奇数的个数。
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] & 1) {cnt++;}
        printf("%d", inDegree[i]);
        if (i < n) printf(" ");
    }
    printf("\n");
    if (uf.getCount() - 1 > 1) { // 所有点没有连通肯定是Non
        printf("Non-Eulerian\n");
    } else if (cnt == 0) {
        printf("Eulerian\n");
    } else if (cnt == 2) {
        printf("Semi-Eulerian\n");
    } else {
        printf("Non-Eulerian\n");
    }
    return 0;
}
```
