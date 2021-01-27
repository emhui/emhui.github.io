---
title: 1141 PAT Ranking of Institutions
date: 2021-01-25 19:55:35
tags: [PAT, 算法, 排序]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6p3dkm1j31hc0u04mm.jpg
---

# 1141 PAT Ranking of Institutions (25分)

## 题目

![CdtzyK](https://gitee.com/yoyhm/oss/raw/master/uPic/CdtzyK.png)

## 分析

~~题目意思，可以使用`map<strint,Node>`来实现~~

1. 使用一个`map`建立`school -> int`的映射。
2. 然后使用结构体存储数据，然后建立一个这样的数组

```C++
struct Node{
	int scoreA, scoreB, scoreC, ns, tws, rank; // ns是该学校有多少人。每次遍历到该学校就进行ns++。tws取整, schoolID 等会输出的时候进行比较	
}
```

3. 根据题目要求，求完TWS，最后就是常规的排序函数了。

```C++
bool cmp(Node a, Node b) {
    if (a.tws != b.tws) {
        return a.tws > b.tws;
    } else if (a.ns != b.ns) {
        return a.ns < b.ns;
    } else {
        return a.schoolName < b.schoolName;
    }
}
```

## 代码

```C++
#include <cstdio>
#include <map>
#include <string>
#include <algorithm>
#include <iostream>
using namespace std;

const int MAX = 100001;

int numInstitutions = 0;
struct Node{
    int scoreA, scoreB, scoreT, ns, tws, rank;
    string schoolName;
}schools[MAX];

map<string, int> str2int;

int getIntID(string schoolName) {
    if (str2int.find(schoolName) == str2int.end()) {// 如果没有该元素
            str2int[schoolName] = numInstitutions;
            return numInstitutions++;
    } else {
        return str2int[schoolName];
    }
}

bool cmp(Node a, Node b) {
    if (a.tws != b.tws) {
        return a.tws > b.tws;
    } else if (a.ns != b.ns) {
        return a.ns < b.ns;
    } else {
        return a.schoolName < b.schoolName;
    }
}

int main() {
    int n, score;
    string ID, schoolName;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> ID >> score >> schoolName;
        transform(schoolName.begin(),schoolName.end(),schoolName.begin(),::tolower);
        int uid = getIntID(schoolName);
        schools[uid].schoolName = schoolName;
        schools[uid].ns++;
        if (ID[0] == 'A') schools[uid].scoreA += score;
        else if (ID[0] == 'B') schools[uid].scoreB += score;
        else if (ID[0] == 'T') schools[uid].scoreT += score;
    }
    // 处理tws
    for (int i = 0; i < numInstitutions; i++) {
        schools[i].tws = (int)(schools[i].scoreA + schools[i].scoreB * 1.0 / 1.5 + schools[i].scoreT * 1.5);
    }
    
    sort(schools, schools + numInstitutions, cmp);
    
    printf("%d\n", numInstitutions);
    for (int i = 0; i < numInstitutions; i++) {
        if (i > 0 && schools[i].tws == schools[i - 1].tws) {
            schools[i].rank = schools[i - 1].rank;
        } else {
            schools[i].rank = i + 1;
        }
        cout << schools[i].rank << " "<< schools[i].schoolName << " " << schools[i].tws << " " << schools[i].ns << endl;
    }
}
```

