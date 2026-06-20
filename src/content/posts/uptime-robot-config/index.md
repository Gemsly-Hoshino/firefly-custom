+++
published = 2025-12-02
draft = false
title = 'Uptime Robot 创建一个美观的网站监测页'
description = '利用 Uptime Robot 的 API 配合 Cloudflare Pages，免费搭建一个高颜值、自定义的网站状态监控页（Status Page），并解决部署过程中的兼容性报错问题。'
category = '技术研究'
tags = ['建站']

+++

## 注册 Uptime Robot

首先，打开 Uptime Robot 官网[https://dashboard.uptimerobot.com/](https://dashboard.uptimerobot.com/)，点击右上角免费注册，输入自己的邮箱和密码，理由可以不写。平台发邮件之后，点击激活账号。

![image-20251116220907291](image-20251116220907291.png)

![image-20251116221105509](image-20251116221105509.png)

![image-20251116221135280](image-20251116221135280.png)

![image-20251116221238772](image-20251116221238772.png)

## 创建监测器

首次激活进入控制台，一般直接选底部的 Skip Boarding，首页选 Create a new monitor。

![image-20251116221320504](image-20251116221320504.png)

![image-20251116221442005](image-20251116221442005.png)

网站的地址不要求是你自己的填写完要监测的网址，直接点下面的 Create monitor，按这个方法，把自己的子域名都给添加上。

![image-20251116221815233](image-20251116221815233.png)

![image-20251116221936779](image-20251116221936779.png)

全部添加完之后，点击菜单栏中的 Integrations & API，再选择 API，创建一个 Read only API key，复制下来备用。

![image-20251116222243467](image-20251116222243467.png)

![image-20251116222303049](image-20251116222303049.png)

## GitHub 设置

接着打开站点监测的 Github 仓库，选择右上角 Fork，Create Fork，克隆到自己的仓库里：

::github{repo="imsyy/site-status"}

![image-20251202135820123](image-20251202135820123.png)

![image-20251202135830531](image-20251202135830531.png)

克隆完之后点击 `.env.example`，点击右上角铅笔修改。

![image-20251202135853130](image-20251202135853130.png)

![image-20251202135915306](image-20251202135915306.png)

文件名要记得把 `.env` 后面的 `.example` 删除，只剩 `.env`，然后下方参数填入刚刚复制的 API key，下面还有 Site Title 等参数，按自己的需求改，全部改完，选择 Commit changes 确定修改。

![image-20251202135937457](image-20251202135937457.png)

## Cloudflare 设置

修改完成，先回到 Cloudflare，点击右上角创建应用程序，先不部署 Workers，点下面的小字 Looking to deploy pages 旁边的 Get started，导入现有 Git 存储库，首次打开要先连接 GitHub 账号，连接后选择自己刚刚改过的仓库。

![image-20251202140408616](image-20251202140408616.png)

![image-20251202142155580](image-20251202142155580.png)

![image-20251202142206961](image-20251202142206961.png)

选择 site-status ，如果 Fork 到自己仓库下的是其他名称也差不多，点击开始设置框架预设选 Nuxt.js，保存并部署。

![image-20251202142218002](image-20251202142218002.png)

![image-20251202142307684](image-20251202142307684.png)

如果跟着我这么选的话，部署到一半大概就报错了，我们先点击左侧的 Workers 和 Pages，再找到刚刚创建的连接到 Git 仓库的 Pages 项目，点击设置，再点击运行时，在兼容性标志这里输入 `nodejs_compat`，点击保存，回到部署页，点击3个点，再点击重试部署就可以成功部署了。

![image-20251202142440142](image-20251202142440142.png)

![image-20251202142524601](image-20251202142524601.png)

![image-20251202142546744](image-20251202142546744.png)

![image-20251202142737314](image-20251202142737314.png)

部署完成之后，添加自定义域，一个美观的站点监测页就做好了。

![image-20251202142950902](image-20251202142950902.png)

![image-20251202143022607](image-20251202143022607.png)

## 不想部署？

其实，Uptime Robot 也有自己的不用修改的状态监测页面，点击左边菜单栏 Status pages，然后 Create Status page

![image-20251202200831158](image-20251202200831158.png)

弹出页面，直接选择默认的监测器组就可以了，点击 Next，填写显示的名称信息，Finish

![image-20251202201156391](image-20251202201156391.png)

![image-20251202201137120](image-20251202201137120.png)

接着就能在上方找到 Uptime Robot 给你分配的监测器域名，直接打开就能用，但缺点是，这个页面是英文的，并且留给自定义的空间不是很多。

![image-20251202201429162](image-20251202201429162.png)

## 小结

至此，通过以上两种方法，都可以获得一个专属的网站状态监测页。

如果不介意英文界面且追求极致简单，Uptime Robot 自带的 Status Page 也就是几分钟的事；但如果你像我一样喜欢折腾，追求更现代化的 UI 设计、中文界面以及自定义域名的专业感，那么通过 GitHub + Cloudflare Pages 部署开源项目是更好的选择。

一个公开透明的运行状态页，不仅方便自己随时掌握服务健康状况，也能在访客面前展现站点的稳定性和专业度。
