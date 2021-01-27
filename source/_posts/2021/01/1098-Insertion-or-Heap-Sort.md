---
title: 1098 Insertion or Heap Sort
date: 2021-01-21 12:36:27
tags: [PAT, 算法, 堆]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmrxuzha8j21hc0u0gur.jpg
---

# 1098 Insertion or Heap Sort

## 题目

![KmXTsV](https://gitee.com/yoyhm/oss/raw/master/uPic/KmXTsV.png)

## 思路

本题和[]()类似,都是要通过

## 代码

```C++
#include <cstdio>
#include <algorithm>
using namespace std;
const int MAX = 10010;
int origin[MAX], temp[MAX], ans[MAX], change[MAX];
int n;

bool isSame(int A[], int B[]) {
    for (int i = 1; i <= n; i++) {
        if (A[i] != B[i]) return false;
    }
    return true;
}

bool insertSort() {
    bool flag = false;
    for (int i = 2; i <= n; i++) {
        if (i != 2 && isSame(temp, change)) { flag = true; }
        sort(temp, temp + i + 1);
        if (flag) {return true;} // 已经是找到了目标数组
    }
    return false;
}

void showArray(int arr[]) {
    for (int i = 1; i <= n; i++) {
        printf("%d", arr[i]);
        if (i < n) printf(" ");
    }
    printf("\n");
}

void downAdjust(int low, int high) { // high最后一个结点
    int i = low, j = i * 2; // i为当前正要调整结点, j为左孩子结点
    while (j <= high) {
        if (j + 1 <= high && temp[j] < temp[j + 1]) { // 找到左右最大的结点，去和待调整点比较
            j = j + 1; // j存储右边孩子结点
        }
        if (temp[j] > temp[i]) {
            swap(temp[i], temp[j]);
            i = j; // 同时移动根结点
            j = j*2; // j也进行移动
        } else {
            break; // 如果根结点大于子结点，不需要调整
        }
    }
}

void heapSort() {
    bool flag = false;
    for (int i = n / 2; i >= 1; i--) {
        downAdjust(i, n);
    }
    for (int i = n; i > 1; i--) {
        if (i != n && isSame(temp, change)) {
            flag = true;
        }
        swap(temp[i], temp[1]);
        downAdjust(1, i - 1);
        if (flag) {
            showArray(temp);
            return;
        }
    }
}
int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &origin[i]);
        temp[i] = origin[i];
    }
    for (int i = 1; i <= n; i++) {
        scanf("%d", &change[i]);
    }
    if (insertSort()) {
        printf("Insertion Sort\n");
        showArray(temp);
    } else {
        printf("Heap Sort\n");
        for (int i = 1; i <= n; i++) {temp[i] = origin[i];}
        heapSort();
    }
    return 0;
}

```
