---
title: 1123 Is It a Complete AVL Tree (30分)
date: 2021-01-29 22:02:28
tags: [PAT, 算法, 平衡二叉树, 完全二叉树]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmry165k5j21hc0u0n6b.jpg
---

# 1123 Is It a Complete AVL Tree (30分)

## 题目

![Y8O0QN](https://gitee.com/yoyhm/oss/raw/master/uPic/Y8O0QN.png)

## 分析

本题主要考察两个知识点：

- 构建平衡二叉树
- 判断是否是完全二叉树

构建一个平衡二叉树

> 参考[1066 Root of AVL Tree](https://emhui.fun/2021/01/20/1066-Root-of-AVL-Tree/)

判断是否是完全二叉树

> 判断是不是完全二叉树，就看在出现了一个孩子为空的结点之后是否还会出现孩子结点不为空的结点，如果出现了就不是完全二叉树。



## 代码

```C++
#include <cstdio>
#include <algorithm>
#include <queue>
#include <vector>
using namespace std;

struct TreeNode {
    int val, height;
    TreeNode *left, *right;
} *root;

TreeNode* newNode(int val) {
    TreeNode *node = new TreeNode;
    node->val = val;
    node->height = 1;
    node->left = node->right = NULL;
    return node;
}

int getHeight(TreeNode* root) {
    if (root == NULL) return 0;
    return root->height;
}

void updateHeight(TreeNode* &root) {
    root->height = max(getHeight(root->left), getHeight(root->right)) + 1;
}

int getBalanceFactor(TreeNode* &root) {
    return getHeight(root->left) - getHeight(root->right);
}

void R(TreeNode* &root) {
    TreeNode* temp = root->left;
    root->left = temp->right;
    temp->right = root;
    updateHeight(root);
    updateHeight(temp);
    root = temp;
}

void L(TreeNode* &root) {
    TreeNode* temp = root->right;
    root->right = temp->left;
    temp->left = root;
    updateHeight(root);
    updateHeight(temp);
    root = temp;
}

void insert(TreeNode* &root, int val) {
    if (root == NULL) {
        root = newNode(val);
        return;
    }
    if (root->val > val) { // 插入到左边
        insert(root->left, val);
        updateHeight(root); // 插入后看看树的高度是否满足要求
        // 开始处理平衡问题
        if (getBalanceFactor(root) == 2) {
            if (getBalanceFactor(root->left) == 1) { // LL
                R(root);
            } else if (getBalanceFactor(root->left) == -1) { // LR
                L(root->left);
                R(root);
            }
        }
    } else {
        insert(root->right, val);
        updateHeight(root);
        if (getBalanceFactor(root) == -2) {
            if (getBalanceFactor(root->right) == -1) {
                L(root);
            } else if (getBalanceFactor(root->right) == 1) {
                R(root->right);
                L(root);
            }
        }
    }
}

int isComplete = 1, after = 0;
void bfs(TreeNode* root) {
    queue<TreeNode*> q;
    vector<int> ans;
    q.push(root);
    TreeNode* node;
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            node = q.front();
            q.pop();
            ans.push_back(node->val);
            if (node->left) {
                if (after) isComplete = 0;
                q.push(node->left);
            } else {
                after = 1;
            }
            if (node->right) {
                if (after) isComplete = 0; // 若左边存在，右边不存在，则不是完全二叉树
                q.push(node->right);
            } else {
                after = 1;
            }
        }
    }
    for (int i = 0; i < ans.size(); i++) {
        printf("%d", ans[i]);
        if (i < ans.size() - 1) printf(" ");
    }
    printf("\n");
}

int main() {
    int n, val;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insert(root, val);
    }
    bfs(root);
    printf("%s\n", isComplete ? "YES" : "NO");
    return 0;
}
```

## 平衡二叉树建立模板

记住下面关键几点

- 一个获取高度的函数
- 两个旋转函数R,L
- 四种树形结构
	- LL: 根结点R
	- LR: 根结点左子树L,根结点R
	- RR: 根结点L
	- RL: 根结点右子树R,根结点L
- 判断当前结点属于上面哪种树形结构
	- LL: getH(root->left) - getH(root->right) == 2
	- LR: getH(root->left) - getH(root->right) == 2 && root->left->val < val
	- RR: getH(root->left) - getH(root->right) == -2
	- RL: getH(root->left) - getH(root->right) == -2 && root->right->val > val

```C++
#include <cstdio>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
} *root;

void R(TreeNode* &root) {
    TreeNode* temp = root->left;
    root->left = temp->right;
    temp->right = root;
    root = temp;
}

void L(TreeNode* &root) {
    TreeNode* temp = root->right;
    root->right = temp->left;
    temp->left = root;
    root = temp;
}

int getHeight(TreeNode* root) {
    if (root == NULL) return 0;
    return max(getHeight(root->left), getHeight(root->right)) + 1;
}

void insert(TreeNode* &root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
    } else if (root->val > val) { // 左子树
        insert(root->left, val);
        int l = getHeight(root->left), r = getHeight(root->right);
        if (l - r == 2) { // l
            if (root->left->val < val) { // LR 新的结点被插入左边结点的右子树
                L(root->left);
            }
            R(root);
        }
    } else {
        insert(root->right,val);
        int l = getHeight(root->left), r = getHeight(root->right);
        if (l - r == -2) { // R
            if (root->right->val > val) { // RL 新的结点插入到右子树的左边
                R(root->right);
            }
            L(root);
        }
    }
}

int main() {
    int n, val;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insert(root, val);
    }
    printf("%d\n", root->val);
    return 0;
}
```

## 相关题目

- [1066 Root of AVL Tree](https://emhui.fun/2021/01/20/1066-Root-of-AVL-Tree/)
