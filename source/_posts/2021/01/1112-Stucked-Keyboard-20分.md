---
title: 1112 Stucked Keyboard (20分)
date: 2021-01-30 22:42:14
tags: [PAT, 哈希表]
categories: [PAT]
---

# 1112 Stucked Keyboard (20分)

## 题目

![yFLPf6](https://gitee.com/yoyhm/oss/raw/master/uPic/yFLPf6.png)

## 分析

找到连续出现k次的字符，把它合并成一个字符

- 使用一个128位的数组记录已经stuck的的字符
- 如何判断是否是一个stuck字符

> 其实还有一种情况，就是前面是正常的后面不正常。那么可以把不正常的给找出来吗？

## 代码

> 有一个用例没有通过

```C++
#include <iostream>
#include <cstring>
using namespace std;

int main () {
    int n;
    char keys[1000], ans[1000], stuck[1000];
    bool visited[128] = {false}, normal[128] = {false};
    cin >> n >> keys;
    int size = strlen(keys);
    int idx = 0, ansIdx = 0, stuckIdx = 0; // idx 当前查询的下标 ansIdx 正常字符下标 stuckIdx 坏的字符
    while (idx < size) {
        int i = 0;
        char pre = keys[idx];
        for (i = 1; i < n && idx + i < size; i++) { // 判断是否是连续n个，连续n个是坏的字符
            if (pre != keys[idx + i]) break;
        }
        if (i < n || normal[pre]) { // 正常键盘，进行字符拼接 ans += keys[idx, i];
            for (int j = 0; j < i && idx + j < size; j++) {
                normal[keys[idx]] = true; // 标记那些正常按键
                ans[ansIdx++] = keys[idx++];
            }
        } else { // 非正常键盘，只需要存储当前的即可。
            ans[ansIdx++] = pre;
            idx += n;
            if (!visited[pre]) { // 没有被记录是坏键,还需要判断是否
                stuck[stuckIdx++] = pre;
                visited[pre] = true;
            }
        }
    }

    for (int i = 0; i < stuckIdx; i++) {
        printf("%c", stuck[i]);
    }
    printf("\n");

    for (int i = 0; i < ansIdx; i++) {
        printf("%c", ans[i]);
    }
    printf("\n");
    return 0;
}
```

