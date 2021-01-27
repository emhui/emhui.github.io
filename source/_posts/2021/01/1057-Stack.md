---
title: 1057 Stack
date: 2021-01-22 11:51:00
tags: [PAT, 算法, 分块思想, 堆, stack]
categories: [PAT]
math: true
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmmxmp6wqj21kw0w01lc.jpg
---

# 1057 Stack

## 题目

![ZWtFjU](https://gitee.com/yoyhm/oss/raw/master/uPic/ZWtFjU.png)

## 思路

### 分块思想

给定一个序列，该序列随时可能进行添加和删除元素，实时查询该元素中第K大的值。

此处的分块思想，就是把**有序元素划分若干块**.

例如 $\{1,2,3,4,5,6,7,8,9\}$

按照$\sqrt{N}$的依据分组，这里$N$是指序列数量。在这里$N=9$。因此上面序列被划分为

- $\{1,2,3\}$
- $\{4,5,6\}$
- $\{7,8,9\}$

设置两个数组

- `table[x]`表示`x`值的出现次数
- `block[x[`表示所属于`x`块出现的次数

假如给定一个空序列`a = []`，我们插入一个数字$3$,这是需要将$3$所在的区块进行+1，同时对$3$这个元素的`table`中也+1.

```C++
block[3 / 3]++; // 后面3是分组的数量
table[3]++; // 3这个元素的数量+1
```

有上面可以看到第$1$组中的元素多了一个。当我们要查询第$K$个元素的时候，就可以先去查找第$K$个元素在第几组，然后再到该组內找到第$K$个值。

```C++
int K(int k) {
	int blockIdx = 0, n = 0; // blockIdx 表示当前查找第几组， n表示当前第n大的值
	while (n + block[blockIdx] < k) {
		n += block[blockIdx++]; // 若当前组还没找到第K大的值，n直接+上当前的值
	}
	int tableIdx = blockIdx * blockNum; // 找到blockIdx组內存在第K大的值。
	while (n + table[tableIdx] < k) {
		n += table[tableIdx++]; //在第blockIdx组內继续找。
	}
	return tableIdx; // 最后这个下标既是第K大的值。
}
```
---

了解到分块思想后，下面这道题就简单了，需要注意如果是弹出一个元素，那么`block, table`中对应的块和值的数量需要-1.

## 代码

```C++
#include <cstdio>
#include <string>
#include <stack>
#include <cmath>
#include <iostream>
using namespace std;

const int MAX = 100010;
int numBlock = 316;
int table[MAX] = {0}, block[316] = {0};
stack<int> st;

void Push(int val) {
    st.push(val);
    table[val]++; // val值+1
    block[val / numBlock]++; // val所属区间+1
}

void Pop() {
    if (st.empty()) {
        printf("Invalid\n");
        return;
    }
    int val = st.top();
    st.pop();
    table[val]--;
    block[val / numBlock]--;
    printf("%d\n", val);
}

void PeekMedian() {
    if (st.empty()) {
        printf("Invalid\n");
        return;
    }
    // 开始去找第k大的值
    int i = 0, size = st.size(), num = 0;
    int mid = size & 1 ? (size + 1) / 2 : size / 2;
    while (num + block[i] < mid) {
        num += block[i++];
    }
    i = i * numBlock;
    while (num + table[i] < mid) {
        num += table[i++];
    }
    printf("%d\n", i); // i是第 k大的值

}

int main() {
    int n, val;
    string op;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        cin >> op;
        if (op == "Push") {
            cin >> val;
            Push(val);
        } else if (op == "Pop") {
            Pop();
        } else if (op == "PeekMedian") {
            PeekMedian();
        }
    }
}

```
