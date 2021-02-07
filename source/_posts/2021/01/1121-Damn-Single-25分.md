---
title: 1121 Damn Single (25分)
date: 2021-01-29 22:04:06
tags: [PAT, 算法, 数组, 哈希表]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmrwx4z3nj21hc0u0k0i.jpg
---

# 1121 Damn Single (25分)

## 题目

![KBBFxB](https://gitee.com/yoyhm/oss/raw/master/uPic/KBBFxB.png)

## 分析

设置两个数组

```C++
const int MAX = 100000;
int couples[MAX];// 存储下标为i对应的对象
bool party[MAX] = {false}; // 下标为i的人是否参加聚会
```
接下来使用`couples`建立映射后，判断一个人是否能参加派对，有下面两个准则

- 如果没有伴侣或有对象，但对象没有参加，自己就参加。
- 如果对象参加了，叫对象退出派对。

代码如下

```C++
// 如果没有伴侣或有对象，但对象没有参加，自己就参加
if (couples[u] == -1 || party[couples[u]] == false) {
	party[u] = true;
	cnt++; // 参加派对人数+1
} else { // 对象参加了，叫对象退出聚会
	party[couples[u]] = false;
	cnt--; // 同时参加派对人数-1
}
```

最后对`party`从小到大判断是否参加了派对，并输出下标。

## 代码

```C++
#include <iostream>
#include <algorithm>
using namespace std;
const int MAX = 100000;
int couples[MAX];// 哈希表，配对使用
bool party[MAX] = {false}; // 若是单身的则参加，不是单身的就退出。

int main() {
    int n, m, u, v;
    fill(couples, couples + MAX, -1);
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> u >> v;
        couples[u] = v;
        couples[v] = u;
    }
    cin >> m;
    int cnt = 0; // 单身人数
    for (int i = 0; i < m; i++) {
        cin >> u;
        // 如果没有伴侣或有对象，但对象没有参加，自己就参加
        if (couples[u] == -1 || party[couples[u]] == false) {
            party[u] = true;
            cnt++;
        } else { // 对象参加了，叫对象退出聚会
            party[couples[u]] = false;
            cnt--;
        }
    }
    printf("%d\n", cnt);
    if (cnt == 0) return 0; // 需要考虑为0的情况。
    int count = 0;
    for (int i = 0; i < MAX; i++) {
        if (party[i]) {
            printf("%05d", i); // 因为编号是5位数字，范围 00000 - 99999
            if (++count < cnt) printf(" ");
        }
    }
    return 0;
}
```
