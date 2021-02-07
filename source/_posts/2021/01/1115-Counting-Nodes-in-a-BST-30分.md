---
title: 1115 Counting Nodes in a BST (30分)
date: 2021-01-30 22:40:40
tags: [PAT, bfs, bst, 二叉搜索树]
categories: [PAT]
---

# 1115 Counting Nodes in a BST (30分)

## 题目

![gY0tAH](https://gitee.com/yoyhm/oss/raw/master/uPic/gY0tAH.png)

## 分析

本题考察

- **二叉搜索树的建立**
- **二叉树的层次遍历**


**二叉搜索树的建立**

下面是二叉搜索树的建立模板

```C++
TreeNode* insert(TreeNode* root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return root;
    }
    if (root->val >= val) { // 移动到左边
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }
    return root;
}
```

在二叉树插入的时候，计算出最大深度。

**使用bfs实现层次遍历**

bfs实现层次遍历的模板

```C++
void bfs(TreeNode* root) {
    queue<TreeNode*> q;
    TreeNode* node;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            node = q.front();
            q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
}

```

在使用`BFS`层次遍历二叉树，找到倒数两层结点的数量。

注意：`n1,n2`需要初始化为`0`。因为当只有一个结点的时候，`n2`为`0`。如果不设置值的话，系统会随机给一个值。


```C++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode{
    int val;
    TreeNode *left, *right;
};

int maxDepth = 0;
TreeNode* insert(TreeNode* root, int val, int depth) {
    if (root == NULL) {
        maxDepth = max(maxDepth,depth);
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return root;
    }
    if (root->val >= val) { // 移动到左边
        root->left = insert(root->left, val, depth + 1);
    } else {
        root->right = insert(root->right, val, depth + 1);
    }
    return root;
}

void bfs(TreeNode* root) {
    queue<TreeNode*> q;
    TreeNode* node;
    q.push(root);
    int depth = 0, n1 = 0, n2 = 0;
    while (!q.empty()) {
        int size = q.size();
        ++depth;
        if (depth == maxDepth) n1 = size;
        if (depth == maxDepth - 1) n2 = size;
        for (int i = 0; i < size; i++) {
            node = q.front();
            q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    printf("%d + %d = %d\n", n1, n2, n1 + n2);
}

int main() {
    int n, val;
    cin >> n;
    TreeNode* root = NULL;
    for (int i = 0; i < n; i++) {
        cin >> val;
        root = insert(root, val, 1);
    }
    bfs(root);
    return 0;
}
```
