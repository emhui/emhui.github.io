---
title: 1113 Integer Set Partition (25分)
date: 2021-01-30 22:25:54
tags: [PAT, 算法, 数学]
categories: [PAT]
---
# 1113 Integer Set Partition (25分)

## 题目

![h3KONX](https://gitee.com/yoyhm/oss/raw/master/uPic/h3KONX.png)

## 分析

题目很简单，求出总和 sum(n)，再将数组排序，然后计算出前 n/2 个和。

答案就是 n % 2, sum(n) - 2 * sum(n/2)

~~把一组数字分成两组，其中两组的数量分别是 $n1, n2$。两组的和分别是$sum1, sum2$。需要满足 $min(n1,n2), max(sum1, sum2)$~~

~~进行排序，使用前缀和处理。需要保持$|n1-n2|$尽量小，那么就是两种情况~~

~~n为总数~~

~~- n为偶数，那么就是排序后，后面的直接减掉前面的~~
~~- n为奇数~~
	~~- 左边数量 n / 2 + 1, 右边数量 n / 2~~
	~~- 左边数量 n / 2, 右边数量 n / 2 + 1~~

## 代码
```C++
#include <iostream>
#include <algorithm>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    sort(arr.begin(), arr.end());
    if (n & 1) { // 如果n是奇数，则有两种情况
        int ans = max(
            abs(accumulate(arr.begin() + n / 2, arr.end(), 0)
            - accumulate(arr.begin(), arr.begin() + n / 2, 0)),
            abs(accumulate(arr.begin() + n / 2 + 1, arr.end(), 0)
            - accumulate(arr.begin(), arr.begin() + n / 2 + 1, 0))
        );
        printf("1 %d\n", ans);
    } else {
        int ans =
            accumulate(arr.begin() + n / 2, arr.end(), 0)
            - accumulate(arr.begin(), arr.begin() + n / 2, 0);
        printf("0 %d\n", ans);
    }
    return 0;
}
```

```C++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
int main() {
    int n, sum = 0, halfsum = 0;
    scanf("%d", &n);
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &v[i]);
        sum += v[i];
    }
    sort(v.begin(), v.end());
    for(int i = 0; i < n / 2; i++)
        halfsum += v[i];
    printf("%d %d", n % 2, sum - 2 * halfsum);
    return 0;
}
```
