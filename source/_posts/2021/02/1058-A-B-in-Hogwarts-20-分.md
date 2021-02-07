---
title: 1058 A+B in Hogwarts (20 分)
date: 2021-02-06 10:56:03
tags: [PAT]
categories: [PAT]
---

# 1058 A+B in Hogwarts (20 分)

## 题目

![5DShR6](https://gitee.com/yoyhm/oss/raw/master/uPic/5DShR6.png)

## 分析

本题考查 **比较大的整数加法**，**不同单位转化（比如转成时分秒）**

**比较大的整数加法**

对于比较大的整数，使用`long long`类型，如果整数还是很大，比如超过$2^{63} - 1$，则使用`string`类型表示。

本题中需要对`int`类型强制转换。

```C++
// 前面需要加（long long）
long long sum = (long long)Galleon * (a1 + a2) + Sickle * (b1 + b2) + (c1 + c2);
```

**不同单位转化**

比较常见的应用就是时分秒的转化。比如给你一个n秒，让你转成时分秒的格式。

```C++
long long n;
long long h = n / 3600;
long long m = n / 60 % 60;
long long s = n % 60;
```

本题中对`Galleon, Sickle, Knuts`的转化如下

```C++
printf("%lld.%lld.%lld\n", sum / Galleon, sum % Galleon / Sickle, sum % Sickle);
```

## 代码

```C++
#include <cstdio>

// Seventeen silver Sickles to a Galleon and twenty-nine Knuts to a Sickle
// 17s = 1g, 29k = 1s, 29 * 17k = 1g;
const int Galleon = 17 * 29;
const int Sickle = 29;
const int Knut = 1;

int main() {
    int a1, b1, c1, a2, b2, c2;
    scanf("%d.%d.%d %d.%d.%d", &a1, &b1, &c1, &a2, &b2, &c2);

    long long sum = (long long)Galleon * (a1 + a2) + Sickle * (b1 + b2) + (c1 + c2);

    printf("%lld.%lld.%lld\n", sum / Galleon, sum % Galleon / Sickle, sum % Sickle);

    return 0;
}
```
