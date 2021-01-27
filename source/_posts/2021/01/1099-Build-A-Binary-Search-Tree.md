---
title: 1099 Build A Binary Search Tree
date: 2021-01-20 15:25:37
tags: [PAT, 算法, 二叉查找树， bst]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmrrnjpf4j21hc0u0dot.jpg
---

# 1099 Build A Binary Search Tree

## 题目

![XBryb4](https://gitee.com/yoyhm/oss/raw/master/uPic/XBryb4.png)

## 内容

{% note warning %}
二叉查找树的重要性质之一：中序遍历是一个递增序列。
{% endnote %}

本题目标是**给定一个二叉搜索树的结构，然后在给出一组序列。根据二叉查找树的性质，将该组序列填充到给定的二叉树中。**

本题和[1064 Complete Binary Search Tree](https://emhui.fun/2021/01/20/1064-Complete-Binary-Search-Tree/)类似，也是去填充一个空白的二叉树。因此可以考虑将给定序列进行排序，然后对二叉树进行中序遍历，把排序好的序列依次填充进去。

## 代码
```C++
#include <cstdio>
#include <algorithm>
#include <queue>
#include <vector>
using namespace std;
// 思路，使用静态二叉树先构建二叉树。
// 对输入序列排序
// 对构建好的二叉树进行中序遍历，把排好序的序列赋值
// 最后使用BFS进行层次遍历
const int MAX = 101;
struct TreeNode{
    int val;
    int left, right;
}treenode[MAX];

int arr[MAX], num = 0;
vector<int> ans;

void dfs(int node) {
    if (node == -1) {
        return;
    }
    dfs(treenode[node].left);
    treenode[node].val = arr[num++];
    dfs(treenode[node].right);
}

void bfs(int node) {
    queue<int> q;
    q.push(node);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int node = q.front();
            q.pop();
            ans.push_back(node);
            if (treenode[node].left != -1) q.push(treenode[node].left);
            if (treenode[node].right != -1) q.push(treenode[node].right);
        }
    }
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &treenode[i].left, &treenode[i].right);
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    sort(arr, arr + n);
    dfs(0);
    bfs(0);
    for (int i = 0; i < n; i++) {
        printf("%d", treenode[ans[i]].val);
        if (i < n - 1) printf(" ");
    }
    printf("\n");
    return 0;
}
```
