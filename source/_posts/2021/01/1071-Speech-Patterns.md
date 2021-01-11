---
title: 1071 Speech Patterns
date: 2021-01-05 16:14:52
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmmmwb3anj21hc0u0b2a.jpg
tags: [PAT, C++, 算法]
categories: [PAT]
---

# 1071 Speech Patterns (25分)

## 题目

![dMgnxy](https://gitee.com/yoyhm/oss/raw/master/uPic/dMgnxy.png)

## 思路

本题目的是**在一句话中，找到出现次数最多的有效单词**。有效单词的定义是：包含`[0-9 a-z A-Z]`。因此本题分两步。

- 分割出有效单词。大写字符要转成小写字母，无效字符使用`while`过滤。
- 使用`map`统计有效单词出现次数。
- ⚠️题目要求如果两个单词的数量一样，则输出字典上小的那个单词。而`C++`中**map会以键从小到大的顺序自动排序**[^1]。所以下面这个关键代码对比的时候，使用`it->second > macCount`就可以求出字典上小的那个单词。如果要求出字典顺序最大的那个单词，只需要`it->second >= maxCount`就可以。

```C++
for (map<string, int>::iterator it = mp.begin(); it != mp.end(); ++it) {
	if (it->second > maxCount) {
		maxCount = it->second;
		ans = it->first;
	}
}
```

## 代码

```C++
// 1. 分割字符串
// 2. 找出最大的值

#include <cstdio>
#include <map>
#include <string>
#include <iostream>

using namespace std;

bool isVaildChar(char c) {
    if (c >= '0' && c <= '9') return true;
    if (c >= 'a' && c <= 'z') return true;
    if (c >= 'A' && c <= 'Z') return true;
    return false;
}

int main() {
    map<string, int> mp; // 统计字符的数量
    string str, ans;
    getline(cin, str);
    int idx = 0, size = str.length(), maxCount = 0;

    while (idx < size) { // 开始分割字符串
        string word;
        // 1. 判断当前字符是否有效
        while (idx < size && isVaildChar(str[idx])) { // 如果该字符有效
            if (str[idx] >='A' && str[idx] <= 'Z') {str[idx] += 32;}
            word += str[idx];
            idx++;
        }
        if (word != "") { // 如果该字符不是空的，就加入到map中
            if (mp.find(word) != mp.end()) {mp[word]++;}
            else {mp[word] = 1;}
        }
        while (idx < size && !isVaildChar(str[idx])) {idx++;} // 排除无效字符
    }

    for (map<string, int>::iterator it = mp.begin(); it != mp.end(); ++it) {
        if (it->second > maxCount) {
            maxCount = it->second;
            ans = it->first;
        }
    }
    cout << ans << " " << maxCount <<endl;
    return 0;
}
```

[^1]: [算法笔记上机训练实战指南](https://book.douban.com/subject/30162908/)
