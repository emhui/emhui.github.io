---
title: 1074 Reversing Linked List (25 分)
date: 2021-02-07 17:31:32
tags: [PAT, 链表]
categories: [PAT]
---

# 1074 Reversing Linked List (25 分)

## 题目

![oiDVqa](https://gitee.com/yoyhm/oss/raw/master/uPic/oiDVqa.png)

## 分析

本题考查 **链表处理**

题目大意，每k个数反转一次。若最后不足k个数，就不用反转。

把数组存储到vector中,然后每k个进行一次反转，若还有剩余，则顺序输出。

注意：**链表的题目中存在无效的链表**，所以最后最好不要直接使用`n`.可以对`n`进行处理或者设置一个变量统计有效链表的个数。

```C++
int temp = begin;
int vaildNum = 0;
while (temp != -1) {
	vlink.push_back(link[temp]);
	temp = link[temp].next;
	vaildNum++;
}

```

## 代码

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MAX = 100000;

struct node{
    int address, next, val;
}link[MAX];

int main() {
    int begin, n, k;
    int address, val, next;
    cin >> begin >> n >> k;
    for (int i = 0; i < n; i++) {
        cin >> address >> val >> next;
        link[address].address = address;
        link[address].val = val;
        link[address].next = next;
    }
    vector<node> vlink;
    int temp = begin;
    while (temp != -1) {
        vlink.push_back(link[temp]);
        temp = link[temp].next;
    }
    n = vlink.size(); // 重要，链表一定要考虑没有用的结点
    // 每k个倒着打印
    for (int i = 0; i < n / k; i ++) {
        for (int j = k * (i + 1) - 1; j >= i * k; j--) {
            if (j == i * k ) { // 如果是最后一个，打印下一个的地址
                if ((i + 2) * k - 1 < n) {
                    printf("%05d %d %05d\n", vlink[j].address, vlink[j].val, vlink[(i + 2) * k - 1].address);
                } else if (n % k == 0){ // 若是最后一个结点直接输出-1
                    printf("%05d %d -1\n", vlink[j].address, vlink[j].val);
                } else {
                    printf("%05d %d %05d\n", vlink[j].address, vlink[j].val, vlink[k * (n / k)].address);
                }
            } else {
                printf("%05d %d %05d\n", vlink[j].address, vlink[j].val, vlink[j - 1].address);
            }
        }
    }
    // 按照顺序打印接下来的结点
    if (n % k != 0) {
        for (int i = k * (n / k); i < n; i++) {
            if (i < n - 1)
            printf("%05d %d %05d\n", vlink[i].address, vlink[i].val, vlink[i + 1].address);
            else
            printf("%05d %d -1\n", vlink[i].address, vlink[i].val);
        }
    }
    return 0;
}

```
