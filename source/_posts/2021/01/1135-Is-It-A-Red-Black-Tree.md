---
title: 1135 Is It A Red-Black Tree
date: 2021-01-27 12:47:38
tags: [PAT, 算法, 红黑树, 二叉搜索树]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/0060lm7Tly1ftg6p3dkm1j31hc0u04mm.jpg
---

# 1135 Is It A Red-Black Tree (30分)


## 题目

![o8nR6T](https://gitee.com/yoyhm/oss/raw/master/uPic/o8nR6T.png)

## 分析

红黑树的几个条件

- 结点要么是黑要么是红
- 根结点一定是黑
- 叶子结点是黑
- 结点是红，那么子结点一定是黑。==每条路径不存在连续的红颜色==
- 所有任一结点到叶子的路径，==黑结点的数量相同==。

建立一个结点结构体

```C++
struct TreeNode{
	int val;
	TreeNode *left, *right;
}
```

建立二叉树，这里有两个方法，因为已知是二叉搜索树，所以可以直接使用`insert`或者排序得到中序遍历，通过前序和中序遍历建立二叉树。二者都可以，后者对于所有二叉树都适用，下面是两种算法的写法。

```C++
// 方法一：根据二叉搜索树的特性使用插入法，记住传入的是结点的地址
void insert(TreeNode* &root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return;
    } else {
        if (abs(val) < abs(root->val)) {
            insert(root->left, val);
        } else {
            insert(root->right, val);
        }
    }
}

// 方法二：适用于所有给出前序和中序遍历的二叉树
TreeNode* create(int preL, int preR, int inL, int inR) {
    if (preL > preR) return NULL;
    TreeNode* root = new TreeNode;
    root->val = preorder[preL];
    int mid = 0;
    for (mid = inL; mid <= inR; mid++) { // 在中序遍历中找到根结点
        if (preorder[preL] == inorder[mid]) break;
    }
    int num = mid - inL; // 找到左边结点的数量
    root->left = create(preL + 1, preL + num, inL, mid - 1);
    root->right = create(preL + num + 1, preR, mid + 1, inR);
    return root;
}
```

红黑树判断参考[【数据结构】红黑树（如何实现及怎样判断）](https://blog.csdn.net/Scenlyf/article/details/51692551)

```C++
bool _check(TreeNode* parent, TreeNode* root, int blackNum, int curBlackNum) {
    if (root == NULL) return true;
    if (parent->val < 0 && root->val < 0) { // 如果父结点和子结点都是红色,不满足
        return false;
    }
    if (root->val > 0) { // 如果当前结点是黑色，则黑色++
        curBlackNum++;
    }
    if (root->left == NULL && root->right == NULL) { // 到达叶子结点，判断黑色数量是否相同
        if (blackNum == curBlackNum) return true;
        else return false;
    }
    return _check(root, root->left, blackNum, curBlackNum) && _check(root, root->right, blackNum, curBlackNum);
}

bool check(TreeNode* root) {
    if (root->val < 0) return false; // 如果根结点是红色，则不是红黑树
    int blackNum = 0; // 黑色结点数量
    int num = 1; // 路径中结点的数量，默认从根结点的子结点出发。所以当前根结点的黑色数量是1
    TreeNode* temp = root;
    while (temp != NULL) { // 统计其中一条路径的黑色结点数量，然后和其他路径比较
        if (temp->val > 0) blackNum++;
        temp = temp->left;
    }
    return _check(root, root->left, blackNum, num) && _check(root, root->right, blackNum, num);
}
```


## 代码

> 2，3用例没有通过，得分21分

![vdGdQr](https://gitee.com/yoyhm/oss/raw/master/uPic/vdGdQr.png)

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode{
	int val;
	TreeNode *left, *right;
};

vector<int> preorder, inorder;

bool cmp(int a, int b) {
    return abs(a) < abs(b);
}

vector<int> getInorder(vector<int> order) {
    sort(order.begin(), order.end(), cmp); // 注意是比较绝对值的大小
    return order;
}

TreeNode* create(int preL, int preR, int inL, int inR) {
    if (preL > preR) return NULL;
    TreeNode* root = new TreeNode;
    root->val = preorder[preL];
    int mid = 0;
    for (mid = inL; mid <= inR; mid++) { // 在中序遍历中找到根结点
        if (preorder[preL] == inorder[mid]) break;
    }
    int num = mid - inL; // 找到左边结点的数量
    root->left = create(preL + 1, preL + num, inL, mid - 1);
    root->right = create(preL + num + 1, preR, mid + 1, inR);
    return root;
}

void dfs(TreeNode* root) {
    if (root == NULL) return;
    printf("%d ", root->val);
    dfs(root->left);
    dfs(root->right);
}

bool _check(TreeNode* parent, TreeNode* root, int blackNum, int curBlackNum) {
    if (root == NULL) return true;
    if (parent->val < 0 && root->val < 0) { // 如果父结点和子结点都是红色,不满足
        return false;
    }
    if (root->val > 0) { // 如果当前结点是黑色，则黑色++
        curBlackNum++;
    }
    if (root->left == NULL && root->right == NULL) { // 到达叶子结点，判断黑色数量是否相同
        if (blackNum == curBlackNum) return true;
        else return false;
    }
    return _check(root, root->left, blackNum, curBlackNum) && _check(root, root->right, blackNum, curBlackNum);
}

bool check(TreeNode* root) {
    if (root->val < 0) return false; // 如果根结点是红色，则不是红黑树
    int blackNum = 0; // 黑色结点数量
    int num = 1; // 路径中结点的数量，默认从根结点的子结点出发。所以当前根结点的黑色数量是1
    TreeNode* temp = root;
    while (temp != NULL) { // 统计其中一条路径的黑色结点数量，然后和其他路径比较
        if (temp->val > 0) blackNum++;
        temp = temp->left;
    }
    return _check(root, root->left, blackNum, num) && _check(root, root->right, blackNum, num);
}

int main() {
    int k, n;
    cin >> k;
    while (k--) {
        cin >> n;
        preorder.resize(n);
        for (int i = 0; i < n; i++) {
            scanf("%d", &preorder[i]);
        }
        inorder = getInorder(preorder);
        TreeNode* root = create(0, n - 1, 0, n - 1);
        // dfs(root); // 打印出来看看,验证是否建立成功
        if (check(root)) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```

方法二：改进黑结点计算方法

![Xmt4Ti](https://gitee.com/yoyhm/oss/raw/master/uPic/Xmt4Ti.png)

```C++
bool check(TreeNode* root) {
    if (root->val < 0) return false; // 如果根结点是红色，则不是红黑树
    int blackNum = 1; // 黑色结点数量
    int num = 1; // 路径中结点的数量，默认从根结点的子结点出发。所以当前根结点的黑色数量是1
    TreeNode* temp = root;
    while (temp->left != NULL || temp->right != NULL) { // 统计其中一条路径的黑色结点数量，然后和其他路径比较
        if (temp->val > 0) blackNum++; // 这里的数量统计应该错了
        if (temp->left != NULL) temp = temp->left;
        else if (temp->right != NULL) temp = temp->right;
    }
    return _check(root, root->left, blackNum, num) && _check(root, root->right, blackNum, num);
}
```

方法三：改进遍历黑色结点方法

![pyd1uI](https://gitee.com/yoyhm/oss/raw/master/uPic/pyd1uI.png)

```C++
TreeNode* temp = root;
while (temp != NULL) { // 统计其中一条路径的黑色结点数量，然后和其他路径比较
	if (temp->val > 0) blackNum++; // 这里的数量统计应该错了
	if (temp->left != NULL) temp = temp->left;
	else temp = temp->right;
}
```

方法三，改变建立树的方法

![K0C1Ae](https://gitee.com/yoyhm/oss/raw/master/uPic/K0C1Ae.png)

注意`insert`传入的`root`是地址。

```C++
void insert(TreeNode* &root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return;
    } else {
        if (abs(val) < abs(root->val)) {
            insert(root->left, val);
        } else {
            insert(root->right, val);
        }
    }
}
```

## 最终代码

> 还是有两个用例没有通过,得分21分

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode{
	int val;
	TreeNode *left, *right;
};

bool _check(TreeNode* parent, TreeNode* root, int blackNum, int curBlackNum) {
    if (root == NULL) return true;
    if (parent->val < 0 && root->val < 0) { // 如果父结点和子结点都是红色,不满足
        // cout << parent->val << " " << root->val << endl;
        return false;
    }
    if (root->val > 0) { // 如果当前结点是黑色，则黑色++
        curBlackNum++;
    }
    if (root->left == NULL && root->right == NULL) { // 到达叶子结点，判断黑色数量是否相同
        // cout << blackNum << " " << curBlackNum << endl;
        if (blackNum == curBlackNum) return true;
        else return false;
    }
    return _check(root, root->left, blackNum, curBlackNum) && _check(root, root->right, blackNum, curBlackNum);
}

bool check(TreeNode* root) {
    if (root->val < 0) return false; // 如果根结点是红色，则不是红黑树
    int blackNum = 0; // 黑色结点数量
    int num = 1; // 路径中结点的数量，默认从根结点的子结点出发。所以当前根结点的黑色数量是1
    TreeNode* temp = root;
    while (temp != NULL) { // 统计其中一条路径的黑色结点数量，然后和其他路径比较
        if (temp->val > 0) blackNum++; // 这里的数量统计应该错了
        if (temp->left != NULL) temp = temp->left;
        else temp = temp->right;
    }
    return _check(root, root->left, blackNum, num) && _check(root, root->right, blackNum, num);
}

void insert(TreeNode* &root, int val) {
    if (root == NULL) {
        root = new TreeNode;
        root->val = val;
        root->left = root->right = NULL;
        return;
    } else {
        if (abs(val) <= abs(root->val)) {
            insert(root->left, val);
        } else {
            insert(root->right, val);
        }
    }
}
int main() {
    int k, n, val;
    cin >> k;
    while (k--) {
        cin >> n;
        TreeNode* root = NULL;
        for (int i = 0; i < n; i++) {
            cin >> val;
            insert(root, val);
        }
        if (check(root)) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```
