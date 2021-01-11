---
title: 1051 Pop Sequence
date: 2021-01-07 16:06:42
index_img: https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6otk3cqj31hc0u014s.jpg
tags: [PAT, 算法， 栈]
categories: [PAT]
math: true
---

# 1051 Pop Sequence (25分)

## 题目

![18Xskb](https://gitee.com/yoyhm/oss/raw/master/uPic/18Xskb.png)

本题给定一个大小为$M$的栈，然后有一堆有序序列$1,2,3,4,5...N$依次入栈出栈。给定$K$个出栈序列，判断这几个出栈序列是否合法。

## 思路

建立一个栈，模拟$1 ~ N$进栈的过程，在这个过程中，将进栈的元素（**栈顶元素**）与当前**出栈序列**中的元素进行对比。若相等，则弹出栈顶，同时**出栈序列**往后移一位，继续此操作，直到有不相等的元素时，再让下一个元素进栈。

1. 建立一个初始的栈，该栈在每次输入前需要清空。
2. 设置一个变量`flag`，若当前入栈后，栈的大小超过了`M`，则直接`flag = false;`然后跳出♻️。
3. 接下然反复判断栈顶元素和当前第`idx`个**出栈序列**是否一样，若一样，执行弹出操作和`idx++`
4. 最后当栈为空且`flag=true`的时候输出`YES`,否则输出`No`

## 代码

```C++
#include <cstdio>
#include <stack>
using namespace std;

const int maxn = 1001;
stack<int> st;

int main() {
    int arr[maxn], m, n, k;
    scanf("%d%d%d", &m, &n, &k);
    while (k--) {
        while (!st.empty()) {st.pop();} // 每次都要清空栈
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
        }
        int idx = 0; // 输出数组的下标
        bool flag = true;
        for (int i = 0; i < n; i++) {
            st.push(i + 1); // 把数字i+1压入栈
            if (st.size() > m) {
                flag = false;
                break;
            }
            while (!st.empty() && st.top() == arr[idx]) {
                st.pop();
                idx++;
            }
        }
        if (st.empty() && flag) {printf("YES\n");}
        else {printf("NO\n");}
    }
    return 0;
}
```

复杂度分析

- 时间复杂度：$O(n+m)$
- 空间复杂度: $O(max(m,n))$
