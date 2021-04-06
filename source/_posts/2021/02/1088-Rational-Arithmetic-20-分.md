---
title: 1088 Rational Arithmetic (20 分)
date: 2021-02-17 16:23:01
tags: [PAT]
categories: [PAT]
---

# 1088 Rational Arithmetic (20 分)

## 题目

![DMhdGn](https://gitee.com/yoyhm/oss/raw/master/uPic/DMhdGn.png)

## 分析

本题考查 **分数四则运算、化简和输出正确格式**

分数四则运算可以参考 [分数四则运算](https://emhui.fun/2021/02/17/%E5%88%86%E6%95%B0%E5%9B%9B%E5%88%99%E8%BF%90%E7%AE%97/)

## 代码

```C++
#include <iostream>
#include <cmath>
using namespace std;

// 求最大公约数
long long gcd(long long m, long long n) {
    return n == 0 ? m : gcd(n, m % n);
}

// 分数化简
void reduction(long long &m, long long &n) {
    if (n < 0) {
        m = -m;
        n = -n;
    }

    if (m == 0) {
        n = 1;
    } else {
        long long d = gcd(abs(m), abs(n));
        m /= d;
        n /= d;
    }
}

// 打印正确格式
void showFormat(long long m, long long n) {
    if (n == 0) {
        printf("Inf");
        return;
    }
    reduction(m, n); // 化简
    if (m < 0) printf("(");
    if (n == 1) printf("%lld", m); // 整数
    else if (abs(m) > n) printf("%lld %lld/%lld", m / n, abs(m) % n, n); // 假分数
    else printf("%lld/%lld", m, n); // 真分数
    if (m < 0) printf(")");
}

int main() {
    long long a, b, c, d;
    scanf("%lld/%lld %lld/%lld", &a, &b, &c, &d);
    showFormat(a, b); printf(" + "); showFormat(c, d); printf(" = "); showFormat(a * d + b * c, b * d); printf("\n");
    showFormat(a, b); printf(" - "); showFormat(c, d); printf(" = "); showFormat(a * d - b * c, b * d); printf("\n");
    showFormat(a, b); printf(" * "); showFormat(c, d); printf(" = "); showFormat(a * c, b * d); printf("\n");
    showFormat(a, b); printf(" / "); showFormat(c, d); printf(" = "); showFormat(a * d, b * c); printf("\n");
    return 0;
}
```

## 相似题目

- [1081 Rational Sum (20 分)](https://emhui.fun/2021/02/07/1081-Rational-Sum-20-%E5%88%86/)
