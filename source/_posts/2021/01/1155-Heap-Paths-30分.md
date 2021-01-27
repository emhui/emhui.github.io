---
title: 1155 Heap Paths
date: 2021-01-23 11:25:36
tags: [PAT, 算法, 完全二叉树, 堆]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmrr7y6u3j21hc0u0k0c.jpg
---

# 1155 Heap Paths (30分)

## 题目

![Zsw7lc](https://gitee.com/yoyhm/oss/raw/master/uPic/Zsw7lc.png)

## 思路

堆是一个完全二叉树，由堆顶往叶子结点的路径中，结点的值总是递增（小堆）或者递减（小堆）。

给定一个层次遍历的堆，打印出从堆顶到叶子结点的所有路径，要求先打印右边再打印左边。最后判断该堆是否是大堆或者是小堆，或者不是堆。

本题可以通过`DFS`对二叉树进行遍历，先遍历右子树，再遍历左子树。遍历开始前先把根结点压入路径中，遍历完左右后弹出路径。这里需要注意以下几点

- 完全二叉树中，根结点下标是从`1`开始
- 在完全二叉树中，若当前结点下标为`x`，则其左子树结点下标为`2*x`，右子树下标为`2*x+1`.
- 如何判断完全二叉树的叶子结点。

一般来说满足条件`2*x > n`则一定是叶子结点，但是下面这种情况特殊。下标为`4`的结点，它存在左子树为`8`的结点。该情况判断在代码中。

![yjdxvz](https://gitee.com/yoyhm/oss/raw/master/uPic/yjdxvz.png)

- 如何判断是最小堆还是最大堆，设置两个变量，`isMaxHeap = true, isMinHeap = false`. 然后在遍历路径的过程中对`i,i+1`值判断.判断如下

```C++
if (path[i] - path[i + 1] > 0) {
	isMaxHeap = true;
} else if (path[i] - path[i + 1] < 0) {
	isMinHeap = true;
}
```

最后如果两个值同时为`True`，证明无法形成堆。

## 代码

```C++
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int n;
vector<int> path;
bool isMaxHeap = false, isMinHeap = false; // 假设默认是heap

void dfs(vector<int> cbt, int x) {
   //  printf("%d\n", x * 2);
    if (x * 2 >= n) { // 如果没
        path.push_back(cbt[x]);
        if (x * 2 == n) {path.push_back(cbt[x*2]);}
        int size = path.size();
        for (int i = 0; i < size; i++) {
            printf("%d", path[i]);
            if (i < size - 1) {
                if (path[i] - path[i + 1] > 0) {
                    isMaxHeap = true;
                } else if (path[i] - path[i + 1] < 0) {
                    isMinHeap = true;
                }
                printf(" ");
            }
        }
        printf("\n");
        if (x * 2 == n) {path.pop_back();}
        path.pop_back();
        return;
    }
    path.push_back(cbt[x]);
    dfs(cbt, x * 2 + 1);
    dfs(cbt, x * 2);
    path.pop_back();
}

int main() {
    scanf("%d", &n);
    vector<int> cbt(n + 1); // 建立一颗完全二叉树
    for (int i = 1; i <= n; i++) {
        scanf("%d", &cbt[i]);
    }
    dfs(cbt, 1);
    if (isMaxHeap && isMinHeap) {
        printf("Not Heap\n");
    } else if (isMaxHeap) {printf("Max Heap\n");}
    else if (isMinHeap) {printf("Min Heap\n");}
}

```
