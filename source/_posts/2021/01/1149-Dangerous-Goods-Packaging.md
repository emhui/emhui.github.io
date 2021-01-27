---
title: 1149 Dangerous Goods Packaging
date: 2021-01-23 17:37:33
tags: [PAT, 算法]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6ozby6nj31hc0u01cf.jpg
---

# 1149 Dangerous Goods Packaging (25分)

## 题目

![jgZKfU](https://gitee.com/yoyhm/oss/raw/master/uPic/jgZKfU.png)

## 思路

本题给定多个危险对，每队包含两个商品ID，再给出一些已购商品清单。判断是否该清单中是否存在危险对，若存在则输出`No`，否则`Yes`。

可以使用邻接表把危险对存储起来，然后再设置一个`visited`数组。

在输入已购货品清单的时候，逐个判断当前货品，将当前货品以及相关的危险货品`visited[i] = true`。若某个货品已经被访问过，证明它和之前的货品是危险对。

## 代码

```C++
#include <cstdio>
#include <vector>
#include <cstring>
using namespace std;

const int MAX = 100000;
vector<int> a[MAX];
bool visited[MAX];

int main() {
    int n, m, k, u, v, g;
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &u, &v);
        a[u].push_back(v);
        a[v].push_back(u);
    }
    while (m--) {
        memset(visited, false, sizeof(visited));
        scanf("%d", &k);
        bool isSafe = true;
        for (int i = 0; i < k; i++) {
            scanf("%d", &g);
            if (!visited[g]) { // 如果没有访问，则访问该结点的所有结点
                visited[g] = true;
                for (int j = 0; j < a[g].size(); j++) {visited[a[g][j]] = true;}
            } else {
                isSafe = false;
            }
        }
        if (isSafe) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```
