+++
published = 2025-12-28
draft = false
title = '国内外常用DNS、DoH地址汇总'
description = '汇总 2025 国内外主流 DNS (阿里/腾讯/Google/Cloudflare) 的 IPv4/IPv6 及 DoH 加密地址，提供网络安全访问指南。'
category = '技术研究'
tags = ['域名']
licenseName = "Unlicensed"
+++

# 国内外常用DNS、DoH地址汇总

## 国内 DNS

#### 阿里公共 DNS（Alibaba Cloud DNS）

| 项目     | 地址                                                         |
| :------- | :----------------------------------------------------------- |
| IPv4     | 223.5.5.5<br />223.6.6.6                                     |
| IPv6     | 2400:3200::1<br />2400:3200:baba::1                          |
| DoH 地址 | 标准：`https://dns.alidns.com/dns-query`<br>IP 直连：<br />`https://223.5.5.5/dns-query`<br />`https://223.6.6.6/dns-query`<br>JSON API：`https://dns.alidns.com/resolve` |

#### 腾讯云 DNSPod

| 项目     | 地址                                                         |
| :------- | :----------------------------------------------------------- |
| IPv4     | 119.29.29.29<br />1.12.12.12<br />120.53.53.53               |
| IPv6     | 2402:4e00::                                                  |
| DoH 地址 | 标准：`https://doh.pub/dns-query`<br>IP 直连：<br />`https://1.12.12.12/dns-query`<br />`https://120.53.53.53/dns-query`<br>国密 SM2 加密：`https://sm2.doh.pub/dns-query` |

#### 百度公共 DNS（Baidu DNS）

| 项目 | 地址            |
| :--- | :-------------- |
| IPv4 | 180.76.76.76    |
| IPv6 | 2400:da00::6666 |

#### 360 DNS

| 项目                | 地址                            |
| :------------------ | :------------------------------ |
| IPv4 电信/铁通/移动 | 101.226.4.6<br>218.30.118.6     |
| IPv4 联通           | 123.125.81.6<br />140.207.198.6 |
| DoH 地址            | `https://doh.360.cn/dns-query`  |

#### CNNIC 公共 DNS

| 项目 | 地址                           |
| :--- | :----------------------------- |
| IPv4 | 主：1.2.4.8<br>备用：210.2.4.8 |
| IPv6 | 2001:dc7:1000::1               |

#### 114 DNS

| 项目          | 地址                                 |
| :------------ | :----------------------------------- |
| IPv4 基础服务 | 114.114.114.114<br />114.114.115.115 |
| IPv4 家庭版   | 114.114.114.110<br />114.114.115.110 |
| IPv4 纯净版   | 114.114.114.119<br />114.114.115.119 |

## 国外主流 DNS

#### Cloudflare
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 1.1.1.1<br />1.0.0.1 |
| IPv6 | 2606:4700:4700::1111<br />2606:4700:4700::1001 |
| DoH 地址 | 标准：`https://1.1.1.1/dns-query`<br>备用：`https://1.0.0.1/dns-query`<br>域名形式：`https://cloudflare-dns.com/dns-query` |

#### Google Public DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 8.8.8.8<br />8.8.4.4 |
| IPv6 | 2001:4860:4860::8888<br />2001:4860:4860::8844 |
| DoH 地址 | RFC 8484 标准 API：`https://dns.google/dns-query`<br>JSON API：`https://dns.google/resolve?`<br>IP 直连：<br />`https://8.8.8.8/dns-query`<br />`https://8.8.4.4/dns-query` |

#### Quad9（IBM）
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 9.9.9.9<br />149.112.112.112 |
| IPv6 | 2620:fe::fe<br />2620:fe::9 |
| DoH 地址 | 标准安全服务：`https://dns.quad9.net/dns-query`<br>支持 ECS：`https://dns11.quad9.net/dns-query`<br>无过滤服务：`https://dns10.quad9.net/dns-query` |

### 互联网平台和云服务商 DNS

#### AdGuard DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 默认过滤：94.140.14.14<br />94.140.15.15<br>无过滤：94.140.14.140<br />94.140.14.141 |
| DoH 地址 | 标准过滤：`https://dns.adguard.com/dns-query`<br>家庭保护：`https://dns-family.adguard.com/dns-query`<br>无过滤版本：`https://dns-unfiltered.adguard.com/dns-query` |

#### OpenDNS（Cisco Umbrella）
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 208.67.222.222<br />208.67.220.220 |
| DoH 地址 | 标准服务：`https://doh.opendns.com/dns-query`<br>家庭安全版本：`https://doh.familyshield.opendns.com/dns-query`<br>企业级服务：`https://doh.umbrella.com/dns-query` |

#### CleanBrowsing
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | Family Filter：185.228.168.168<br>Adult Filter：185.228.168.10 |
| DoH 地址 | 家庭过滤：`https://doh.cleanbrowsing.org/doh/family-filter/`<br>成人过滤：`https://doh.cleanbrowsing.org/doh/adult-filter/`<br>安全过滤：`https://doh.cleanbrowsing.org/doh/security-filter/`<br>付费自定义：`https://doh.cleanbrowsing.org/doh/custom-filter/[unique key]` |

#### NextDNS
| 项目 | 地址 |
| :--- | :--- |
| DoH 地址 | `https://dns.nextdns.io`<br />~~`https://anycast.dns.nextdns.io`~~ |

### 技术社区和个人维护的 DNS

#### Hurricane Electric DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 74.82.42.42 |

### 其他国外 DNS

#### Freenom World DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 80.80.80.80<br />80.80.81.81 |

#### Neustar DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 156.154.70.1<br />156.154.71.1 |
| IPv6 | 2610:a1:1018::1 |

#### Comodo Secure DNS
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 8.26.56.26<br />8.20.247.20 |

#### Norton ConnectSafe
| 项目 | 地址                                                         |
| :--- | :----------------------------------------------------------- |
| IPv4 | 主服务：<br />198.153.192.1<br />198.153.194.1<br>ConnectSafe：<br />199.85.126.10<br />199.85.127.10 |

## 特殊 DNS

#### Quad101（台湾 TWNIC）
| 项目 | 地址 |
| :--- | :--- |
| IPv4 | 101.101.101.101<br />101.102.103.104 |
| IPv6 | 2001:de4::101<br />2001:de4::102 |
| DoH 地址 | ~~`https://dns.twnic.tw/dns-query`~~ |
