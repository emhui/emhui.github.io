---
title: 使用Travis CI自动发布博客
date: 2021-10-16 14:27:43
tags: [教程]
categories: 教程
---

# 配置 Travis CI

1. 将 [Travis CI](https://link.segmentfault.com/?enc=kE2UDQCGs3iYgLqDtTiLCg%3D%3D.heMyjl77kZesH0dZilXAMfK5b%2FdToJbCzIq2XqMj1J8iCCRzWX8jJltDwLNWHWZT) 添加到你的 Github 账户
2. 去 [Applications settings](https://link.segmentfault.com/?enc=IHOkDSc63U5GZ4CQ64eWzQ%3D%3D.Wzr0EXAwMgHm2nWq%2FgurskPrRFSTDS8jGVEilOSgd3z%2FOGcEQFxhKOn5fqCVV1rx) 设置让 **Travis CI** 能够访问你的 repo
3. 去 [Personal access tokens](https://link.segmentfault.com/?enc=EIf8Uj9cM1VtkI0ujtGG8Q%3D%3D.vs7CpeCaA2grgsG2G85vINQ60ja8ZnPlbQegoVPcuSO6I%2FRHHaI3c9TBMV7AveCD) 为 **Travis CI** 新建一个 token ( **只需要 `repo` 这个 scopes** )，然后**把 token 的值记录下来**
4. 去 [Travis CI](https://link.segmentfault.com/?enc=GbHTxXx0DC0rx%2FHTfLL0nw%3D%3D.3xdooz3c5ZZOtmotxamdE41Yk8qlctgTP4T%2FcwVhWCQ%3D)，在你的 repo 页面下点击 **More Options** 找到 **Settings**， 然后找到 **Environment Variables**，建立一个名(NAME)为 **`GH_TOKEN`**, 值( VALUE )为你**上一步记录的 token**，最后保存
5. 在你的 Github 的项目 source 分支内新建一个名为 `.travis.yml` 的文件，参考以下内容进行填入，(我都有注释，不要照抄)

```yaml
os: linux
language: node_js
node_js:
  - 10  # 使用 nodejs LTS v10
branches:
  only:
    - source # 只监控 source 的 branch
cache:
  directories:
    - node_modules # 缓存 node_modules 加快构建速度
before_script: ## 根据你所用的主题和自定义的不同，这里会有所不同
  - npm install -g hexo-cli # 在 CI 环境内安装 Hexo
  - mkdir themes # 由于我们没有将 themes/ 上传，所以我们需要新建一个
  - cd themes # 如果上传theme文件夹，就注释这句话
  - git clone https://github.com/SukkaW/hexo-theme-suka.git suka #从 Github 上拉取 Suka 主题
  - cd suka
  - npm install --production # 安装 Suka 主题的依赖
  - cd ../.. # 返回站点根目录
  - cp _config.theme.yml themes/suka/_config.yml # 将主题的配置文件放回原处
  - npm install # 在根目录安装站点需要的依赖
script:
  - hexo generate # generate static files
deploy: # 根据个人情况，这里会有所不同
  provider: pages
  skip_cleanup: true # 构建完成后不清除
  token: $GH_TOKEN # 你刚刚设置的 token
  keep_history: true # 保存历史
  fqdn: emhui.fun # 自定义域名，使用 username.github.io 可删除
  on:
    branch: source # hexo 站点源文件所在的 branch
  local_dir: public
  target_branch: master # 存放生成站点文件的 branch，使用 username.github.io 必须是 master
```



## 参考

> [Travis CI 自动构建部署 Github pages](https://segmentfault.com/a/1190000021987832)
