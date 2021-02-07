---
title: 1035 Password (20 分)
date: 2021-02-05 19:27:13
tags: [PAT]
categories: [PAT]
---

# 1035 Password (20 分)

## 题目

![DkY1lt](https://gitee.com/yoyhm/oss/raw/master/uPic/DkY1lt.png)

## 分析

题目意思

字符串中

- `1,l`容易混淆
- `0,O`容易混淆

解决方法，按照下面规则替换

- `1 -> @`
- `0 -> %`
- `l -> L`
- `O -> o`

注意，题目要求只需要修改密码部分。

题目比较简单，直接对上面四种情况进行判断即可。

这里使用`pair<string, string>`存储`account, password`

## 代码

```C++
#include <iostream>
#include <utility>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    string account, passowrd;
    vector<pair<string,string>> vpss;
    bool isModify = false;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> account >> passowrd;
        isModify = false;
        // 1-@,0-%,l-L,O-o
        for (int i = 0; i < passowrd.size(); i++) {
            if (passowrd[i] == '1') {
                passowrd[i] = '@';
                isModify = true;
            }
            if (passowrd[i] == '0') {
                passowrd[i] = '%';
                isModify = true;
            }
            if (passowrd[i] == 'l') {
                passowrd[i] = 'L';
                isModify = true;
            }
            if (passowrd[i] == 'O') {
                passowrd[i] = 'o';
                isModify = true;
            }
        }
        if (isModify) {
            vpss.push_back(make_pair(account, passowrd));
        }
    }
    int size = vpss.size();
    if (size > 0) {
        printf("%d\n", size);
        for (int i = 0; i < size; i++) {
            printf("%s %s\n", vpss[i].first.c_str(), vpss[i].second.c_str());
        }
    } else if (n == 1) {
        printf("There is 1 account and no account is modified\n");
    } else {
        printf("There are %d accounts and no account is modified\n", n);
    }
}
```
