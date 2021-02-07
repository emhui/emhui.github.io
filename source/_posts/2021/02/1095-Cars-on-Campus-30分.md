---
title: 1095 Cars on Campus (30分)
date: 2021-02-02 11:42:23
tags: [PAT, 算法, 排序]
categories: [PAT]
---

# 1095 Cars on Campus (30分)

## 题目

![z8WDFU](https://gitee.com/yoyhm/oss/raw/master/uPic/z8WDFU.png)

## 分析

将所有数据按照姓名排序，然后在按照时间先后排序。选出有效的数据，其中时间可以转化为秒进行比较。

当`if(同一个车牌 && 当前是进入停车 && 下一个是驶出停车)`的时候为有效数据，具体代码如下。

```C++
for (int i = 0; i < n - 1; i++) {
	// 若同一辆车在连续有效时间内进出，则该车为有效
	if (vn[i].nubmer == vn[i + 1].nubmer && vn[i].flag == true && vn[i + 1].flag == false) {
		vaildCar[vn[i].nubmer].push_back(make_pair(vn[i].time, vn[i + 1].time));
		// 统计有效车辆停留的时间。
		if (carTime.find(vn[i].nubmer) == carTime.end()) {
			carTime[vn[i].nubmer] = vn[i + 1].time - vn[i].time;
		} else {
			carTime[vn[i].nubmer] += vn[i + 1].time - vn[i].time;
		}
		// 计算出最大时间
		longestTime = max(longestTime, carTime[vn[i].nubmer]);
	}
}
```

## 代码

> 下面这个代码会超时

```C++
#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
#include <utility>
#include <map>
using namespace std;

map<string, vector<pair<int, int>>> vaildCar; // 记录有效的车进出时间
map<string, int> carTime; // 车子停留时间

struct node{
    string nubmer;
    bool flag; // flag 为 true表示in， flag为false表示out
    int time;
    node(){}
    node(string _number, int _time, int _flag): nubmer(_number), time(_time), flag(_flag) {}
};

// 时分秒转成秒为单位
int hms2s(int hh, int mm, int ss) {
    return hh * 3600 + mm * 60 + ss;
}

bool cmp(node &a, node &b) {
    if (a.nubmer != b.nubmer) return a.nubmer < b.nubmer;
    else return a.time < b.time;
}

int main() {
    int n, k;
    string number, flag;
    int hh, mm, ss;
    vector<node> vn;
    cin >> n >> k;
    for (int i = 0; i < n; i++) {
        cin >> number;
        scanf("%d:%d:%d", &hh, &mm, &ss);
        cin >> flag;
        vn.push_back(node(number, hms2s(hh, mm, ss), flag == "in" ? true : false));
    }
    // 根据车牌号和进出时间排序
    sort(vn.begin(), vn.end(), cmp);
    int longestTime = 0;
    for (int i = 0; i < n - 1; i++) {
        // 若同一辆车在连续有效时间内进出，则该车为有效
        if (vn[i].nubmer == vn[i + 1].nubmer && vn[i].flag == true && vn[i + 1].flag == false) {
            vaildCar[vn[i].nubmer].push_back(make_pair(vn[i].time, vn[i + 1].time));
            // 统计有效车辆停留的时间。
            if (carTime.find(vn[i].nubmer) == carTime.end()) {
                carTime[vn[i].nubmer] = vn[i + 1].time - vn[i].time;
            } else {
                carTime[vn[i].nubmer] += vn[i + 1].time - vn[i].time;
            }
            // 计算出最大时间
            longestTime = max(longestTime, carTime[vn[i].nubmer]);
        }
    }
    int cnt = 0, time;

    while (k--) {
        cnt = 0;
        scanf("%d:%d:%d", &hh, &mm, &ss);
        time = hms2s(hh, mm, ss);
        for (const auto &car: vaildCar) {
            for (int i = 0; i < car.second.size(); i++) {
                if (time >= car.second[i].first && time < car.second[i].second) {
                    cnt++;
                    break;
                }
            }
        }
        printf("%d\n", cnt);
    }

    for (const auto &car: carTime) {
        if (car.second == longestTime) printf("%s ", car.first.c_str());
    }
    printf("%02d:%02d:%02d\n", longestTime / 3600, (longestTime % 3600 ) / 60, longestTime % 60);
}
```
