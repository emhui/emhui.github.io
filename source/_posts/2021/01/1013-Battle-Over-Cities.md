---
title: 1013 Battle Over Cities
date: 2021-01-16 20:32:24
tags: [PAT, 算法, union-find]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/0060lm7Tly1ftg6oh633dj31hc0u0qbh.jpg
---

# 1013 Battle Over Cities

## 题目

![CLjpGz](https://gitee.com/yoyhm/oss/raw/master/uPic/CLjpGz.png)

## 思路

本题意思就是在一个连通图中，删去一个结点，需要添加多少边使得图重新连通起来。

用下图来举例

![5mOVVl](https://gitee.com/yoyhm/oss/raw/master/uPic/5mOVVl.png)

在当前连通图中，若把$3$给删除了，存在4个连通分量。而只需要添加$4-2=2$条线将其重新连通。

![lye84M](https://gitee.com/yoyhm/oss/raw/master/uPic/lye84M.png)

在该图中，把结点$1$删除后，剩下三个连通分量。而只需要添加$3-2=1$条线即可重新连通。

![9nbLnk](https://gitee.com/yoyhm/oss/raw/master/uPic/9nbLnk.png)

因此需要添加的线的数量为**删除该结点后的新的连通图连通分量-2**。

所以我们每次查询的时候，都需要重新建立连通分量。

实现步骤

1. 设置一个`cityMap`对象存储连通的路线。
2. 写一个`UnionFind`类，每次查询重新创建一个该类对象，并且计算连通分量。
3. 当遇到查询点的时候，不将其进行连接。

⚠️

- 城市的编号是$1 \sim N$，所以`UnionFind`的`n`初始值为`n+1`
- 在PAT中，一直有一个`段错误`无法通过,在牛客网中则可以通过。

## 代码

```C++
// 记录输入的值，每次重建并查集,同时计算连通分量，连通分量-2就是需要链接的数量。

#include <cstdio>
#include <vector>
using namespace std;
const int maxn = 1010;

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
    int n, m, k;
    vector<int> cityMap[maxn];
    scanf("%d%d%d", &n, &m, &k);
    for (int i = 0; i < m; i++) {
        int v, w;
        scanf("%d%d", &v, &w); // 输入两条边
        cityMap[i].push_back(v);
        cityMap[i].push_back(w);
    }
    for (int i = 0; i < k; i++) { // 开始查询
        int cityID;
        scanf("%d", &cityID);
        UnionFind uf(n + 1); // 城市编号是1-n，所以需要传入n+1
        for (int j = 0; j < m; j++) { // 每次重建并查集，重新计算连通分量。
            int v = cityMap[j][0], w = cityMap[j][1];
            if (v == cityID || w == cityID) continue;
            if (!uf.connected(v,w)) {uf.quick_union(v,w);}
        }
        int ans = uf.getCount() - 3 > 0 ? uf.getCount() - 3: 0;
        printf("%d\n", ans); // 减去被删除的连通分量，0位置的连通分量，需要修复的一个分量。
    }
}
```

## 其他

本代码在PAT中有一个段错误，把代码复制到牛客网中，有一个用例无法通过。牛客网可以看到该测试用例

```bash
1 0 1
1
```

这里只需要在程序最后加一个判断就可以通过牛客网的用例。

```C++
int ans = uf.getCount() - 3 > 0 ? uf.getCount() - 3: 0;
```

但是PAT中的`段错误`的用例是什么还不知道。。。
