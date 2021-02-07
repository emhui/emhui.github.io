---
title: 1085 Perfect Sequence (25 分)
date: 2021-02-02 20:46:55
tags: [PAT, 双指针, 滑动窗口]
categories: [PAT]
math: true
---

# 1085 Perfect Sequence (25 分)

## 题目

![yQuGfG](https://gitee.com/yoyhm/oss/raw/master/uPic/yQuGfG.png)

## 分析

本题需要满足$M<=m*p$。因此可以先对序列进行排序，然后设置两个指针`i = 0,j = 0`。

当满足`arr[j] <= arr[i] * p`的时候，不断的让`j`进行右移，在移动过程中，始终维护一个`count`，该值为`i,j`最大的范围。若不满足$M <= m * p$,则让`i`进行右移。

流程如下

|1| 2| 3| 4| 5| 6| 7| 8| 9| 20|
|-|-|-|-|-|-|-|-|-|-|
|i,j|-|-|-|-|-|-|-|-|-|
|i|j|-|-|-|-|-|-|-|-|
|i|-|j|-|-|-|-|-|-|-|
|i|-|-|j|-|-|-|-|-|-|
|i|-|-|-|j|-|-|-|-|-|
|i|-|-|-|-|j|-|-|-|-|
|i|-|-|-|-|-|j|-|-|-|
|i|-|-|-|-|-|-|j|-|-|
|-|i|-|-|-|-|-|j|-|-|
|-|i|-|-|-|-|-|-|j|-|
|-|-|i|-|-|-|-|-|-|j|

上面的流程写成代码如下

```C++
int i = 0, j = 0, count = 0;
while (j < n) {
	while (j < n && arr[j] <= (long long)arr[i] * p) {
		count = max(count, j - i + 1);
		j++;
	}
	i++;
}
```


## 代码

```C++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int n, p;
    cin >> n >> p;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    int i = 0, j = 0, count = 0;
    while (j < n) {
        while (j < n && arr[j] <= (long long)arr[i] * p) {
            count = max(count, j - i + 1);
            j++;
        }
        i++;
    }
    printf("%d
", count);
    return 0;
}
```

## 相关题目

- [424. 替换后的最长重复字符 - 力扣（LeetCode）](https://emhui.fun/2021/02/02/424-%E6%9B%BF%E6%8D%A2%E5%90%8E%E7%9A%84%E6%9C%80%E9%95%BF%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6-%E5%8A%9B%E6%89%A3%EF%BC%88LeetCode%EF%BC%89/)
