---
title: 1144 The Missing Number
date: 2021-01-24 09:24:52
tags: [PAT, 算法, set]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg
---

# 1144 The Missing Number (20分)

## 题目

![R7nlwN](https://gitee.com/yoyhm/oss/raw/master/uPic/R7nlwN.png)

## 思路

使用一个`set`记录大于0的值，由于`set`默认排序，因此不需要使用`sort`.然后依次判断`1 ~ size+1`范围內的值是否在`set`內，若不在则是缺失的值

## 代码

```C++
#include <iostream>
#include <set>
using namespace std;

int main() {
    // 找到最小的且没有出现在里面的数字
    int n, val;
    set<int> s;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> val;
        s.insert(val);
    }
    int ans = 1;
    for (auto &num: s) {
        if (num <= 0) continue;
        // 如果这个数大于0，且没有出现在输入中
        if (s.count(ans) == 0) break;
        else ans = num + 1;
    }
    printf("%d\n", ans);
}
```

## 其他

- `set`默认从小到大排序
