---
title: 1114 Family Property (25分)
date: 2021-01-30 22:50:55
tags: [PAT, union-find]
categories: [PAT]
---

# 1114 Family Property (25分)

## 题目

![6vm9f2](https://gitee.com/yoyhm/oss/raw/master/uPic/6vm9f2.png)

## 分析

步骤：

> 方法一和方法二差不多，就是最后处理有点不同。 方法二使用下面步骤。

1. 求出总共的人数
2. 建立并查集，ID越小，权重越大
3. 找出并查集中连通分量的根结点和每个连通分量中的结点数量。
4. 建立一个新的数组`temp`，该数组下标为用户ID。
5. 对有房地产和房地产面积的用户，找到他们的根结点`root`，将他们的房地产，面积全部累加到新的数组`tmep[root]`中去（新的数组下标就是用户ID）。
6. 把新数组中的根用户添加到`vector`中，最后在排序即可。

## 代码

方法一

```C++
#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <map>
#include <utility>
using namespace std;

struct Family{
	int id, num; // num 家庭总数
	double estate, area;
	vector<int> relative;
};

int numPerson = 0;
unordered_map<int, int> int2uid, uid2int;
vector<Family> families;

int getUid(int id) {
    if (int2uid.find(id) == int2uid.end()) { // 如果不存在
        int2uid[id] = numPerson;
        uid2int[numPerson] = id;
        return numPerson++;
    }
    return int2uid[id];
}

class UnionFind{
    private:
    vector<int> parent;
    int setCount;
    public:
    UnionFind(int n) {
        for (int i = 0; i < n; i++) parent.push_back(i);
        setCount = n;
    }
    int find(int n) {
        if (n != parent[n]) parent[n] = find(parent[n]);
        return parent[n];
    }
    void unite(int u, int v) {
        u = find(u), v = find(v);
        if (u == v) return;
        // 挂在到挂在id比较小的上面
        if (uid2int[u] < uid2int[v]) {swap(u, v);}
        parent[u] = v;
        setCount--;
    }
    bool isConnected(int u, int v) {return find(u) == find(v);}
    int getCount() {return setCount;}
};

bool cmp(pair<int, Family>& a, pair<int, Family>& b) {
    if (a.second.area != b.second.area) return a.second.area > b.second.area;
    return a.first < b.first;
}
int main() {
    int n, id, fa, mo, k, child, estate, area;
    cin >> n;
    for (int i = 0; i < n; i++) {
        Family family;
        cin >> id >> fa >> mo >> k;
        family.id = getUid(id);
        if (fa != -1) family.relative.push_back(getUid(fa));
        if (mo != -1) family.relative.push_back(getUid(mo));
        for (int j = 0; j < k; j++) {
            cin >> child;
            family.relative.push_back(getUid(child));
        }
        cin >> estate >> area;
        family.estate = estate;
        family.area = area;
        families.push_back(family);
    }

    UnionFind uf(numPerson); // 建立并查集
    for (int i = 0; i < n; i++) {
        int id = families[i].id;
        for (int j = 0; j < families[i].relative.size(); j++) {
            int relative = families[i].relative[j];
            if (!uf.isConnected(id, relative)) {
                uf.unite(id, relative);
            }
        }
    }
    printf("%d\n", uf.getCount());
    map<int,Family> ans;
    for (int i = 0; i < numPerson; i++) {
        ans[uid2int[uf.find(i)]].num++; // 统计人数
    }
    for (int i = 0; i < n; i++) {
        int key = uid2int[uf.find(families[i].id)];
        // ans[key].num++;
        ans[key].estate += families[i].estate;
        ans[key].area += families[i].area;
    }
    vector<pair<int, Family>> ans2;
    for (map<int, Family>:: iterator it = ans.begin(); it != ans.end(); it++) {
        it->second.estate = it->second.estate * 1.0 / it->second.num;
        it->second.area = it->second.area * 1.0 / it->second.num;
        ans2.push_back(make_pair(it->first, it->second));
    }
    sort(ans2.begin(), ans2.end(), cmp);
    for (int i = 0; i < ans2.size(); i++) {
        printf("%04d %d %.3lf %.3lf\n", ans2[i].first, ans2[i].second.num,
               ans2[i].second.estate, ans2[i].second.area);
    }
}


```

方法二

```C++
#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <map>
using namespace std;

struct Family{
	int id, num; // num 家庭总数
	double estate, area ;
	vector<int> relative;
    Family(): num(0), estate(0.0), area(0.0) {} // 初始化为0
};

int numPerson = 0;
unordered_map<int, int> int2uid, uid2int;
vector<Family> families;

int getUid(int id) {
    if (int2uid.find(id) == int2uid.end()) { // 如果不存在
        int2uid[id] = numPerson;
        uid2int[numPerson] = id;
        return numPerson++;
    }
    return int2uid[id];
}

class UnionFind{
    private:
    vector<int> parent;
    int setCount;
    public:
    UnionFind(int n) {
        for (int i = 0; i < n; i++) parent.push_back(i);
        setCount = n;
    }
    int find(int n) {
        if (n != parent[n]) parent[n] = find(parent[n]);
        return parent[n];
    }
    void unite(int u, int v) {
        u = find(u), v = find(v);
        if (u == v) return;
        // 挂在到挂在id比较小的上面
        if (uid2int[u] < uid2int[v]) {swap(u, v);}
        parent[u] = v;
        setCount--;
    }
    bool isConnected(int u, int v) {return find(u) == find(v);}
    int getCount() {return setCount;}
};

bool cmp(Family& a, Family& b) {
    if (a.area != b.area) return a.area > b.area;
    return a.id < b.id;
}
int main() {
    int n, id, fa, mo, k, child, estate, area;
    cin >> n;
    for (int i = 0; i < n; i++) {
        Family family;
        cin >> id >> fa >> mo >> k;
        family.id = getUid(id);
        if (fa != -1) family.relative.push_back(getUid(fa));
        if (mo != -1) family.relative.push_back(getUid(mo));
        for (int j = 0; j < k; j++) {
            cin >> child;
            family.relative.push_back(getUid(child));
        }
        cin >> estate >> area;
        family.estate = estate;
        family.area = area;
        families.push_back(family);
    }

    UnionFind uf(numPerson); // 建立并查集
    for (int i = 0; i < n; i++) {
        int id = families[i].id;
        for (int j = 0; j < families[i].relative.size(); j++) {
            int relative = families[i].relative[j];
            if (!uf.isConnected(id, relative)) {
                uf.unite(id, relative);
            }
        }
    }
    printf("%d\n", uf.getCount());
    map<int,int> mp;
    for (int i = 0; i < numPerson; i++) {
        mp[uf.find(i)]++; // 统计人数
    }

    // 注意：families的下标没有表达任何意思。所以我们需要建立一个新的temp数组
    // 来存储新的家庭，该家庭主要就是id最小的那个孩子。
    vector<Family> temp(numPerson);
    for (int i = 0; i < n; i++) {
        int id = families[i].id;
        int key = uf.find(id);
        temp[key].estate += families[i].estate;
        temp[key].area += families[i].area;
    }
    vector<Family> ans;
    for (map<int, int>:: iterator it = mp.begin(); it != mp.end(); it++) {
        temp[it->first].num = it->second; // 家庭人数
        temp[it->first].id = uid2int[it->first]; // 转成原本的id
        temp[it->first].estate = temp[it->first].estate * 1.0 / it->second;
        temp[it->first].area = temp[it->first].area * 1.0 / it->second;
        ans.push_back(temp[it->first]);
    }

    sort(ans.begin(), ans.end(), cmp);
    for (int i = 0; i < ans.size(); i++) {
        printf("%04d %d %.3lf %.3lf\n", ans[i].id, ans[i].num,
               ans[i].estate, ans[i].area);
    }
}


```
