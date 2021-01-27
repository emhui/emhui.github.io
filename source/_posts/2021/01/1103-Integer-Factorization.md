---
title: 1103 Integer Factorization
date: 2021-01-13 20:52:34
tags: [PAT, 算法, dfs]
categories: [PAT]
index_img: https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6ozby6nj31hc0u01cf.jpg
math: true
---

# 1103 Integer Factorization

## 题目

![YD0TiN](https://gitee.com/yoyhm/oss/raw/master/uPic/YD0TiN.png)

## 思路

拿题目中的数据来举例 $N = 169, K = 5, P = 2$

1. 先计算出第一个位置$n_0$的范围。$max(n_0) = \sqrt[2]{169} = 13$，因此$n_0$的范围在$13 \sim 1$（从最大值开始往后遍历）。
2. 当$n_0 = 13$时，$N = 169 - 13^2 = 0$，因为$K = 5 > 1$所以$n_0=13$不满足，当$n_0=12$时，$N = 169 - 12^2 = 25$, 此时计算$n_1$的范围,$max(n_1) = \sqrt[2]{25} = 5$,$n_1$范围$5 \sim 1$.令$n_1 = 5$
3. 当$n_1 = 5$时，$N = 25 - 5^2 = 0$，此时$K = 5 > 2$，不满足，所以令$n_1 = 4$，继续求$n_2$.
4. 重复上面步骤，当$N == 0$ 且$n_i (i == K)$时候即找到了所有的$n_i$。

通过上面总结出下面的公示。

$$
N_i = N_{i - 1} - n_{i}^p \qquad (0 <= i <= K; 1 <= n_{i} <= \sqrt[p]{N_{i - 1}})
$$

设置以下变量来存储数据

- `vector<int> graphic;`: 存储$n_i$结果
- `vector<int> ans;` : 存储$Sum(n_i)$的最大值对应的$n_i$
- `vector<int> fact`: 存储$n_i^P$的所有结果，防止重复计算出现超时。
- `int maxSum;` : 存储$Sum(n_i)$的最大值

## 代码


```C++
#include <cstdio>
#include <cmath>
#include <vector>
using namespace std;
vector<int> ans, graphic,face;
int maxSum = -1;
int n, k, p;

void dfs(int idx, int tempN, int sum) {
    if (idx == k && tempN == 0) { // 找到了结果
        if (maxSum < sum) {
            maxSum = sum;
            ans = graphic;
        }
        return ;
    } else if(tempN < 0 || idx > k) {
        return ;
    }
    int data = (int)pow(tempN, 1.0 / p); // 求出最大值,再依次计算是否满足
    for (int i = data; i > 0; i--) {
        if (i <= graphic[idx - 1]) { // 防止当前的值大于前面的值，出现超时计算
            int tempNN = tempN;
            tempNN -= face[i];
            graphic.push_back(i);
            sum += i;
            dfs(idx + 1, tempNN, sum);
            graphic.pop_back();
            sum -= i;
         }
    }
}

int main() {
    scanf("%d%d%d", &n, &k, &p);
    int data = (int)pow(n, 1.0 / p);
    for (int i = 0; i <= data; i++) {
        face.push_back(pow(i, p));
    }
    int sum = 0;
    for (int i = data; i > 0; i--) {
        int tempN = n;
        tempN -= face[i];
        graphic.push_back(i);
        sum += i;
        dfs(1, tempN, sum);
        graphic.pop_back();
        sum -= i;
    }
    if (maxSum != -1) {
        printf("%d = ", n);
        for (int i = 0; i < k; i++) {
            if (i < k - 1) {
                printf("%d^%d + ", ans[i], p);
            } else {
                printf("%d^%d\n", ans[i], p);
            }
        }
    } else {
        printf("Impossible\n");
    }
    return 0;
}
```

## 其他

### 代码优化

下面面是做的三个优化，其中第一个优化解决了几个用例超时的问题。2，3优化是尝试，但是有一个用例[^1]一直无法通过😭。

1. 保持$n_i >= n_j （i < j）$，防止超时

```C++
for (int i = data; i > 0; i--) {
	if (i <= graphic[idx - 1]) { // 防止当前的值大于前面的值，出现超时计算
		int tempNN = tempN;
		tempNN -= face[i];
		graphic.push_back(i);
		sum += i;
		dfs(idx + 1, tempNN, sum);
		graphic.pop_back();
		sum -= i;
	 }
}
```

2. 在每次计算$n_i$的同时，也计算$Sum(n_i)$的值。当得到结果后可以直接比较是否是最佳结果。

```C++
int sum = 0;
for (int i = data; i > 0; i--) {
	int tempN = n;
	tempN -= face[i];
	graphic.push_back(i);
	sum += i;
	dfs(1, tempN, sum);
	graphic.pop_back();
	sum -= i;
}
```

3. 设置`fact`变量存储$n_i^P$的结果，计算$N_j = N_{j-1} - n_i^P$直接读取$n_i^P$结果。

```C++
for (int i = 0; i <= data; i++) {
	face.push_back(pow(i, p));
}
```

[^1]: ![一直超时](https://gitee.com/yoyhm/oss/raw/master/uPic/Y1wPoW.png)
