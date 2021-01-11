title: hell
author: Emhui 海贼王
tags:
  - 算法
categories: []
date: 2021-01-11 22:35:00
---
# 621. 任务调度器 

给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。

然而，两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的 最短时间 。

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        # 建立一个堆存储最大的值
        counter = collections.Counter(tasks)
        h = [(-val, key) for key, val in counter.items()]

        heapq.heapify(h)
        ans = list()

        while len(h) >= n + 1:

            visited_keys = list() # 记录每次遍历过的key
            
            # 依次取出n个值
            for i in range(n + 1):
                _, temp_key = heapq.heappop(h)
                ans.append(temp_key)
                visited_keys.append(temp_key)
                counter[temp_key] -= 1

            # 取出来以后，再把值放回去
            for key in visited_keys:
                if counter[key] > 0:
                    heapq.heappush(h, (-counter[key], key))

        # 如果h还有，则再次遍历
        while len(h) > 0:
            size = len(h)
            visited_keys = []
            for i in range(size):
                _, key = heapq.heappop(h)
                visited_keys.append(key)
                ans.append(key)
                counter[key] -= 1

            # 补上剩下的等待时间
            for i in range(n + 1 - size): ans.append('0')

            # 把遍历过的结果放回堆中
            for key in visited_keys:
                if counter[key] > 0:
                    heapq.heappush(h, (-counter[key],key))
            

        # 处理尾部的0
        while ans[-1] == '0':
            ans.pop(-1)
        
        print(ans)

        return len(ans)
```