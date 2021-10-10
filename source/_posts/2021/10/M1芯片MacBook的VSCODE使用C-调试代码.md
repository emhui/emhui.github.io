---
title: M1芯片MacBook的VSCODE使用C++调试代码
date: 2021-10-10 15:40:10
tags: [教程]
categories: 软件
---

# 在M1芯片上的VSCODE上使用C++进行调试

**环境**

- 芯片：M1
- 笔记本：MacBook Air
- 软件：VSCODE

**VSCODE插件准备**

- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)

---

## 安装两个插件

在VSCODE中根据引导安装两个插件即可。

> 安装C/C++的时候，它会显示推荐你使用`clang`。

## 使用

如下图所示

![9pbSicPTznglOsw](https://i.loli.net/2021/10/10/9pbSicPTznglOsw.png)

---

## 注意

如果出现下面错误，是需要安装[CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)解决。

```
ERROR: Unable to start debugging. Unexpected LLDB output from command "-exec-run". process exited with status -1 (attach failed ((os/kern) invalid argument))
```

安装完成[CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)后，在项目生成的`launch.json`文件中，将`type`改成`"type": "lldb"`



## 参考

- [[VSCode LLDB on MacOS error when starting debugging session](https://stackoverflow.com/questions/67270447/vscode-lldb-on-macos-error-when-starting-debugging-session)](https://stackoverflow.com/questions/67270447/vscode-lldb-on-macos-error-when-starting-debugging-session)
