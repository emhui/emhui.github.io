---
title: 1090 Highest Price in Supply Chain
date: 2021-01-15 22:52:51
tags: [PAT, 算法, 树, bfs]
categories: [PAT]
math: true
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmrxi7a77j21hc0u0aj7.jpg
---

# 1090 Highest Price in Supply Chain

## 题目

![题目](https://gitee.com/yoyhm/oss/raw/master/uPic/l1FlAd.png)

## 思路

给出一个供应链网络，其中有三类成员

- retailers
- distributors
- suppliers

输入分析

首先输入三个参数

- $N$: 供应网络上成员的数量，成员的ID范围 $0 \sim N - 1$
- $P$: 顶级（根）供应商的每件货物的价格
- $r$: 每一级传下来增加的价格百分比。

接下来是$N$个输入。每个输入假设叫做`S_i`。`S_i`别是的是第$i$个成员的供应商是谁。

输出分析

输出到零售商最高的价值和拥有最高价格的零售商的数量。

根据上面分析。转化为树的题目，即**求一棵树最大深度的叶子结点数量和最大深度**。

~~考虑使用静态二叉树，其结构如下,因为不需要存储数据，只需要存储子结点即可~~。

本题可以直接使用`vector`数组来表示一个静态二叉树，索引表示该父结点`id`,索引內的数组表示子结点的`id`,结构如下。(代码部分暂时使用原来的静态二叉树，不做改动。)

```C++
/**
const int maxn = 100010;
struct TreeNode{
    vector<int> children;
}treenode[maxn];
**/
vector<int> treenode[maxn];
```

然后在输入数据的时候构建一个树，将输入的`id`作为树的索引，而当前索引`i`则是树`id`的子结点。

⚠️ 当`id=-1`是需要记录一下根结点。

```C++
for (int i = 0; i < n; i++) {
	scanf("%d", &id);
	if (id != -1) {treenode[id].children.push_back(i);}
	else {root = i;} // 根结点
}
```

最后使用`BFS`对每一层进行遍历。其中每一层的数量正好是栈的数量`q.size()`。所以只需要在每一层不断更新`highestPrice,maxNum`两个变量即可。

## 代码

```C++
// 最后一层有多少个叶子结点。然后计算出它的最高价格
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
using namespace std;
const int maxn = 100010;
struct TreeNode{
    vector<int> children;
}treenode[maxn];

int n; // n个供应商，id供应商id，根供应商
double P, r;

void bfs(int root) {
    int depth = 0, maxNum = 0;
    double highestPrice = 0;
    queue<int> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        maxNum = size;
        highestPrice = 0;
        for (int i = 0; i < size; i++) {
            int node = q.front(); q.pop();
            for (int j = 0; j < treenode[node].children.size(); j++) {
                q.push(treenode[node].children[j]);
            }
        }
        highestPrice = P * pow(1+r, depth++);
    }
    printf("%.2lf %d\n", highestPrice, maxNum);
}

int main() {
    int id, root;
    scanf("%d%lf%lf", &n, &P, &r);
    r /= 100;
    for (int i = 0; i < n; i++) {
        scanf("%d", &id);
        if (id != -1) {treenode[id].children.push_back(i);}
        else {root = i;} // 根结点
    }
    bfs(root);
    return 0;
}
```
