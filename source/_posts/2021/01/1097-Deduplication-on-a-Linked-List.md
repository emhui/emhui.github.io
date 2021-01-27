---
title: 1097 Deduplication on a Linked List
date: 2021-01-13 16:35:13
tags: [PAT, 链表, 算法, C++]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6x22sgcj31hc0u0qh8.jpg
---

# 1097 Deduplication on a Linked List

## 题目

![hpuYZC](https://gitee.com/yoyhm/oss/raw/master/uPic/hpuYZC.png)

## 思路

本题目的是**给定一个链表，按顺序删除结点中绝对值重复的链表，并且将删除后的结点按顺序输出，然后再按序输出被删除的结点**

具体步骤

1. 创建一个静态链表，存储结点信息。其中使用`order`表示结点在链表中的顺序。先将所有的结点`order=2*maxn`。然后非重复的结点`order`从`0`开始，重复的结点`order`从`maxn + i`开始。
2. 使用一个`isExist`判断结点值是否重复。
3. 设置两个变量`vaildCount,removeCount`分别表示非重复结点和被删除结点数量。在使用`begin`遍历结点顺序的时候，分别设置结点的`order`。下面是关键代码

```C++
while (begin != -1) {
	if (!isExist[abs(node[begin].data)]) {
		isExist[abs(node[begin].data)] = true;
		node[begin].order = vaildCount++;
	} else {
		node[begin].order = maxn + removeCount++;
	}
	begin = node[begin].next;
}
```

4. 对结点按照`order`排序，无效结点`order=2*maxn`都会被排到后面。而`0 ~ vaildCount - 1`为非重复结点。`vaildCount ~ vaildCOunt + removeCount - 1`为被删除结点。

⚠️会有不出现在给定链表上的结点，为无效结点。

## 代码

```C++
#include <cstdio>
#include <algorithm>
#include <cstring>
using namespace std;
const int maxn = 100010;
bool isExist[2 * maxn + 1];

struct Node {
    int address, data, next;
    int order; // 标记结点在原来数组的位置。删除的结点设置为maxn+remveCount
}node[maxn];

bool cmp(Node a, Node b) {
    return a.order < b.order;
}
int main() {
    memset(isExist, false,  sizeof(isExist));
    int begin, n, address, vaildCount = 0, removeCount = 0;
    scanf("%d%d", &begin, &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &address);
        scanf("%d%d", &node[address].data, &node[address].next);
        node[address].address = address;
    }
    for (int i = 0; i < maxn; i++) {node[i].order = 2 * maxn;}

    while (begin != -1) {
        if (!isExist[abs(node[begin].data)]) {
            isExist[abs(node[begin].data)] = true;
            node[begin].order = vaildCount++;
        } else {
            node[begin].order = maxn + removeCount++;
        }
        begin = node[begin].next;
    }
    sort(node, node+maxn,cmp);
    int allCount = vaildCount + removeCount;
    for (int i = 0; i < allCount; i++) {
        if (i != vaildCount-1 && i != allCount - 1) {
            printf("%05d %d %05d\n", node[i].address, node[i].data, node[i + 1].address);
        } else {
            printf("%05d %d -1\n", node[i].address, node[i].data);
        }
    }
    return 0;
}
```
