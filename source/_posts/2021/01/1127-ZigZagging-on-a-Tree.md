---
title: 1127 ZigZagging on a Tree
date: 2021-01-28 16:27:20
tags: [PAT, bfs, 算法]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmrr7y6u3j21hc0u0k0c.jpg
---

# 1127 ZigZagging on a Tree (30分)

## 题目

![QNkta0](https://gitee.com/yoyhm/oss/raw/master/uPic/QNkta0.png)

## 分析

**题目要求**

本题题目比较简单，就是**根据中序后续建立树**和**树的层次遍历**

- 给出中序和后序，建立二叉树

- 层次遍历，左右来回输出

## 代码

```C++
#include <vector>
#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode{
    int val;
    TreeNode *left, *right;
};
vector<int> inorder, postorder;

TreeNode* create(int inL, int inR, int postL, int postR) {
    if (postL > postR) return NULL;
    TreeNode* root = new TreeNode;
    root->val = postorder[postR]; // 根结点
    int mid = 0;
    for (mid = inL; mid <= inR; mid++) {
        if (postorder[postR] == inorder[mid]) {
            break;
        }
    }
    int num = mid - inL; // inorder左子树的数量
    root->left = create(inL, mid - 1, postL, postL + num - 1);
    root->right = create(mid + 1, inR, postL + num, postR - 1);
    return root;
}

void bfs(TreeNode* root) {
    queue<TreeNode*> q;
    vector<int> ans, temp;
    int level = 0;
    q.push(root);
    //ans.push_back(root->val);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            temp.push_back(node->val);
            q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        if (++level & 1) { // 如果是奇数层，否则逆序输出（层数从0开始）
            reverse(temp.begin(), temp.end());
        }
        ans.insert(ans.end(), temp.begin(), temp.end());
        temp.clear();
    }
    int n = ans.size();
    for (int i = 0; i < n; i++) {
        printf("%d", ans[i]);
        if (i < n - 1) printf(" ");
    }
    printf("\n");
}

int main() {
    int n;
    cin >> n;
    inorder.resize(n);
    postorder.resize(n);
    for (int i = 0; i < n; i++) {cin >> inorder[i];}
    for (int i = 0; i < n; i++) {cin >> postorder[i];}
    TreeNode* root = create(0, n-1, 0, n-1);
    bfs(root);
    return 0;
}
```
