---
title: 1014 Waiting in Line (30 分)
date: 2021-02-10 21:23:33
tags: [PAT, 模拟]
categories: [PAT]
---

# 1014 Waiting in Line (30 分)

## 题目

![gkFaAr](https://gitee.com/yoyhm/oss/raw/master/uPic/gkFaAr.png)

## 分析

本题考查 **时间模拟**

本题大致思路如下。

使用结构体记录每个人的开始和结束时间，还有办理业务时间。

```C++
struct node{
	int startTime, finishTime, pTime;
}
```

计算每个人的开始办理业务时间和完成办理业务的时间。最开始有n个窗口，队伍中的每个人按顺序占据各个窗口的第一行，然后第二行，第三行，直到窗口的限额最大值。

先更新每个窗口第一行的人的开始和结束办理业务时间。

```C++
for (int i = 1; i <= n; i++) {
	vn[i].startTime = 0; // 第一行的人开始时间是0
	vn[i].finishTime = vn[i].pTime; // 第一行的人结束时间是处理完业务
}
```

然后更新每个队伍新入队的人的时间

```C++
lastId = windows[windowId].back(); // 目标窗口最后一个人
vn[i].startTime = vn[lastIdl].finishTime; // 开始时间是队伍中上一个人的结束时间
vn[i].finishTime = vn[i].finishTime + vn[i].pTime; // 结束时间是自己开始的时间+办理业务的时间
```

接下来的人就开始找，那个窗口的人最先完成业务，最先完成业务的人出队，让下一个进入这个队伍。

注意：

- 测试用例1一直出现**段错误**，经过排查，发现是因为窗口人数大于办理业务的人数，所以在初始化每个窗口第一行人的起始时间的时候，需要判断是否办理人数有n个人。
- 在17:00之前开始办理业务，即使在17:00后完成办理，也属于办理成功，而在17:00和17:00以后则无法办理。

```C++
// min(n,k)很重要，
for (int i = 1; i <= min(n, k); i++) {
	windows[i].push(i);
	vn[i].finishTime = vn[i].pTime;
	vn[i].startTime = 0;
}
```

## 代码

```C++
#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

const int INF = 987654321;

struct node
{
    int pTime, startTime, finishTime; // pTime处理业务时间，finishTime 完成业务时间
};

int main()
{
    int n, m, k, q;
    cin >> n >> m >> k >> q;
    vector<node> vn(k + 1); // 用户i
    for (int i = 1; i <= k; i++)
        cin >> vn[i].pTime;
    vector<queue<int>> windows(n + 1); // n个窗口，每个窗口存储当前用户
    // 初始化n个窗口第一行用户的时间
    // 这里注意，如果窗口的人数大于办理业务人数，就只需要使用前k个窗口
    for (int i = 1; i <= min(n, k); i++)
    {
        windows[i].push(i);
        vn[i].finishTime = vn[i].pTime;
        vn[i].startTime = 0;
    }

    // 将剩下的 n + 1 - k 个人进行队列
    for (int i = n + 1; i <= k; i++)
    {
        int windowId = 1, windowNum = INF;
        // 找到队列最小的那个窗口
        for (int j = 1; j <= n; j++)
        {
            if (windowNum > windows[j].size())
            {
                windowId = j;
                windowNum = windows[j].size();
            }
        }

        // 如果存在窗口队列最小的窗口，将排到那个队列中
        if (windowNum < m)
        { // 排队到窗口最少的那边去。
            int lastId = windows[windowId].back();
            vn[i].startTime = vn[lastId].finishTime;
            vn[i].finishTime = vn[lastId].finishTime + vn[i].pTime;
            // windows[windowId].push_back(i);
            windows[windowId].push(i);
        }
        else
        { // 每个队列都满了，那么就找到最先完成业务的，也就是队首中finshTime最小的那个
            // 找到最先办理完业务的那个窗口
            int finishTime = INF;
            for (int j = 1; j <= n; j++)
            {
                int tempId = windows[j].front();
                if (finishTime > vn[tempId].finishTime)
                {
                    windowId = j;
                    finishTime = vn[tempId].finishTime;
                }
            }
            // 将该人排到该窗口队列中
            int lastId = windows[windowId].back();
            vn[i].startTime = vn[lastId].finishTime;
            vn[i].finishTime = vn[lastId].finishTime + vn[i].pTime;
            if (!windows[windowId].empty())
                // 队首元素完成业务，出队
                windows[windowId].pop();
            // 添加这个人进去
            windows[windowId].push(i);
        }
    }

    int userId;
    for (int i = 0; i < q; i++)
    {
        cin >> userId;
        if (vn[userId].startTime >= (17 - 8) * 60)
        { // 如果在17点（包含17点）还没服务，就不服务了
            printf("Sorry\n");
        }
        else
        {
            printf("%02d:%02d\n", 8 + (vn[userId].finishTime / 60), vn[userId].finishTime % 60);
        }
    }
    return 0;
}
```
