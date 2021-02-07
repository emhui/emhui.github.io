---
title: 1124 Raffle for Weibo Followers (20分)
date: 2021-01-29 21:54:59
tags: [PAT, 算法]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/0060lm7Tly1ftg6xaqdu6j31hc0u0x4k.jpg
---

# 1124 Raffle for Weibo Followers (20分)

## 题目

![FOiX1w](https://gitee.com/yoyhm/oss/raw/master/uPic/FOiX1w.png)

## 分析

**分析**

使用`unordered_map`记录已经抽过奖的人。

在使用`cnt`记录当前参加的人数，从第n个人开始，每一轮转发`cnt++`,当`cnt % n == 0`,即每第n个人成为获奖者，但是如果这个人已经获奖了，那么`cnt--`，将他的中奖名额给下一个人。

## 代码

```C++
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string name;
    unordered_map<string, int> winners;
    int cnt = 0, m, n, s;
    cin >> m >> n >> s;
    for (int i = 1; i <= m; i++) {
        cin >> name;
        if (i >= s) {
            if (cnt % n == 0 && winners.find(name) == winners.end()) {
                winners[name] = 1; // 添加到winner中
                cout << name << endl;
            } else if (cnt % n == 0 && winners.find(name) != winners.end()) {
                cnt--; // 如果遇到相同的，就后退一步，下一步才是获胜者。
            }
            cnt++;
        }
    }
    if (s > m) cout << "Keep going...\n";
    return 0;
}
```
