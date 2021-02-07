---
title: 1073 Scientific Notation (20 分)
date: 2021-02-07 16:28:04
tags: [PAT, 字符串]
categories: [PAT]
---

# 1073 Scientific Notation (20 分)

## 题目

<img src="https://gitee.com/yoyhm/oss/raw/master/uPic/ivWsUd.png" alt="ivWsUd" style="zoom:50%;" />

## 分析

本题大意是给出一个科学计数法表示的数字，然后还原为真实的数字

本题查考 **字符串的处理**和**科学计数法的表示**

` [+-][1-9].[0-9]+E[+-][0-9]+`

> +1.23400E-03 -> 0.00123400
>
> -1.2E+10 -> -12000000000

1. 先把E的前面和后面分成两部分。


2. 根据E后面的指数进行分类

如果指数是负的，输出形式位`0.0000xxx`,其中`xxx`是除了小数点外的整数部分。

`xxxx`到`.`之间的`0`的个数是`abs(exp) - 1`. 具体代码如下

```C++
int exp; // 指数
printf("0.");
for (int i = 0; i < abs(exp) - 1; i++) printf("0");
// 输出除小数点外的其他数字。
```

如果指数是正的，小数点如何移动？？？

❌ 输出除小数点的其他数字再补0。(👇这种情况就会出现错误)

> --------------示例-----------------// 小数位数 | 关系 | 指数 | 操作
>
> -1.2345E+03 = -1234.5 	// 4 > 3: 移动小数点，不能补0
>
> -1.2345E+04 = -12345 	// 4 = 4, 不用补0，也不用补小数点.
>
> -1.2345E+08 = -123450000; // 4 < 8 没有小数点，补4个0

根据上面可以得出，指数为正数时

```C++
int num; // 小数位数
int exp; // 指数

if (num == exp) {
	// 直接显示除小数点外的其他数字
} else if (num > exp) {
	// 将小数点移动exp位，不需要补充0
} else {
	// 不显示小数点，并且补充 exp - num 个0.
}
```

## 代码


```C++
#include <string>
#include <algorithm>
#include <cmath>
#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 0. 判断是否是负数
    if (s[0] == '-') printf("-");
    // 1. 找到E的位置
    // int n = s.size();
    int pos = s.find("E"); // pos == s.npos; 没有找到

    int exp = stoi(s.substr(pos + 1)); // 绕过E的位置

    if (exp == 0) {
        printf("%s
", s.substr(1, pos - 1).c_str()); // 绕开第一个+/-,取 pos - 1个元素
    }
    if (exp < 0) { // 如果指数是负的
        printf("0.");
        for (int i = 0; i < abs(exp) - 1; i++) printf("0");
        // E的左边部分输出除了小数点其他数字
        printf("%c%s
", s[1], s.substr(3, pos - 3).c_str());
    } else {
        // 开始移动小数点
        // 首先找到有几位小数
        int num = pos - 3;
        // 分三种情况判断
        if (num == exp) { // 没有小数点也没有多余的0，直接输出除了小数点部分的数字
            printf("%c%s
", s[1], s.substr(3, pos - 3).c_str());
        } else if (num > exp) {
            // 不需要补0，但是需要移动小数点
            // 小数点移动 exp位
            printf("%c%s.%s
", s[1], s.substr(3, exp).c_str(), s.substr(3 + exp , num - exp).c_str());
        } else {
            // 没有小数点，并且输出多余的0
            printf("%c%s", s[1], s.substr(3, pos - 3).c_str());
            for (int i = 0; i < exp - num; i++) printf("0");
            printf("
");
        }

    }
    return 0;
}
```
