---
title: Left-View of Binary Tree (25分)
date: 2021-02-21 22:15:40
tags: [PAT, 先序遍历, 中序遍历, bfs]
categories: [PAT]
---

# Left-View of Binary Tree (25分)

## 题目

![AYlv6N](https://gitee.com/yoyhm/oss/raw/master/uPic/AYlv6N.png)

## 分析

本题考查 **根据中序和先序遍历建树**和**树的层次遍历**

给出中序和先序遍历，创建好树后，再根据层次遍历打印出每层第一个点即可。

输入

> 8
>
> 2 3 1 5 4 7 8 6
>
> 1 2 3 6 7 4 5 8

输出

> 1 2 3 4 5

根据中序和先序遍历建树

```C++
struct TreeNode{
	int val;
	TreeNode *left, *right;
};

vector<int> inorder, preorder;

TreeNode* create(int preL, int preR, int inL, int inR) {
	if (preL > preR) return NULL;
	TreeNode* root = new TreeNode;
	root->val = preorder[preL]; // 找到根结点
	int mid = 0; // 找到在中序遍历中的位置
	for (mid = inL; mid <= inR; mid++) {
		if (inorder[mid] == preorder[preL]) break;
	}
	int offset = mid - inL;
	root->left = create(preL + 1, preL + offset, inL, mid - 1);
	root->right = create(preL + offset + 1, preR, mid + 1, inR);
	return root;

}
```

接下来是层次遍历该二叉树

```C++
void bfs(TreeNode *root) {
	vector<int> ans;
	queue<TreeNode*> q;
	q.push(root);
	TreeNode* node;
	while (!q.empty()) {
		int size = q.size();
		for (int i = 0; i < size; i++) {
			node = q.front();
			if (i == 0) ans.push_back(node->val);
			q.pop();
			if (node->left) q.push(node->left);
			if (node->right) q.push(node->right);
		}
	}

	for (int i = 0; i < ans.size(); i++) {
		printf("%d", ans[i]);
		if (i + 1 < ans.size()) printf(" ");
	}
	printf("\n");
}
```


## 代码

```C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct TreeNode{
	int val;
	TreeNode *left, *right;
};

int n;
vector<int> inorder, preorder;

TreeNode* create(int preL, int preR, int inL, int inR) {
	if (preL > preR) return NULL;
	TreeNode* root = new TreeNode;
	root->val = preorder[preL]; // 找到根结点
	int mid = 0; // 找到在中序遍历中的位置
	for (mid = inL; mid <= inR; mid++) {
		if (inorder[mid] == preorder[preL]) break;
	}
	int offset = mid - inL; // 2
	root->left = create(preL + 1, preL + offset, inL, mid - 1);
	root->right = create(preL + offset + 1, preR, mid + 1, inR);
	return root;
}

void bfs(TreeNode *root) {
	vector<int> ans;
	queue<TreeNode*> q;
	q.push(root);
	TreeNode* node;
	while (!q.empty()) {
		int size = q.size();
		for (int i = 0; i < size; i++) {
			node = q.front();
			if (i == 0) ans.push_back(node->val);
			q.pop();
			if (node->left) q.push(node->left);
			if (node->right) q.push(node->right);
		}
	}

	for (int i = 0; i < ans.size(); i++) {
		printf("%d", ans[i]);
		if (i + 1 < ans.size()) printf(" ");
	}
	printf("\n");
}

int main() {
    cin >> n;
    inorder.resize(n);
    preorder.resize(n);
    for(int i = 0; i < n; i++) {cin >> inorder[i];}
    for(int i = 0; i < n; i++) {cin >> preorder[i];}

    TreeNode *root = create(0, n - 1, 0, n - 1);
    bfs(root);
    return 0;
}
```
