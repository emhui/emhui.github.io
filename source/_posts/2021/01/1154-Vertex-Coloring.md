---
title: 1154 Vertex Coloring
date: 2021-01-23 10:34:24
tags: [PAT, 算法， 邻接表]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmry165k5j21hc0u0n6b.jpg
---

# 1154 Vertex Coloring (25分)

## 题目

{% note warning %}
有些题目很简单，不要想太复杂了。
{% endnote %}

![hjDrpN](https://gitee.com/yoyhm/oss/raw/master/uPic/hjDrpN.png)

## 思路

本题就是求在一个图中，若相邻的两个点为相同颜色，则输出`No`,否则输出颜色个数。

可以建立一个邻接表，然后对每个顶点分别和他邻接的顶点去比较颜色，若颜色一致，则直接退出比较。

```C++
bool hasSameEdge = false;
for (int j = 0; j < n; j++) {
	for (auto node: graphic[j]) {
		if (color[j] == color[node]){
			hasSameEdge = true;
			break;
		}
	}
	if (hasSameEdge) break;
}
```

## 代码

```C++
// 只要相邻的边存在颜色一样，就输出No
// 如果没有发现，那么就是输出使用了颜色的数量
#include <cstdio>
#include <vector>
#include <set>
using namespace std;

int main() {
    int n, m, k, u, v;
    scanf("%d%d", &n, &m); // n:顶点数量，m:边的数量
    vector<vector<int>> graphic(n); // 使用邻接表存储
    vector<int> color(n); // 存储颜色
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &u, &v);
        graphic[u].push_back(v);
        graphic[v].push_back(u);
    }
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &color[j]);
        }
        bool hasSameEdge = false;
        for (int j = 0; j < n; j++) {
            for (auto node: graphic[j]) {
                if (color[j] == color[node]){
                    hasSameEdge = true;
                    break;
                }
            }
            if (hasSameEdge) break;
        }
        if (hasSameEdge) printf("No\n");
        else {
            set<int> st(color.begin(), color.end());
            printf("%d-coloring\n", st.size());
        }
    }

}
```
