---
title: 1091 Acute Stroke
date: 2021-01-14 16:39:44
tags: [bfs, PAT, 算法, 图]
categories: [PAT]
index_img: https://tva3.sinaimg.cn/large/87c01ec7gy1frmrsyggapj21hc0u0n69.jpg
---

# 1091 Acute Stroke

![题目](https://gitee.com/yoyhm/oss/raw/master/uPic/VMhdDm.png)

部分专有名词

- `MBR`: (Magnetic Resonance Imaging) 核磁共振成像。
- `threshold`: 门槛,阈值。

## 思路

本题意思是**给出一个三维数组,数组元素的取值为0或1。与某一个元素相邻的元素为其上、下、左、右、前、后这6个方向的邻接元素。另外,若干个相邻的"1"称为一个“块” (不必两两相邻,只要与块中某一个"1"相邻,该"1”就在块中),而如果某个块中的“1"的个数不低于T个,那么称这个块为“卒中核心区”。现在需要求解所有卒中核心区中的1的个数之和。**

本题是一个三维的BFS。基本思路是:枚举三维数组中的每一个位置,如果为0,则跳过;如果为1,则使用BFS查询与该位置相邻的6个位置(前提是不出界),判断它们是否为1 (如果某个相邻的位置为1,则同样去查询与该位置相邻的6个位置,直到整个"1"块访问完毕)。而为了防止重复,可以设置一个bool型数组`visited`来记录每个位置是否在BFS中已入过队。

其中枚举6个方向的代码如下

```C++
int X[6] = {1, -1, 0, 0, 0, 0}; // X方向移动
int Y[6] = {0, 0, 1, -1, 0, 0}; // Y方向移动
int Z[6] = {0, 0, 0, 0, 1, -1}; // Z方向移动
for (int i = 0; i < 6; i++) {
	int newX = top.x + X[i];
	int newY = top.y + Y[i];
	int newZ = top.z + Z[i];
}
```

## 代码

```C++
// 题目意思，计算每个点附近的连通情况，若连通，即1的数量，若该层1的数量大于T则符合条件
#include <cstdio>
#include <queue>
using namespace std;

struct node{
    int x, y, z;
}Node;

int M, N, L, T;

int pixel[1296][130][61]; // M N L
bool visited[1296][130][61] = {false}; // M N L

int X[6] = {1, -1, 0, 0, 0, 0}; // X方向移动
int Y[6] = {0, 0, 1, -1, 0, 0}; // Y方向移动
int Z[6] = {0, 0, 0, 0, 1, -1}; // Z方向移动

bool isVaildNode(int x, int y, int z) {
    if (x < 0 || x >= M || y < 0 || y >= N || z < 0 || z >= L) return false;
    if (pixel[x][y][z] == 0 || visited[x][y][z] == true) return false;
    return true;
}

int bfs(int x, int y, int z) {
    int num = 0;
    queue<node> Q;
    Node.x = x, Node.y = y, Node.z = z;
    Q.push(Node);
    visited[x][y][z] = true; // 记住这个一定要写。当前的入队
    while (!Q.empty()) {
        node top = Q.front();
        Q.pop();
        num++; // 满足数量+1
        for (int i = 0; i < 6; i++) {
            int newX = top.x + X[i];
            int newY = top.y + Y[i];
            int newZ = top.z + Z[i];
            if (isVaildNode(newX, newY, newZ)) {
                Node.x = newX, Node.y = newY, Node.z = newZ;
                Q.push(Node);
                visited[newX][newY][newZ] = true;
            }
        }
    }
    return num >= T ? num : 0;
}

int main() {
    scanf("%d%d%d%d", &M, &N, &L, &T);
    for (int z = 0; z < L; z++) {
        for (int x = 0; x < M; x++) {
            for (int y = 0; y < N; y++) {
                scanf("%d", &pixel[x][y][z]); // 注意xyz顺序
            }
        }
    }
    int ans = 0;
    for (int z = 0; z < L; z++) {
        for (int x = 0; x < M; x++) {
            for (int y = 0; y < N; y++)
            {
                if (pixel[x][y][z] == 1 && visited[x][y][z] == false){
                    ans += bfs(x, y, z);
                }
            }
        }
    }
    printf("%d\n", ans);
    return 0;
}
```
