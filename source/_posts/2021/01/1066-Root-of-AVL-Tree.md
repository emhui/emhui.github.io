---
title: 1066 Root of AVL Tree
date: 2021-01-20 16:43:57
tags: [PAT, 算法, 平衡二叉树, AVL, 二叉搜索树]
categories: [PAT]
math: true
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmn0empcsj21kw0w0e87.jpg
---

# 1066 Root of AVL Tree

## 题目

![yfKAnA](https://gitee.com/yoyhm/oss/raw/master/uPic/yfKAnA.png)

## 思路

{% note warning %}
平衡二叉树的平衡因子特性应用。
{% endnote %}

本题目的是建立一颗平衡二叉树。比较难，记住下面结论。通过下面结论来进行编程

- 平衡二叉树为了平衡，需要进行**左旋转**，**右旋转**两个操作。那么如何该选择是否需要选择操作？（使用平衡因子）
- 平衡因子是左右子树的高度差值。如下图所示，图中结点上的值为平衡因子。

![d0NKih](https://gitee.com/yoyhm/oss/raw/master/uPic/d0NKih.png)

- 若平衡因子出现大于$|1|$，则出现问题，需要进行调整。那么调整会出现4种情况。

1. $LL$和$LR$
![ZmTYVu](https://gitee.com/yoyhm/oss/raw/master/uPic/ZmTYVu.png)

	- $LL$类型只需要绕着根结点进行**左旋转**即可平衡。
	![MpUjsi](https://gitee.com/yoyhm/oss/raw/master/uPic/MpUjsi.png)
	- $LR$类型需要先将$root->left$作为结点，然后进行**右旋转**，将树转化为$LL$类型，再**左旋转即可**。
	![DcLVBG](https://gitee.com/yoyhm/oss/raw/master/uPic/DcLVBG.png)

2. $RR$和$RL$

![UVFCj0](https://gitee.com/yoyhm/oss/raw/master/uPic/UVFCj0.png)

	这种类型的和$LL$,$LR$的类似，只需要将上面操作反过来。

- 所以根据上面给出的类型，在每次插入的时候都去判断当前插入后的平衡因子变化。再判断属于上述四种的哪一类。分别进行相应的旋转。

- 插入操作就是在之前的二叉搜索树上增加了旋转操作的处理。

```C++
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
```

## 代码

```C++
#include <cstdio>
#include <algorithm>
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

## 其他

平衡二叉树建立模板

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
