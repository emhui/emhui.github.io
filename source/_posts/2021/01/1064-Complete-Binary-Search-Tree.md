---
title: 1064 Complete Binary Search Tree
date: 2021-01-20 11:48:43
tags: [PAT, 算法, 完全二叉树, 二叉树, 二叉查找树, bst]
categories: [PAT]
math: true
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmmu5g157j21hc0u0x6q.jpg
---

# 1064 Complete Binary Search Tree

## 题目

![doKWdq](https://gitee.com/yoyhm/oss/raw/master/uPic/doKWdq.png)

## 思路

用数组表示一个完全二叉树，假设某个结点编号为$x$(根结点的编号一定是1),那它具有下面性质

- x的左孩子编号是$2x$
- x的右孩子编号是$2x+1$

对于一个二叉搜索树来说，中序遍历该是该树结点的递增序列。

因此可以建立一个空的完全二叉树，同时对输入的序列进行由小到大，然后中序遍历该完全二叉树，同时把排好序的序列依次填入该完全二叉树中。

完全二叉树本身是按照层次遍历排序的。所以最后只要按序输出。

⚠️ 完全二叉树的根结点是从1开始。

## 代码

```C++
#include <cstdio>
#include <algorithm>
using namespace std;

const int MAX = 10010;
int a[MAX], cbt[MAX];
int num = 0, n;

void inorder(int x) {
    if (x > n) {
        return;
    }
    inorder(x * 2);
    cbt[x] = a[num++];
    inorder(x * 2 + 1);
}

int main() {
    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d", &a[i]);
    }
    sort(a, a+n);
    inorder(1);
    for (int i = 1; i <= n; i++) {
        printf("%d", cbt[i]);
        if (i < n) printf(" ");
    }
    printf("\n");
    return 0;
}
```
