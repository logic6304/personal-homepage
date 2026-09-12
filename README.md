# 1ogic.cn 个人主页与电子通行证

这是杨易的个人主页和明日方舟主题电子通行证项目。主页是无需构建工具的静态网站，部署在 GitHub Pages；账号注册、邮箱验证和购买资格登记运行在独立 VPS 服务上。

## 当前状态

- 9 月 12 日第二批资格登记正在进行，名额售完即止。
- 下一批预计十月开放，具体时间以网站公告为准。
- 资格登记成功后会生成新的 `EP-` 开头资格编号。
- 资格登记不等于付款或完成订单，付款与发货安排会另行通知。

## 线上地址

- 主站：<https://1ogic.cn/>
- 电子通行证介绍页：<https://1ogic.cn/pass/>
- 资格登记服务：<https://pass.1ogic.cn/>
- 匿名提问箱：<https://message.1ogic.cn/>

## 产品信息

### 款式一：一体化 3D 版

- 全机身 3D 打印，14mm 厚度
- 背板为 3D 打印，无亚克力面板
- PETG 材料
- 新批次取消碳纤维纹理设计
- 预计发货：2026 年 9 月 22 日

### 款式二：亚克力版

- 3D 打印机身，12mm 厚度
- 亚克力面板与亚克力背板
- PETG 材料，磨砂质感
- 机身瑕疵可能略大于全 3D 打印设计
- 预计发货：2026 年 9 月 16 日

## 项目结构

```text
index.html                 个人主页
pass/index.html            电子通行证介绍页
pass/pass.css              通行证页面样式
pass/pass.js               通行证页面交互
pass/claim/index.html      旧资格入口兼容页，跳转到 VPS 服务
assets/                    头像、通行证实拍图
posts/                     文章页面
message/                   旧提问箱入口兼容页
CNAME                      GitHub Pages 自定义域名
```

## 资格登记服务

资格服务的源代码在 `../pass-box-src/pass-box/`，线上地址为 `https://pass.1ogic.cn/`。服务负责：

1. 邮箱注册、验证码验证和登录会话。
2. 两款产品各 10 个资格名额的原子扣减。
3. 同一账号对同一款式只能登记一次。
4. 生成 `EP-` 开头的正式资格编号并发送确认邮件。

服务只登记购买资格，不在页面收款。SQLite 数据库、环境变量、SMTP 密码和 VPS 私钥不属于公开仓库内容。

## 静态站部署

主页可以直接部署到 GitHub Pages：

1. 将本目录内容放在仓库根目录。
2. 在仓库的 **Settings → Pages** 中选择 `main` 分支和 `/ (root)` 目录。
3. 保留根目录的 `CNAME` 文件，并在 DNS 服务商处将 `1ogic.cn` 指向 GitHub Pages。

当前仓库为 `logic6304/personal-homepage`。更新主页或通行证页面后，GitHub Pages 通常需要几十秒到几分钟刷新。

## 本地预览

这是纯静态页面，可以直接打开 `index.html` 或 `pass/index.html` 预览。修改后提交对应 HTML/CSS/JS 文件即可，不需要构建步骤。

## 安全注意事项

- 不要把 `/opt/pass-box/data/pass.sqlite`、`/etc/pass-box.env`、SMTP 密码或任何私钥提交到 GitHub。
- 公开仓库只保存前端源代码、非敏感部署示例和不含密钥的存档包。
- 资格名额必须由 VPS 服务端判断和写入，不能依赖浏览器端 JavaScript。
