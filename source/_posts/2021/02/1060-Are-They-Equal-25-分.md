---
title: 1060 Are They Equal (25 分)
date: 2021-02-17 20:15:32
tags: [PAT]
categories: [PAT]
math: true
---

# 1060 Are They Equal (25 分)

## 题目

![g4Rv0Q](https://gitee.com/yoyhm/oss/raw/master/uPic/g4Rv0Q.png)

## 分析

本题考查 **科学计数法**

将字符串的小数点和最开始的0去除掉，再计算它的指数。这样比较最简单。现在将给定的字符分成两种类型。

1. $0.a_{1}a_{2}...a_{n}$
2. $b_{1}b_{2}...b{n}.a_{1}a_{2}...a_{m}$

针对第一种，去除最前面的0，有的用例有前面有很多0（$0000.0123$）。去除小数点前面的多余的0后，指数部分等于从小数点开始到第一个非0数字的距离的反数，比如$0.0123$的指数等于$-1$

第二种情况，同样也是把前面多余的0去除掉，指数部分等于第一个非零的数字到小数点或最后一个数字的距离。例如$00123.234$中指数等于$3$。

注意，最后如果精度（长度）不够，还需要补充0.

## 代码

```C++
#include <iostream>
#include <string>
using namespace std;

void deal(string &s, int &e, int n)
{
    // 1. 除去所有的0，和小数点。
    // 先去掉前面的0
    int idx = 0;
    while (s.length() > 0 && s[0] == '0')
        s.erase(s.begin());
    // 去除掉0后，看是否是小数点或者是整数
    if (s[0] == '.')
    { // 如果是小数点，证明是个小于1的数字，去除后面的0
        s.erase(s.begin());
        while (s.length() > 0 && s[0] == '0')
        {
            s.erase(s.begin());
            e--;
        }
    }
    else
    { // 大于1的数字，计算到小数点或到最后一个数（不存在小数的话）的个数
        int k = 0;
        while (k < s.length() && s[k] != '.')
        {
            k++;
            e++;
        }
        if (k < s.length())
        { // 证明存在小数点，删除小数点
            s.erase(s.begin() + k);
        }
    }

    if (s.length() == 0)
        e = 0; // 如果这个数为0的话，e=0
    if (s.length() > n)
        s.erase(s.begin() + n, s.end());
    else if (s.length() < n)
    { // 不够就补充0
        int k = n - s.length();
        for (int i = 0; i < k; i++)
            s += '0';
    }
}

int main()
{
    int n, e1 = 0, e2 = 0;
    string s1, s2;
    cin >> n >> s1 >> s2;
    deal(s1, e1, n);
    deal(s2, e2, n);
    if (s1 == s2 && e1 == e2)
    {
        printf("YES 0.%s*10^%d\n", s1.c_str(), e1);
    }
    else
    {
        printf("NO 0.%s*10^%d 0.%s*10^%d\n", s1.c_str(), e1, s2.c_str(), e2);
    }
}
```
