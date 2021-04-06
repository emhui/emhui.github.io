---
title: 1070 Mooncake (25 分)
date: 2021-02-08 12:31:25
tags: [PAT, 排序]
categories: [PAT]
---

# 1070 Mooncake (25 分)

## 题目

![SDAaQB](https://gitee.com/yoyhm/oss/raw/master/uPic/SDAaQB.png)

## 分析

本题考查 **结构体排序**。

根据题目列出下面表格

| | 1 | 2 | 3|总|
|-|-|-|-|-|
|总量|180|150|100|
|金额|7.5|7.2|4.5|
|方案|0| 150| 50|9.45|
|单价|$7.5/180 = 0.04$| $7.2/150=0.048$|$4.5/100=0.045$|

从上面可以看到，优先选单价最高的，若有剩余，再选单价第二，若仍有剩余，则依次选择，直到选完。

使用结构体存储总量，价格，单价。再按单价进行排序，挨个选择。

```C++
struct node{
	double totalAmount, totalPrice, price;
};
```

## 代码

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct node{
    // 总量，总价格，单价
    double totalAmount, totalPrice, price;
};

bool cmp(node &a, node &b) {
    return a.price > b.price;
}

int main () {
    int n, d;
    cin >> n >> d;
    vector<node> vn(n);
    for (int i = 0; i < n; i++) cin >> vn[i].totalAmount;
    for (int i = 0; i < n; i++) {
        cin >> vn[i].totalPrice;
        vn[i].price = 1.0 * vn[i].totalPrice / vn[i].totalAmount;
    }
    sort(vn.begin(), vn.end(), cmp);
    double ans = 0;
    for (int i = 0; i < n; i++) {
        if (vn[i].totalAmount == d) {
            ans += vn[i].totalPrice;
            break;
        } else if (vn[i].totalAmount < d) {
            ans += vn[i].totalPrice;
            d -= vn[i].totalAmount;
        } else {
            ans += (vn[i].price * d);
            break;
        }
    }
    printf("%.2lf", ans);
}
```
