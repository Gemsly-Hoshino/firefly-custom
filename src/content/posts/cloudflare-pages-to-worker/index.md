+++
published = 2025-12-01
draft = false
title = 'CloudFlare Worker和Pages有什么区别？优选来了'
description = 'Workers Assets 的推出，Worker 现在也可以直接绑定并服务静态资源，两者的界限正在逐渐模糊。本文将深入解析这两者的核心差异，教你如何利用 Worker 部署静态博客，更重要的是实现网络连接的“优选”加速，降低访问延迟。'
category = '技术研究'
tags = ['IP优选','建站']

+++

## 问题解答

### Cloudflare Worker和Pages有什么区别？

**Cloudflare Worker 是 Cloudflare 推出的一项边缘计算服务**，在 Cloudflare 全球网络边缘的数千个数据中心运行 **JavaScript、TypeScript 或 WebAssembly 代码**。**Cloudflare Pages** 是一项专注于 **前端和静态网站** 的服务，更多的是静态页面托管。

Worker 的核心是提供一个无服务器（Serverless）环境，主要用于：

- **执行动态逻辑和复杂的计算**：例如处理 API 请求、修改 HTTP 响应、运行中间件、进行身份验证或路由请求。
- **作为后端服务**：它本质上是一个轻量级的、高性能的应用程序，可以与数据库（如 D1）或存储（如 R2）配合，构建功能完整的后端。
- **关注点**：**代码执行和业务逻辑**。

| **特性**     | **Cloudflare Worker**                            | **Cloudflare Pages**                                     |
| ------------ | ------------------------------------------------ | -------------------------------------------------------- |
| **主要目标** | 执行边缘代码，提供动态后端逻辑和 API 服务。      | 托管和持续部署静态或动态前端网站。                       |
| **核心用途** | 无服务器功能、API 网关、中间件、复杂的业务逻辑。 | 网站托管、CI/CD 自动化部署、静态资源分发。               |
| **部署方式** | 部署单独的脚本或应用程序。                       | 连接 Git 仓库，自动构建和部署整个项目。                  |
| **集成关系** | 可以独立运行，或作为 Pages 的动态后端。          | 作为网站托管平台，并可以**集成 Worker** 来增强动态功能。 |

简而言之：**Worker 是运行代码的引擎，而 Pages 是托管网站的平台**。Pages 通常面向前端开发者，用于快速部署网站；Worker 面向需要高性能、低延迟运行业务逻辑的开发者。通过Worker可以实现简单的后端功能，比如数据库、R2和KV等等。

### Cloudflare Pages可以迁移到Worker吗？

**可以使用 Workers Assets (新功能)**：Cloudflare 近期推出了在 Worker 中直接绑定静态资源的功能。您需要在 `wrangler.toml` 配置文件中指定静态文件目录（如 `assets = { directory = "./public" }`），让 Worker 也能像 Pages 一样服务静态文件。

也可以在创建Worker页面中，点击上传你的静态文件，再把Hugo、Astro转写出来的静态文件直接上传就可以了。

![可选静态文件上传](image-20251201221946541.png)

### 有什么迁移的理由？

个人认为Workers和Pages在大的区别在设置这方面，Workers多了一个自定义路由，Pages目前还没有，这个自定义路由对于我们优选帮助很大，Workers也能链接自定义域，和Pages相同。

![可使用路由映射](image-20251201222545638.png)

### 用Workers托管静态会扣请求总数吗？

目前来说，请求命中静态文件不会触发扣请求总数，昨天部署了很多个纯静态的Workers，到目前是没有扣请求总数的，除了调用Workers的命令，可能会产生一点点请求数目，纯静态大抵不会扣请求总数，Workers一直都是没有请求数目的。![静态文件worker 无请求示度](image-20251201223249539.png)

## 上传静态文件方法

### 图形上传（推荐）

Workers和Pages页面，点击创建应用程序，选择Upload your static files，和Pages一样，上传网站的根目录就可以了。

![创建项目](image-20251201223852632.png)

![继续使用静态文件上传](image-20251201223904421.png)

上传之后设置项目名称就可以部署了，访问默认的workers.dev域名（大陆屏蔽）发现正常显示HTML文件内容。

![静态资产也可部署](image-20251201223953451.png)

![打开网站发现正常](image-20251201224429855.png)

有时候上传会被检测TypeScript，解救方法就是Wrangler CLI上传。

![部分预编译静态资产被检测到有框架无法继续](image-20251201225115817.png)

### CLI上传

#### 环境设置

首先要有NodeJS环境，可以到[下载 | Node.js 中文网](https://nodejs.cn/download/)下载安装，全部点Next安装，完成之后同时按下 **Win+R** 输入 `cmd` 回车打开命令行，输入 `npm -v` 出现版本号说明安装成功。

![查看 npm 版本](image-20251201225637190.png)

接下来安装wrangler，命令是：

```cmd
npm install -g wrangler
```

如果卡住了，同时按下**Ctrl+C**取消操作，换源解决速度慢：

```cmd
npm config set registry https://registry.npmmirror.com
```

再次执行安装命令，大致可以解决速度慢问题。安装完成输入`wrangler --version`会正常弹出版本信息。![已经成功安装组件](image-20251201230751712.png)

首次打开wrangler，输入`wrangler login`连接Cloudflare账号，直接点击Allow。

![同意授权](image-20251201231049119.png)

以后可以通过`wrangler whoami`查询目前登陆的账号信息。

![可查看账号信息](image-20251201231229106.png)

#### 上传

在你的项目目录下创建`wrangler.toml`，在文件内写入项目信息：

```toml
name = "your-project-name" # 你的项目名称，命名要求和网页端一致
compatibility_date = "2025-11-20" #最好填写十几天前的日期，否则容易兼容性报错
assets = { directory = "./dist" }  #静态文件的目录，Astro是dist，Hugo是public
workers_dev = true #启用workers.dev域名
```

在资源管理器地址栏输入cmd打开命令提示符，直接输入`wrangler deploy`，就会直接上传到你账户下的Workers和Pages上面，如果项目不存在就会创建，有同名项目则会覆盖先前的部署。通过这个方法可以覆盖网页端的错误提示。有时候还是无法上传，类似fetch error就打开加速器。

![可成功部署](image-20251201233029899.png)

## Workers和Pages优选

### Workers优选

首先我们在Workers设置中有自定义域和路由两个选项，可以直接自定义域，但是路由延迟高。无论是自定义域还是路由，都要求只能添加你的 Cloudflare 帐户中的活动域。比如我在路由选项卡中的区域选择我的主域名`gemsly.top`，路由这里填写你想**给访客用的三级域名+斜杠星号**，我这里是`123.gemsly.top/*`，点击添加路由。

![添加路由映射](image-20251201234506159.png)

添加完成后回到账户主页，进入刚才添加的域名的DNS记录，添加一个CNAME记录，比如我的是123，目标填写社区优选好的域名，关闭已代理，我这里放几个作为参考，点击保存，等DNS传播就可以打开网站查看了。

```
cloudflare.182682.xyz
cloudflare-dualstack.byoip.top
cf.090227.xyz
cdn.2020111.xyz
```

![添加记录](image-20251201235416000.png)

传播成功后打开[https://www.itdog.cn/http/](https://www.itdog.cn/http/)或[https://zhale.me/http/](https://zhale.me/http/)测速，发现全国大部分地区延迟降低。

![全国大部分访问延迟降低](image-20251201235847771.png)

![炸了么的访问延迟降低](image-20251202000021468.png)

### Pages优选

Pages优选的要求更高一些，要求域名DNS不要托管在Cloudflare，在Pages里面添加你在Cloudflare上的域名很难优选，因为改掉他自动添加的 pages.dev 的 DNS 记录就报错了，所以在自定义域添加一个在Cloudflare DNS之外的提供商，我这里是Spaceship DNS，是其他 DNS 的也大差不差，然后选择开始CNAME设置 ，把pages.dev的记录照常添加进DNS记录里面。![选择自定义 DNS 供应商](image-20251202000748039.png)

![添加域名服务器记录](image-20251202001057485.png)

等待新添加的自定义域变成活动状态，我们再回到Spaceship DNS，把原来pages.dev的记录改成上述社区优选域名，点击更新DNS记录。

![等待状态变为活动](image-20251202001533549.png)

![改为社区优选域名](image-20251202001549015.png)

等待DNS传播完成，使用[https://www.itdog.cn/http/](https://www.itdog.cn/http/)或[https://zhale.me/http/](https://zhale.me/http/)测速发现延迟降低。

![全国访问延迟降低](image-20251202021329997.png)

![炸了么节点访问延迟降低](image-20251202021454276.png)

## 结尾

通过本文的对比与实操，我们可以看到 Cloudflare 生态的灵活性。虽然 Pages 在自动化构建（CI/CD）和静态资源分发上拥有传统优势，但 **Workers** 凭借其强大的边缘计算能力和新加入的 **静态资源托管（Static Assets）** 功能，正在成为一个极具竞争力的选择。

特别是在**网络优化**方面，Workers 展现出了独特的价值：

- **灵活性更高**：Workers 提供了 **自定义路由** 功能，允许用户绑定自定义域并更方便地配置 CNAME 优选域名，从而显著降低国内访问的延迟。
- **Pages 的局限**：相比之下，Pages 的优选设置更为繁琐，通常要求域名 DNS 不能托管在 Cloudflare 上，需要借助第三方 DNS 服务商才能实现同等效果。

虽然 **Worker 是运行代码，Pages 是托管静态网站**，但两者在静态资源托管上的能力正在趋同。通过**自定义路由（Route）** 来实现更灵活的 **IP 优选**，Worker 展现出了极大的优势。

特别是在国内网络环境下，Worker 允许我们在 Cloudflare 账户内直接通过自定义路由配合 CNAME 接入优选 IP，有效降低延迟；而 Pages 的优选则需要借助外部 DNS 服务商（如 Spaceship）来“绕过”默认解析限制，合理利用 Cloudflare 为网站降低延迟。