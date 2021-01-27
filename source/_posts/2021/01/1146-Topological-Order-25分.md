---
title: 1146 Topological Order (25分)
date: 2021-01-24 11:36:00
tags: [PAT, 算法, 拓扑排序]
categories: [PAT]
index_img: https://tva1.sinaimg.cn/large/87c01ec7gy1frmrrnjpf4j21hc0u0dot.jpg
---

# 1146 Topological Order (25分)

## 题目

This is a problem given in the Graduate Entrance Exam in 2018: Which of the following is NOT a topological order obtained from the given directed graph? Now you are supposed to write a program to test each of the options.

![图](https://images.ptausercontent.com/5d35ed2a-4d19-4f13-bf3f-35ed59cebf05.jpg)

**Input Specification:**

Each input file contains one test case. For each case, the first line gives two positive integers N (≤ 1,000), the number of vertices in the graph, and M (≤ 10,000), the number of directed edges. Then M lines follow, each gives the start and the end vertices of an edge. The vertices are numbered from 1 to N. After the graph, there is another positive integer K (≤ 100). Then K lines of query follow, each gives a permutation of all the vertices. All the numbers in a line are separated by a space.

**Output Specification:**

Print in a line all the indices of queries which correspond to "NOT a topological order". The indices start from zero. All the numbers are separated by a space, and there must no extra space at the beginning or the end of the line. It is graranteed that there is at least one answer.

**Sample Input:**

> 6 8
>
> 1 2
>
> 1 3
>
> 5 2
>
> 5 4
>
> 2 3
>
> 2 6
>
> 3 4
>
> 6 4
>
> 5
>
> 1 5 2 3 6 4
>
> 5 1 2 6 3 4
>
> 5 1 2 3 6 4
>
> 5 2 1 6 3 4
>
> 1 2 3 4 5 6

**Sample Output:**

> 3 4

---

## 思路

本题是给出多个序列，判断是否是拓扑排序。

使用邻接表建立一个有向图。同时计算每个点的入度。

将给出序列依次放进一个队列中，然后依次判断当前队首元素的入度是否为0，若为0，将其相连的顶点的入度都-1.若不是0，证明该序列非拓扑排序。

## 代码

```C++
// 判断是否是拓扑序列
// 把序列放到队列中，一个个判断，若队首元素的入度为0，把该元素设计到的所有顶点入度-1.
// 若队首的元素入度不为0，则证明不是拓扑排序

#include <cstdio>
#include <queue>
#include <vector>
using namespace std;
const int MAX = 1001;
vector<int> G[MAX];

bool isTopologicalOrder(queue<int>& q, vector<int>& inDegree) {
    while (!q.empty()) {
        int top = q.front();
        if (inDegree[top] != 0) {return false;}
        q.pop();
        for (int i = 0; i < G[top].size(); i++) { // 将该点设计到的所有顶点入度-1
            inDegree[G[top][i]]--;
        }
    }
    return true;
}

int main() {
    int n, m, start, end, k, val;
    scanf("%d%d", &n, &m);
    vector<int> inDegree(n + 1, 0); // 记住编号是1开始的。
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &start, &end);
        G[start].push_back(end);
        inDegree[end]++;
    }

    vector<int> ans;
    queue<int> q;
    scanf("%d", &k);

    for (int i = 0; i < k; i++) {
        vector<int> tempInDegree = inDegree;
        while (!q.empty()) q.pop(); // 清空队列
        for (int j = 0; j < n; j++) {
            scanf("%d", &val);
            q.push(val);
        }
        if(!isTopologicalOrder(q, tempInDegree)) {
            ans.push_back(i);
        }
    }
    for (int i = 0; i < ans.size(); i++) {
        printf("%d", ans[i]);
        if (i < ans.size() - 1) printf(" ");
    }
    printf("\n");
    return 0;
}
```

## 其他

- [ ] 拓扑排序知识点
