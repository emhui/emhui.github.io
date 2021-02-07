---
title: 1024 Palindromic Number (25 分)
date: 2021-02-05 15:58:00
tags: [PAT, 回文数]
categories: [PAT]
---

# 1024 Palindromic Number (25 分)

## 题目

![yUU9qd](https://gitee.com/yoyhm/oss/raw/master/uPic/yUU9qd.png)

## 分析

本题考察 **判断回文数**和**两数相加**

**两数相加**一般使用字符串来实现，而如果使用字符串的话，那么判断回文数也就变得简单起来了。下面两段代码分别是两数相加和判断回文数。

```C++
// 判断是否是回文数 s == rev(s)
string rev(string s) {
    reverse(s.begin(), s.end());
    return s;
}

// 两个数字相加
string add(string s) {
    string rev_s = rev(s);
    int remainder = 0, n = s.length();
    for (int i = n - 1; i >= 0; i--) {
        int num = (s[i] - '0') + (rev_s[i] - '0') + remainder;
        s[i] = num % 10 + '0';
        remainder = num / 10;
    }
    if (remainder > 0) return "1" + s;
    else return s;
}

```

本题中注意，如果该字符串本身是回文数，那么需要输出本身，并且次数为0。

例如：
输入

> 12321 5

输出

> 12321 0

## 代码

```C++
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

string rev(string s) {
    reverse(s.begin(), s.end());
    return s;
}

string add(string s) {
    string rev_s = rev(s);
    int remainder = 0, n = s.length();
    for (int i = n - 1; i >= 0; i--) {
        int num = (s[i] - '0') + (rev_s[i] - '0') + remainder;
        s[i] = num % 10 + '0';
        remainder = num / 10;
    }
    if (remainder > 0) return "1" + s;
    else return s;
}

int main() {
    string s, ans;
    int k;
    cin >> s >> k;
    if (s == rev(s)) {
        printf("%s\n0", s.c_str());
        return 0;
    }
    int  i = 0;
    for (i = 1; i <= k; i++) {
        s = add(s);
        if (s == rev(s)) break;
    }
    printf("%s\n%d\n", s.c_str(), i <=k ? i : k);

    return 0;
}
```

## 相似题目

- [1136 A Delayed Palindrome (20分)
](https://emhui.fun/2021/01/25/1136-A-Delayed-Palindrome-20%E5%88%86/)
