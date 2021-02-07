---
title: 1125 Chain the Ropes
date: 2021-01-28 17:22:48
tags: [PAT, 数组, 数学, 算法]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6x22sgcj31hc0u0qh8.jpg
---

# 1125 Chain the Ropes (25分)

## 题目

![aGJWm3](https://gitee.com/yoyhm/oss/raw/master/uPic/aGJWm3.png)

## 思路

**题目意思**

题目要求**将所有绳子连接起来**，组成的最大长度是多少。求最后绳子的最大长度。

Given some segments of rope, you are supposed to **chain them into one rope**。

**分析**

因为每次俩俩折叠长度就会减半，所以最长的绳子应该放到最后再折叠。先将绳子进行排序，然后按长度从小到进行连接和折叠。

**问题**

题目中最后输出有一句话

>  The result must be rounded to the nearest integer that is no greater than the maximum length.

这句话不是说结果需要四舍五入吗？但是使用四舍五入的话，最后用例无法通过。奇怪...

## 代码

```C++
#include <vector>
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    int n = 0;
    int sum = 0;
    cin >> n;
    vector<int> ans(n);
    for (int i = 0; i < n; i++) {cin >> ans[i];}
    sort(ans.begin(), ans.end());
    sum = ans[0];
    for (int i = 1; i < n; i++) {
        sum = (sum + ans[i]) / 2;
    }
    printf("%d\n", sum);
    return 0;
}
```


