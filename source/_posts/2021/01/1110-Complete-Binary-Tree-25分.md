---
title: 1110 Complete Binary Tree (25分)
date: 2021-01-30 22:19:50
tags: [PAT, 层次遍历, 完全二叉树, 算法]
categories: [PAT]
index_img: https://tva4.sinaimg.cn/large/87c01ec7gy1frmrqh4iahj21hc0u0k07.jpg
---

# 1110 Complete Binary Tree (25分)

## 题目

![ZwnLjP](https://gitee.com/yoyhm/oss/raw/master/uPic/ZwnLjP.png)

## 分析

本题需要解决两个问题

1. 找到根结点
2. 判断是否是完全二叉树

**找根结点**

可以根据根结点的入度为0来寻找根结点。

**判断一颗二叉树树是否为完全二叉树**

完全二叉树除了最后一层，每一层从左到右边都是一颗满的。最后一层中，结点也是从左到右边，若中间存在结点丢失，那么该树就不是完全二叉树。

在层次遍历中，当遍历到某个结点的子结点不存在时候，设置一个`missing`标记当前结点的子结点丢失。若该结点的后面结点的子结点存在，那么就证明当前层的下一层中间出现了断层。证明是非完全二叉树。代码如下

```C++
isComplete = true, missing = false;
if (tree[node].left != -1) { // 假如左边结点存在
	if (missing) isComplete = false; // 子结点层出现不存在结点的情况
	q.push(tree[node].left);
} else { // 该层的左结点不存在
	missing = true;
}
if (tree[node].right != -1) { // 右边结点存在
	if (missing) isComplete = false; // 子结点层不存在的现象
	q.push(tree[node].right);
} else {
	missing = true;
}
```

注意：之前一直出现三个示例超出内存和答案错误，后来发现自己的结点输入使用的是`char`.

这里的输入要使用`string`,如果使用`char`的话，只能表示`10`以内的数字。

## 代码

```C++
#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;
struct node{
    int left, right;
    node(): left(-1), right(-1) {}
}tree[20];

int inDegree[20] = {0};

void bfs(int root) {
    queue<int> q;
    int lastnode = root;
    bool isComplete = true, missing = false;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int node = q.front();
            lastnode = node;
            q.pop();
            if (tree[node].left != -1) { // 假如左边结点存在
                if (missing) isComplete = false; // 子结点层出现不存在结点的情况
                q.push(tree[node].left);
            } else { // 该层的左结点不存在
                missing = true;
            }
            if (tree[node].right != -1) { // 右边结点存在
                if (missing) isComplete = false; // 子结点层不存在的现象
                q.push(tree[node].right);
            } else {
                missing = true;
            }
        }
    }
    printf("%s %d\n", isComplete ? "YES" : "NO", !isComplete ? root : lastnode);
}

int main() {
    int n;
    string s1, s2;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> s1 >> s2; // 这里不能使用字符，字符只能读10以内数字

        if (s1 != "-") {
            inDegree[stoi(s1)]++;
            tree[i].left = stoi(s1);
        }
        if (s2 != "-") {
            inDegree[stoi(s2)]++;
            tree[i].right = stoi(s2);
        }
    }
    int root = -1;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) {
            root = i;
            break;
        }
    }
    bfs(root);
    return 0;
}
```

## 相关题目

- [1123 Is It a Complete AVL Tree (30分)
](https://emhui.fun/2021/01/29/1123-Is-It-a-Complete-AVL-Tree-30%E5%88%86/)
