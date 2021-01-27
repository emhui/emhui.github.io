---
title: 1139 First Contact
date: 2021-01-26 18:25:45
tags: [PAT, 算法, 图]
categories: [PAT]
---

# 1139 First Contact (30分)


## 题目

![fHCX2m](https://gitee.com/yoyhm/oss/raw/master/uPic/fHCX2m.png)

## 分析

本题题目较难理解，主要参考[pat甲级1139. First Contact (30)](https://blog.csdn.net/richenyunqi/article/details/79595547)写法。以下内容摘抄自该链接。

题意分析
可以把整个题目描述表示成一个图，每个人都是其中一个结点，两个人如果是朋友则在两个人之间有一条边。题目要求的就是给定一个起始结点，一个末尾结点，能不能找到两个结点，使得从起始结点出发经过这两个结点之后到达末尾结点。当然，题目要求比这个稍微复杂，每个节点有男、女两种性别，而且要求经过的两个节点中，第一个节点的性别和起始结点一致，第二个结点的性别和末尾结点一致。

算法设计
由于最后要先按第一个结点从小到大排序，再按第二个节点从小到大排序，可以直接使用c++标准库中的pair类型保存这两个节点，因为pair类型自定义的<运算符恰好就是先按第一个元素从小到大排序，再按第二个元素从小到大排序。由于只要求首尾结点之间有两个结点，且结点总数最多才300个，可以直接采取暴力搜索的方法，在搜索过程中，注意保证第一个节点和首结点性别相同，第二个节点和末尾结点性别相同，此外要避免过早达到头结点或返回首节点的情况出现。具体实现可见代码，非常简洁易懂哦~~

注意点
（1）有一个大坑，题目按给定的4位数字前有无‘-’号作为区别男女的标志，有一个测试点包含了-0000这样的数据，如果用int读入，是不会认为它是一个负数的，于是程序自然把其代表的人视作了女性，导致了错误。所以为了保证正确，最好用char数组或者string读入，以确保前面的'-' 号不会丢失。

（2）输出结点值时要按"%04d"的形式输出，以保证输出数字有4位，不足在高位补0

（3）形成的图为无向图，边为无向边

（4）搜索过程中避免过早达到头结点或返回首节点的情况出现，即保证搜索的两个结点既不等于首节点，也不等于尾结点



## 代码

```C++
1001 -2001
-2003 1001 // AB异性，先找
1005 -2001 // 没有男性朋友可以帮助他们，只有一个女性朋友，所以也是0
-2002 -2004 // AB同性，同性朋友只有-2002
1111 -2003 // 没有1111这个人，所以输出0
```

## 代码

```C++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <utility>
#include <cmath>
using namespace std;
const int MAX = 10001;
bool gender[MAX]; // 判断是什么性别，ture代表男性，false代表女性
vector<int> friends[MAX]; // 邻接表，存储所有对象的关系
int n, m, k;

int main() {
    string s1, s2;
    scanf("%d%d\n", &n, &m);
    for (int i = 0; i < m; i++) { // 输入m个关系
        cin >> s1 >> s2;
        friends[abs(stoi(s1))].push_back(abs(stoi(s2))); // 将朋友添加到邻接表中
        friends[abs(stoi(s2))].push_back(abs(stoi(s1)));
        gender[abs(stoi(s1))] = s1[0] != '-'; // 判断s1,s2的性别
        gender[abs(stoi(s2))] = s2[0] != '-';
    }
    scanf("%d", &k);
    while (k--) {
        vector<pair<int,int>> ans;
        int start, end;
        scanf("%d%d", &start, &end);
        for (int f: friends[abs(start)]) { // 先从最开始的朋友开始找
            if (f != abs(start) && f != abs(end) &&
               gender[abs(f)] == gender[abs(start)]) {
                // 重要:找到和start性别相同的朋友，然后再从f这个朋友继续寻找和end性别相同的朋友
                for(int f2: friends[f]) {
                    if (f2 != abs(start) && f2 != abs(end) && gender[f2] == gender[abs(end)]) {
                        // 重要:找到了性别和end相同的朋友，再判断该f2朋友能否到达end
                        for (int f3: friends[f2]) {
                            if (f3 == abs(end)) {
                                ans.push_back({f, f2});
                            }
                        }
                    }
                }
            }
        }
        printf("%d\n", ans.size());
        sort(ans.begin(), ans.end());
        for (auto& it: ans){
            printf("%04d %04d\n", it.first, it.second);
        }
    }
    return 0;
}
```
