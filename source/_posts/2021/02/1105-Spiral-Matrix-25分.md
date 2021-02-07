---
title: 1105 Spiral Matrix (25分)
date: 2021-02-01 16:13:28
tags: [PAT, 数学, 图形, 数组]
categories: [PAT]
---

# 1105 Spiral Matrix (25分)

## 题目

### 1105 Spiral Matrix (25分)

This time your job is to fill a sequence of N positive integers into a spiral matrix in non-increasing order. A spiral matrix is filled in from the first element at the upper-left corner, then move in a clockwise spiral. The matrix has m rows and n columns, where m and n satisfy the following: m×n must be equal to N; m≥n; and m−n is the minimum of all the possible values.

**Input Specification:**

Each input file contains one test case. For each case, the first line gives a positive integer N. Then the next line contains N positive integers to be filled into the spiral matrix. All the numbers are no more than 10^4. The numbers in a line are separated by spaces.

**Output Specification:**

For each test case, output the resulting matrix in m lines, each contains n numbers. There must be exactly 1 space between two adjacent numbers, and no extra space at the end of each line.

**Sample Input:**

> 12
>
> 37 76 20 98 76 42 53 95 60 81 58 93

**Sample Output:**

> 98 95 93
>
> 42 37 81
>
> 53 20 76
>
> 58 60 76

## 分析

用一段递减的序列，从左上角开始，顺时针填充一个m*n大小的矩阵。

1. m 和 n 如何求？

2. 如何顺时针填充？

> 12
>
> 37 76 20 98 76 42 53 95 60 81 58 93

先排序

> 98 95 93 81 76 76 60 58 53 42 37 20

然后求 m 和 n 的大小

$min{|m>n|}$, $m > n$

```C++
int size = n;
int m = ceil(sqrt(size)); // 向上取整
while (size % m != 0) {m++;}
n = size / m;
```

接下来就是如何填充。设置四个变量，每次填充完成一圈，就向内收缩

> 98 95 93 81 76 76 60 58 53 42 37 20

> 98 95 93
>
> 42 37 81
>
> 53 20 76
>
> 58 60 76

```C++
int left = 0, right = n - 1, top = 0, bottom = m - 1;
int idx = 0, i = 0, j = 0;
while (idx < size) {
	while (idx < size && j < right) {
		martix[i][j++] = vi[idx++];
	}
	while (idx < size && i < bottom) {
		martix[i++][j] = vi[idx++];
	}
	while (idx < size && j > left) {
		martix[i][j--] = vi[idx++];
	}
	while (idx < size && i > top) {
		martix[i--][j] = vi[idx++];
	}
	top++, right--, bottom--, left++;

	i++, j++; // 移动到下一个

	if (idx == size - 1) {
		martix[i][j] = vi[idx++];
	}
}
```

需要注意只有一个元素的时候，直接返回


## 代码

```C++
#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> vi(n);
    for (int i = 0; i < n; i++) {cin >> vi[i];}

    if (n == 1) {
        printf("%d\n", vi[0]);
        return 0;
    }

    sort(vi.begin(), vi.end(), greater<int>());
    int size = n;
    int m = ceil(sqrt(size));
    while (size % m != 0) {m++;}
    n = size / m;
    vector<vector<int>> martix(m, vector<int>(n, -1));

    int left = 0, right = n - 1, top = 0, bottom = m - 1;
    int idx = 0, i = 0, j = 0;
    while (idx < size) {
        while (idx < size && j < right) {
            martix[i][j++] = vi[idx++];
        }
        while (idx < size && i < bottom) {
            martix[i++][j] = vi[idx++];
        }
        while (idx < size && j > left) {
            martix[i][j--] = vi[idx++];
        }
        while (idx < size && i > top) {
            martix[i--][j] = vi[idx++];
        }
        top++, right--, bottom--, left++;

        i++, j++; // 移动到下一个

        if (idx == size - 1) {
            martix[i][j] = vi[idx++];
        }

    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            printf("%d", martix[i][j]);
            if (j < n - 1) printf(" ");
        }
        printf("\n");
    }
    return 0;
}
```


