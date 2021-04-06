---
title: 1147 Heaps
date: 2021-01-24 16:50:33
tags: [PAT, 堆, 完全二叉树]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmrx49dasj21hc0u0wnm.jpg
---

# 1147 Heaps (30分)

## 题目

{% note warning %}
- 为了防止时间超时，能使用数组就不用`vector`
{% endnote %}

![CnmiXY](https://gitee.com/yoyhm/oss/raw/master/uPic/CnmiXY.png)

## 思路

本题主要考察**判断大小堆**，**遍历完全二叉树**

- 判断大小堆使用下面方法

```C++
int h[MAX], m; // h数组表示堆结构，m为堆的数量。
void isWhatHeap() { // 大堆返回1，小堆返回-1，不是堆返回0
    bool isMax = true, isMin = true;

    for (int i = 2; i <= m; i++) {
        if (h[i] > h[i / 2]) isMax = false;
        if (h[i] < h[i / 2]) isMin = false;
    }
    if (isMax) printf("Max Heap\n");
    else if (isMin) printf("Min Heap\n");
    else printf("Not Heap\n");
}
```

- 完全二叉树的后续遍历

后序遍历

```C++
void postTravel(int idx) {
    if (idx > m) {return;}
    postTravel(idx * 2);
    postTravel(idx * 2 + 1);
    printf("%d", h[idx]);
    if (idx == 1) printf("\n");
    else printf(" ");

}
```

## 代码

```C++
#include <cstdio>
#include <vector>
using namespace std;
const int MAX = 1001;
int h[MAX], n, m;

void isWhatHeap() { // 大堆返回1，小堆返回-1，不是堆返回0
    bool isMax = true, isMin = true;

    for (int i = 2; i <= m; i++) {
        if (h[i] > h[i / 2]) isMax = false;
        if (h[i] < h[i / 2]) isMin = false;
    }
    if (isMax) printf("Max Heap\n");
    else if (isMin) printf("Min Heap\n");
    else printf("Not Heap\n");
}

void postTravel(int idx) {
    if (idx > m) {return;}
    postTravel(idx * 2);
    postTravel(idx * 2 + 1);
    printf("%d", h[idx]);
    if (idx == 1) printf("\n");
    else printf(" ");

}

int main() {
    scanf("%d%d", &n, &m);
    while (n--) {
        for (int i = 1; i <= m; i++) {
            scanf("%d", &h[i]);
        }
        isWhatHeap();
        postTravel(1);
    }
    return 0;
}
```

```C++
#include <iostream>
#include <vector>
using namespace std;

int m, n; // m:tests, n:keys;
vector<int> cbt;

void posttravel(int root) {
    if (root > n) return;
    posttravel(root * 2);
    posttravel(root * 2 + 1);
    printf("%d", cbt[root]);
    if (root != 1) printf(" ");
}

int main() {
    cin >> m >> n;
    bool isMaxHeap, isMinHeap;
    cbt.resize(n + 1);
    while (m--) {
        cbt.clear();
        isMaxHeap = isMinHeap = true;
        for (int i = 1; i <= n; i++) cin >> cbt[i];
        for (int i = n; i >= 2; i--) {
            if (cbt[i] > cbt[i / 2]) isMaxHeap = false;
            if (cbt[i] < cbt[i / 2]) isMinHeap = false;
        }
        if (isMaxHeap) printf("Max Heap\n");
        else if (isMinHeap) printf("Min Heap\n");
        else printf("Not Heap\n");
        posttravel(1);
        printf("\n");
    }
    return 0;
}
```

## 其他

类似题目

- [1155 Heap Paths (30分)](https://emhui.fun/2021/01/23/1155-Heap-Paths-30%E5%88%86/)
