---
title: 1104 Sum of Number Segments (20分)
date: 2021-02-01 12:22:29
tags: [PAT, 数学]
categories: [PAT]
---

# 1104 Sum of Number Segments (20分)

## 题目

![CVyd6y](https://gitee.com/yoyhm/oss/raw/master/uPic/CVyd6y.png)

## 分析

**题目意思**

给定一个序列，求出他们的总和

> sequence { 0.1, 0.2, 0.3, 0.4 }, we have 10 segments: (0.1) (0.1, 0.2) (0.1, 0.2, 0.3) (0.1, 0.2, 0.3, 0.4) (0.2) (0.2, 0.3) (0.2, 0.3, 0.4) (0.3) (0.3, 0.4) and (0.4).

he sum of all the 10 segments is 0.1 + 0.3 + 0.6 + 1.0 + 0.2 + 0.5 + 0.9 + 0.3 + 0.7 + 0.4 = 5.0.

本题不难，可以使用下面的方法进行暴力遍历，但是肯定会运行超时。

```C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    double sum = 0;
    cin >> n;
    vector<double> vi(n);
    for (int i = 0; i < n; i++) {
        cin >> vi[i];
    }
    for (int i = 0; i < n; i++) {
        int idx = i;
        while (idx++ < n) {
            for (int j = i; j < idx; j++) {
                sum += vi[j];
            }
        }
    }
    printf("%.2lf\n", sum);
    return 0;
}
```

暴力不行，那就开始分析给出的数据。主要就是找到各个元素出现的次数有什么规律。

---

{ 0.1, 0.2, 0.3, 0.4 },

看看各个数字出现次数

0.1 - 4
0.2 - 6
0.3 - 6
0.4 - 4

---

{1,2,3,4,5}

1,
1,2
1,2,3
1,2,3,4
1,2,3,4,5

2,
2,3
2,3,4
2,3,4,5

3,
3,4
3,4,5

4,
4,5

5

1: 5 5 * 1
2: 8 4 * 2
3: 9 3 * 3
4: 8 2 * 4
5: 5 1 * 5

---

{1,2,3,4,5,6}


1,
1,2
1,2,3
1,2,3,4
1,2,3,4,5
1,2,3,4,5,6

2,
2,3
2,3,4
2,3,4,5
2,3,4,5,6

3,
3,4
3,4,5
3,4,5,6

4,
4,5
4,5,6

5,
5,6

6

1: 6 6 * 1
2: 10 5 * 2
3: 12 4 * 3
4: 12 3 * 4
5: 10 2 * 5
6: 6 1 * 6

---

所以规律等于

vi[i] 出现的次数为 (i + 1) * (n - i);

sum += vi[i] * (i + 1) * (n - i);

所以可以写出下面的代码

```C++
#include <iostream>
#include <vector>
using namespace std;

// 经测试，用例中存在一个精度问题，不能使用double
// double 在大量运行过程中会出现精度丢失

int main() {
    int n;
    double sum = 0, val;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> val;
        sum += (val  * i * (n - i + 1));
    }
    printf("%.2lf\n", sum / 1000.0);
    return 0;
}
```

但是有一个用例没有通过，在网上看到别人写的[^1]，发现是doble精度问题。

**double在大量运算过程中会出现精度丢失，在涉及到金钱计算的程序中尽量不用。**

## 最终代码

```C++
#include <iostream>
using namespace std;

// 经测试，用例中存在一个精度问题，不能使用double
// double 在大量运行过程中会出现精度丢失

int main() {
    int n;
    long long sum = 0;
    double val;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> val;
        sum += (long long)((val * 1000) * i * (n - i + 1));
    }
    printf("%.2lf\n", sum / 1000.0);
    return 0;
}
```

[^1]: [由一道 OJ 引发的关于 double 类型的一些思考](https://blog.zhengrh.com/post/about-double/)
