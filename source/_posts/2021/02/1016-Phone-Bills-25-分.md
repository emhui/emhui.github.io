---
title: 1016 Phone Bills (25 分)
date: 2021-02-11 11:26:44
tags: [PAT, 排序]
categories: [PAT]
---

# 1016 Phone Bills (25 分)

## 题目

![KiD29Z](https://gitee.com/yoyhm/oss/raw/master/uPic/KiD29Z.png)

## 分析

先按照姓名，在按照时间排序，选出有效的数据。

选出有效的数据后，计算他们打电话的时间段，并且计算出对应的金额，最后累加。

在选出有效的数据的时候，就可以进行计算了。使用一个`unordered_map<string ,int> umsi;`来判断是否这个人是第一次访问，如果是第一次访问，那么就打印出这个人的信息，同时设置`allCost = 0`变量来计算该用户下的总花费。若访问到一个新的用户，就重置`allCost = 0`。同时将上一个人的`allCost`打印出来。

```C++
unordered_map<string, int> umsi; // 记录这个人有效记录次数，同时也可作为是否打印输出名称
int allCost = 0;
// 开始计算有效数据，并记录这个人当前是否已经打印了票据
for (int i = 0; i < n - 1; i++) {
	// 有效数据
	if (vn[i].name == vn[i + 1].name && vn[i].flag == true && vn[i + 1].flag == false) {
		if (umsi.find(vn[i].name) == umsi.end()) { // 第一次访问该有效数据
			if (allCost > 0) {
				printf("Total amount: $%.2lf\n", allCost /100.0);
			}
			umsi[vn[i].name] = 1;
			// 打印出这个人的详细信息
			printf("%s %02d\n", vn[i].name.c_str(), vn[i].MM);
			allCost = 0;
		}
		int time = 0, cost = 0;
		computeTimeCost(i, i+1, time, cost);
		allCost += cost;
		// 打印账单信息
		printf("%02d:%02d:%02d %02d:%02d:%02d %d $%.2lf\n",
			  vn[i].dd, vn[i].HH, vn[i].mm, vn[i+1].dd, vn[i+1].HH, vn[i+1].mm,
			  time, cost / 100.0);
	}
}
if (allCost > 0) {
	printf("Total amount: $%.2lf\n", allCost /100.0);
}

```

其中，如何计算时间和花费是比较难想的。这里参考的是**《算法笔记-上机训练实战指南-胡凡》**书中的方法。使用`time`变量记录分钟，然后每分钟就进行加1，直到超过60分钟的时候，每小时+1，若超过24小时，则每天+1.直到到达挂断时间的时候。

```C++
void computeTimeCost(int on, int off, int &time, int &cost) {
    temp = vn[on];
    while (temp.dd < vn[off].dd || temp.HH < vn[off].HH || temp.mm < vn[off].mm) {
        time++; // 每分钟进行计算
        cost += toll[temp.HH];
        temp.mm++;
        if (temp.mm >= 60) {
            temp.mm = 0;
            temp.HH++;
        }
        if (temp.HH >= 24) {
            temp.HH = 0;
            temp.dd++;
        }
    }
}

```

## 代码

```C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

struct node{
    string name; // 按字典序，大写字母在小写字母前面
    int MM, dd, HH, mm;
    bool flag; // true表示on, false表示off
    node(){}
    node(string _name, int _MM, int _dd, int _HH, int _mm, bool _flag):
    name(_name), MM(_MM), dd(_dd), HH(_HH), mm(_mm), flag(_flag) {}
}temp;

vector<node> vn;
int toll[25];

bool cmp(node &a, node &b) {
    if (a.name != b.name) return a.name < b.name;
    else if (a.MM != b.MM) return a.MM < b.MM;
    else if (a.dd != b.dd) return a.dd < b.dd;
    else if (a.HH != b.HH) return a.HH < b.HH;
    else return a.mm < b.mm;
}

void computeTimeCost(int on, int off, int &time, int &cost) {
    temp = vn[on];
    while (temp.dd < vn[off].dd || temp.HH < vn[off].HH || temp.mm < vn[off].mm) {
        time++; // 每分钟进行计算
        cost += toll[temp.HH];
        temp.mm++;
        if (temp.mm >= 60) {
            temp.mm = 0;
            temp.HH++;
        }
        if (temp.HH >= 24) {
            temp.HH = 0;
            temp.dd++;
        }
    }
}

int main() {
    int n;
    int MM, dd, HH, mm;
    string name, status;
    for (int i = 0; i < 24; i++) cin >> toll[i];
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> name;
        scanf("%d:%d:%d:%d", &MM, &dd, &HH, &mm);
        cin >> status;
        vn.push_back(node(name, MM, dd, HH, mm, status == "on-line" ? true : false));
    }

    // 按照姓名和时间顺序排序
    sort(vn.begin(), vn.end(), cmp);

    unordered_map<string, int> umsi; // 记录这个人有效记录次数，同时也可作为是否打印输出名称
    int allCost = 0;
    // 开始计算有效数据，并记录这个人当前是否已经打印了票据
    for (int i = 0; i < n - 1; i++) {
        // 有效数据
        if (vn[i].name == vn[i + 1].name && vn[i].flag == true && vn[i + 1].flag == false) {
            if (umsi.find(vn[i].name) == umsi.end()) { // 第一次访问该有效数据
                if (allCost > 0) {
                    printf("Total amount: $%.2lf\n", allCost /100.0);
                }
                umsi[vn[i].name] = 1;
                // 打印出这个人的详细信息
                printf("%s %02d\n", vn[i].name.c_str(), vn[i].MM);
                allCost = 0;
            }
            int time = 0, cost = 0;
            computeTimeCost(i, i+1, time, cost);
            allCost += cost;
            // 打印账单信息
            printf("%02d:%02d:%02d %02d:%02d:%02d %d $%.2lf\n",
                  vn[i].dd, vn[i].HH, vn[i].mm, vn[i+1].dd, vn[i+1].HH, vn[i+1].mm,
                  time, cost / 100.0);
        }
    }
    if (allCost > 0) {
        printf("Total amount: $%.2lf\n", allCost /100.0);
    }
    return 0;
}
```
