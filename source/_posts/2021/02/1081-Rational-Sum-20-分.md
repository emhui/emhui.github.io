---
title: 1081 Rational Sum (20 分)
date: 2021-02-07 10:53:38
tags: [PAT, 最大公约数]
categories: [PAT]
---

# 1081 Rational Sum (20 分)

## 题目

![bxZZQx](https://gitee.com/yoyhm/oss/raw/master/uPic/bxZZQx.png)

## 分析

本题考查**如何表示分数形式**和**求最大公约数**。

如何表示分数

```C++
// 将m/n以正确形式表示出来
void showFormat(int m, int n) {
	if (n == 0) {
		printf("INF\n");
		return;
	}
	if ((m > 0 && n < 0) || (m < 0 && n > 0)) printf("-");
	m = abs(m);
	n = abs(n);
	// 如果可以整除
	if (m % n == 0) {
		printf("%d", m / n);
	} else {
		// 注意这里需要转成最大公约数
		if (m > n) {
			printf("%d %d/%d", m / n, m % n, n);
		} else {
			printf("%d/%d", m % n, n);
		}
	}
}
```

如何求两个数的最大公约数

```C++
// 12, 4
// gcd(12, 4) return 4;
// gcd(4, 0) return 4;
int gcd(int a, int b) {
	if (b == 0) {
		return a;
	} else {
		return gcd(b, a % b);
	}
}

// 4, 12
// gcd(4, 12) return 4;
// gcd(12, 4) return 4;
// gcd(4, 0) return 4;
int gcd(int a, int b) {
	return b == 0 ? a : gcd(b, a % b);
}
```

题目中如果一次性加起来，肯定会出现溢出。所以需要在每次输入的时候进行计算，并且进行约分。

## 代码

```C++
#include <cstdio>
#include <cmath>

int gcd(int m, int n) {
    return n == 0 ? m : gcd(n, m % n);
}

void showFormat(int m, int n) {
	if (n == 0) {
		printf("INF\n");
		return;
	}
    // 这里经过约分处理，所以可以直接使用 m*n < 0
	if ((m > 0 && n < 0) || (m < 0 && n > 0)) printf("-");
    // if (m * n < 0) printf("-");
	m = abs(m);
	n = abs(n);
	// 如果可以整除
	if (m % n == 0) {
		printf("%d\n", m / n);
	} else if (m > n){
		// 注意这里需要转成最大公约数,之前已经进行过约分处理
		printf("%d %d/%d\n", m / n, m % n, n);
	} else {
        printf("%d/%d\n", m % n, n);
    }
}

int main() {
    int n;
    int a1, b1, a = 0, b = 1;
    int numerator, denominator, g;
    scanf("%d", &n);
    // numerator < denominator
    for (int i = 0; i < n; i++) {
        scanf("%d/%d", &a1, &b1);
        // 进行加法计算
        numerator = a1*b + a * b1; // 分子
        denominator = b1 *b; // 分母
        g = gcd(numerator, denominator);
        a = numerator / g;
        b = denominator / g;
    }
    showFormat(a, b);
}
```

## 相似题目

- [1088 Rational Arithmetic (20 分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805378443755520)
