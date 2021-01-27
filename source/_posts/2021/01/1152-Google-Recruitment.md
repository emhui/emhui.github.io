---
title: 1152 Google Recruitment
date: 2021-01-22 21:33:04
tags: [PAT, 算法, 素数]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/0060lm7Tly1ftg6wuhgywj31hc0u0wjr.jpg
---

# 1152 Google Recruitment (20分)

## 题目

In July 2004, Google posted on a giant billboard along Highway 101 in Silicon Valley (shown in the picture below) for recruitment. The content is super-simple, a URL consisting of the first 10-digit prime found in consecutive digits of the natural constant e. The person who could find this prime number could go to the next step in Google's hiring process by visiting this website.

![Google](https://images.ptausercontent.com/57148679-d574-4f49-b048-775c6c07791c.jpg)

The natural constant e is a well known transcendental number（超越数）. The first several digits are: e = 2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742**7466391**932003059921... where the 10 digits in bold are the answer to Google's question.

Now you are asked to solve a more general problem: find the first K-digit prime in consecutive digits of any given L-digit number.

**Input Specification:**

Each input file contains one test case. Each case first gives in a line two positive integers: L (≤ 1,000) and K (< 10), which are the numbers of digits of the given number and the prime to be found, respectively. Then the L-digit number N is given in the next line.

**Output Specification:**

For each test case, print in a line the first K-digit prime in consecutive digits of N. If such a number does not exist, output 404 instead. Note: the leading zeroes must also be counted as part of the K digits. For example, to find the 4-digit prime in 200236, 0023 is a solution. However the first digit 2 must not be treated as a solution 0002 since the leading zeroes are not in the original number.

**Sample Input 1:**

> 20 5
>
> 23654987725541023819

**Sample Output 1:**

> 49877

**Sample Input 2:**

> 10 3
>
> 2468024680

**Sample Output 2:**

> 404

## 思路

本题是寻找给定数字中第一个K位素数。所以需要将给定数字依次分割成K位进行判断是否为素数。

⚠️

- 在依次分割K位的时候，`i + k <= l`注意应该是`<=`。
- 在判断是否为素数的时候，也是需要`i * i <= n`。这里符号是`<=`。

## 代码

```C++
#include <iostream>
#include <string>
using namespace std;

bool isPrime(int x) {
    if ( x < 0) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

int main() {
    int l, k;
    string str;
    cin >> l >> k >> str;
    for (int i = 0; i + k <= l; i++) { // 这里需要使用 == 号
        string ts = str.substr(i, k);
        if (isPrime(stoi(ts))) {
            cout << ts << endl;
            return 0;
        }
    }
    cout << "404\n";
    return 0;
}
```

## 其他

- `string`的`substr`方法使用[^1]

`string substr (size_t pos = 0, size_t len = npos) const;`

该方法返回一个新的字符串

- `stoi`方法使用 [^2]

将字符串转化为数字

[^1]: [std::string::substr](http://www.cplusplus.com/reference/string/string/substr/)
[^2]: [std::stoi](http://www.cplusplus.com/reference/string/stoi/?kw=stoi)
