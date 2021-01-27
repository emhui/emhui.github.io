---
title: 1053 Path of Equal Weight
date: 2021-01-16 17:13:42
tags: [PAT, 算法, 树, dfs]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmrz8e3ytj21hc0u0wnn.jpg
---

# 1053 Path of Equal Weight

## 题目

![mR0f9v](https://gitee.com/yoyhm/oss/raw/master/uPic/mR0f9v.png)

## 思路

{% note success %}
重点：多条路径的时候如何以递减方式输出。
{% endnote %}

本题不是很难，目标是**输出根到叶子路径权值和为给值的的路径**。

难点是输出的时候如何路径按照权值大小以递减方式进行输出。在给定子结点后，可以对子结点根据权重从大到小进行排序。然后遍历的时候自然也是结点自然也是从大到小遍历，可以直接输出路径。

根结点到叶子路径如何实现。方法有很多，这里使用`vector`模拟一个**栈**，因为`C++`的`stack`无法进行遍历输出。所以采用`vector`的`push_back` `pop_back`模拟一个栈。

## 代码

```C++
#include <cstdio>
#include <algorithm>
#include <vector>
using namespace std;

const int maxn = 101;
struct TreeNode {
    int weight;
    vector<int> children;
}treenode[maxn];

bool cmp(int a, int b) {
    return treenode[a].weight > treenode[b].weight;
}

vector<int> path; // 使用vector模拟栈，因为等会需要遍历输出路径。stack无法实现遍历输出

void dfs(int root, int w, int s, vector<int> path) {
    path.push_back(root);
    w += treenode[root].weight;
    if (treenode[root].children.size() == 0 && w == s) { // 找到一条路径,输出该路径
        for (int i = 0; i < path.size(); i++) {
            printf("%d", treenode[path[i]].weight);
            if (i < path.size() - 1) printf(" ");
        }
        printf("\n");
        return;
    }
    // 遍历子结点
    for (int i = 0; i < treenode[root].children.size(); i++) {
        dfs(treenode[root].children[i], w, s, path);
    }
    path.pop_back();
}

int main() {
    int n, m, s, w, parent, child, k;
    scanf("%d%d%d", &n, &m, &s);
    for (int i = 0; i < n; i++) { // 设置权重
        scanf("%d", &w);
        treenode[i].weight = w;
    }
    for (int i = 0; i < m; i++) { // 设置子结点
        scanf("%d%d", &parent, &k);
        for (int j = 0; j < k; j++) {
            scanf("%d", &child);
            treenode[parent].children.push_back(child);
        }
        // 按权重开始排序，等会直接可以输出
        sort(treenode[parent].children.begin(), treenode[parent].children.end(), cmp);
    }
    dfs(0,0,s,path);
    return 0;
}
```
