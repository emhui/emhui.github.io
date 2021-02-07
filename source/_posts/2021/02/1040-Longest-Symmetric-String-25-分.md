---
title: 1040 Longest Symmetric String (25 分)
date: 2021-02-06 09:46:21
tags: [PAT, 回文数, 双指针, 滑动窗口]
categories: [PAT]
---

# 1040 Longest Symmetric String (25 分)

## 题目

![UvjZhH](https://gitee.com/yoyhm/oss/raw/master/uPic/UvjZhH.png)

## 分析

本题考查 **回文数**，**双指针**，**滑动窗口**

题目要求找到最大长度的对称数，而对称数本身就是回文数。所以题目转化成了对回文数的判断。

最大长度的回文数如何判断，按照下面规则

- 从第1个元素开始，分别取到第2,3,4,5...n个元素的字符串，判断是否是回文数
- 从第2个元素开始，分别取到第3,4,5...n个元素的字符串，判断是否是回文数
- 从第3个元素开始，分别取到第4,5...n个元素的字符串，判断是否是回文数
- ...
- 从第n个元素开始，分别取到第n个元素的字符串，判断是否是回文数

从上面的结果中取出最大长度就是答案。

## 代码

```C++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string rev(string s) {
    reverse(s.begin(), s.end());
    return s;
}

int main() {
    string s;
    getline(cin, s);
    int n = s.size();
    int maxLength = 0;
    for (int i = 0; i < n; i++) {
        for (int len = 1; len <= n - i; len++) { // len是每次选择的长度
            if (s.substr(i, len) == rev(s.substr(i, len))) {
                maxLength = max(maxLength, len);
            }
        }
    }
    printf("%d\n", maxLength);
    return 0;
}
```

## 其他

C++读取一行元素

```C++
getline(cin, s);
```
