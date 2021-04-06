---
title: 1145 Hashing - Average Search Time (25 分)
date: 2021-03-10 12:32:15
tags: [PAT, 哈希表]
categories: [PAT]
---
# 1145 Hashing - Average Search Time (25 分)

The task of this problem is simple: insert a sequence of distinct positive integers into a hash table first. Then try to find another sequence of integer keys from the table and output the average search time (the number of comparisons made to find whether or not the key is in the table). The hash function is defined to be H(key)=key%TSize where TSize is the maximum size of the hash table. Quadratic probing (with positive increments only) is used to solve the collisions.

Note that the table size is better to be prime. If the maximum size given by the user is not prime, you must re-define the table size to be the smallest prime number which is larger than the size given by the user.

### Input Specification:

Each input file contains one test case. For each case, the first line contains 3 positive numbers: MSize, N, and M, which are the user-defined table size, the number of input numbers, and the number of keys to be found, respectively. All the three numbers are no more than 10
4. Then N distinct positive integers are given in the next line, followed by M positive integer keys in the next line. All the numbers in a line are separated by a space and are no more than 105.

### Output Specification:

For each test case, in case it is impossible to insert some number, print in a line X cannot be inserted. where X is the input number. Finally print in a line the average search time for all the M keys, accurate up to 1 decimal place.

### Sample Input:

```
4 5 4
10 6 4 15 11
11 4 15 2
```
### Sample Output:

```
15 cannot be inserted.
2.8
```

## 分析

本题考查 **哈希表建立**和**哈希表查询**

哈希表插入公式

$$
H_{i}(k) = (H(k) + d_i) \% m \ \ \ (0 <= i <= m - 1)
$$

- 其中$i$的范围 $[0 \sim m - 1]$.
- $d_{i}$ 是解决冲突的方法，若为平方探测法，则$d_{i}$表示$+1^2, -1^2, +2^2, -2^2, +3^2, -3^2 ...$

伪代码如下

```C++
cin >> key;
for (i = 0; i < m; i++) {
	pos = (key + i * i) % m;
	if (table[pos] == -1) {
		table[pos] = key;
		break;
	}
}
// 若查询到最后没有插入，证明无法插入
if (i == m) printf("Insert fail
");
```

接下来是哈希表查询，查询结束有三种情况

- 查询到了结果
- 查询到的位置没有结果
- 最后查询回到了原来位置（重要，最后当$d_{i} = m ^2$的时候，即查询回到了原点，所以查询的时候$i$的范围是$[0 \sim m]$）

伪代码如下

```C++
cnt = 0; // 查询次数
cin >> key;
// i = m的时候，证明回到了原点位置
for (int i = 0; i <= m; i++) {
	pos = (key + i * i) % m;
	if (table[pos] == key || table[pos] == -1) {
		cnt++;
		break; // 查询结束
	}
		
}
```

## 代码

```C++
#include <iostream>
#include <vector>
using namespace std;

int mSize, n, m, k;
vector<int> arr, table;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

int main() {
    int val, pos;
    cin >> mSize >> n >> m;
    // 找到最近的那个素数
    while(!isPrime(mSize)) mSize++;
    arr.resize(n);
    table.resize(mSize, -1);
    
    for (int i = 0; i < n; i++) {
        cin >> val; // 开始插入到哈希表中
        int j;
        for (j = 0; j < mSize; j++) {
            pos = (val + j * j) % mSize;
            if (table[pos] == -1) {
                table[pos] = val;
                break;
            }
        }
        if (j == mSize) printf("%d cannot be inserted.
", val);
    }
    
    // 查询的个数
    int cnt = 0;
    for (int i = 0; i < m; i++) {
        cin >> val;
        int j;
        for (j = 0; j <= mSize; j++) { // 查询为什么是等于？因为=mSize就证明查到了自己，若查到了自己，还是没有找到结果
            cnt++;
            pos = (val + j * j) % mSize;
            if (table[pos] == val || table[pos] == -1) {
                break;
            }
        }
    }
    printf("%.1lf
", 1.0 * cnt / m);
}
```

## 相关题目

- [1078 Hashing (25 分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805389634158592)

## 参考

- [评论区](https://blog.csdn.net/liuchuo/article/details/79819316)
