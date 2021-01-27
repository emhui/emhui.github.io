---
title: 1107 Social Clusters
date: 2021-01-20 19:50:26
tags: [PAT, 算法, union-find]
categories: [PAT]
index_img:https://tva1.sinaimg.cn/large/87c01ec7gy1frmrycqdnyj21hc0u0qc3.jpg
---

# 1107 Social Clusters

## 题目

![fOAIaQ](https://gitee.com/yoyhm/oss/raw/master/uPic/fOAIaQ.png)

## 思路

- 本题使用并查集，首先确定连通图中的结点对象是谁？在这里结点是`hobby`。因此需要设置一个二维数组`vector<int>arr[MAX]`存储输出的结果。其中`i`对应的是人的ID

```C++
vector<int> arr[MAX];
for (int i = 0; i < n; i++) {
	scanf("%d:", &k);
	for (int j = 0; j < k; j++) {
		scanf("%d", &h);
		arr[i].push_back(h);
	}
}
```

- 然后找出连通图的结点个数。设置一个`map<int, int> hobby2id`通过对`arr`的遍历，建立结点和唯一ID之间映射和结点数量。

```C++
for (int i = 0; i < n; i++) {
	for (int j = 0; j < arr[i].size(); j++) {
		if (hobby2id.find(arr[i][j]) == hobby2id.end()) {
			hobby2id[arr[i][j]] = numHobby;
			numHobby++;
		}
	}
}
```

- 获取到连通图中结点的数量，结下来就是并查集的基本操作，初始化`parent`数组，然后逐个判断是否在同一连通分量在，若不在则连通。

- 最后是需要每个连通分量中习惯相同的人数。因为每个人的任意一个习惯它的根结点指向的都是同一个结点。因此设置一个`ans`数组，取每个人的第一个习惯，找到它的根结点。根习惯相同的人在同一个连通分量中。每次找到习惯相同的人就+1.最后按照从大到小的顺序输出即可。

```C++
printf("%d\n", numHobby);
int ans[MAX] = {0};
for (int i = 0; i < n; i++) {
	ans[find(hobby2id[arr[i][0]])]++;
}
sort(ans, ans + MAX, cmp);
for (int i = 0; i < numHobby; i++) {
	printf("%d", ans[i]);
	if (i + 1 < numHobby) printf(" ");
}
printf("\n");
```

## 代码

```C++
#include <cstdio>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

const int MAX = 10001;

map<int,int> hobby2id, id2hobby;
int parent[MAX];
int numHobby;

int find(int v) {
    if (v != parent[v]) parent[v] = find(parent[v]);
    return parent[v];
}

void quick_union(int u, int v) {
    int uRoot = find(u), vRoot = find(v);
    if (uRoot == vRoot) return;
    parent[find(u)] = find(v);
    numHobby--;
}

bool cmp(int a, int b) {
    return a > b;
}

int main() {
    int n, k, v, w, h;
    vector<int> arr[MAX];
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {
        scanf("%d:", &k);
        for (int j = 0; j < k; j++) {
            scanf("%d", &h);
            arr[i].push_back(h);
        }
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < arr[i].size(); j++) {
            if (hobby2id.find(arr[i][j]) == hobby2id.end()) {
                hobby2id[arr[i][j]] = numHobby;
                numHobby++;
            }
        }
    }

    for (int i = 0; i < numHobby; i++) {parent[i] = i;}

    for (int i = 0; i < n; i++) {
        int v = hobby2id[arr[i][0]];
        for (int j = 1; j < arr[i].size(); j++) {
            int u = hobby2id[arr[i][j]];
            if (find(v) != find(u)) {
                quick_union(u, v);
            }
        }
    }
    printf("%d\n", numHobby);
    int ans[MAX] = {0};
    for (int i = 0; i < n; i++) {
        ans[find(hobby2id[arr[i][0]])]++;
    }
    sort(ans, ans + MAX, cmp);
    for (int i = 0; i < numHobby; i++) {
        printf("%d", ans[i]);
        if (i + 1 < numHobby) printf(" ");
    }
    printf("\n");
    return 0;
}
```
