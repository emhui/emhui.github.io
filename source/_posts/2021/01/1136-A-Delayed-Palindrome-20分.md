---
title: 1136 A Delayed Palindrome (20分)
date: 2021-01-25 19:49:21
tags: [PAT, 算法]
categories: [PAT]
---

# 1136 A Delayed Palindrome (20分)

## 题目

![1vFF7v](https://gitee.com/yoyhm/oss/raw/master/uPic/1vFF7v.png)

## 分析

本题主要考察的是**较大的数组相加**和**判断是否是回文字符串**

- **判断较大数组相加**：可以使用字符数组或者字符串来实现，使用字符数组的话，有一个缺点，数组从左到右，分别是低位到高位。在输出结果的时候，可能需要反过来输入。而字符串只需要在前面加上进位。例如进位1`s = "1" + s;`
- **判断回文字符串**：可以使用双指针判断或者使用`reverse`来判断。

下面代码中，方法一是使用字符数组的方法，写得比较乱，且3个有用例没有通过，最终得分16分。

方法二是参考[PAT 1136. A Delayed Palindrome (20)-PAT甲级真题](https://www.liuchuo.net/archives/4204)。使用`string, reverse`方法。比较好理解。

注意：

- 看到方法二的代码，发现输入的字符串一开始就需要进行回文判断。
- 使用`rev`方法返回一个新的字符串，而不更改原来的字符串。方法一中因为`char`限制，所以只能不断的来回赋值。结果变得很乱，所以推荐方法二。

## 代码

方法一

```C++
#include <cstdio>
#include <cstring>

const int MAX = 10100;
char A[MAX], B[MAX], C[MAX], T[MAX];

void computeC() {
    int n = strlen(A);
    int remain = 0;
    for (int i = 0; i < n; i++) {
        int s = (A[i] - '0') + (B[i] - '0') + remain; // 转成数字计算
        C[i] = s % 10 + '0'; // 转成字符
        remain = s / 10;
    }
    if (remain > 0) C[n++] = remain + '0';
    C[n] = '\0';
}

bool isPalindrome() {
    int n = strlen(C);
    int i = 0, j = n - 1;
    // 2 5 5 5 5 2
    while (i < j && C[i] == C[j]) {
        i++;
        j--;
    }
    return C[i] == C[j] ? true : false;
}

void copyReverse(char* origin, char* target) {
    int n = strlen(origin);
    int i = 0, j = n - 1;
    while (i <= j) {
        target[i] = origin[j];
        target[j] = origin[i];
        i++, j--;
    }
    target[n] = '\0';
}

int main() {
    scanf("%s", A);
    for (int i = 1; i <= 10; i++) {
        copyReverse(A, B);
        computeC();
        copyReverse(C, T);
        printf("%s + %s = %s\n", A, B, T);
        if (isPalindrome()) {
            printf("%s is a palindromic number.\n",  T);
            return 0;
        } else {
            copyReverse(C, A);
        }
    }
    printf("Not found in 10 iterations.\n");
    return 0;
}
```

方法二

```C++
#include <string>
#include <iostream>
#include <algorithm>
using namespace std;

string rev(string s) { // 返回一个新的string对象
    reverse(s.begin(), s.end());
    return s;
}

string add(string s1, string s2) {
    string s = s1;
    int remain = 0;
    for (int i = s1.size() - 1; i >= 0; i--) {
        int num = (s1[i] - '0') + (s2[i] - '0') + remain;
        s[i] = num % 10 + '0';
        remain = num / 10;
    }
    if (remain > 0) s = "1" + s;
    return s;
}

int main() {
    string s, sum;
    cin >> s;
    if (s == rev(s)) {
        printf("%s is a palindromic number.\n", s.c_str());
        return 0;
    }
    int n = 10;
    while (n--) {
        sum = add(s, rev(s));
        printf("%s + %s = %s\n", s.c_str(), rev(s).c_str(), sum.c_str());
        if (sum == rev(sum)) {
            printf("%s is a palindromic number.\n", sum.c_str());
            return 0;
        }
        s = sum;
    }
    printf("Not found in 10 iterations.\n");

}
```

