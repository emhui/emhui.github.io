---
title: 1017 Queueing at Bank (25 分)
date: 2021-02-10 18:20:54
tags: [PAT, 排序, 模拟]
categories: [PAT]
hide: true
---

# 1017 Queueing at Bank (25 分)

## 题目

![REoi72](https://gitee.com/yoyhm/oss/raw/master/uPic/REoi72.png)

## 分析

本题考查 **排序**

根据题目，首先需要将每个人的到达时间和处理业务时间存储起来，这里使用`vector<pair<int,int>> customers`.

在根据到达的时间进行排序。

每个窗口和顾客办理的规则。

记录每个窗口能够开始处理用户业务的时间，并按照最早能处理用户业务进行排序。这里使用`priority_queue`来存储

若当前用户来到窗口，看窗口队列中最早的窗口是否能处理，若可以处理，则不需要等待。否则需要等待处理完成，就立刻处理该用户业务。

```C++
int totalTime = 0;
// 开始判断
for (int i = 0; i < customers.size(); i++)
{
	int lastTime = pq.top();
	pq.pop();
	// 可以直接处理
	if (lastTime <= customers[i].first)
	{
		pq.push(customers[i].first + customers[i].second);
	}
	else
	{ // 来晚了，需要排队
		totalTime += lastTime - customers[i].first;
		pq.push(lastTime + customers[i].second);
	}
}
```

## 代码

```C++
#include <algorithm>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int hhmmss2s(int hh, int mm, int ss)
{
    return hh * 3600 + mm * 60 + ss;
}

int main()
{
    int n, k;
    int hh, mm, ss, ptime;
    int startTime, endTime;
    startTime = hhmmss2s(8, 0, 0);
    endTime = hhmmss2s(17, 0, 0);
    scanf("%d%d", &n, &k);
    // 存储每个窗口可以开始办理业务的时间
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < k; i++)
        pq.push(startTime);
    // 第一个值为每个用户的到达时间，第二个值是用户的办理业务时间
    vector<pair<int, int>> customers;
    for (int i = 0; i < n; i++)
    {
        scanf("%d:%d:%d %d", &hh, &mm, &ss, &ptime);
        int enterTime = hhmmss2s(hh, mm, ss);
        if (enterTime <= endTime)
        { // 处理时间单位是分钟，需要转成s
            customers.push_back(make_pair(enterTime, ptime <= 60 ? ptime * 60 : 3600));
        }
    }
    sort(customers.begin(), customers.end());
    int totalTime = 0;
    // 开始判断
    for (int i = 0; i < customers.size(); i++)
    {
        int lastTime = pq.top();
        pq.pop();
        // 可以直接处理
        if (lastTime <= customers[i].first)
        {
            pq.push(customers[i].first + customers[i].second);
        }
        else
        { // 来晚了，需要排队
            totalTime += lastTime - customers[i].first;
            pq.push(lastTime + customers[i].second);
        }
    }
    if (totalTime == 0)
        printf("0.0\n");
    else
        printf("%.1lf\n", totalTime / 60.0 / customers.size());
    return 0;
}
```
