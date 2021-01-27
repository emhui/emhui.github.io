---
title: 1133 Splitting A Linked List
date: 2021-01-27 10:29:34
tags: [PAT, 算法, 链表]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmmt281h4j21hc0u07wj.jpg
---

# 1133 Splitting A Linked List (25分)

## 题目

![bTEawP](https://gitee.com/yoyhm/oss/raw/master/uPic/bTEawP.png)

## 思路

本题目不要想太复杂了

题目意思

给定一个链表和一个k。在不打乱相对链表顺序的情况下，满足下面三个条件。

- A: 小于0的结点按相对顺序排在前面。
- B: 小于等于k大于等于0的结点按原来相对顺序排在A的后面
- C: 大于k的结点排在B的后面。

本题的链表需要使用数组存储，因此可以建立一个结点`vector<Node> ans`。分三次分别遍历原来的链表，依次将`node.val < 0, node.val >= 0 and node.val <= k, node.avl > k`添加到`ans`中。

相似题目[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)，这道题目由于给出的是指针，因此可以直接设置两个链表，分别存储小于等于k的结点和大于k的结点，再将小于k的结点尾结点连接到大于k的首结点即可。

## 代码

```C++
// 先建立一个链表，使用树状结构
// 1. 负数按照原来顺序在前. 2.
#include <cstdio>
#include <vector>
using namespace std;

const int MAX = 100001;
struct Node{
    int address, val, next = -1;
}node[MAX];

int main() {
    int begin, n, address, next, val, k;
    scanf("%d%d%d",&begin, &n, &k);
    while (n--) {
        scanf("%d%d%d", &address, &val, &next);
        node[address] = {address, val, next};
    }
    int nn = -1, prenn, ns = -1, prens, nl = -1, prenl;
    vector<Node> ans;
    int head = begin;
    while (head != -1) {
        if (node[head].val < 0) {ans.push_back(node[head]);}
        head = node[head].next;
    }
    head = begin;
    while (head != -1) {
        if (node[head].val <= k && node[head].val >= 0) { ans.push_back(node[head]);}
        head = node[head].next;
    }
    head = begin;
    while (head != -1) {
        if (node[head].val > k) { ans.push_back(node[head]);}
        head = node[head].next;
    }

    for (int i = 0; i < ans.size(); i++) {
        if (i < ans.size() - 1) {
            printf("%05d %d %05d\n", ans[i].address, ans[i].val, ans[i + 1].address);
        } else {
            printf("%05d %d -1\n", ans[i].address, ans[i].val);
        }
    }
    return 0;
}
```
