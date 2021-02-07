---
title: 1109 Group Photo (25分)
date: 2021-01-31 21:54:40
tags: [PAT, 数组]
categories: [PAT]
---

# 1109 Group Photo (25分)

## 题目

![KcGWj7](https://gitee.com/yoyhm/oss/raw/master/uPic/KcGWj7.png)

## 分析

N个人按照K行排列，排列规则如下。

1. 每行人数 N/K, 向下取整，多的人在最后一行（在本题示例可以看到，排列和现实是反过来的，输出的第一行是现实的最后一行）
2. 后面那行的人不得比前面的人矮
3. 每行中，最高的站中间(m/2 + 1).
4. 每行的身高中，按身高递减，先安排在最高的人右边，在安排在左边，反复该操作。（输出和现实是反的，在输出中，可以看到其实是先安排左边。）
5. 当身高相同的时候，按照名字排

第4条规则比较关键，大概意思如下。

> In each row, other people must enter the row in non-increasing order of their heights, alternately taking their positions first to the right and then to the left of the tallest one (For example, given five people with their heights 190, 188, 186, 175, and 170, the final formation would be 175, 188, 190, 186, and 170. Here we assume that you are facing the group so your left-hand side is the right-hand side of the one at the central position.);


> 在每行中，其他人必须以身高非递增序列，交替站在最高的人旁边，先是右边，然后在左边。
> 例如 190, 188, 186, 175, 170.
>
> 190
>
> 188 190
>
> 188 190 186
>
> 175 188 190 186
>
> 175 188 190 186 170

**具体实现**

先按照高度由高到小进行排序，若高度相同，则按照姓名排序。

然后计算每组的人数`cols = n / k;`,其中最后一组的人数应该为`max_cols = n / k + n % k;`

确定好每行站多少人，开始按照规则进行站队。用一个二维`string`数组存储每个人的名字

1. 首先选出最高的人站的位置`mid = cur_cols / 2`;
2. 然后选出他左右人的位置`left = mid - 1, right = mid + 1`
3. 反复找出左右人的位置。若当`left >= 0 || right < cur_cols`证明该行所有人已经站好了。注意：如果`left == 0`证明最左边还有一个人，需要将他填上去。
4. 最后输出`string`输出即可。

主要代码如下

```C++
for (int i = 0; i < k; i++) {
	int cur_cols = i == 0 ? max_cols : cols;
	mid = cur_cols / 2;
	vvs[i][mid] = vp[idx++].first; // 先放最高的人
	left = mid - 1, right = mid + 1;
	while (left >= 0 && right < cur_cols) {
		vvs[i][left--] = vp[idx++].first;
		vvs[i][right++] = vp[idx++].first;
	}
	// 如果cols 为偶数，那么一般左边会多一个人，当left=0时，这个位置还没有被填充。
	if (left == 0) vvs[i][0] = vp[idx++].first;
}
```
下面是示例，当前已经按照身高排好序

- Joe 190
- Tom 188
- Nick 186
- Bob 175
- Mike 170
- Ann 168
- Eva 168
- Amy 160
- Tim 160
- John 159

先排最后一行

mid = 4 / 2 = 2

s[0][2] = Joe

left = 1, right = 3

s[0][1] = TOM

s[0][3] = Nick

left = 0 right = 4

s[0][0] = Bob

再排倒数第二行
mid = 3 / 2 = 1

s[1][1] = Mike

left = 0, right = 2

s[1][0] = ANN

s[1][2] = Eva

其他同理

## 代码

```C++
#include <iostream>
#include <string>
#include <utility>
#include <vector>
#include <algorithm>
using namespace std;

bool cmp(pair<string, int> a, pair<string,int> b) {
    if (a.second != b.second) return a.second > b.second;
    else return a.first < b.first;
}

int main() {
    int n, k, height;
    string s;
    cin >> n >> k;
    vector<pair<string, int>> vp;
    for (int i = 0; i < n; i++) {
        cin >> s >> height;
        vp.push_back(make_pair(s, height));
    }
    sort(vp.begin(), vp.end(), cmp); // 按照身高从小到大排序

    int cols = n / k, max_cols = n / k + n % k;
    vector<vector<string>> vvs(k, vector<string>(max_cols));
    int idx = 0;
    int mid, left, right;

    for (int i = 0; i < k; i++) {
        int cur_cols = i == 0 ? max_cols : cols;
        mid = cur_cols / 2;
        vvs[i][mid] = vp[idx++].first; // 先放最高的人
        left = mid - 1, right = mid + 1;
        while (left >= 0 && right < cur_cols) {
            vvs[i][left--] = vp[idx++].first;
            vvs[i][right++] = vp[idx++].first;
        }
        // 如果cols 为偶数，那么一般左边会多一个人，当left=0时，这个位置还没有被填充。
        if (left == 0) vvs[i][0] = vp[idx++].first;
    }

    for (int i = 0; i < k; i++) {
        int cur_cols = i == 0 ? max_cols : cols;
        for (int j = 0; j < cur_cols; j++) {
            printf("%s", vvs[i][j].c_str());
            if (j < cur_cols - 1) printf(" ");
        }
        printf("\n");
    }
}
```
