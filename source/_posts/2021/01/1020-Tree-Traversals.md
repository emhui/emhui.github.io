---
title: 1020 Tree Traversals
date: 2021-01-14 18:13:59
tags: [算法, PAT, bfs, 后序遍历, 中序遍历]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6p3dkm1j31hc0u04mm.jpg
---

# 1020 Tree Traversals

## 题目

![SSNibA](https://gitee.com/yoyhm/oss/raw/master/uPic/SSNibA.png)

## 思路

本题目的是**给出后续遍历和中序遍历，输出层次遍历**。因此本题分为两步

1. 根据后序遍历和中序遍历推断出二叉树[^1]。
2. 使用BFS层次遍历二叉树。

这里分析第一点实现的思路:由用后序遍历序列和中序遍历序列来重建二叉树。

假设递归过程中某步的后序序列区间为[postL, postR],中序序列区间为[inL, inR],那么由后序序列性质可知,后序序列的最后一个元素post[postR]即为根结点。接着需要在中序序列中寻找一个位置k,使得in(k]=postpostR],这样就找到了中序序列中的根结点。易知左子树结点个数为numLeft=k-inL,于是左子树的后序序列区间为[postL, postL + numLeft1],左子树的中序序列区间为[inL, k-1];右子树的后序序列区间为[postL + numLefj),右子树的中序序列区间为k + 1, inR]。

## 代码

```C++
// 先构建好二叉树，再用bfs遍历.
#include <cstdio>
#include <queue>
#include <vector>
using namespace std;

vector<int> postorder, inorder;

struct TreeNode{
    int val;
    TreeNode *left, *right;
};

TreeNode* createTree(int inL, int inR, int postL, int postR, vector<int>& inorder, vector<int>& postorder) {
    if (postL > postR) return NULL;
    TreeNode* node = new TreeNode;
    node->val = postorder[postR];
    int mid = 0;
    for (mid = inL; mid <= inR; mid++) { // 找到中序遍历的根结点位置
        if (inorder[mid] == node->val) break;
    }
    int leftNum = mid - inL; // 左子树的数量
    node->left = createTree(inL, mid - 1, postL, postL + leftNum - 1, inorder, postorder);
    node->right = createTree(mid + 1, inR, postL + leftNum, postR - 1, inorder, postorder);
    return node;
}

void bfs(TreeNode* root, int n) {
    queue<TreeNode*>  q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        printf("%d", node->val);
        n--;
        if (n > 0) {printf(" ");};
        if (node->left != NULL) q.push(node->left);
        if (node->right != NULL) q.push(node->right);
    }
}

int main() {
    int n, val;
    scanf("%d", &n);
    for (int i = 0; i < n; i ++) {
        scanf("%d", &val);
        postorder.push_back(val);
    }
    for (int i = 0; i < n; i ++) {
        scanf("%d", &val);
        inorder.push_back(val);
    }
    TreeNode* root = createTree(0, n - 1, 0, n - 1, inorder, postorder);
    bfs(root, n);
    printf("\n");
    return 0;
}
```

[^1]: [106. 从中序与后序遍历序列构造二叉树](https://emhui.fun/2021/01/14/106-%E4%BB%8E%E4%B8%AD%E5%BA%8F%E4%B8%8E%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91/)
