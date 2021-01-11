title: hexo注意事项
tags:
  - hexo
  - 域名
categories:
  - 其他
date: 2021-01-03 17:41:00
---
`hexo clean && hexo d`

~如果使用这个命令，可能会清除**CNAME**文件~


保持永久域名的方法

在`/source`目录下面建立一个文件`CNAME`,然后填入你的域名即可。[^1]

## hexow文件管理[^2]

默认情况下使用`hexo new "title"`，所有文章都存放在`/source/_post`下面。随着文章的数量变多，该目录下面都文件也会越来越多，所以我们可以将文件进行归类。

- 自己指定文章目录

[官方](https://hexo.io/zh-cn/docs/commands#new)使用下面命令可以在创建文件的同时并归类。

```bash
$ hexo new [layout] <title>
```

比如我要创建一个文件`hexo new -p 其他/"hexo 搭建blog".md "hexo 搭建blog"`,这样会在`_post`下面创建一个`其他`的目录，并且目录的名字是`heox 搭建blog.md`.但是这种方式非常繁琐。

- 通过年月日管理文件

因此使用第二种方式，在`_config.yml`中设置

```
new_post_name: :year/:month/:title.md
```

通过这样的设置，仍使用之前创建文件的命令

```
hexo new "hexo文件管理"
```

运行该命令则会在创建一个以当前年月为子目录的结构。如图所示

![TNJnDw](https://gitee.com/yoyhm/oss/raw/master/uPic/TNJnDw.png)

> 如果之前已经建立好的文件想按照时间归类可以直接把文件拖到对应目录

总结：可以看到第二种方法比第一种简单，且按照时间管理文件也比较方便。

## hexo.fluid 首页和文章等页面实现每天更换壁纸

1. 首先在网上找到必应壁纸的接口[^3]，网上有很多。
2. 找到接口地址后，在`hexo.fluid`的配置中。修改这个地址

```
banner_img: https://static.zkqiang.cn/example.jpg
```

## hexo.fluid 首页每次刷新显示不同的诗句

1. 参考[今日诗词](https://www.jinrishici.com/),通过`F12`获取其每次刷新的诗句接口。
2. 在`hexo.fluid`的配置文件中，配置`slogan`[^4]

```
index:
  slogan:
    enable: true
    text: 这是一条 Slogan
    api:
      enable: false
      url: "https://v1.hitokoto.cn/"
      method: "GET"
      headers: {}
      keys: ["hitokoto"]
```
url: API 地址，必须返回的是一个 JSON 格式

method: 请求方法，可选 GET、POST、PUT

headers: 请求头，如果接口需要传一些验证的头部信息，在这里设置

keys: 从请求结果获取字符串的取值字段，程序会根据列表中的字段依次取值，最终需要获得到一个字符串

## 使用hexo-admin管理后台 [^5]

安装方法见[hexo-admin](https://github.com/jaredly/hexo-admin).
这里主要是看一下如何配置`hexo-admin`的文件

- `hexo-admin`配置
- `hexo-admin`部署

`hexo-admin`只能在`_config.yml`中配置

`hexo-admin`部署，需要配置`deployCommand`.

1. 首先在根目录创建一个文件`deploy.sh`，然后更**改它的权限**,这一步很重要，如果没有更改权限。`hexo-admin`无法执行该命令
```
$ touch deploy.sh; chmod a+x deploy.sh
```

接着在文件中写入下面的脚本，或者你可以自己定义脚本

```bash
#!/usr/bin/env sh
hexo deploy
and edit _config.yml:
```
最后在`_config.yml`中配置`deployCommand`
```xml
admin:
  deployCommand: './hexo-deploy.sh'
```

[^1]: [脚注](https://hexo.fluid-dev.com/docs/guide/#%E8%84%9A%E6%B3%A8)
[^2]: [hexo博客文章多了怎么管理](https://www.pianshen.com/article/81511649508/)
[^3]: [巨硬(必应)每日壁纸接口](https://atlinker.cn/2019/07/28/bing.html)
[^4]: [hexo.fluid配置](https://hexo.fluid-dev.com/docs/guide/#slogan-%E6%89%93%E5%AD%97%E6%9C%BA)
[^5]: [hexo-admin issue](https://github.com/jaredly/hexo-admin/issues/70)