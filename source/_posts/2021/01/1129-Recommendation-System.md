---
title: 1129 Recommendation System
date: 2021-01-28 14:43:48
tags: [PAT, 算法, set]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmmodoqiej21hc0u0x6q.jpg
---

# 1129 Recommendation System (25分)

## 题目

![Y2QMHY](https://gitee.com/yoyhm/oss/raw/master/uPic/Y2QMHY.png)

## 分析

**题目意思**

本题要求制作一个推荐系统，输出一系列的值，从第二个值开始，预测用户接下来可能会输出的值。

用户可能输出的值是**根据之前的输入**（所以输入第一个值的时候是没有输出的），按照某个树的输入频率进行排序，若输入频率一致，则根据该值升序输出。推荐的数字数量不能超过K.

**分析**

> 一开始没看懂题目意思，直接放弃了，后来看别人解析才看懂。


首先需要思考如何存储之前输入的值，且需要将之前的值和出现的频率绑定在一起并排序。

这里使用`pair<int, int>`将`出现频率`和`货品ID`绑定到一起。即`pair<出现频率, 货品ID>`。

但是在输入的时候，如果输入的ID是之前出现过的东西，如何更新`pair<int, int>`呢？

先考虑如何找到之前已经存在的`pair<int,int>`。使用`set`集合，`set`中的`find`方法可以查找到之前插入的值。同时也要设置一个变量`vector<int>
visited(n)`。记录每个货品出现的次数。这样当输入之前出现过的商品，对商品更新可以使用下面方法

```C++
auto it = recommends.find(make_pair(visited[itemId], itemId));
if (it != recommends.end()) {recommends.erase(it);} // 删除之前的记录
visited[itemId]++; // 更新货品的出现频率
recommends.insert(make_pair(visited[itemId], itemId));
```

最后一个问题就是，`set`如何根据**货品出现频率降序，货品id升序**。由于`set`使用红黑树实现，本身就有序，不能通过`sort`排序。最后参考[C++ set自定义排序](https://blog.csdn.net/lv1224/article/details/79789638)[^1].方法如下

```C++
bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.first != b.first) return a.first > b.first;
    else return a.second < b.second;
}

set<pair<int, int>, decltype(cmp)*> recommends(cmp); // 每次插入新的元素的时候，会根据第一个降序，第二个升序排序。

```

## 代码

```C++
// 用一个visited[n]存储每个点数量
// 用一个集合更新推荐列表 set<pair<int,int>> 第一个是数量，第二个是item
#include <utility>
#include <iostream>
#include <algorithm>
#include <vector>
#include <set>
using namespace std;

bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.first != b.first) return a.first > b.first;
    else return a.second < b.second;
}

int main() {
    int n, k, val;
    set<pair<int, int>, decltype(cmp)*> recommends(cmp); // 推荐列表，先前是访问次数，后面是货品ID
    cin >> n >> k >> val; // val 第一件被访问的东西
    vector<int> visited(n, 0); // 每个货品被访问次数
    visited[val]++;
    recommends.insert(make_pair(1, val)); // ID为val的东西被访问1次
    for (int i = 1; i < n; i++) {
        cin >> val;
        printf("%d:", val);
        int cnt = 0;
        for (auto it = recommends.begin(); cnt < k && it != recommends.end(); it++) {
            printf(" %d", it->second);
            cnt++;
        }
        printf("\n");
        // 开始插入或更新推荐列表
        auto it = recommends.find(make_pair(visited[val], val));
        if (it != recommends.end()) recommends.erase(it);
        visited[val]++;
        recommends.insert(make_pair(visited[val], val));

    }
    return 0;
}
```

[^1]: [C++ set自定义排序](https://blog.csdn.net/lv1224/article/details/79789638)
