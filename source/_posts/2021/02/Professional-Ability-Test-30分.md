---
title: Professional Ability Test (30分)
date: 2021-02-22 18:00:03
tags: [PAT, Dijkstra, 最短路径, 拓扑排序]
categories: [PAT]
---
# Professional Ability Test (30分)

## 题目

![99ea0421cbe345a9b3e12ead6f7cc4b5](https://gitee.com/yoyhm/oss/raw/master/uPic/99ea0421cbe345a9b3e12ead6f7cc4b5.png)

## 分析

题目大意

PAT考试是一系列科目考试。过B之前必须过A（A的分数不能低于S）。通过A考试，可以得到D元代金券用来参加B考试。

> 后面这部分没看懂。

输入

正整数N（考试数量），M（前置要求关系？？）。接下来是M行，每行描述如下

> T1 T2 S D

`T1, T2`是考试的下标（下标范围0-N-1）。`S`是通过`T1`的最低分数，`D`是代金
券。

接下来是个正整数K，K个考试查询。

输出

> 找到分数最小的参加考试，否则找到代金券最少的

### 分析

在网上看了别人的解析后，发现本题就是考查 **是否存在环**和**求从入度为0开始的结点到各个结点的最短路径**

是否存在环使用 **拓扑排序** 判断。

拓扑排序判断环代码如下

```C++
int n, m;
vector<int> inDegree(n);
vector<int> G(n);

bool isTopoSort() {
	int num = 0;
	queue<int> q;

	for (int i = 0; i < n; i++) {
		if (inDegree[i] == 0) q.push(i);
	}

	while (!q.empty()) {
		int node = q.front();
		q.pop();
		for (int i = 0; i < G[node].size(); i++) {
			if(--inDegree[G[node][i]] == 0) q.push(G[node][i]);
		}
		num++; // 统计加入拓扑排序中的点
	}
	// 如果所有的点加入了拓扑排序，证明没有环
	if (num == n) return true;
	else return false;
}
```

接下来是寻找最短路径，从入度为0的结点出发。从下面的草稿中可以看出来，起点（入度为0）有两个，分别是0，3. 所以我们需要分别从0和3开始求最短路径。

![xBawpi](https://gitee.com/yoyhm/oss/raw/master/uPic/xBawpi.png)

分别求出各个入口的最短路径（在拓扑排序的时候可以将起点保存在`enterPoint`）

```C++
// 进行最短路径求解
for (int i = 0; i < enterPoint.size(); i++)
{
	Dijkstra(enterPoint[i]);
}
```

求最短路径使用`Dijkstra`

> 可以使用`Dijkstra`或者`回溯`来求最短路径。这里使用`Dijkstra`来计算最短路径。首先是满足`minimum total S`,然后再满足`maximum total vouchers`。

```C++
// scores 存储多条最小的分数
// vouchers 存储多条最大的奖券
// path 存储多条满足条件的路径
vector<vector<int>> scores, vouchers, path;
void Dijkstra(int start)
{
    vector<int> temps(n, MAX), tempv(n, -1), tempp(n);
    fill(visited.begin(), visited.end(), false);
    temps[start] = 0; // 自己到自己的分数是0
    tempv[start] = 0; // 自己到自己的奖券是0
    for (int i = 0; i < n; i++)
        tempp[i] = i;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push(make_pair(0, start));
    while (!pq.empty())
    {
        int u = pq.top().second;
        pq.pop();
        if (visited[u])
            continue;
        visited[u] = true;
        for (int i = 0; i < Score[u].size(); i++)
        {
            int v = Score[u][i].first;
            if (!visited[v])
            {
                if (temps[u] + Score[u][i].second < temps[v])
                {
                    temps[v] = temps[u] + Score[u][i].second;
                    tempv[v] = tempv[u] + Voucher[u][i].second;
                    tempp[v] = u;
                    pq.push(make_pair(temps[v], v));
                }
                else if (temps[u] + Score[u][i].second == temps[v] && tempv[v] < tempv[u] + Voucher[u][i].second)
                {
                    tempv[v] = tempv[u] + Voucher[u][i].second;
                    tempp[v] = u;
                    pq.push(make_pair(temps[v], v));
                }
            }
        }
    }
	// 添加到集合中
    scores.push_back(temps);
    vouchers.push_back(tempv);
    path.push_back(tempp);
}
```

最后在根据题目意思，比较`s,d`。找到满足条件的路径在哪里，使用DFS进行输出。

```C++
// 找到最佳路径所在的下标
int minS = MAX;
for (int i = 0; i < enterPoint.size(); i++)
{
	if (scores[i][t] < minS)
	{
		minS = scores[i][t];
		ansIdx = i;
	}
}
int maxV = -1;
for (int i = 0; i < enterPoint.size(); i++)
{
	if (scores[i][t] == minS && vouchers[i][t] > maxV)
	{
		maxV = vouchers[i][t];
		ansIdx = i;
	}
}
dfs(t);
```

使用DFS后续输出

```C++
// 遍历输出满足条件的路径
void dfs(int p)
{
    if (p == enterPoint[ansIdx])
    {
        printf("%d->", p);
        return;
    }
    dfs(path[ansIdx][p]);
    printf("%d", p);
    if (p != t) // 最后一个点不用打印 ->
        printf("->");
}

```

## 代码

```C++
#include <iostream>
#include <map>
#include <queue>
#include <vector>
using namespace std;
const int MAX = 987654321;

int n, m, q, t;
int t1, t2, s, d;
int ansIdx = 0;
vector<vector<pair<int, int>>> Score, Voucher; // s图和V图
vector<vector<int>> scores, vouchers, path;
vector<bool> visited;
vector<int> inDegree, enterPoint;

void init()
{
    Score.resize(n);
    Voucher.resize(n);
    visited.resize(n);
    inDegree.resize(n, 0);
}

bool isTopoSort()
{
    int num = 0; // 进入拓扑排序的数量
    vector<int> tempInDegree = inDegree;
    queue<int> q;
    for (int i = 0; i < n; i++)
    {
        if (tempInDegree[i] == 0)
        {
            enterPoint.push_back(i);
            q.push(i);
        }
    }
    while (!q.empty())
    {
        int node = q.front();
        q.pop();
        for (int i = 0; i < Score[node].size(); i++)
        {
            if (--tempInDegree[Score[node][i].first] == 0)
                q.push(Score[node][i].first);
        }
        num++;
    }
    if (num == n)
        return true;
    else
        return false;
}

void Dijkstra(int start)
{
    vector<int> temps(n, MAX), tempv(n, -1), tempp(n);
    // 初始化所有参数
    fill(visited.begin(), visited.end(), false);
    temps[start] = 0; // 自己到自己的分数是0
    tempv[start] = 0; // 自己到自己的奖券是0
    for (int i = 0; i < n; i++)
        tempp[i] = i;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push(make_pair(0, start));
    while (!pq.empty())
    {
        int u = pq.top().second;
        pq.pop();
        if (visited[u])
            continue;
        visited[u] = true;
        for (int i = 0; i < Score[u].size(); i++)
        {
            int v = Score[u][i].first;
            if (!visited[v])
            {
                if (temps[u] + Score[u][i].second < temps[v])
                {
                    temps[v] = temps[u] + Score[u][i].second;
                    tempv[v] = tempv[u] + Voucher[u][i].second;
                    tempp[v] = u;
                    pq.push(make_pair(temps[v], v));
                }
                else if (temps[u] + Score[u][i].second == temps[v] && tempv[v] < tempv[u] + Voucher[u][i].second)
                {
                    tempv[v] = tempv[u] + Voucher[u][i].second;
                    tempp[v] = u;
                    pq.push(make_pair(temps[v], v));
                }
            }
        }
    }
    scores.push_back(temps);
    vouchers.push_back(tempv);
    path.push_back(tempp);
}

// 遍历输出满足条件的路径
void dfs(int p)
{
    if (p == enterPoint[ansIdx])
    {
        printf("%d->", p);
        return;
    }
    dfs(path[ansIdx][p]);
    printf("%d", p);
    if (p != t) // 最后一个点不用打印 ->
        printf("->");
}

int main()
{
    cin >> n >> m;
    init();
    for (int i = 0; i < m; i++)
    {
        cin >> t1 >> t2 >> s >> d;
        inDegree[t2]++; // 入度+1
        Score[t1].push_back(make_pair(t2, s));
        Voucher[t1].push_back(make_pair(t2, d));
    }
    bool isTopo = isTopoSort();
    if (isTopo)
    {
        // 进行最短路径求解
        for (int i = 0; i < enterPoint.size(); i++)
        {
            Dijkstra(enterPoint[i]);
        }
    }
    printf("%s
", isTopo ? "Okay." : "Impossible.");
    cin >> q;
    for (int i = 0; i < q; i++)
    {
        cin >> t;
        if (isTopo)
        {
            if (inDegree[t] == 0)
            {
                printf("You may take test %d directly.
", t);
            }
            else
            {
                // 找到最佳路径所在的下标
                int minS = MAX;
                for (int i = 0; i < enterPoint.size(); i++)
                {
                    if (scores[i][t] < minS)
                    {
                        minS = scores[i][t];
                        ansIdx = i;
                    }
                }
                int maxV = -1;
                for (int i = 0; i < enterPoint.size(); i++)
                {
                    if (scores[i][t] == minS && vouchers[i][t] > maxV)
                    {
                        maxV = vouchers[i][t];
                        ansIdx = i;
                    }
                }
                dfs(t);
                printf("
");
            }
        }
        else
        {
            if (inDegree[t] == 0)
                printf("You may take test %d directly.
", t);
            else
                printf("Error.
");
        }
    }
}
```

## 其他

这道题花了2个多小时才写出来。思路其实不难，就是题目没看懂😭。
