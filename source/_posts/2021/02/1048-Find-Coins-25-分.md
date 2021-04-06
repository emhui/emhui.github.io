---
title: 1048 Find Coins (25 分)
date: 2021-02-21 16:05:48
tags: [PAT, 双指针, 二分查找]
categories: [PAT]
---

# 1048 Find Coins (25 分)

## 题目

![kDzhbH](https://gitee.com/yoyhm/oss/raw/master/uPic/kDzhbH.png)

## 分析

本题考查 **双指针**和**二分法**

### 双指针

先将数组排序，再设置`i,j`分别指向首尾。当`nums[i] + nums[j] > m`的时候，证明`nums[j]`过大，`j`应当左移，当`nums[i] + nums[j] < m`的时候，证明`nums[i]`过小，`i`右移。

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// 找到第一个大于等于x的值
int lower_bound(vector<int>& nums, int low, int high, int x) {
    int mid;
    while (low < high) {
        mid = (low + high) >> 1;
        if (nums[mid] >= x) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main () {
    int n, m;
    cin >> n >> m;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    int i = 0, j = n - 1;
    while (i < j) {
        if (nums[i] + nums[j] == m) {
            printf("%d %d\n", nums[i], nums[j]);
            return 0;
        } else if (nums[i] + nums[j] > m) j--;
        else i++;
    }
    printf("No Solution\n");
    return 0;
}
```

### 二分法

也是先将数组排序，然后进行一次遍历，每次找到`i`和`i`的左侧大于等于`m - nums[i]`的`j`值。若满足则输出，否则寻找下一个`i`对应的`j`。

找到第一个大于等于`x`值的代码如下

```C++
// 找到第一个大于等于x的值
int lower_bound(vector<int>& nums, int low, int high, int x) {
    int mid;
    while (low < high) {
        mid = (low + high) >> 1;
        if (nums[mid] >= x) high = mid;
        else low = mid + 1;
    }
    return low;
}
```

本题注意：如果只有一枚硬币，是无法满足条件中必须支付两枚硬币的条件，因此需要输出`No Solution`

最终代码如下

```C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// 找到第一个大于等于x的值
int lower_bound(vector<int>& nums, int low, int high, int x) {
    int mid;
    while (low < high) {
        mid = (low + high) >> 1;
        if (nums[mid] >= x) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main () {
    int n, m;
    cin >> n >> m;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    if (n == 1) { // 考虑为1的情况
        printf("No Solution\n");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        int j = lower_bound(nums, i + 1, n - 1, m - nums[i]);
        if (nums[i] + nums[j] == m) {
            printf("%d %d\n", nums[i], nums[j]);
            return 0;
        }
    }
    printf("No Solution\n");
    return 0;
}
```
