---
title: 1116 Come on! Let's C (20分)
date: 2021-01-30 22:28:02
tags: [PAT, 数学, 哈希表]
categories: [PAT]
---

# 1116 Come on! Let's C (20分)

## 题目

![BXzC5Q](https://gitee.com/yoyhm/oss/raw/master/uPic/BXzC5Q.png)

## 分析

初始化一个大的数组，其中数组下标表示该用户id，数组值表示他的排名，排名从1开始，其中没有排名的用户值为-1.

在使用一个数组记录是否已经得过奖品，得过奖品就不给了。

其他的就是对素数，是否是冠军进行判断。

注意：这里排名是从1开始的。

```C++
#include <iostream>
#include <algorithm>
using namespace std;

const int MAX = 10001;
int ranklist[MAX] = {-1}; // 这种初始化方式无效 ~~所有人初始排名为-1;~~
bool visited[MAX] = {false}; // 是否参与了排名

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {return false;}
    }
    return true;
}

int main() {
    fill(ranklist, ranklist + MAX, -1);
    int n, k, id;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> id;
        ranklist[id] = i;
    }
    cin >> k;
    while (k--) {
        cin >> id;
        if (ranklist[id] == -1) {
            printf("%04d: Are you kidding?\n", id);
        } else if (!visited[id]) {
            if (ranklist[id] == 1) {
                printf("%04d: Mystery Award\n", id);
            } else if (isPrime(ranklist[id])) {
                printf("%04d: Minion\n", id);
            } else {
                printf("%04d: Chocolate\n", id);
            }
            visited[id] = true;
        } else {
            printf("%04d: Checked\n", id);
        }
    }
    return 0;
}
```

## 其他

- 数组初始化操作，只能初始化为0，1.其他值不行

下面这种方式是错误的

```C++
int ranklist[MAX] = {-1}; // 这种初始化方式无效 ~~所有人初始排名为-1;~~

```

正确的应该是

```C++
fill(ranklist, ranklist+MAX, -1);
```
