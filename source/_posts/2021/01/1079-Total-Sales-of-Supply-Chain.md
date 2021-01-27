---
title: 1079 Total Sales of Supply Chain
date: 2021-01-15 21:48:15
tags: [PAT, 算法, 树, bfs, dfs]
categories: [PAT]
math: true
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmrpt6l5pj21hc0u011e.jpg
---

# 1079 Total Sales of Supply Chain

## 题目

![题目](https://gitee.com/yoyhm/oss/raw/master/uPic/vlJ1r4.png)

## 思路

先分析题目想表达什么意思。

一个供应链网络有三类角色

- retailers
- distributors
- suppliers

输入分析

首先输入三个参数

- $N$: 供应网络上成员的数量，成员的ID范围 $0 \sim N - 1$
- $P$: 顶级（根）供应商的每件货物的价格
- $r$: 每一级传下来增加的价格百分比。

接下来是$N$个输入。

$K_i \quad ID[1] \quad ID[2] ... ID[K_i]$

- $i$表示第$i$个供应商。
- $K_i$表示第$i$个供应商供应成员的数量。
- $ID$，则是成员的$ID$。
- ⭐️其中$K_i = 0$表示的是$ID=i$的成员是零售商，然后后面那个数则表示该零售商进货的数量。

根据题目中的输入，可以得到下面这个树形图。

![l7lba9](https://gitee.com/yoyhm/oss/raw/master/uPic/l7lba9.png)

因此题目要求的就是到零售商这一级的总销售额。

$$
1.8*((7+9)*(1+0.01)^2 + (4+3)*(1+0.01)^3)=42.4
$$

根据上面分析。这里使用静态二叉树。我们需要将数据分成两种

- 非叶子结点。$K_i!=0$的结点。该结点需要存储**供应链的下一级(子结点)**
- 叶子结点。$K_i=0$的结点。该结点需要存储**进货量**。

然后使用`BFS,DFS`求出叶子结点深度。在计算结果即可。

## 代码

C++

> bfs和dfs方法两者都写了，把注释取消即可。

```C++
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
using namespace std;
const int maxn = 100010;

struct TreeNode{
    int val;
    vector<int> children;
}treenode[maxn];

void dfs(int idx, int depth, double r, double& ans) {
    if (treenode[idx].children.size() == 0) {
        ans += treenode[idx].val * pow(1 + r, depth);
        return;
    }
    for (int i = 0; i < treenode[idx].children.size(); i++) {
        dfs(treenode[idx].children[i], depth + 1, r, ans);
    }
}

void bfs(int idx, int depth, double r, double& ans) {
    queue<int> q;
    q.push(0);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
             int node = q.front();
            q.pop();
            if (treenode[node].children.size() == 0) {
                ans += treenode[node].val * pow(1 + r, depth);
            } else {
                for (int i = 0; i < treenode[node].children.size(); i++) {
                    q.push(treenode[node].children[i]);
                }
            }
        }
        depth++;
    }
}

int main() {
    int n;
    double P, r;
    scanf("%d%lf%lf", &n, &P, &r);
    int val, k;
    r /= 100;
    for (int i = 0; i < n; i++) {
        scanf("%d", &k);
        if (k == 0) { // k = 0证明是叶子结点
            scanf("%d", &treenode[i].val);
        } else {
            for (int j = 0; j < k; j++) {
                scanf("%d", &val);
                treenode[i].children.push_back(val);
            }
        }
    }

    double ans = 0;
    // dfs(0,0,r,ans);
    bfs(0,0,r,ans);

    printf("%.1lf\n", P * ans);
    return 0;
}
```

