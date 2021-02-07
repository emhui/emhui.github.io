---
title: 1100 Mars Numbers (20分)
date: 2021-02-01 20:19:32
tags: [PAT, 进制, 哈希表, 数组]
categories: [PAT]
---

# 1100 Mars Numbers (20分)

## 题目

## 1100 Mars Numbers (20分)

People on Mars count their numbers with base 13:

- Zero on Earth is called "tret" on Mars.
The numbers 1 to 12 on Earth is called "jan, feb, mar, apr, may, jun, jly, aug, sep, oct, nov, dec" on Mars, respectively.
- For the next higher digit, Mars people name the 12 numbers as "tam, hel, maa, huh, tou, kes, hei, elo, syy, lok, mer, jou", respectively.
- For examples, the number 29 on Earth is called "hel mar" on Mars; and "elo nov" on Mars corresponds to 115 on Earth. In order to help communication between people from these two planets, you are supposed to write a program for mutual translation between Earth and Mars number systems.

**Input Specification:**

Each input file contains one test case. For each case, the first line contains a positive integer N (<100). Then N lines follow, each contains a number in [0, 169), given either in the form of an Earth number, or that of Mars.

**Output Specification:**

For each number, print in a line the corresponding number in the other language.

**Sample Input:**

> 4
>
> 29
>
> 5
>
> elo nov
>
> tam

**Sample Output:**

> hel mar
>
> may
>
> 115
>
> 13

---

## 分析

本题的火星数字为13进制，由于题目中告知了转换的火星文数字范围在`169`以内，因此可以将`169`个值全部算出来。

```C++
string lowDigit[13] = {"tret", "jan", "feb", "mar", "apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec"};
string highDigit[13] = {"tret", "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mer", "jou"}
```

把所有结果都计算出来

```C++
map<string, int> mars2earth;
map<int, string> earth2mars;

for (int i = 0; i < 13; i++) {
	// 低位 (0 - 12)
	earth2mars[i] = lowDigit[i];
	mars2earth[lowDigit[i]] = i;
	// 高位 (0 - 12) * 13
	earth2mars[i * 13] = highDigit[i];
	mars2earth[highDigit[i]] = i * 13;
}
// 计算其他位置的值
for (int i = 1; i < 13; i++) {
	for (int j = 1; j < 13; j++) {
		string s = highDigit[i] + " " + lowDigit[j];
		earth2mars[i * 13 + j] = s;
		mars2earth[s] = i * 13 + j;
	}
}
```

注意：这里的输入需要读取一整行，一整行的输入使用`getline()`.

`getline`的用法[^1]

> 注意的是：当 getline(cin, str);前面的输入是cin>>ss;的话，那么此处str的值时空的，因为他会读取上一行的结束符。

```C++
getline(cin, str)
```

## 代码

```C++
#include <iostream>
#include <string>
#include <map>
using namespace std;

string lowDigit[13] = {"tret", "jan", "feb",
                       "mar", "apr", "may",
                       "jun", "jly", "aug",
                       "sep", "oct", "nov", "dec"};
string highDigit[13] = {"tret", "tam", "hel",
                        "maa", "huh", "tou",
                        "kes", "hei", "elo",
                        "syy", "lok", "mer", "jou"};

map<string, int> mars2earth;
map<int, string> earth2mars;
void init() {
    for (int i = 0; i < 13; i++) {
        // 低位 (0 - 12)
        earth2mars[i] = lowDigit[i];
        mars2earth[lowDigit[i]] = i;
        // 高位 (0 - 12) * 13
        earth2mars[i * 13] = highDigit[i];
        mars2earth[highDigit[i]] = i * 13;
    }
    // 计算所有的值
    for (int i = 1; i < 13; i++) {
        for (int j = 1; j < 13; j++) {
            string s = highDigit[i] + " " + lowDigit[j];
            earth2mars[i * 13 + j] = s;
            mars2earth[s] = i * 13 + j;
        }
    }
}
int main() {
    init();
    int n;
    string s;
    cin >> n;
    getchar(); // 吸收回车字符串
    while (n--) {
        getline(cin, s); // 读取一行数据
        if (s[0] >= '0' && s[0] <= '9') {
            cout << earth2mars[stoi(s)] << endl;
        } else {
            cout << mars2earth[s] << endl;
        }
    }
}

```

[^1]: [C++ 每次读取一行字符串输入](https://blog.csdn.net/lwgkzl/article/details/53232889)
