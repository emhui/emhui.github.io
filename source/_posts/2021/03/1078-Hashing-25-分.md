---
title: 1078 Hashing (25 分)
date: 2021-03-10 12:32:57
tags: [哈希表, PAT]
categories: [PAT]
---

# 1078 Hashing (25 分)

The task of this problem is simple: insert a sequence of distinct positive integers into a hash table, and output the positions of the input numbers. The hash function is defined to be H(key)=key%TSize where TSize is the maximum size of the hash table. Quadratic probing (with positive increments only) is used to solve the collisions.

Note that the table size is better to be prime. If the maximum size given by the user is not prime, you must re-define the table size to be the smallest prime number which is larger than the size given by the user.

### Input Specification:
Each input file contains one test case. For each case, the first line contains two positive numbers: MSize (≤104) and N (≤MSize) which are the user-defined table size and the number of input numbers, respectively. Then N distinct positive integers are given in the next line. All the numbers in a line are separated by a space.

### Output Specification:
For each test case, print the corresponding positions (index starts from 0) of the input numbers in one line. All the numbers in a line are separated by a space, and there must be no extra space at the end of the line. In case it is impossible to insert the number, print "-" instead.

### Sample Input:

```
4 4
10 6 4 15
```

### Sample Output:

```
0 1 4 -
```

## 代码

```C++
#include <iostream>
#include <vector>
using namespace std;
// Hi = (H(key) + di) % m; // i范围[0~m-1]
// 当是平方探测法的时候 di是 0^2, +-1^2, +-2^2....
bool isPrime(int x) {
    if (x < 2) return false;
    // 不要忘记等于号
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

int main() {
    int m, n, val;
    cin >> m >> n;
    while (!isPrime(m)) ++m;
    vector<int> table(m, -1); // -1表示为空
    int i, j, key, pos;
    for (i = 0; i < n; i++) {
        cin >> val;
        key = val % m;
        for (j = 0; j < m; j++) {
            pos = (key + j * j) % m;
            if (table[pos] == -1) {
                table[pos] = val;
                break;
            }
        }
        if (i != 0) printf(" ");
        if (j == m) printf("-");
        else printf("%d", pos);
    }
    printf("
");
    return 0;
}
```
