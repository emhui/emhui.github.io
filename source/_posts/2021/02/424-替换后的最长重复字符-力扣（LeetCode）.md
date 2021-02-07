---
title: 424. 替换后的最长重复字符 - 力扣（LeetCode）
date: 2021-02-02 09:30:45
tags: [leetcode, 双指针, 滑动窗口]
categories: [LeetCode]
---

# [424. 替换后的最长重复字符 - 力扣（LeetCode）](https://leetcode-cn.com/problems/longest-repeating-character-replacement)

## 题目

给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。

注意：字符串长度 和 k 不会超过 104。

**示例1**

```
输入：s = "ABAB", k = 2
输出：4
解释：用两个'A'替换为两个'B',反之亦然。
```

**示例2**

```
输入：s = "AABABBA", k = 1
输出：4
解释：
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
```

## 分析

本题需要维护一个最大范围的滑动窗口。同时该滑动窗口需要移动，扩张和收缩[^1]。

使用`left,right`记录滑动窗口范围，同时使用`max_count`统计当前窗口内出现某个字符出现最多的次数。若当`right - left + 1 - max_count > k`证明`k`值不够用，这是就需要进行收缩，同时`left`所在的字符出现的频率也要`-1`.


## 代码

```C++
class Solution {
public:
    int characterReplacement(string s, int k) {
        int left = 0, right = 0, ans = 0, max_count = 0, n = s.length();
        int freq[26] = {0}; // 记录s中left-right之间单词出现的频率
        while (right < n) {
            freq[s[right] - 'A']++; //
            max_count = max(max_count, freq[s[right] - 'A']); // 计算当前的l-r范围内出现次数的的字符数量
            // k的数量不够，需要进行收缩
            if (right - left + 1 - max_count > k) {
                freq[s[left] - 'A']--; // 字符收缩
                left++;

            }
            ans = max(ans, right - left + 1);
            right++;
        }
        return ans;
    }
};
```

[^1]: [C++最详细题解！](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/czui-xiang-xi-ti-jie-by-heroding-olgt/)
