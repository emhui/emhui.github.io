---
title: 1062 Talent and Virtue (25 分)
date: 2021-02-06 12:24:34
tags: [PAT, 排序]
categories: [PAT]
---

# 1062 Talent and Virtue (25 分)

## 题目

![HXrTWl](https://gitee.com/yoyhm/oss/raw/master/uPic/HXrTWl.png)

## 分析

本题考查 **结构体排序**。

相对于一般的结构体排序，本题需要额外添加一个`type`字段，表示当前属于哪一个等级。等级规则如下

1. **sages**: ` virtue >= H && talent >= H`
2. **noblemen**: ` virtue >= H && talent < H`
3. **fool men**: ` virtue < H && talent < H && virtue >= talent`
4. **others**: ` others`

## 代码

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct node {
    int id, vg, tg, type; // type判断是哪一个等级
    node(int _id, int _vg, int _tg, int _type): id(_id), vg(_vg), tg(_tg), type(_type) {}
};


int n, m, l, h;

bool cmp(node &a, node &b) {
    if (a.type != b.type) return a.type < b.type;
    else if (a.vg + a.tg != b.vg + b.tg) return a.vg + a.tg > b.vg + b.tg;
    else if (a.vg != b.vg) return a.vg > b.vg;
    else return a.id < b.id;
}

int main() {
    vector<node> vn;
    cin >> n >> l >> h;
    int id, vg, tg;
    for (int i = 0; i < n; i++) {
        cin >> id >> vg >> tg;
        if (vg >= l && tg >= l) {
            if (vg >= h && tg >= h) {
                vn.push_back(node(id, vg, tg, 1));
            } else if (vg >= h && tg < h) {
                vn.push_back(node(id, vg, tg, 2));
            } else if (vg >= tg) {
                vn.push_back(node(id, vg, tg, 3));
            } else {
                vn.push_back(node(id, vg, tg, 4));
            }

        }
    }
    sort(vn.begin(), vn.end(), cmp);
    int size = vn.size();
    printf("%d\n", size);
    for (int i = 0; i < size; i++) {
        printf("%08d %d %d\n", vn[i].id, vn[i].vg, vn[i].tg);
    }
}
```
