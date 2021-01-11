---
title: 1202. Smallest String With Swaps
date: 2021-01-11 12:01:27
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmmx0bdlsj21kw0w0npn.jpg
tags: [图, 算法, bfs, dfs, union-find]
categories: [LeetCode]
math: true
---

[1202. Smallest String With Swaps](https://leetcode-cn.com/problems/smallest-string-with-swaps/)

## 题目

![SlDQXJ](https://gitee.com/yoyhm/oss/raw/master/uPic/SlDQXJ.png)

## 思路

本题主要考察连通图、将属于同一连通分量中的字符进行排序，再依次放到原来同一连通分量的位置中。

方法

- [x] DFS
- [x] BFS
- [ ] Union-find

## 代码

### DFS

Python

```python
class Solution:
    def dfs(self, connect_graphic, graphic, visited, idx):
        visited[idx] = True
        connect_graphic.append(idx) # 添加当前属于同一个连通图的对象
        for i in graphic[idx]:
            if not visited[i]:
                self.dfs(connect_graphic, graphic, visited, i)

    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        # 思路：同一个连通图內的字符按照顺序排序，再放回原来的位置
        size = len(s)
        graphic = [[] for _ in range(size)]
        for i,j in pairs: # 建图
            graphic[i].append(j)
            graphic[j].append(i)
        print(graphic)
        visited = [False] * size
        res = list(s)
        for i in range(size):
            if not visited[i]:
                connect_graphic = []
                self.dfs(connect_graphic, graphic, visited, i)
                indicates = sorted(connect_graphic) # 索引排序
                string = sorted([res[j] for j in indicates]) # 索引对应的字符排序
                for key, val in zip(indicates, string): # 将对应的字符和对应的索引重现排大小
                    res[key] = val

        return "".join(res)
```

复杂度分析
- 时间复杂度: $O(n)$,$n$为顶点的数量
- 空间复杂度: $O(m+n)$, $m,n$分别是图的顶点和边的数量

### BFS

python

```python
class Solution:
    def bfs(self, connect_graphic, graphic, visited, idx):
        q = collections.deque([idx])
        visited[idx] = True
        connect_graphic.append(idx)
        while len(q) > 0:
            node = q.popleft()
            for i in graphic[node]:
                if not visited[i]:
                    visited[i] = True
                    connect_graphic.append(i)
                    q.append(i)

    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        # 思路：同一个连通图內的字符按照顺序排序，再放回原来的位置
        size = len(s)
        graphic = [[] for _ in range(size)]
        for i,j in pairs: # 建图
            graphic[i].append(j)
            graphic[j].append(i)
        print(graphic)
        visited = [False] * size
        res = list(s)
        for i in range(size):
            if not visited[i]:
                connect_graphic = []
                # self.dfs(connect_graphic, graphic, visited, i)
                self.bfs(connect_graphic, graphic, visited, i)
                indicates = sorted(connect_graphic) # 索引排序
                string = sorted([res[j] for j in indicates]) # 索引对应的字符排序
                for key, val in zip(indicates, string): # 将对应的字符和对应的索引重现排大小
                    res[key] = val

        return "".join(res)
```

复杂度分析
- 时间复杂度: $O(n)$,$n$为顶点的数量
- 空间复杂度: $O(m+n)$, $m,n$分别是图的顶点和边的数量
