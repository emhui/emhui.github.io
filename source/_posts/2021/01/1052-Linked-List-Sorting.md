---
title: 1052 Linked List Sorting
date: 2021-01-12 18:02:11
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmrsj1jekj21hc0u0dox.jpg
tags: [PAT, 算法, C++, 链表, 排序]
categories: [PAT]
---

# 1052 Linked List Sorting

## 题目

{% note warning %}
仔细看题，考虑周全
{% endnote %}

![题目](https://gitee.com/yoyhm/oss/raw/master/uPic/7Q2QCm.png)

## 思路

这道题和之前的题目一样，使用静态数组，然后进行排序。但是排序需要注意。因为存在无效数据，所以对于无效的结点，需要将结点放到最后面，然后再根据`key`值进行排序。

`cmp`函数

```C++
bool cmp(Node a, Node b) {
    if (a.flag == false || b.flag == false) { // 若是无效数据，就放到后面去，若数据有效，则根据key值放到前面
        return a.flag > b.flag;
    } else {
        return a.key < b.key;
    }
}
```

⚠️

- 记住有无效数据，即结点不在给定的头结点链表中，这些数据需要排除。通过设置`flag`来判断它是否存在。
- 需要考虑有效结点数量为0，设置`count`统计有效结点数量。

下面代码是实现有效结点的统计和标记


```C++
int p = head, count = 0;
while (p != -1) {
	node[p].flag = true;
	count++;
	p = node[p].next;
}
```

## 代码

```C++
#include <cstdio>
#include <algorithm>
using namespace std;
const int maxn = 100010;

struct Node {
    int address, key, next, order;
    bool flag;
}node[maxn];

bool cmp(Node a, Node b) {
    if (a.flag == false || b.flag == false) { // 若是无效数据，就放到后面去，若数据有效，则根据key值放到前面
        return a.flag > b.flag;
    } else {
        return a.key < b.key;
    }
}

int main() {
    int head, n;
    int address;
    int order = 0;
    for (int i = 0; i < maxn; i++) {
        node[i].key = maxn;
        node[i].flag = false; // 过滤无效结点
    }

    scanf("%d%d", &n, &head);
    for (int i = 0; i < n; i++) {
        scanf("%d", &address);
        scanf("%d%d", &node[address].key, &node[address].next);
        node[address].address = address;
    }

    int p = head, count = 0;
    while (p != -1) {
        node[p].flag = true;
        count++;
        p = node[p].next;
    }

    if (count == 0) {
        printf("0 -1\n");
    } else {
        n = count;
        sort(node, node + maxn, cmp); // 按照order进行排序
        printf("%d %05d\n", n, node[0].address);
        for (int i = 0; i < n - 1; i++) {
            printf("%05d %d %05d\n", node[i].address, node[i].key, node[i + 1].address);
        }
        printf("%05d %d -1\n", node[n - 1].address, node[n - 1].key);
    }
    return 0;
}
```
