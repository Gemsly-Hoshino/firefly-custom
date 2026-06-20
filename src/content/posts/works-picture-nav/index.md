+++
published = 2025-11-01
draft = false
title = 'Cloudflare Workers的多种玩法，搭建免费无限图床+导航站'
description = '本文用Cloudflare玩出实用操作：一是借助WebStack-Hugo主题搭简易导航站，二是基于telegraph-Image项目搞免费无限图床，包括GitHub仓库部署、D1数据库与R2存储配置，还用Telegram频道突破R2存储容量限制的妙招。'
cover = '/post/works-picture-nav/cover.jpg' 
category = '技术研究'
tags = ['建站']
+++

# Cloudflare Workers的多种玩法，搭建免费无限图床+导航站

## 简易导航站

### 下载Hugo并准备文件
打开Hugo，Github开源地址 [https://github.com/gohugoio/hugo/releases/tag/v0.152.2](https://github.com/gohugoio/hugo/releases/tag/v0.152.2)，往下拉，右边有一个releases点它，然后继续往下拉。

![下载发行版](image-20251031191709925.png)

找到自己架构对应的版本，一般电脑是Windows AMD64，其他架构就需要自己摸索啦。

![选择自己的系统和架构](image-20251031192254112.png)

下载下来的zip压缩包，用任意一个压缩文件管理器打开，里面就3个文件，把它解压到任意目录。在解压的目录下再新建一个文件夹，我这里叫`dev`，然后去WebStack的开源地址[https://github.com/shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)，点击右上角的绿色Code按钮，下面有个download zip，点一下下载。

![下载压缩文件](image-20251031192809720.png)

下载zip包之后，把里面的examplesite拖放到刚刚创建的dev目录下。在dev目录下再新建一个themes文件夹，把压缩文件（包括第一层目录）全部解压到themes文件夹里，解压之后要把后缀“-main”删除。

![解除文件压缩](image-20251031193214945.png)

![向文件夹解压](image-20251031194049524.png)

回到刚才放Hugo的文件夹，把它移到自己的dev文件夹里。

![移动文件](image-20251031194237185.png)

打开dev文件夹，在顶部地址栏敲cmd，按回车打开命令提示符。

![打开命令提示符](image-20251031194417982.png)

### 生成静态站点并部署到Cloudflare Pages
在命令行输入hugo生成静态站点文件，没报错且正常显示页数就成功了（笔者第一次报错是因为themes目录名没写对），静态文件就在public目录下啦。

![构建成功](image-20251031204301189.png)

我们回到Cloudflare，点击菜单栏中的“计算和AI”，再点击“Workers and Pages”，然后点右上角“创建应用程序”，选择“Pages”。

![创建程序](image-20251031205406337.png)

![创建项目](image-20251031205535476.png)

项目名可以随便写，上传文件这里如果直接上传，可能提示文件数量超限，其实给public文件夹打个zip包就能上传了（Cloudflare可以认zip包）。

![上传资产](image-20251031205923460.png)

![压缩后上传](image-20251031205955784.png)

上传成功后点“继续部署”，给自己的项目添加自定义域就能访问到了。

![部署成功](image-20251031210102717.png)

### 如何修改导航站内容
网址和其他一些配置文件主要在data文件夹里，站点的一些配置在根目录的hugo.toml中，想要改链接的图标在themes\WebStack-Hugo\static\assets\images里面，关于页面的内容在content\about.md里修改。

![资源文件](image-20251031210546204.png)

## 免费无限图床

### 准备代码仓库并部署到Cloudflare
打开GitHub开源链接：[https://github.com/x-dr/telegraph-Image/tree/static](https://github.com/x-dr/telegraph-Image/tree/static)，点击“Fork”，然后创建Fork。

![克隆仓库](image-20251031211335823.png)

![创建克隆](image-20251031211515722.png)

我们回到Cloudflare，点击左边“计算和AI”下面的“Workers和Pages”，选择“创建Pages项目”，然后“导入现有的Git存储库”，选择刚刚Fork的telegraph-image，点下面的“开始设置”。

![创建项目](image-20251031211653371.png)

![开始部署](image-20251031211739843.png)

这里要注意框架预设，选择“Next.js”，然后“保存并部署”，这需要几分钟。此时先不要访问，还需要再做一点设置。

![选择框架](image-20251031212143109.png)

![开始构建](image-20251031212202069.png)

### 配置D1数据库和R2对象存储
接下来展开左侧的“存储和数据库”，找到“D1 SQL数据库”，然后创建数据库，名称可以自己填。

![创建数据库](image-20251031212740587.png)

创建好之后，点击“控制台”，粘贴下面的代码，点击“执行”。

```sql
DROP TABLE IF EXISTS tgimglog;
CREATE TABLE IF NOT EXISTS tgimglog (
 `id` integer PRIMARY KEY NOT NULL,
 `url` text,
 `referer` text,
 `ip` varchar(255),
 `time` DATE
);
DROP TABLE IF EXISTS imginfo;
CREATE TABLE IF NOT EXISTS imginfo (
 `id` integer PRIMARY KEY NOT NULL,
 `url` text,
 `referer` text,
 `ip` varchar(255),
 `rating` text,
 `total` integer,
 `time` DATE
);
```

![粘贴命令](image-20251031213204567.png)

数据库初始化完之后，再点击“存储和数据库”下的“R2对象存储”，点击右上角“创建存储桶”，自己取个名字，创建好之后返回项目。

> 请注意
>
> 进入R2对象存储页面需绑定支付方式，可以绑定自己的银联卡，要是没有的话，可以去小黄鱼上面买一张验证卡。

![创建一个存储桶](image-20251031213745981.png)

回到刚才的项目选择“设置”，点击“绑定”，然后添加刚才的两个绑定。

![添加存储桶绑定](image-20251031214205606.png)

添加D1数据库，变量名称是大写的`IMG`，数据库选择刚刚创建的，保存。

![开始绑定数据库](image-20251031214530493.png)

重复添加R2存储桶，变量名称是大写的`IMGRS`，存储桶选择刚刚创建的，保存。

![连接存储桶](image-20251031214733117.png)

此时直接打开是打不开的，我们需要到 Pages 设置-运行时-兼容性标志，输入 `nodejs_compat` ，然后保存，回到首页，点击重试部署。

![输入兼容性标志](image-20251031215330442.png)

![重新部署](image-20251031215510506.png)

### 改用TG频道作为存储（突破R2限制）
接下来，你的图床就可以访问了，而且能用R2接口上传图片。要是你想不受R2限制，也可以跟我一样把上传接口改为TG频道。

![切换频道](image-20251031221114417.png)

首先添加机器人好友[https://t.me/BotFather](https://t.me/BotFather)，点击下面的“Start”。

![开始](image-20251031221530032.png)

![创建新机器人](image-20251031221705168.png)

接下来会让你给机器人取个名字，最好取个少见点的，或者用密码生成器来取，直到显示“Done”，选中的就是你的机器人Token。

![取得令牌](image-20251031222121838.png)

在你的频道或者群聊中邀请@get_id_bot（没有的话就创建一个），然后在聊天框里输入/my_id@get_id_bot，机器人会回复“channel info”下面的Chat ID。记得把你刚创建的机器人对应的用户名拉进群，然后设置成管理员。部分第三方 Telegram 客户端原生具有获取 ID 的特性。

![获取 ID](image-20251031223107879.png)

#### 测试TG机器人是否生效
在浏览器打开链接：`https://api.telegram.org/bot[你的bot id]/sendMessage?chat_id=[在频道或者群组get id bot中获取的chat id]&text=1234`，如果正常的话，会在你的群里发送“1234”消息。

![填写变量](image-20251031224419981.png)

把你的机器人Token和Chat ID填好，点击保存，然后回到部署页面，点击三个点，重新部署一下就行啦，这样就获得了完全免费且无限的图床。

![设置成功](image-20251031224531558.png)

### 开发者介绍的环境变量
以下是开发者介绍的一些环境变量：

| 变量名称              | 值                                                          | type    |
| --------------------- | ----------------------------------------------------------- | ------- |
| PROXYALLIMG           | 反向代理所有图片（默认为false）                             | boolean |
| BASIC_USER            | 后台管理页面登录用户名称                                    | string  |
| BASIC_PASS            | 后台管理页面登录用户密码                                    | string  |
| ENABLE_AUTH_API       | 是否开启访客验证 （默认为false）                            | boolean |
| REGULAR_USER          | 普通用户 （访客验证）                                       | string  |
| REGULAR_PASS          | 普通用户密码                                                | string  |
| ModerateContentApiKey | 审查图像内容的API key                                       | string  |
| RATINGAPI             | [自建的鉴黄api](https://github.com/x-dr/nsfwjs-api)         | string  |
| CUSTOM_DOMAIN         | https://your-custom-domain.com (自定义加速域名)             | string  |
| TG_BOT_TOKEN          | 123468:AAxxxGKrn5 (从 [@BotFather](https://t.me/BotFather)) | string  |
| TG_CHAT_ID            | -1234567 (频道的ID,TG Bot要是该频道或群组的管理员)          | string  |

## 总结
先是简易导航站，从下载 Hugo、WebStack-Hugo 主题，到生成静态文件、部署到 Cloudflare Pages。
再是免费无限图床，先 Fork 代码仓库部署到 Pages，配好 D1 数据库和 R2 存储就能用，嫌 R2 麻烦的话，还能改用 Telegram 频道当存储，全程免费还不限量，还是很实用的。