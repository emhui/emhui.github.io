---
title: 1119 Pre- and Post-order Traversals (30分)
date: 2021-01-30 22:31:57
tags: [PAT, 前序遍历, 后序遍历, 二叉树]
categories: [PAT]
---

# 1119 Pre- and Post-order Traversals (30分)

## 题目

![CbYu5o](https://gitee.com/yoyhm/oss/raw/master/uPic/CbYu5o.png)

## 分析

通过**前序和后续求中序**,结果可能唯一可能不唯一。

{% note success %}
**以后序的根结点的前面一个结点作为参考，寻找这个结点在前序的位置，就可以根据这个位置来划分左右孩子**
{% endnote %}

什么时候判断结果不唯一呢？

根据后续的根结点的前一个结点找到该结点在先序中的位置，若该结点的位置正好是先序中根结点的下一个结点，证明该结果不唯一。代码如下

```C++
int pos = preL + 1; // 找到左子树的根结点
while (preorder[pos] != postorder[postR - 1]) pos++; // 在先序遍历中找到左子树的根结点，因为后续遍历倒数第二个就是左子树的根结点，因此可以若找到等于preorder[pos] == postorder[postR - 1] 即为根结点
if (pos == preL + 1) isUnique = false; // 若根结点就是整数第二个，那么无法判断唯一
```

## 代码

```C++
#include <iostream>
#include <vector>
using namespace std;

vector<int> preorder, inorder, postorder;
bool isUnique = true;

void create(int preL, int preR, int postL, int postR) {
    if (preL > preR) return;
    if (preL == preR) {
        inorder.push_back(preorder[preL]);
        return;
    }
    int pos = preL + 1; // 找到左子树的根结点
    while (preorder[pos] != postorder[postR - 1]) pos++; // 在先序遍历中找到左子树的根结点，因为后续遍历倒数第二个就是左子树的根结点，因此可以若找到等于preorder[pos] == postorder[postR - 1] 即为根结点
    if (pos == preL + 1) isUnique = false; // 若根结点就是整数第二个，那么无法判断唯一
    int num = pos - preL - 1; // 左子树的范围 -1 是去掉 perL 根结点
    create(preL + 1, pos - 1, postL, postL + num - 1); // 遍历左边
    inorder.push_back(preorder[preL]); // 中序遍历
    create(pos, preR, postL + num, postR - 1); // 遍历右边
}

int main() {
    int n, val;
    cin >> n;
    preorder.resize(n);
    postorder.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> preorder[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> postorder[i];
    }
    create(0, n - 1, 0 , n - 1);
    printf("%s\n", isUnique ? "Yes" : "No");
    for (int i = 0; i < n; i++) {
        printf("%d", inorder[i]);
        if (i < n - 1)printf(" ");
    }
    printf("\n");
    return 0;
}
```

## 参考

- [【編程訓練-PAT】A1119 Pre- and Post-order Traversals （30 分）](https://www.itread01.com/content/1557487205.html)
- [PAT A1119 Pre- and Post-order Traversals (30分) (前后序遍历序列建树)](https://charjindev.github.io/2020/02/28/pat-A1119/)
- [1020 Tree Traversals01-14](https://emhui.fun/2021/01/14/1020-Tree-Traversals/)
- [1086 Tree Traversals Again01-14](https://emhui.fun/2021/01/14/1086-Tree-Traversals-Again/)
