---
title: 547. Number of Provinces
date: 2021-01-07 14:53:44
index_img: https://tva1.sinaimg.cn/large/0060lm7Tly1ftg6xhyidxj31hc0u0x6p.jpg
tags: [bfs, dfs, leetcode, union-find, 图, 无向图, 算法, 邻接矩阵]
categories: [LeetCode]
math: true
---

# [547. Number of Provinces](https://leetcode-cn.com/problems/number-of-provinces/)

## 题目

{% note warning %}
难度：中等
{% endnote %}

![xmxR4o](https://gitee.com/yoyhm/oss/raw/master/uPic/xmxR4o.png)

## 思路

本题转化为图，其大概意思就是是**给出一个用邻接矩阵表示的无向图，找出连通分量的数量**。

解决问题的方法主要有三种方法


1. - [x] DFS
2. - [x] BFS
3. - [ ] union-ﬁnd

## 代码实现

### DFS

**Python**

```python
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        # 求连通图的数量
        size = len(isConnected)
        visited = [False for _ in range(size)]
        count = 0
        def dfs(isConnected, idx):
            visited[idx] = True
            for i in range(size):
                if isConnected[idx][i] == 1 and not visited[i]:
                    dfs(isConnected, i)

        for i in range(size):
            if not visited[i]:
                dfs(isConnected, i)
                count += 1
        return count
```

**C++**

```C++
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int size = isConnected.size();
        int count = 0;
        vector<bool> visited(size, false);
        for (int i = 0; i < size; ++i) {
            if (!visited[i]) {
                dfs(isConnected, i, visited, size);
                count++;
            }
        }
        return count;
    }

    void dfs(vector<vector<int>>& isConnected, int idx, vector<bool>& visited, int size) {
        visited[idx] = true;
        for (int i = 0; i < size; i++) {
            if (isConnected[idx][i] == 1 && !visited[i]) {
                dfs(isConnected, i, visited, size);
            }
        }
    }
};
```

### 复杂度分析

- 时间复杂度: $O(n^2)$,这里需要对矩阵进行遍历。
- 空间复杂度: $O(n)$, 使用`visited`存储`n`个城市是否被访问。

### BFS

**C++**

```python
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int size = isConnected.size();
        int count = 0;
        vector<bool> visited(size, false);
        for (int i = 0; i < size; ++i) {
            if (!visited[i]) {
                bfs(isConnected, i, visited, size);
                count++;
            }
        }
        return count;
    }
    

    void bfs(vector<vector<int>>& isConnected, int idx, vector<bool>& visited, int size) {
        visited[idx] = true;
        queue<int> q;
        q.push(idx);
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            for (int i = 0; i < size; i++) {
                if (isConnected[node][i] == 1 && !visited[i]) {
                    visited[i] = true;
                    q.push(i);
                }
            }
        }
    }
};
```

从上面可以看到，`BFS`和`DFS`的写法，只有计算连通分量的时候不一样，其他都是一样的。

复杂度分析
- 时间复杂度：$O(n^2)$，遍历整个矩阵
- 空间复杂度: $O(n)$.visited大小的空间
