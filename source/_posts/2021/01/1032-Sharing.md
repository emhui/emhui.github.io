---
title: 1032 Sharing
date: 2021-01-12 16:47:55
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmrz1orjkj21hc0u0thv.jpg
banner_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmrz1orjkj21hc0u0thv.jpg
tags: [PAT, C++, 算法, 链表]
categories: [PAT]
---

# 1032 Sharing

## 题目

![题目](https://gitee.com/yoyhm/oss/raw/master/uPic/XC2jKw.png)

## 思路

本题是求链表的公共结点的首个结点地址。

⚠️这里是求**公共结点的首个结点位置，而不是公共尾结点的首个结点位置。**

因此可以使用静态链表，在结构体中定义一个`flag`变量，表示该结点在第一个链表中出现过。

按照输入的第一个链表首地址，将第一链表的所有结点`flag`标志为`true`。

然后按照输入的第二个链表的首地址，找到第一个结点`flag=true`即为两个结点的首个公共结点。

## 代码

C++

```C++
#include <cstdio>
#include <algorithm>
using namespace std;
const int maxn = 100010;

struct Node {
    int address, next;
    char data;
    bool flag;
}node[maxn];

int main() {
    int begin_a, begin_b, n;
    int address;
    scanf("%d%d%d", &begin_a, &begin_b, &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d ", &address);
        scanf("%c%d", &node[address].data, &node[address].next);
    }
    // init(node_a);
    // init(node_b);
    for (int i = 0; i < maxn; i++) {node[i].flag = false;}

    while(begin_a != -1) {
        node[begin_a].flag = true;
        begin_a = node[begin_a].next;
    }

    while (begin_b != -1) {
        if (node[begin_b].flag) {break;}
        else {
            begin_b = node[begin_b].next;
        }
    }
    if (begin_b != -1) {
        printf("%05d\n", begin_b);
    } else {
        printf("-1\n");
    }
    return 0;
}
```

## 其他

一开始看错了题目意思，认为是要寻找**公共结尾的首地址**。下面代码是找**公共结尾的首地址**。具体思路如下

1. 创建两个静态链表`node_a, node_b`。
2. 分别对两个链表设置位置`order`，同时计算出它们的长度`len1, len2`。
3. 最后对两个链表，从后往前进行对比，若找到第一个不同的结点。将他们输出进行对比，若该结点后的一样的，那就输出，若不一样，则输出-1.

C++
```C++
// 思路：组成两个链表，记录他们的长度，然后从后往前进行比较
#include <cstdio>
#include <algorithm>
using namespace std;
const int maxn = 100010;

struct Node {
    int address, next, order;
    char data;
}node_a[maxn], node_b[maxn], node[maxn];

bool cmp(Node a, Node b) {
    return a.order < b.order;
}

int main() {
    int begin_a, begin_b, n;
    int address;
    scanf("%d%d%d", &begin_a, &begin_b, &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d ", &address);
        scanf("%c%d", &node[address].data, &node[address].next);
        node[address].address = address;
    }
    // init(node_a);
    // init(node_b);
    for (int i = 0; i < maxn; i++) {node_a[i].order = maxn; node_b[i].order = maxn;}
    int len1 = 0, len2 = 0;
    // arrange_order(begin_a, node, node_a, len1);
    // arrange_order(begin_b, node, node_b, len2);
    while(begin_a != -1) {
        node_a[begin_a].address = node[begin_a].address;
        node_a[begin_a].data = node[begin_a].data;
        node_a[begin_a].next = node[begin_a].next;
        node_a[begin_a].order = len1++;
        begin_a = node[begin_a].next;
    }
    while(begin_b != -1) {
        node_b[begin_b].address = node[begin_b].address;
        node_b[begin_b].data = node[begin_b].data;
        node_b[begin_b].next = node[begin_b].next;
        node_b[begin_b].order = len2++;
        begin_b = node[begin_b].next;
    }
    sort(node_a, node_a + maxn, cmp);
    sort(node_b, node_b + maxn, cmp);
    while (len1 > 0 && len2 > 0 && node_a[len1 - 1].address == node_b[len2 - 1].address) {
        len1--;
        len2--;
    }
    if (node_a[len1].address == node_b[len2].address) {
        printf("%05d\n", node_a[len1].address);
    } else {
        printf("-1\n");
    }
    return 0;
}
```
