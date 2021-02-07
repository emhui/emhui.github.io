---
title: 1089 Insert or Merge (25 分)
date: 2021-02-03 10:14:38
tags: [PAT, 归并排序, 排序, 插入排序]
categories: [PAT]
---

# 1089 Insert or Merge (25 分)

## 问题

![xv3r5Q](https://gitee.com/yoyhm/oss/raw/master/uPic/xv3r5Q.png)

## 分析

本题查考 **插入排序** 和 **归并排序**的流程。先判断是否是插入排序，这个比较简单。

插入排序怎么写

```C++
// 2, 3, 1, 5
void insertSort() {
	for (int i = 1; i < n; i++) {
		int j = i;
		while (j - 1 >= 0 && arr[j] < arr[j - 1]) {
			swap(arr[j], arr[j-1]);
			j--;
		}
	}
}
void insertSort() {
	for (int i = 1; i < n; i++) {
		int temp = arr[i], j = i;
		while (j - 1 >= 0 && temp < arr[j - 1]) {
			swap(arr[j], arr[j-1]);
			j--;
		}
		arr[j] = temp;
	}
}
```

归并排序怎么写？

归并排序是先俩俩排序，再渐渐合并俩俩，最终变成一个大的排序

以下是递归的三种实现方法

方法一：小规模排序使用`sort`替代了`merge`

```C++
for (int step = 2; step / 2 <= n; step *= 2) { // 时间复杂度 O(logn)
	for (int i = 0; i < n; i += step) {
		 sort(temp.begin() + i, temp.begin() + min(i + step, n))		;
	}
}
```
方法二：使用递归，非递归和`merge`实现归并排序
```C++
void merge(int A[], int l1, int r1, int l2, int r2) {
	int i = l1, j = l2, idx = 0;
	int temp[MAX];
	while (i <= r1 && j <= r2) {
		if (A[i] <= A[j]) temp[idx++] = A[i++];
		else temp[idx++] = A[j++];
	}
	while (i <= r1) temp[idx++] = A[i++];
	while (j <= r2) temp[idx++] = A[j++];
	for (int i = 0; i < idx; i++) {
		A[l1 + i] = temp[i];
	}
}

// 递归实现
void mergeSort(int A[], int l, int r) {
	if (l > r) return;
	int mid = (l + r) / 2;
	mergeSort(A, l, mid);
	mergeSort(A, mid + 1, r);
	merge(A, l, mid, mid + 1, r);
}

// 非递归实现
int n; // 序列数量
void mergeSort() {
	// 为什么step/2 <= n;
	// 因为当step = step/2 的时候，只剩下最后两组序列需要归并了。
	// step > step/2 已经是最后一组了，无需归并
	for (int step = 2; step / 2 <= n; step *= 2) {
		for (int i = 0; i < n; i += step) {
			int l = i, r = min(i + step, n);
			// 这里需要注意，每个区间元素个数 step, 所以mid应该是 i + step / 2 - 1.
			int mid = l + step / 2 - 1;
			if (mid + 1 < n) {
				merge(A, l, mid, mid + 1, r);
			}
		}
	}
}
```

注意，本题中初始序列不参与比较。即不能在还没有排序的时候就去比较是否找到了结果。

## 代码

```C++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int n;
vector<int> origin, target, temp;

bool insertSort() {
    bool flag = false;
    for (int i = 1; i < n; i++) {
        if (i != 1 && temp == target) flag = true; // 原始序列不参与排序
        int j = i;
        while (j - 1 >= 0 && temp[j] < temp[j - 1]) {
            swap(temp[j], temp[j - 1]);
            j--;
        }
        if (flag) return true;
    }
    return false;
}

void mergeSort() {
    bool flag = false;
    for (int step = 2; step / 2 <= n; step *= 2) { // 时间复杂度 O(logn)
        if (step != 2 && temp == target) flag = true;
        for (int i = 0; i < n; i += step) {
            sort(temp.begin() + i, temp.begin() + min(i + step, n));
        }
        if (flag) return;
    }
}

int main() {
    cin >> n;
    origin.resize(n), target.resize(n);
    for (int i = 0; i < n; i++) cin >> origin[i];
    for (int i = 0; i < n; i++) cin >> target[i];
    temp = origin;
    if (insertSort()) {
        printf("Insertion Sort\n");
        for (int i = 0; i < n; i++) {
            printf("%d", temp[i]);
            if (i < n - 1) printf(" ");
        }
    } else {
        temp = origin;
        mergeSort();
        printf("Merge Sort\n");
        for (int i = 0; i < n; i++) {
            printf("%d", temp[i]);
            if (i < n - 1) printf(" ");
        }
    }
    printf("\n");
    return 0;
}
```
