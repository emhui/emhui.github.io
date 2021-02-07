---
title: 1118 Birds in Forest (25分)
date: 2021-01-30 22:36:18
tags: [PAT, union-find]
categories: [PAT]
---

# 1118 Birds in Forest (25分)

## 题目

![xt9y1C](https://gitee.com/yoyhm/oss/raw/master/uPic/xt9y1C.png)

## 分析

题目要求**存在多少连通图，以及存在多少个结点，判断两个点是否连通**

**存在多少个结点**

题目中说鸟的编号是连续的，因此输入鸟的id中，最大值的就是该图存在的结点总数。

知道存在多少结点后，只需要使用并查集建立连通图求出连通分量，判断两点是否连通即可。

## 代码

```C++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
const int MAX = 10000;
vector<int> pics[MAX];
int numBird = 0;

class UnionFind{
    private:
    vector<int> parent;
    int setCount;
    public:
    UnionFind(int n) {
        for(int i = 0; i < n; i++) parent.push_back(i);
        setCount = n;
    }
    int find(int n) {
        if (n != parent[n]) parent[n] = find(parent[n]);
        return parent[n];
    }
    void unite(int u, int v) {
        int uRoot = find(u), vRoot = find(v);
        if (uRoot == vRoot) return;
        parent[uRoot] = vRoot;
        setCount--;
    }
    bool isConnected(int u, int v) {return find(u) == find(v);}
    int getCount() {return setCount;}
};

int main() {
    int n, q, id, num;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> num;
        for (int j = 0; j < num; j++) {
            cin >> id;
            numBird = max(numBird, id); // 获取最大的结点数量
            pics[i].push_back(id);
        }
    }
    UnionFind uf(numBird + 1);
    for (int i = 0; i < n; i++) {
        int pre = pics[i][0];
        for (int j = 1; j < pics[i].size(); j++) {
            int now = pics[i][j];
            if (!uf.isConnected(pre, now)) {
                uf.unite(pre, now);
            }
        }
    }
    printf("%d %d\n", uf.getCount() - 1, numBird);
    cin >> q;
    int u, v;
    while (q--) {
        cin >> u >> v;
        if (uf.isConnected(u, v)) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```
