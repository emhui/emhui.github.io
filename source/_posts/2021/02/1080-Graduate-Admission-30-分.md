---
title: 1080 Graduate Admission (30 分)
date: 2021-02-08 17:03:09
tags: [PAT, 排序]
categories: [PAT]
---

# 1080 Graduate Admission (30 分)

## 题目

![6GGSTS](https://gitee.com/yoyhm/oss/raw/master/uPic/6GGSTS.png)

## 分析

本题考查 **结构体排序**

题目比较复杂，需要进行简化，简化后就很简单。所以先可以简化为下面两步。

1. 首先根据成绩进行排序

2. 排序完成后分配学校

分配学校规则如下

- 根据最后成绩，排序
- 若最后成绩相同，根据入学成绩排序，若入学成绩相同，则排名一样
- 每个人有K个选择，根据排名来选，若学校没有满员，那么可以入学，满了就换下一个学校。所有的都满了，那么这个人没有书读
- 如果两个人排名一样，学校也一样，学校即使满员也要让他们进去。

该规则转化成代码如下

```C++
// 开始招收学生
vector<int> quota(n); // 每个学校的限额
vector<vector<int>> admissions(m); // 每个学校的人
for (int i = 0; i < n; i++) {
	applicant ap = va[i];
	for (int j = 0; j < k; j++) {
		int schoolId = ap.schools[j];
		int num = admissions[schoolId].size();
		if (quota[schoolId] > 0) { // 名额足够
			admissions[schoolId].push_back(ap.id);
			quota[schoolId]--; // 名额-1
			break;
		// 名额不够但和最后一个人的排名一样，也可以加入
		} else if (rank[admissions[schoolId][num-1]] == rank[ap.id]) {
			admissions[schoolId].push_back(ap.id);
			break;
		}
	}
}

```

## 代码

```C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
using namespace std;

struct applicant{
    int id, Ge, Gi, Gf, rank;
    vector<int> schools;
    applicant(){}
    applicant(int _id, int _Ge, int _Gi, vector<int> _schools) {
        id = _id;
        Ge = _Ge;
        Gi = _Gi;
        Gf = (Ge + Gi) / 2;
        schools = _schools;
    }
};

bool cmp(applicant &a, applicant &b) {
    if (a.Gf != b.Gf) return a.Gf > b.Gf;
    else if (a.Ge != b.Ge) return a.Ge > b.Ge;
}

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> quota(m);
    vector<applicant> va;
    vector<int> preSchools(k); // 存储每个人意向的学校

    for (int i = 0; i < m; i++) cin >> quota[i]; // 每个学校招生人数

    int Gi, Ge;
    for (int i = 0; i < n; i++) {
        cin >> Ge >> Gi;
        for (int j = 0; j < k; j++) {
            cin >> preSchools[j];
        }
        va.push_back(applicant(i, Ge, Gi, preSchools));
    }

    sort(va.begin(), va.end(), cmp);
    // 设置排名
    vector<int> rank(n, 0);
    for (int i = 0; i < n; i++) {
        if (i == 0) {
            // va[i].rank = 1;
            rank[va[i].id] = 1;
        } else if (va[i].Gf == va[i - 1].Gf && va[i].Ge == va[i - 1].Ge) {
            // va[i].rank = va[i - 1].rank;
            rank[va[i].id] = rank[va[i - 1].id];
        } else {
            // va[i].rank = i + 1;
            rank[va[i].id] = i + 1;
        }
    }
    // 开始招收学生
    vector<vector<int>> admissions(m); // 每个学校的人
    // quota 每个学校的限额
    for (int i = 0; i < n; i++) {
        applicant ap = va[i];
        for (int j = 0; j < k; j++) {
            int schoolId = ap.schools[j];
            int num = admissions[schoolId].size();
            if (quota[schoolId] > 0) { // 名额足够
                admissions[schoolId].push_back(ap.id);
                quota[schoolId]--; // 名额-1
                break;
            } else if (rank[admissions[schoolId][num-1]] == rank[ap.id]) { // 如果和最后一个人的排名一样，也可以加入
                admissions[schoolId].push_back(ap.id);
                break;
            }
        }
    }
    // 打印每个学校的录取情况
    for (int i = 0; i < m; i++) {
        sort(admissions[i].begin(), admissions[i].end());
        int size = admissions[i].size();
        for (int j = 0; j < size; j++) {
            printf("%d", admissions[i][j]);
            if (j < size - 1) printf(" ");
        }
        printf("\n");
    }
    return 0;
}
```
