---
title: 1054 The Dominant Color
date: 2021-01-05 12:41:44
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmru22eeej21hc0u0aj6.jpg
tags: [PAT, C++, 算法]
categories: [PAT]
---

# [1054 The Dominant Color (20分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805422639136768)

## 题目

![content](https://gitee.com/yoyhm/oss/raw/master/uPic/To7ZZS.png)

## 思路

本题目目的是要找到**出现次数大于总数一半的那个数字**。

- 最简单的方法就是使用`map`，以每个值作为`key`，出现次数作为`value`。再找出`value`最大的`key`。见方法一。
- 因为题目要求过半数的值，因此可以采用**两两不相同相互抵消的方法**，最后剩下的那个数一定是超过半数的数字。设置一个`ans`来存储当前数字，`count`来计算当前数字的数量。如果遇到相同的数字，`count++`,否则`count--`。若`count==0`，则令`ans`等于新的值。见方法二。
- ❌也可以使用一个很大的数组来存储，但是使用数组会超时

## 代码

### 方法一
```C++
// 找出最主要的颜色，即数量超过一半的
#include <cstdio>
#include <algorithm>
#include <map>

using namespace std;

map<int,int> colors;

int main() {
    int n, m, num;
    scanf("%d%d", &m, &n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; ++j) {
            scanf("%d", &num);
            if (colors.find(num) != colors.end()) {
                colors[num]++;
            } else {
                colors[num] = 1;
            }

        }
    }
    int k = 0, max = 0;
    for (map<int,int>::iterator it = colors.begin(); it != colors.end(); it++) {
        if (it->second > max) {
            k = it->first;
            max = it->second;
        }
    }
    printf("%d\n", k);
    return 0;
}
```

时间复杂度
> `map`的`find`时间复杂度是$O(logN)$,而遍历一遍`map`的时间复杂度是$O(N)$。因此总的时间复杂度是 $O(N*logN)$

空间复杂度

> $O (N)$

### 方法二

```C++
// 找出最主要的颜色，即数量超过一半的
#include <cstdio>

int main() {
    int n, m, ans = 0, count = 1, num;
    scanf("%d%d", &m, &n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; ++j) {
            scanf("%d", &num);
            if (ans == num) count++; // 遇到相同的数字，则count++
            else count--;
            if (count == 0) { // 令ans等于新的值
                ans = num;
                count = 1;
            }
        }
    }
    printf("%d\n", ans);
    return 0;
}
```

时间复杂度

> $O(N)$

空间复杂度

> $O(1)$



## 其他

> C++知识学习

- `map`遍历以及对key,value的访问

`map`使用迭代器进行遍历元素[^1]

```C++
map<int, int>::iterator it;
it->first; // 访问key
it->second; // 访问value
// 遍历每个元素
for (map<int, int>::iterator it = mp.begin(); it != mp.end(); it++) {
	int key = it->first;
	int value = it->second;
}
```

- `map`判断`key`是否存在[^2]

**find函数**

```C++
iterator find ( const key_type& key );
```

如果key存在，则find返回key对应的迭代器，如果key不存在，则find返回尾后迭代器 .end()。可以参考下面的示例来判断key值是否存在

```C++
if (mp.find(key) == mp.end()) {
	printf("mp not has the key");
} else {
	printf("mp has the key");
}
```


[^1]: [算法笔记上机训练实战指南](https://book.douban.com/subject/30162908/)
[^2]: [C++(14):判断map中key值是否存在](https://blog.csdn.net/Leo_csdn_/article/details/85066264)
