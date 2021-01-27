---
title: 1153 Decode Registration Card of PAT
date: 2021-01-23 09:30:10
tags: [PAT, 算法]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/0060lm7Tly1ftg6xaqdu6j31hc0u0x4k.jpg
---

# 1153 Decode Registration Card of PAT (25分)

## 题目

{% note warning %}
1. 将输入改成printf可以防止部分用例超时
2. 在循环的时候输出当前是第几次循环，尽量使用下标i，而不是单独设置一个变量进行++。
{% endnote %}

![ORG4bt](https://gitee.com/yoyhm/oss/raw/master/uPic/ORG4bt.png)

## 思路

本题参考[PAT 1153 Decode Registration Card of PAT （25 分）- 甲级](https://blog.csdn.net/liuchuo/article/details/84973049).

⚠️ 主要注意一下超时问题，经过测试发现得出下面几条提升效率的方法。

1. 使用`printf`输出。
2. `num++`操作尽量不使用，能用下标就使用下标，比如本题的`Case #: ...`, 其中`#`用`i`表示。
3. 函数传参数的时候传递地址过去。
4. 对于`map`和`unordered_map`,在要求时间优先的情况下，使用`unordered_map`.二者区别可参考[^1]

## 思路

## 代码


```C++
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

struct Node{
    string s;
    int val;
};

int main() {
    int n, m;
    string str;
    cin >> n >> m;
    vector<Node> vn(n);
    for (int i = 0; i < n; i++) {
        cin >> vn[i].s >> vn[i].val;
    }
    int caseId = 1, queryId; // 这里caseId最好不要使用，直接使用下标i坐标当前示例
    string sq;
    for (int i = 1; i <= m; i++) {
        cin >> queryId >> sq;
       // cout << "Case " << caseId++ << ": "<< queryId << " " << sq << endl;
       // printf("Case %d: %d %s\n", caseId++, queryId, sq.c_str());
        printf("Case %d: %d %s\n", i, queryId, sq.c_str());
        vector<Node> ans;
        int cnt = 0, allScore = 0;
        if (queryId == 1) {
            for (int i = 0; i < n; i++) {
                if (vn[i].s[0] == sq[0]) {ans.push_back(vn[i]);}
            }
        } else if (queryId == 2) {
            for (int i = 0; i < n; i++) {
                if (vn[i].s.substr(1, 3) == sq) {cnt++, allScore += vn[i].val;}
            }
            if (cnt > 0)
                // cout << cnt << " " << allScore << endl;
                printf("%d %d\n", cnt, allScore);
        } else if (queryId == 3) {
            unordered_map<string, int> um;
            for (int i = 0; i < n; i++) {
                if (vn[i].s.substr(4, 6) == sq) {um[vn[i].s.substr(1, 3)]++;} // 把班级号作为key,人数作为val
            }
            for (auto& m: um) {ans.push_back({m.first, m.second});}
        }
        sort(ans.begin(), ans.end(), [](auto& a, auto& b){
            if (a.val != b.val) {return a.val > b.val;}
            else {return a.s < b.s;}
        });
        if (((queryId == 1 || queryId == 3) && ans.size() == 0) || (queryId == 2 && cnt == 0)) {
            // cout << "NA\n";
            printf("NA\n");
        } else {
            for(auto& a: ans) {
                // cout << a.s << " " << a.val << endl;
                printf("%s %d\n", a.s.c_str(), a.val); // 将输入改成printf可以提升效率
            }
        }
    }
}
```

[^1]: [c++ map与unordered_map区别及使用](https://blog.csdn.net/qq_21997625/article/details/84672775)
