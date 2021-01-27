---
title: 1021 Deepest Root
date: 2021-01-17 12:06:01
tags: [PAT, 图, 树, dfs, union-find, 算法]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmmmr8twvj21hc0u0x6q.jpg
---

# 1021 Deepest Root

## 题目

![8yP8rz](https://gitee.com/yoyhm/oss/raw/master/uPic/8yP8rz.png)

## 思路

本题主要是求**一个图转化为树，从图中每个顶点出发到根结点的最大深度。若图存在多个连通分量，则直接输出连通分量个数。若存在多个最大深度相同的根结点，则升序输出这些根结点**。

步骤

1. 在输入的使用使用并查集,输入完成后就可以统计连通分量个个数。若连通分量个数大于1直接输出。
2. 若整个图是连通的，则使用`BFS`将每个结点做根结点进行遍历。用一个数组`ans[maxn]`统计每个结点作为根结点时候的最大深度。再使用`maxHight`变量设置为整个图的最大深度。
3. 最后使用遍历`ans[maxn]`便可以按升序输出最大深度的根结点。

## 代码

```C++
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;
const int maxn = 10010;
vector<int> graphic[maxn];
bool visited[maxn] = {false};
int ans[maxn] = {0}; // 记录每个结点的连通分量
int highest = -1;

void dfs(int root, int depth) {
    visited[root] = true;
    highest = highest > depth ? highest: depth;
    for (int i = 0; i < graphic[root].size(); i++) {
        if (visited[graphic[root][i]] == false) {
            dfs(graphic[root][i], depth + 1);
        }
    }
}

void initVisited(int n) {
    for (int i = 1; i <= n; i++) {
        visited[i] = false;
    }
}

// 判断是否有多个连通分量。这个函数无法统计连通分量，只能判断连通分量是否超过一个
int countConnected(int n)
{
    int count = 1;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            count++;
            break;
        }
    }
    return count;
}

class UnionFind {
    private:
    int count;
    vector<int> parent;
    vector<int> sz;
    public:
    UnionFind(int n) {
        count = n;
        for (int i = 0; i < n; i++) {
            parent.push_back(i);
            sz.push_back(1);
        }
    }

    int find(int x) {
        if (x != parent[x]) { // 路径压缩
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    void quick_union(int v, int w) {
        int vR = find(v), wR = find(w);
        if (vR == wR ) return;
        if (sz[vR] > sz[wR]) {
            parent[wR] = vR;
            sz[vR] += sz[wR];
        } else {
            parent[vR] = wR;
            sz[wR] += sz[vR];
        }
        count--;
    }
    int getCount() {
        return count;
    }
    bool connected(int v, int w){
        return find(v) == find(w);
    }
};

int main() {
    int n, v, w;
    scanf("%d", &n);
    UnionFind uf(n+1); // id是1~n
    for (int i = 0; i < n - 1; i++) { // n-1条边
        scanf("%d%d", &v, &w);
        graphic[v].push_back(w);
        graphic[w].push_back(v);
        uf.quick_union(v,w);
    }
    if (uf.getCount() > 2) {
        printf("Error: %d components\n", uf.getCount() - 1);
    } else {
        int count = 0, maxHight = -1; // 开始对每个点进行遍历，并且记录每个点的最大深度。
        for (int i = 1; i <= n; i++) {
            initVisited(n);
            highest = -1;
            dfs(i, 0);
            ans[i] = highest;
            maxHight = maxHight > highest ? maxHight : highest;
            count = countConnected(n);
            if (count > 1) {break;}
        }

        for (int i = 1; i <= n; i++){
            if (maxHight == ans[i]) {printf("%d\n", i);};
        } 
    }
}
```
