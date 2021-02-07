---
title: 1108 Finding Average (20分)
date: 2021-01-31 21:59:05
tags: [PAT, 数学]
categories: [PAT]
---

# 1108 Finding Average (20分)

## 题目

![2VgDDa](https://gitee.com/yoyhm/oss/raw/master/uPic/2VgDDa.png)

## 分析

给定n个数字，求平均值,过滤一些无效数据

> 7
>
> 5 -3.2 aaa 9999 2.3.4 7.123 2.35

如何判断输入值合法

1. 判断是否是数字，存在多个`.,-`符号。

> 主要过滤 aaa 2.3.4 -2-1-1 这类数据

```C++
// 判断是否是合格数字，存在多个.,-符号。
bool isDigit(string s) {
    int cnt_dot = 0, cnt_neg = 0;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '-') {
            cnt_neg++;
            if (cnt_neg > 1) return false; // 存在多个-号
            continue;
        }
        if (s[i] == '.') {
            cnt_dot++;
            if (cnt_dot > 1) return false; // 存在多个小数点
            continue;
        }
        if(s[i] < '0' || s[i] > '9') return false;
    }
    return true;
}
```

2. 如何判断数字是否有效

> 主要过滤超过三位小数的数字，例如 1.234

```C++
bool isVaildFact(string s) {
    int i;
    for (i = 0; i < s.size(); i++) {
        if (s[i] == '.') break;
    }
    // 不是小数直接返回
    if (i == s.size()) return true;
    return s.size() - i - 1 <= 2;
}
```

3. 过滤超出范围的数字

```C++
bool isRange(int n) {
	if (n >= -1000 && n <= 1000) return true;
	else return false;
}
```

## 代码

```C++
#include <iostream>
#include <string>
using namespace std;

// 判断是否是合格数字，存在多个.,-符号。
bool isDigit(string s) {
    int cnt_dot = 0, cnt_neg = 0;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '-') {
            cnt_neg++;
            if (cnt_neg > 1) return false; // 存在多个-号
            continue;
        }
        if (s[i] == '.') {
            cnt_dot++;
            if (cnt_dot > 1) return false; // 存在多个小数点
            continue;
        }
        if(s[i] < '0' || s[i] > '9') return false;
    }
    return true;
}

// 1. 首先判断是否是合格小数
// 若发现小数点，则从小数开始枚举存在多少位
bool isVaildFact(string s) {
    int i;
    for (i = 0; i < s.size(); i++) {
        if (s[i] == '.') break;
    }
    // 不是小数直接返回
    if (i == s.size()) return true;
    return s.size() - i - 1 <= 2;
}

int main() {
    int n, cnt_vaild = 0;
    string s;
    double sum = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> s;
        if (isDigit(s) && isVaildFact(s) && (stod(s) <= 1000 && stod(s) >= -1000)) {
            sum += stod(s);
            cnt_vaild++;
        } else {
            printf("ERROR: %s is not a legal number\n", s.c_str());
        }
    }
    if (cnt_vaild == 0) {
        printf("The average of 0 numbers is Undefined\n");
    } else if (cnt_vaild == 1) {
        printf("The average of 1 number is %.2lf\n", sum);
    } else {
        printf("The average of %d numbers is %.2lf\n", cnt_vaild, sum / cnt_vaild);
    }
    return 0;
}
```
