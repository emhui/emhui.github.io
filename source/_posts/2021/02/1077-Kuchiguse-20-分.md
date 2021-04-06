---
title: 1077 Kuchiguse (20 分)
date: 2021-02-08 09:52:48
tags: [PAT, 公共部分, 字符串]
categories: [PAT]
---

# 1077 Kuchiguse (20 分)

## 题目

![m9nYTC](https://gitee.com/yoyhm/oss/raw/master/uPic/m9nYTC.png)

## 分析

本题考查 **寻找公共字符串**

题目大致意思

The Japanese language is notorious for its sentence ending particles.

> 日语中句子结尾部分很有名

Personal preference of such particles can be considered as a reflection of the speaker's personality.

> 结尾这部分能反应讲话者的个人性格

Such a preference is called "Kuchiguse" and is often exaggerated artistically in Anime and Manga.

> 这种偏好叫做“Kuchiguse”,在日漫中常能看到


题目大意是寻找几个句子的共同的后缀，存在就输出该后缀，否则不存在，就输出`nai`


对于每个句子，从后往前开始遍历查找,看是否相同字符数量一致。

```C++
vector<string> vs;
string ans = "";
int n;
int step = 1;
while (step) {
	char ch = vs[0][vs[0].size() - step]; // 倒数第i个字符
	int cnt = 1; // 统计拥有相同尾字符的字符串数量
	// 遍历剩下的n-1个元素的倒数第step个字符
	for (int i = 1; i < n; i++) {
		int len = vs[i].size();
		if (len - step >= 0 && ch == vs[i][len - step]) {
			cnt++;
		} else {
			break;
		}
	}
	if (cnt == n) ans += ch; // n个元素拥有相同的字符，添加到答案中
	else break;
	step++;
}
```

# 代码

```C++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n;
    cin.get(); // 使用getline时，如果前面有cin,需要吸收一下字符
    vector<string> vs;
    for (int i = 0; i < n; i++) {
        getline(cin, s);
        vs.push_back(s);
    }

    string ans = "";
    int step = 1;
    while (step) {
        char ch = vs[0][vs[0].size() - step]; // 倒数第i个字符
        int cnt = 1; // 统计拥有相同尾字符的字符串数量
        // 遍历剩下的n-1个元素的倒数第step个字符
        for (int i = 1; i < n; i++) {
            int len = vs[i].size();
            if (len - step >= 0 && ch == vs[i][len - step]) {
                cnt++;
            } else {
                break;
            }
        }
        if (cnt == n) ans += ch; // n个元素拥有相同的字符，添加到答案中
        else break;
        step++;
    }
    if (ans == "") {
        printf("nai\n");
    } else {
        reverse(ans.begin(), ans.end());
        cout << ans << endl;
    }

    return 0;
}
```
