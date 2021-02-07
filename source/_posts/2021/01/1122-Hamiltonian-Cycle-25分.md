---
title: 1122 Hamiltonian Cycle (25分)
date: 2021-01-29 22:01:23
tags: [PAT, 算法, 图]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmmmaptjmj21hc0u0npf.jpg
---

# 1122 Hamiltonian Cycle (25分)

## 题目

![OpU7ZA](https://gitee.com/yoyhm/oss/raw/master/uPic/OpU7ZA.png)

## 分析

判断是否是**Hamiltonian Cycle**

1. 首尾元素要一样
2. 必须遍历所有点
3. 不存在环，即边的个数为点的个数-1.
4. 连续两个顶点之间直接连通

> 可以使用并查集来做,但是题目没有这么难，代码二是使用并查集做的，其中有一个用例没有通过，原因应该是无法判断第4点是否满足，有连续两点没有直接连通，但是并查集并做不到查询两个点是否属于直接连通的。

根据上面四条依据，我们可以作出下面判断

> 存在多个环的依据是什么？如果只有一个简单环，那么顶点个数和边的个数一样，否则可能存在多个环。

```C++
bool flag1 = true, flag2 = true;

if (没有遍历所有点 || 首位元素不一致 || 存在多个环) {
	flag1 = false;
}

for (遍历给出的顶点) {
	if (两个顶点不可达) flag2 = false;
}

printf("%s\n", flag1 && flag2 ? "YES" : "NO");
```


## 代码



```C++
#include <iostream>
#include <set>
#include <vector>
using namespace std;

const int MAX = 210;
int G[MAX][MAX] = {0};

int main() {
    int n, m, k, num, val, u, v;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        G[u][v] = G[v][u] = 1;
    }
    cin >> k;
    while (k--) {
        cin >> num;
        vector<int> ans(num);
        set<int> s;
        for (int i = 0; i < num; i++) {
            cin >> ans[i];
            s.insert(ans[i]);
        }
        bool flag1 = true, flag2 = true;
        // if (没有遍历所有点 || 首位元素不一致 || 存在多个环 )
        if (s.size() != n || ans[0] != ans[num - 1] || num - 1 != n) {
            flag1 = false;
        }
        // 判断连续两点是否连通
        for (int i = 0; i < num - 1; i++) {
            if (G[ans[i]][ans[i+1]] == 0) {
                flag2 = false;
            }
        }
        printf("%s\n", flag1 && flag2 ? "YES" : "NO");
    }
}
```

### 并查集

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
using namespace std;

class UnionFind{
    private:
    vector<int> parent;
    int setCount;
    public:
    UnionFind(int n) {
        for(int i = 0; i < n; i++) parent.push_back(i);
        setCount = n;
    }
    int find(int n) {
        if (n != parent[n]) parent[n] = find(parent[n]);
        return parent[n];
    }
    void unite(int u, int v) {
        int uRoot = find(u), vRoot = find(v);
        if (uRoot == vRoot) return;
        parent[uRoot] = vRoot;
        setCount--;
    }
    int getCount() {return setCount;}
    bool isConnected(int u, int v) {return find(u) == find(v);}
};

int main() {
    int n, m, k, u, v, cnt;
    vector<int> node;
    cin >> n >> m;
    vector<bool> visited(n + 1);
    UnionFind uf(n + 1);
    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        if (!uf.isConnected(u, v)) {
            uf.unite(u, v);
        }
    }
    cin >> k;
    while (k--) {
        cin >> cnt;
        node.resize(cnt);
        fill(visited.begin(), visited.end(), false);
        // visited.resize(cnt + 1); // 记录1-n是否被访问过
        bool hasvisited = false; // 是否重复访问过
        set<int> s;
        for (int i = 0; i < cnt; i++) {
            scanf("%d", &node[i]);
            s.insert(node[i]);
        }
        // printf("%d\n", node[0] != node[n - 1]);
        if ((cnt - 1 != n) || (s.size() != n) || (node[0] != node[cnt - 1]) || (uf.getCount() > 2)) {
            printf("NO\n");
        } else {
            printf("YES\n");
        }
    }
}
```
