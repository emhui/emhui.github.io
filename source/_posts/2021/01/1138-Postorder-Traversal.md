---
title: 1138 Postorder Traversal
date: 2021-01-26 18:10:17
tags: [PAT, 前序遍历, 中序遍历, 后序遍历, 二叉树, 算法]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xehevfj31hc0u0b29.jpg
---

# 1138 Postorder Traversal (25分)

## 题目

![42Tetc](https://gitee.com/yoyhm/oss/raw/master/uPic/42Tetc.png)

## 思路

本题是**前序和中序构建二叉树**和**二叉树后序遍历**结合。

- **前序和中序遍历二叉树**可以参考[1086 Tree Traversals Again](https://emhui.fun/2021/01/14/1086-Tree-Traversals-Again/), [1020 Tree Traversals](https://emhui.fun/2021/01/14/1020-Tree-Traversals/)
- **二叉树后序遍历**。由于本题只需要求后续遍历第一个结点。先访问根结点的最左边结点，若不存在最左边结点，则访问最右边结点，再访问右边结点的左结点，直到找到叶子结点。该结点为后续遍历第一个结点。实现代码如下。

```C++
while (root->left != NULL || root->right != NULL) {
	if (root->left != NULL) {
		root = root->left;
	} else if (root->right != NULL){
		root = root->right;
	}
}
```

## 代码

```C++
#include <cstdio>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

vector<int> preorder, inorder;
int n;

TreeNode* create(int pl, int pr, int il, int ir) {
    if (pl > pr) return NULL;
    TreeNode* root = new TreeNode;
    root->val = preorder[pl];
    int mid = 0;
    for (mid = il; mid <= ir; mid++) {
        if (preorder[pl] == inorder[mid]) break;
    }
    int left = mid - il;
    root->left = create(pl + 1, pl + left, il, mid - 1);
    root->right = create(pl + left + 1, pr, mid + 1, ir);
    return root;
}

int main() {
    scanf("%d", &n);
    preorder.resize(n), inorder.resize(n);
    for (int i = 0 ; i < n; i++) {
        scanf("%d", &preorder[i]);
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &inorder[i]);
    }
    TreeNode* root = create(0, n - 1, 0, n - 1);
    // 找到最左边的结点
    while (root->left != NULL || root->right != NULL) {
        if (root->left != NULL) {
            root = root->left;
        } else if (root->right != NULL){
            root = root->right;
        }
    }
    printf("%d\n", root->val);
    return 0;
}
```

方法二，更换了找到根结点的方法，刚刚那个方法的确有问题。

```C++
#include <cstdio>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

vector<int> preorder, inorder;
int n;

TreeNode* create(int pl, int pr, int il, int ir) {
    if (pl > pr) return NULL;
    TreeNode* root = new TreeNode;
    root->val = preorder[pl];
    int mid = 0;
    for (mid = il; mid <= ir; mid++) {
        if (preorder[pl] == inorder[mid]) break;
    }
    int left = mid - il;
    root->left = create(pl + 1, pl + left, il, mid - 1);
    root->right = create(pl + left + 1, pr, mid + 1, ir);
    return root;
}
int num = 0;
void posttravel(TreeNode* root) {
    if (root == NULL) return;
    posttravel(root->left);
    posttravel(root->right);
    if (num++ == 0) {
        printf("%d\n", root->val);
    } else {
        return;
    }
}

int main() {
    scanf("%d", &n);
    preorder.resize(n), inorder.resize(n);
    for (int i = 0 ; i < n; i++) {
        scanf("%d", &preorder[i]);
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &inorder[i]);
    }
    TreeNode* root = create(0, n - 1, 0, n - 1);
    //while (root->left != NULL) {root = root->left;}
    //while (root->right != NULL) {root = root->right;}
    //printf("%d\n", root->val);
    posttravel(root);
    return 0;
}
```

## 结果

方法一进行改进

![MjiCMq](https://gitee.com/yoyhm/oss/raw/master/uPic/MjiCMq.png)

方法一进行改进

![MAtlF8](https://gitee.com/yoyhm/oss/raw/master/uPic/MAtlF8.png)

使用方法二可以通过

![Mdqjxt](https://gitee.com/yoyhm/oss/raw/master/uPic/Mdqjxt.png)
