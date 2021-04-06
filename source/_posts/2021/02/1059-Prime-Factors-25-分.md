---
title: 1059 Prime Factors (25 分)
date: 2021-02-09 17:33:59
tags: [PAT, 素数]
categories: [PAT]
---

# 1059 Prime Factors (25 分)

## 题目

![ZX5Ygk](https://gitee.com/yoyhm/oss/raw/master/uPic/ZX5Ygk.png)

## 分析

本题需要求素数，如果一个个判断，速度很慢，这里提供一个快速求素数的方法[^1]。

```C++
const int MAX = 1e5;

vector<int> primes;
bool visited[MAX] = {false};

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= (int)sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}
void findPrime() {
    for (int i = 1; i < MAX; i++) {
        if (!visited[i] && isPrime(i)) {
            primes.push_back(i);
            for (int j = i; j < MAX; j += i) {
                visited[j] = true;
            }
        }
    }
}
```

求完素数集后，再逐个判断是否是`n`的因子，以及它的指数。使用`pair<int, int>`来表示结果，前面的为因子，后面的为指数。最后如果答案不为1，需要将最后的因子加入到结果中去。

## 代码

```C++
#include <iostream>
#include <cmath>
#include <vector>
#include <utility>
using namespace std;

const int MAX = 1e5;

vector<int> primes;
bool visited[MAX] = {false};

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= (int)sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}
void findPrime() {
    for (int i = 1; i < MAX; i++) {
        if (!visited[i] && isPrime(i)) {
            primes.push_back(i);
            for (int j = i; j < MAX; j += i) {
                visited[j] = true;
            }
        }
    }
}

int main() {
    findPrime();
    int n;
    cin >> n;
    if (n == 1) {
        printf("1=1\n");
        return 0;
    }
    printf("%d=", n);
    int sq = (int)sqrt(1.0 * n); // 注意，因为n在改变，不能直接用在判断条件中
    vector<pair<int, int>> ans; // 第一个值存储因子，第二个值存储指数
    for (int i = 0; i < primes.size() && primes[i] <= sq; i++) {
        if (n % primes[i] == 0) { //
            int factor = primes[i]; // 因子
            int cnt = 0; // 指数个数
            while (n % primes[i] == 0) {
                cnt++;
                n /= primes[i];
            }
            ans.push_back(make_pair(factor, cnt));
        }
        if (n == 1) break; // 找到了结果退出
    }
    if (n != 1) { // 如果还不能除尽
        ans.push_back(make_pair(n, 1));
    }
    for (int i = 0; i < ans.size(); i++) {
        printf("%d", ans[i].first);
        if (ans[i].second > 1) printf("^%d", ans[i].second);
        if (i < ans.size() - 1) printf("*");
    }
    printf("\n");
    return 0;
}
```

[^1]: (算法笔记)[]
