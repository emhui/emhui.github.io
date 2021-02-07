---
title: 1130 Infix Expression
date: 2021-01-28 11:09:41
tags: [PAT, 算法, 二叉树, 数学]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/87c01ec7gy1frmmnduv7lj21hc0u0x6p.jpg
---

# 1130 Infix Expression (25分)

## 题目

![b0uWgX](https://gitee.com/yoyhm/oss/raw/master/uPic/b0uWgX.png)

## 分析

给一个表达式的树，输出正确表达

两个问题

1. 如何找到根结点？

根据入度，根结点的入度为0[^1]，其他结点的入度为1或2.

2. 根据什么规则添加括号


![MSe3Ss](https://gitee.com/yoyhm/oss/raw/master/uPic/MSe3Ss.png)

通过对上图分析，根结点一定是操作符，而叶子结点是值。添加括号的规则如下

1. 若当前结点存在左右结点，则需要添加如下格式括号

`"(" + t[root].left + t[root].val + t[root].right + ")"`

图一中的`+,*`就是这种情况

2. 若当前结点为叶子结点，可直接返回结点值。 图一中`a,b,c,d`就是这种情况

3. 若当前结点的左子树不存在，右子树存在，则添加下面格式括号

`"(" + t[root].val + t[root].right + ")"`

图一中，`(-d)`就是这种情况

4. 若当前结点左子树存在，右子树不存在。规则是否是下面这种呢？

`"(" + t[root].left + t[root].val + ")"`

不可能是这种情况，因为根结点是运算符，运算符后面必须有值。

把图一中的`(-d)`来举例，假如`d`在`-`的左边，那么会出现 `(d-)`。显然不存在这种算式。


综上所述，递归有三种情况[^2]：
1. 左右子树都空 返回 “(” + 根 + “)”
2. 左空右不空 返回 “(” + 根 + 右子树 + “)”
3. 左右都不空 返回 “(” + 左子树 + 根 + 右子树 + “)”

## 代码

```C++
#include <iostream>
#include <string>
using namespace std;
const int MAX = 21;
struct Node{
    string val;
    int left, right;
}tree[MAX];
int inDegree[MAX] = {0}; // 计算每个结点的入度，根结点的入度为0；

string dfs(int root) {
    if (tree[root].left == -1 && tree[root].right == -1) return tree[root].val;
    if (tree[root].left != -1 && tree[root].right != -1)
        return "(" + dfs(tree[root].left) + tree[root].val + dfs(tree[root].right) + ")";
    // (-d)这种情况，不可能出现 (d-)这种情况，运算符后面一定是需要内容的，即存在右结点
    if (tree[root].left == -1 && tree[root].right != -1)
        return "(" + tree[root].val + dfs(tree[root].right) + ")";
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> tree[i].val >> tree[i].left >> tree[i].right;
        if (tree[i].left != -1) inDegree[tree[i].left]++; // 入度+1
        if (tree[i].right != -1) inDegree[tree[i].right]++; // 入度+1
    }
    int root = -1;
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 0) {
            root = i;
            break;
        }
    }
    string ans = dfs(root);
    if (ans[0] == '(') ans = ans.substr(1, ans.size() - 2);
    cout << ans << endl;

}
```

## 其他

[^1]: [PAT 1130 Infix Expression](https://blog.csdn.net/cwtnice/article/details/107025779)
[^2]: [PAT 1130. Infix Expression (25)-甲级
](https://www.liuchuo.net/archives/3798)
