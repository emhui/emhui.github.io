---
title: 1001 A+B Format
date: 2021-01-18 16:06:19
tags: [PAT, 数学, 算法]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/0060lm7Tly1ftg6oqfp3aj318g0p0k4h.jpg
---

# 1001 A+B Format

## 题目

![FpwMfH](https://gitee.com/yoyhm/oss/raw/master/uPic/FpwMfH.png)

## 思路

本题通过$a+b$得到一个新的值，新的值按照三个一组的格式输出，每组前面一个逗号。

因此可以考虑将新的值拆解到数组中，再倒序输出数组，每当三个的时候输出一个逗号。

⚠️： 如果结果是负数，需要取负数的绝对值进行运算。但是最好不要使用`abs`。经过测试，这个函数在有的编译器无法编译。考虑如果是负数对其取反即可。

## 代码

```C++
#include <cstdio>
#include <cmath>

int main() {
    int a,b;
    scanf("%d%d", &a, &b);
    int n = a + b;
    int temp = n < 0 ? 0 - n : n;
    int num = 0, arr[10];
    do {
        arr[num++] = temp % 10;
        temp /= 10;
    } while (temp);
    if (n < 0) {printf("-");}
    for (int i = num - 1; i >= 0; i--) {
        printf("%d", arr[i]);
        if (i % 3 == 0 && i != 0) {printf(",");}
    }
    printf("\n");
    return 0;
}
```
