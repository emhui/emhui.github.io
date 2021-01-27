---
title: 1034 Head of a Gang
date: 2021-01-18 09:27:07
tags: [PAT, 算法, 图, union-find]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmmxmp6wqj21kw0w01lc.jpg
---

# 1034 Head of a Gang

## 题目

![oAOiuF](https://gitee.com/yoyhm/oss/raw/master/uPic/oAOiuF.png)

## 思路

略.

## 代码

```C++
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;
const int maxn = 2001;
int numPersion = 0, count = 0; // count 连通分量个数
int parent[maxn] = {0}, weight[maxn] = {0};

map<int,string> int2string;
map<string,int> string2num, gang;

int str2num(string name) {
    if (string2num.find(name) != string2num.end()) {
        return string2num[name];
    } else {
        string2num[name] = numPersion; // str->num
        int2string[numPersion] = name; // num->str
        return numPersion++;
    }
}

int find(int v) {
    if (v != parent[v]) {parent[v] = find(parent[v]);} // 路径压缩
    return parent[v];
}

void quick_union(int v, int w) {
    int vRoot = find(v), wRoot = find(w);
    if (vRoot == wRoot) return;
    if (weight[vRoot] > weight[wRoot]) parent[wRoot] = vRoot;
    else parent[vRoot] = wRoot;
    count--;
}

int main() {
    string s1, s2;
    int n, k, w;
    vector<int> temp[maxn];
    scanf("%d%d", &n, &k);

    for(int i = 0; i < n; i++) {
        cin >> s1 >> s2 >> w;
        int id1 = str2num(s1), id2 = str2num(s2);
        weight[id1] += w;
        weight[id2] += w;
        temp[i].push_back(id1);
        temp[i].push_back(id2);
    }
    for (int i = 0; i < numPersion; i++) {parent[i] = i;}
    count = numPersion; // 一开始连通分量个数
    for (int i = 0; i < n; i++) {
        int v = temp[i][0], w = temp[i][1];
        if (find(v) != find(w)) {
            quick_union(v, w);
        }
    }

    int numGang = 0;
    vector<int> head; // 记录所有的头
    for (int i = 0; i < numPersion; i++) {
        // cout << i << ":" <<int2string[i] << "->" << int2string[parent[i]] << " w: " << weight[i] << endl;
        if (i == parent[i]) {
            head.push_back(i);
            // cout << "head => " << int2string[i] <<endl;
        }
    }
    for (int i = 0; i < head.size(); i++) {
        int num = 0;
        int weightGange = 0;
        for (int j = 0; j < numPersion; j++) {
            if (find(j) == head[i]) {
                weightGange += weight[j];
                num++;
            }
        }
        if (num > 2 && (weightGange / 2) > k)
        {
            gang[int2string[head[i]]] = num;
            numGang++;
        }
    }
    cout << numGang << endl;
    for (map<string,int>::iterator it = gang.begin(); it != gang.end(); it++) {
        cout << it->first << " " << it->second <<endl;
    }
    // cout << find(4) << endl;
    return 0;
}
```
