---
title: 1086 Tree Traversals Again
date: 2021-01-14 20:42:52
tags: [PAT, 算法, 二叉树, 先序遍历, 中序遍历]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmroo4iggj21hc0u0th9.jpg
---

# 1086 Tree Traversals Again

## 题目

![Fo0YeY](https://gitee.com/yoyhm/oss/raw/master/uPic/Fo0YeY.png)

## 思路

本题使用栈模拟先序遍历和中序遍历，其中

- `push`: 1,2,3,4,5,6 为先序遍历
- `pop`: 3,2,4,1,6,5 为中序遍历

输出它的后续遍历。因此可以先使用栈储存它的输入，同时构建`preorder, inorder`序列。再通过**先序遍历和中序遍历求出后序遍历**

## 代码

```C++
#include <cstdio>
#include <cstring>
#include <stack>
#include <vector>
using namespace std;

vector<int> preorder, inorder;

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

void posttravel(TreeNode* root, int &n) {
    if (root == NULL) return;
    posttravel(root->left, n);
    posttravel(root->right, n);
    printf("%d", root->val);
    if (--n) printf(" ");
}

int main() {
    char s[5];
    stack<int> st;
    int n, val;
    scanf("%d", &n);
    for (int i = 0; i < 2*n; i++) {
        scanf("%s", s);
        if (strcmp(s, "Push") == 0) {
            scanf("%d", &val);
            st.push(val);
            preorder.push_back(val);
        } else {
            inorder.push_back(st.top());
            st.pop();
        }
    }
    TreeNode* root = createTree(0, n - 1, 0, n - 1, preorder, inorder);
    posttravel(root, n);
    printf("\n");
    return 0;
}
```
