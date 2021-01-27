---
title: 990. Satisfiability of Equality Equations
date: 2021-01-14 10:17:15
tags: [leetcode, 算法, union-find, 图]
categories: [LeetCode]
math: true
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmro0m82gj21hc0u0do7.jpg
---

# [990. Satisfiability of Equality Equations](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/)

## 题目

{% note warning %}
难度：中等
{% endnote %}

![oY9FRa](https://gitee.com/yoyhm/oss/raw/master/uPic/oY9FRa.png)

## 思路

这里考察等式是否成立，若两个值本来就相等，但是出现不等的情况，说明有矛盾，等式不成立。因此可以反过来想，若一个不等式中出现了等式的情况，那么也是有矛盾。所以题目可以转化为**判断一个不等式的两个值在一个连通图中是否连通，若连通，则矛盾，返回false**。使用**并查集**可以判断两个点的连通问题。

⚠️ 这里使用`dict`将每个字符与唯一数字进行映射。因为，数组查找元素的速度大于字典。也可以直接使用字典。

步骤

1. 使用字典将字符和唯一数字进行映射。
2. 建立一个`parent`数组存储每个结点，初始化`parent[i]=i`。
3. 对于`a==b`的等式使用`union-find`建立一个连通图。
4. 对`a!=b`判断是`a,b`是否连通。若连通，则返回`False`


```python
class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        order = 0
        hasmap = {}
        # 1. 处理数据，将字符与唯一的数字进行映射。
        for s in equations:
            if s[0] not in hasmap.keys():
                hasmap[s[0]] = order
                order += 1
            if s[-1] not in hasmap.keys():
                hasmap[s[-1]] = order
                order += 1
        parent = list(range(len(hasmap))) # 初始化数据

        def find(p):
            while p != parent[p]: p = parent[p]
            return p
        def union(p, q):
            parent[find(p)] = find(q)
        # 构建一个连通的并查集
        for s in equations:
            if s[1] == '=':
                if find(hasmap[s[0]]) != find(hasmap[s[-1]]):
                    union(hasmap[s[0]], hasmap[s[-1]])
        # 若本来不连通的出现连通的现象，证明有误
        for s in equations:
            if s[1] == '!':
                if find(hasmap[s[0]]) == find(hasmap[s[-1]]):
                    return False
        return True
```

复杂度分析

- 时间复杂度: $O(n + ClogC)$. $n$是方程数量，$C$是变量总数，合并和查找的时间复杂度是$logC$，但是要遍历每个方程，因此时间复杂度是$ClogC$。
- 空间复杂度: $O(C)$, $C$是`parent`的长度。
