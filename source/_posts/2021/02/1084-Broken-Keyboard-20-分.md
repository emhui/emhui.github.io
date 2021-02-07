---
title: 1084 Broken Keyboard (20 分)
date: 2021-02-02 21:11:15
tags: [PAT, 哈希表]
categories: [PAT]
---

# 1084 Broken Keyboard (20 分)

## 题目

![pE3exE](https://gitee.com/yoyhm/oss/raw/master/uPic/pE3exE.png)

## 分析

本题主要是使用**哈希表记录按键数量**

其中两个问题要解决

- 小写字符转大写
- 如何按序输出坏键

**需要将所有小写字符转成大写**

```C++
ch - 'a' + 'A';
```

**输出需要按照原来的顺序输出。这一步怎么实现?**

使用一个变量`has[128]`记录使用键盘键入的字符串中每个字符的数量，然后再去原始的字符串中按顺序进行删除操作。若出现`has[i] < 0`证明该键是缺失的，同时题目要求坏键只输出一遍，因此在用`visited[i]`记录当前坏键是否已经访问，若没有访问就打印出来，并标记为已经访问。

## 代码

```C++
#include <cstdio>
#include <cstring>
const int MAX = 81;

char switch2capital(char ch) {
    if (ch >= 'a' && ch <= 'z') {
            ch = ch - 'a' + 'A';
    }
    return ch;
}

int main() {
    char origin[MAX], type_out[MAX], ch;
    char has[128] ={0};
    bool visited[128] = {false};
    scanf("%s%s", origin, type_out);
    int m = strlen(origin), n = strlen(type_out);
    for (int i = 0; i < n; i++) {
        ch = switch2capital(type_out[i]);
        has[ch]++;
    }
    for (int i = 0; i < m; i++) {
        ch = switch2capital(origin[i]);
        has[ch]--;
        if (has[ch] < 0 && !visited[ch]) {
            visited[ch] = true;
            printf("%c", ch);
        }
    }
    printf("\n");
    return 0;
}
```
