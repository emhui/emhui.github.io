---
title: BFS遍历模板
date: 2021-01-15 22:07:45
tags: [PAT, 算法, bfs, 图]
categories: [PAT]
---

# BFS遍历模板

{% note warning %}

有两种

- 以结点为单位进行搜索，适用于**图**
- 以层为单位进行搜索，适用于**树**

{% endnote %}

## 结点为单位：图

C++

```C++
def bfs(int x){
	visited[x] = true;
	queue<int> q;
	q.push(x);
	while (!q.empty()) {
		int node = q.front();
		q.pop();
		for (int i = 0; i < graphic[node].size(); i++) {
			if (!visited[graphic[node][i]]) {
				q.push(graphic[node][i]);
			}
		}
	}
}
```

Python

```python
def BFS(x):
    visit(x)
    bfs = collections.deque([x])
    while bfs:
        v = bfs.popleft()
        for n in neighbor(v):
            if not visited(n):
                visit(n)
                bfs.append(n)
    return
```

## 以层为单位：树

```C++
class Solution {
public:
    int maxDepth(Node* root) {
        if (root == NULL) return 0;
        int depth = 0;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
			// 操作。这里为计算树的深度
            depth++;
            for (int i = 0; i < size; i++) {
                Node* node = q.front();
                q.pop();
                for (int j = 0; j < node->children.size(); j++) {
                    q.push(node->children[j]);
                }
            }
        }
        return depth;
    }
};
```

Python

```python
def BFS(x):
    visit(x)
    bfs = collections.deque([x])
    while bfs:
        num_level = len(bfs)
        for _ in range(num_level)
            v = bfs.popleft()
            for n in neighbor(v):
                if not visited(v):
                    visit(n)
                    bfs.append(n)
    return
```
