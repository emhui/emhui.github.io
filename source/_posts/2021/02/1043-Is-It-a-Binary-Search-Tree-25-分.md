---
title: 1043 Is It a Binary Search Tree (25 分)
date: 2021-02-05 20:38:40
tags: [PAT, 二叉搜索树, bst]
categories: [PAT]
---

# 1043 Is It a Binary Search Tree (25 分)

## 题目

![ivcz6j](https://gitee.com/yoyhm/oss/raw/master/uPic/ivcz6j.png)

## 分析

本题考查**二叉搜索树的建立**

判断给出序列是否是二叉搜索树或镜像二叉搜索树的前序遍历。

~~分别根据输入建立二叉搜索树和镜像二叉搜索数~~

先使用二叉搜索树建立的模板建立一颗二叉树。模板如下

```C++
TreeNode* insert(TreeNode* root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return root;
    }
    if (root-> val > val) {
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }
    return root;
}
```

然后先求出该树的先序遍历，而该树的镜像的先序遍历就只需要先访问树的右结点，再访问树的左结点。

```C++
void dfsMirror(TreeNode* root) {
    if (root == NULL) return;
    tempMirror.push_back(root->val);
    dfsMirror(root->right);
    dfsMirror(root->left);
}
```

最后判断给出序列是否是该树或者该树的镜像树的先序遍历。若是输出它的后续遍历，而后续遍历经过发现，就是它的镜像树的先序遍历从后往前输出即可。

## 代码

```C++
#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

TreeNode* insert(TreeNode* root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return root;
    }
    if (root-> val > val) {
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }
    return root;
}

vector<int> temp, tempMirror;

void dfs(TreeNode* root) {
    if (root == NULL) return;
    temp.push_back(root->val);
    dfs(root->left);
    dfs(root->right);
}

void dfsMirror(TreeNode* root) {
    if (root == NULL) return;
    tempMirror.push_back(root->val);
    dfsMirror(root->right);
    dfsMirror(root->left);
}

int main() {
    int n;
    cin >> n;
    vector<int> origin(n);
    TreeNode *root = NULL;
    for (int i = 0; i < n; i++) {
        cin >> origin[i];
        root = insert(root, origin[i]); // 建立二叉树
    }
    dfs(root);
    dfsMirror(root);

    if (origin == temp) {
        printf("YES\n");
        for (int i = n - 1; i >= 0; i--) {
            printf("%d", tempMirror[i]);
            if (i > 0) printf(" ");
        }
        printf("\n");
    } else if (origin == tempMirror) {
        printf("YES\n");
        for (int i = n - 1; i >= 0; i--) {
            printf("%d", temp[i]);
            if (i > 0) printf(" ");
        }
        printf("\n");
    } else {
        printf("NO\n");
    }
}
```

## 相关题目

- [1115 Counting Nodes in a BST (30分)](https://emhui.fun/2021/01/30/1115-Counting-Nodes-in-a-BST-30%E5%88%86/)
- [1066 Root of AVL Tree](https://emhui.fun/2021/01/20/1066-Root-of-AVL-Tree/)
