---
title: 1102 Invert a Binary Tree
date: 2021-01-15 16:59:42
tags: [PAT, 算法, 二叉树]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmmz605z4j21kw0w0qvh.jpg
---

# 1102 Invert a Binary Tree

## 题目

![wAVNFn](https://gitee.com/yoyhm/oss/raw/master/uPic/wAVNFn.png)

## 思路

{% note warning %}
难点：输入数据的处理
{% endnote %}

1. 使用静态二叉树结构
2. 设置一个bool数组，假设所有结点是根结点。当读取子结点的时候，设置子结点为false
3. 使用后序遍历交换两边
4. 使用层次和中序遍历输出结果

## 代码

```C++
// 1. 使用静态二叉树结构
// 2. 设置一个bool数组，假设所有结点是根结点。当读取子结点的时候，设置子结点为false
// 3. 使用后序遍历交换两边
// 4. 使用层次和中序遍历输出结果
#include <cstdio>
#include <queue>
#include <algorithm>
#include <cstring>
using namespace std;
const int maxn = 10010;

struct TreeNode{
    int left, right;
}treenode[maxn];

bool isRoot[maxn]; // 无法设置为true，这样只可以设置第一个值为true。但是设置为false却可以。

int ch2num(char c) {
    if (c == '-') {return -1;}
    isRoot[c - '0'] = false; // 子结点
    return c - '0';
}

// 交换左右子树
void posttravel(int root) {
    if (root == -1) return;
    posttravel(treenode[root].left);
    posttravel(treenode[root].right);
    swap(treenode[root].left, treenode[root].right);
}

void bfs(int root, int n) {
    queue<int> q;
    q.push(root);
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        printf("%d", node);
        if (--n) {printf(" ");}
        if (treenode[node].left != -1) q.push(treenode[node].left);
        if (treenode[node].right != -1) q.push(treenode[node].right);
    }
}

void intravel(int root, int& n) {
    if (root == -1) return;
    intravel(treenode[root].left, n);
    printf("%d", root);
    if (--n) {printf(" ");}
    intravel(treenode[root].right, n);
}

int main() {
    memset(isRoot, true, sizeof(isRoot)); // 需要引入头文件 <memory.h> or <string.h>
    int n;
    char c1, c2;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        getchar(); //吸收回车字符
        scanf("%c %c", &c1, &c2);
        treenode[i].left = ch2num(c1);
        treenode[i].right = ch2num(c2);
    }
    int root = 0;
    for (int i = 0; i < n; i++) {
        if (isRoot[i]) {
            root = i;
            break;
        }
    }
    posttravel(root);
    bfs(root, n);
    printf("\n");
    intravel(root, n);
    printf("\n");
    return 0;
}
```

## 其他

- `memset`的使用需要引入头文件`memory.h` or `string.h`
