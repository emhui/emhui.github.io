---
title: 1069 The Black Hole of Numbers (20 分)
date: 2021-02-08 11:43:26
tags: [PAT, 字符串]
categories: [PAT]
---

# 1069 The Black Hole of Numbers (20 分)

## 题目

![CharIc](https://gitee.com/yoyhm/oss/raw/master/uPic/CharIc.png)

## 分析

这里使用 `string`存储数字，进行内部排序,使用`stoi`分别求出递减和递增的数字,求出它们的结果转成`string`再进行下一轮的计算，直到结果为`6174`或`0000`.

注意：因为可能输入的数字和`a-b`的结果都可能存在不满4位数情况。所以需要进行一个补0操作。

```C++
while (s.size() != 4) {
		s = "0" + s;
}
```

## 代码

```C++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string nonincreasing(string s) {
    sort(s.begin(), s.end(), greater<char>());
        return s;
}

string nondecreasing(string s) {
    sort(s.begin(), s.end());
    return s;
}

int main() {
    string s;
    cin >> s;

    // 如果输入的不是四位数，则在前面补0
    while (s.size() != 4) {
            s = "0" + s;
    }

    int result = 0;
    while (result != 6174) {
        int a = stoi(nonincreasing(s));
        int b = stoi(nondecreasing(s));
        if (a == b) {
            printf("%s - %s = 0000\n", s.c_str(), s.c_str());
            return 0;
        }
        result = a - b;
        printf("%04d - %04d = %04d\n", a, b, result);
        s = to_string(result);

        while (s.size() != 4) { //补充0
            s = "0" + s;
        }
    }
    return 0;
}
```
