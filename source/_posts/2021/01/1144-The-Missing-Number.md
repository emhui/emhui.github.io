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
#include <cstdio>
#include <set>
using namespace std;

int main() {
    int n, num;
    set<int> st; // set是一個集合，內部的元素不會重複，同時它會自動進行排序，也是從小到大
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &num);
        if (num > 0) {st.insert(num);}
    }
    int size = st.size();
    for (int i = 1; i <= size + 1; i++) { // 这里的范围是到size+1
        if (st.find(i) == st.end()){
            printf("%d\n", i);
            break;
        }
    }
    return 0;
}
```

## 其他

- `set`默认从小到大排序
