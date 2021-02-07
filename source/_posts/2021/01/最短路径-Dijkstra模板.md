---
title: 最短路径 Dijkstra模板
date: 2021-01-31 21:21:40
tags: [PAT, 算法, 最短路径, Dijkstra, 优先队列, priority_queue]
categories: [PAT]
---

# 最短路径 Dijkstra模板


## 伪代码

```C++
// G 图, d 距离, s 起始点
void Dijkstra(G, d[], s) {
	初始化;
	for ( 循环n次 ) {
		u = 使d[u]最小，且没有被访问顶点;
		记录u被访问;
		for (从u出发能到达的所有顶点v) {
			if (v没有被访问 && 以u为中介到v的距离比d[v]更优) {
				优化d[v];
			}

		}
	}
}
```

## 邻接矩阵实现

```C++
int INF = 987654321;
int MAX = 10000;
int G[MAX][MAX];
int d[MAX];
int n; // 顶点个数
bool visited[MAX] = {false};

void Dijkstra(int s) {
	// 1. 初始化操作
	fill(d, d + MAX, INF); // 初始化所有路径
	d[s] = 1;
	// visited[s] = true;
	for (int i = 0; i < n; i++) { // 依次找n个结点
		// 2. 找到最小且没有被访问的的d[u]
		int u = -1, min = INF;
		for (int j = 0; j < n; j++) {
			// 2.1 找到没有被访问 && d[u]最小的的值
			if (!visited[j] && min > d[j]) {
				u = j;
				min = d[j];
			}
		}
		if (u == -1) return; // 没有找到
		visited[u] = true; // 已经访问到了
		// 3. 优化以u作为中介到v的点和d[v]进行比较;
		for (int v = 0; v < n; v++) {
			if (!visited[v] && G[u][v] != INF && d[u] + G[u][v] < d[v]) {
				d[v] = d[u] + G[u][v]; // 优化d[v];
			}
		}
	}
}
```

## 邻接表实现

```C++
int MAX = 10000;
int INF = 987654321;
struct Node{
	int v, dis;
}
vector<Node> G[MAX];
int d[MAX];
bool viisted[MAX] = {false};
int n;

// s 起点
void Dijkstra(int s) {
	// 1. 初始化
	fill(d, d + MAX, INF); // 初始化所有距离;
	d[s] = 0;
	// 2. 开始依次找到n个最短距离
	for (int i = 0; i < n; i++) { // 找n个距离最小的点
		// 2.1 找到没有被访问且距离最短的顶点
		int u = -1, min = INF;
		for (int j = 0; j < n; j++) {
			if (!visited[j] && min > d[j]) {
				u = j;
				min = d[j];
			}
		}
		if (u == -1) return;
		visited[u] = true;
		// 只有这部分不一样
		for (int j = 0; j < G[u].size(); j++) {
			int v = G[u][j].v;
			if (!visited[v] && d[u] + G[u][v].dis < d[v]) {
				d[v] = d[u] + G[u][v].dis;
			}
		}
	}
}
```

## 优化：使用`priority_queue`实现

> 注意：这里需要使用最小堆

```C++
int v;
vector<pair<int, int>> adj;
vector<int> dijkstra(int s) {
	vector<int> dis(v, INF);
	vector<int> visited(v, false);
	dis[s] = 0;
	priority_queue<pair<int,int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
	pq.push(make_pair(0, s));
	while (!pq.empty()) {
		int u_dis = pq.top().first;
		int u = pq.top().second;
		if (visited[u]) continue;
		visited[u] = false;
		for (int i = 0; i < adj[u].size(); i++) {
			int v = adj[u][i].first;
			if (!visited[v] && dis[u] + adj[u][v] < dis[v]) {
				dis[v] = dis[u] + adj[u][v].second;
				pq.push(make_pair(dis[v], v));
			}
		}
	}
	return dis;
}
```

这里其实可以不用`visited`变量，此方法参考《算法问题实战策略》

```C++
int v;
vector<pair<int, int>> adj;
vector<int> dijkstra(int s) {
	vector<int> dis(v, INF);
	dis[s] = 0;
	priority_queue<pair<int,int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
	pq.push(make_pair(0, s));
	while (!pq.empty()) {
		int u_dis = pq.top().first;
		int u = pq.top().second;
		if (d[u] < u_dis) continue;
		visited[u] = false;
		for (int i = 0; i < adj[u].size(); i++) {
			int v = adj[u][i].first;
			if (!visited[v] && dis[u] + adj[u][v].second < dis[v]) {
				dis[v] = dis[u] + adj[u][v].second;
				pq.push(make_pair(dis[v], v));
			}
		}
	}
	return dis;
}
```

