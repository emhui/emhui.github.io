---
title: 1083 List Grades (25 分)
date: 2021-02-02 21:24:06
tags: [PAT, 数组, 排序]
categories: [PAT]
---

# 1083 List Grades (25 分)

## 题目

![oW2RoK](https://gitee.com/yoyhm/oss/raw/master/uPic/oW2RoK.png)

## 分析

本题考察

- 结构体排序

## 代码

```C++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct node {
    string name, id;
    int grade;
    node(string _name, string _id, int _grade): name(_name), id(_id), grade(_grade) {}
};

bool cmp(node &a, node &b) {
    return a.grade > b.grade;
}

int main() {
    int n, grade1, grade2, grade;
    string name, id;
    cin >> n;
    vector<node> vn;
    for (int i = 0; i < n; i++) {
        cin >> name >> id >> grade;
        vn.push_back(node(name, id, grade));
    }
    sort(vn.begin(), vn.end(), cmp);
    cin >> grade1 >> grade2;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (vn[i].grade >= grade1 && vn[i].grade <= grade2) {
            printf("%s %s\n",vn[i].name.c_str(), vn[i].id.c_str());
            cnt++;
        }
    }
    if (cnt == 0) printf("NONE\n");
    return 0;
}
```
