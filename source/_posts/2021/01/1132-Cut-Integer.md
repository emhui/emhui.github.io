---
title: 1132 Cut Integer
date: 2021-01-27 10:28:45
tags: [PAT, 算法]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmmyljiepj21kw0w0qvf.jpg
---

# 1132 Cut Integer (20分)

# 题目

![ycx7UH](https://gitee.com/yoyhm/oss/raw/master/uPic/ycx7UH.png)

## 分析

题目意思

本题将一个数组分成两段，题目已保证它的该数字的位数是偶数位，然后判断是否可是被分成两端的数组乘积整除。

思路

一开始使用char字符数组来实现，但是转化成数字这些步骤比较繁琐。可以直接使用`string, stoi()`等实现数组分割，字符串转数字。这样代码会简洁很多。

## 代码

```C++
// 分析: 数字使用字符数组进行输入，然后分别分割成 Z, A, B。 若Z是奇数，则直接输入NO
#include <string>
#include <iostream>
using namespace std;

int main() {
    int n;
    string s;
    scanf("%d", &n);
    while (n--) {
        cin >> s;
        int size = s.size();
        int Z =  stoi(s);
        int A = stoi(s.substr(0, size / 2));
        int B = stoi(s.substr(size / 2));
        if ((A * B != 0) && (Z % (A * B) == 0)) printf("Yes\n");
        else printf("No\n");
    }
}
```

## 其他

- 段错误


![Jk7X8h](https://gitee.com/yoyhm/oss/raw/master/uPic/Jk7X8h.png)

段错误可能是分母为0，所以需要注意分母为0的情况。

- ** It is guaranteed that the number of digits of Z is an even number.** 经常会出现这种** It is guaranteed that xxxx**

这句话的意思是题目本身输入的数据就保存有效性，所以对于这句话中的条件不需要去判断。
