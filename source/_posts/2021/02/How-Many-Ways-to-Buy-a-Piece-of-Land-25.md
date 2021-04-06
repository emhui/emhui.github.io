---
title: How Many Ways to Buy a Piece of Land (25)
date: 2021-02-22 11:24:29
tags: [PAT, 二分法]
categories: [PAT]
---

# How Many Ways to Buy a Piece of Land (25)

## 题目

![M2EwJZ](https://gitee.com/yoyhm/oss/raw/master/uPic/M2EwJZ.png)

## 分析

题目大意

买土地，土地连成一排，除了首尾，每块土地都连接着。你的任务是告诉顾客（有限的金钱），他有多少种购买方法。

输入

正整数N：土地数量（编号1-N）
正整数M：顾客拥有的钱的数量

接下来一行，N个正整数，表示第i块土地的价值。

> 5 85
>
> 38 42 15 24 9


输出

输出最后不同的方法总方案

> 11

### 分析

本题考查 **二分法**

这道题和**shopping in mars**很相似，也可以说几乎一样。只是那道题是等于或接近于总金额。而这道题需要将i,j范围内的值累加即可。

使用前缀和存储数据，然后使用循环每个值，找到它的右侧第一个大于`preSum[i] + m`的下标，两个值的范围即是一个解，最后累加所有的结果即可。

## 代码

```C++
#include <iostream>
#include <vector>
using namespace std;

int upper_bound(vector<int>& nums, int low, int high, int x) {
    int mid;
    while (low < high) {
        mid = (low + high) >> 1;
        if (nums[mid] > x) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main() {
    int n, m, val;
    cin >> n >> m;
    vector<int> preSum(n + 1, 0);
    for (int i = 0; i < n; i++) {
        cin >> val;
        preSum[i + 1] = preSum[i] + val;
    }
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int j = upper_bound(preSum, i, n + 1, preSum[i - 1] + m)
        ans += j - i;
    }
    printf("%d\n", ans);
}
```
