---
title: 1101 Quick Sort (25分)
date: 2021-02-01 18:43:42
tags: [PAT, 快速排序, 算法]
categories: [PAT]
---

# 1101 Quick Sort (25分)

## 题目

### 1101 Quick Sort (25分)

There is a classical process named partition in the famous quick sort algorithm. In this process we typically choose one element as the pivot. Then the elements less than the pivot are moved to its left and those larger than the pivot to its right. Given N distinct positive integers after a run of partition, could you tell how many elements could be the selected pivot for this partition?

For example, given N=5 and the numbers 1, 3, 2, 4, and 5. We have:

- 1 could be the pivot since there is no element to its left and all the elements to its right are larger than it;
- 3 must not be the pivot since although all the elements to its left are smaller, the number 2 to its right is less than it as well;
- 2 must not be the pivot since although all the elements to its right are larger, the number 3 to its left is larger than it as well;
- and for the similar reason, 4 and 5 could also be the pivot.
Hence in total there are 3 pivot candidates.

**Input Specification:**

Each input file contains one test case. For each case, the first line gives a positive integer N (≤10^5). Then the next line contains N distinct positive integers no larger than 10^9. The numbers in a line are separated by spaces.

**Output Specification:**

For each test case, output in the first line the number of pivot candidates. Then in the next line print these candidates in increasing order. There must be exactly 1 space between two adjacent numbers, and no extra space at the end of each line.

**Sample Input:**

> 5
>
> 1 3 2 4 5

**Sample Output:**

> 3
>
> 1 4 5

---

## 分析

每个数字都要左右去比较，那么肯定会超时。能否使用两个数组记录第i个数的左边的最大值和右边的最小值为多少呢？当满足`arr[i] > max_left && arr[i] < min_right`。则这个数可能是`pivot`

- 左边最大值
- 右边最小值

 每次和这个最大值最小值比较就可以


使用两个数组来分别遍历和存储左边的最大值和右边的最小值？

如下所示

 ```C++
//  1, 3, 2, 4, 5.

int max_l[MAX], min_r[MAX];

max_l[0] = -1;
max_l[1] = 1;
max_l[2] = 3;
max_l[3] = 3;
max_l[4] = 4;

max_l[0] = -1;
for (int i = 0; i < n - 1; i++) {
	max_l[i + 1] = arr[i] > max_l[i] ? arr[i] : max_l[i];
}

// 1, 3, 2, 4, 5.

min_r[4] = 1e9;
min_r[3] = 5;
min_r[2] = 4;
min_r[1] = 2;
min_r[0] = 2;

min_r[n - 1] =1e9;

for (int i = n - 1; i > 1; i--) {
	min_r[i - 1] = arr[i] < min_r[i] ? arr[i] : min_r[i];
}
 ```

## 代码

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INT_MAX = 1e9 + 1;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n), max_l(n), min_r(n), ans;
    for (int i = 0; i < n; i++) cin >> arr[i];

    max_l[0] = -1, min_r[n - 1] = INT_MAX;
    for (int i = 0; i < n - 1; i++) {
	    max_l[i + 1] = arr[i] > max_l[i] ? arr[i] : max_l[i];

    }
    for (int i = n - 1; i > 0; i--) {
	    min_r[i - 1] = arr[i] < min_r[i] ? arr[i] : min_r[i];
    }
    for (int i = 0; i < n; i++) {
        if (arr[i] > max_l[i] && arr[i] < min_r[i]) {
            ans.push_back(arr[i]);
        }
    }
    int size = ans.size();
    printf("%d\n", size);
    sort(ans.begin(), ans.end());
    for (int i = 0; i < size; i++) {
        printf("%d", ans[i]);
        if (i < size - 1) printf(" ");
    }
    printf("\n");
}
```

## 其他

不知道能不能等于号，在目前的用例中，加不加无所谓。

```C++
for (int i = 0; i < n; i++) {
	// if (arr[i] >= max_l[i] && arr[i] =< min_r[i]) {
	if (arr[i] > max_l[i] && arr[i] < min_r[i]) {
		ans.push_back(arr[i]);
	}
}
```
