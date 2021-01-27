---
title: 1151 LCA in a Binary Tree
date: 2021-01-23 20:34:50
tags: [PAT, 算法]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmryu38jij21hc0u0thv.jpg
---

# 1151 LCA in a Binary Tree (30分)

## 题目

![Dqy4px](https://gitee.com/yoyhm/oss/raw/master/uPic/Dqy4px.png)

## 思路

本题很常规，建树+求公共祖先。

将已知两个遍历，建立一个树，然后在给出两个子结点，求公共根结点。

- [已知前序和中序建树](https://emhui.fun/2021/01/14/1086-Tree-Traversals-Again/)
- [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/solution/er-cha-shu-de-zui-jin-gong-gong-zu-xian-6fdt7/)

下图为例子中给出的树

![AvDyHA](https://gitee.com/yoyhm/oss/raw/master/uPic/AvDyHA.png)

## 代码

> ~~本题还有一个测试用例没有通过，那个测试用例占1分，暂时没有找到具体原因~~
> 已解决，是之前的LCA算法有问题

```C++
#include <cstdio>
#include <cstring>
#include <vector>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

TreeNode* createTree(int preL, int preR, int inL, int inR, vector<int>& preorder, vector<int>& inorder) {
    if (preL > preR) return NULL;
    TreeNode *root = new TreeNode;
    root->val = preorder[preL];
    int mid = 0;
    for (mid = inL; mid <= inR; mid++) {
        if (inorder[mid] == preorder[preL]) break;
    }
    int leftNum = mid - inL;
    root->left = createTree(preL + 1, preL + leftNum, inL, mid - 1, preorder, inorder);
    root->right = createTree(preL + leftNum + 1, preR, mid + 1, inR, preorder, inorder);
    return root;
}



TreeNode* dfs(TreeNode* root, int u, int v) {
    if (root == nullptr) return root;
    if (root->val == u || root->val == v) {
        return root;
    }
    TreeNode* left = dfs(root->left, u, v);
    TreeNode* right = dfs(root->right, u, v);
    if (left == NULL) return right;
    else if (right == NULL) return left;
    else return root;
}

bool isExit(vector<int>& vs, int x) {
    for (int i = 0; i < vs.size(); i++) {
        if (vs[i] == x) return true;
    }
    return false;
}

int main() {
    int n, m;
    scanf("%d%d", &m, &n);
    vector<int> preorder(n), inorder(n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &inorder[i]);
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &preorder[i]);
    }
    TreeNode* root = createTree(0, n - 1, 0, n - 1, preorder, inorder);
    int u, v;
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &u, &v);
        if (!isExit(inorder, u) && !isExit(inorder, v)) {
            printf("ERROR: %d and %d are not found.\n", u, v);
        } else if (!isExit(inorder, u)) {
            printf("ERROR: %d is not found.\n", u);
        } else if (!isExit(inorder, v)) {
            printf("ERROR: %d is not found.\n", v);
        } else {
            TreeNode* ans = dfs(root, u, v);
            if (ans == NULL) { // 在这里加一个判断，判断ans是否存在
                printf("ERROR: %d and %d are not found.\n", u, v);
            } else if (ans->val != u && ans->val != v) {
                printf("LCA of %d and %d is %d.\n", u, v, ans->val);
            } else if (ans->val == u) {
                printf("%d is an ancestor of %d.\n", u, v);
            } else if (ans->val == v) {
                printf("%d is an ancestor of %d.\n", v, u);
            }
        }
    }
    return 0;
}
```
