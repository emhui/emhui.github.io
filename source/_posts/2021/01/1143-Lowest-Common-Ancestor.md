---
title: 1143 Lowest Common Ancestor
date: 2021-01-24 22:02:38
tags: [PAT, LCA, 算法, 二叉树]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmrxozej7j21hc0u0gur.jpg
---

# 1143 Lowest Common Ancestor (30分)

## 题目

![h3PwWE](https://gitee.com/yoyhm/oss/raw/master/uPic/h3PwWE.png)

## 思路

本题和[1151 LCA in a Binary Tree (30分)](https://emhui.fun/2021/01/23/1151-LCA-in-a-Binary-Tree/)几乎完全一致的思路。这题是只告诉了你前序遍历，但是指明了树是一颗**二叉搜索树**。已知二叉搜索树的中序遍历就是一个递增序列，因此将前序遍历排序就得到了该树的中序遍历。然后和[1151 LCA in a Binary Tree (30分)](https://emhui.fun/2021/01/23/1151-LCA-in-a-Binary-Tree/)就是一个题目了。

{% note warning %}

本题由于给出的是二叉搜索树，对于二叉搜索树的最近公共祖先有专门LCA算法，该算法补充到下列代码的`dfs2`中

{% endnote %}

## 代码

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

// 增加对平衡二叉树的判断最小公共祖先。
TreeNode* dfs2(TreeNode* root, int u, int v) {
    if (root == NULL) return NULL;
    if (root->val < u && root->val < v) { // uv在右则对右子树访问即可
        return dfs(root->right, u, v);
    }
    if (root->val > u && root->val > v) // uv在左侧，则直接访问左侧
    {
        return dfs(root->left, u, v);
    }
    return root; // 否则在两端，则该结点就是根结点
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
        scanf("%d", &preorder[i]);
    }
    inorder = preorder;
    sort(inorder.begin(), inorder.end()); // 二叉搜索树的中序遍历就是从小到达的顺序。
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
            TreeNode* ans = dfs2(root, u, v);
            if (ans == NULL) { // 在这里加一个判断，判断ans是否存在
                printf("ERROR: %d and %d are not found.\n", u, v);
            } else
            if (ans->val != u && ans->val != v) {
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
