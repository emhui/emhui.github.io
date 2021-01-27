---
title: 1005 Spell It Right
date: 2021-01-18 16:44:41
tags: [PAT, 算法, 哈希表]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmmnrncphj21hc0u07wj.jpg
---

# 1005 Spell It Right

## 题目

![AngAu5](https://gitee.com/yoyhm/oss/raw/master/uPic/AngAu5.png)

## 思路

- $N <= 10^100$。使用`int,long long`类型还是不行的，因此使用`char[]`作为输入。
- 建立一个二维字符数组`num2engilis`.建立数字和英文数字之间映射

```C++
const char num2englis[10][10] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
```

## 代码

```C++
#include <cstdio>
#include <cstring>

const int maxn = 101;
const char num2englis[10][10] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
int main() {
    char s[maxn];
    scanf("%s", s);
    int size = strlen(s);
    int sum = 0, arr[maxn];
    for (int i = 0; i < size; i++) {
        sum += s[i] - '0';
    }
    int num = 0;
    do {
        arr[num++] = sum % 10;
        sum /= 10;
    } while (sum);
    for (int i = num - 1; i >= 0; i--) {
        printf("%s", num2englis[arr[i]]);
        if (i > 0) {printf(" ");}
    }
    printf("\n");
}
```
