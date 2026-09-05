# 1ogic.cn 个人主页

这是杨易的个人主页，使用无需构建工具的静态文件，适合直接部署到 GitHub Pages。页面包含：

- 响应式布局，兼容手机和桌面端
- 深色 / 浅色主题切换，自动记忆选择
- 个人介绍、明日方舟电子通行证展示、动态记录和 QQ 联系
- 独立的电子通行证介绍页：`https://1ogic.cn/pass/`
- 购买资格申请页（邮箱注册 / 登录界面预览）：`https://1ogic.cn/pass/claim/`
- 独立部署的匿名提问页面：`https://message.1ogic.cn/`
- 文章页面：`/posts/2026-memoir/` 和 `/posts/qingdao-trip/`
- `CNAME` 已配置为 `1ogic.cn`
- `assets/` 中包含头像和电子通行证实拍图

## 1. 修改内容

用编辑器打开 `index.html`，搜索并替换以下内容：

- `杨易`：你的名字或网名
- `计算机科学与技术在读喵`：你的身份描述
- `QQ 280409626`：你的联系方式
- 电子通行证的名称、描述和购买链接
- `assets/avatar.jpg`：个人头像
- `assets/pass-holder-1.jpg`、`assets/pass-holder-2.jpg`：项目图片

图片已经放在 `assets` 文件夹中，部署时需要连同这个文件夹一起上传。

## 匿名提问功能

匿名提问箱独立运行在 VPS 项目 `../message-box` 中，主页入口指向 `https://message.1ogic.cn/`。GitHub Pages 只负责展示主页；旧地址 `https://1ogic.cn/message/` 会自动跳转到新页面。

VPS 项目不依赖 Formspree：Node 服务提供页面和 `/api/messages` 接口，问题保存在 VPS 私有的 `data/messages.jsonl` 文件中。部署时需要给 `message.1ogic.cn` 添加指向 VPS 的 DNS 记录，再用 Nginx 配置 HTTPS 和反向代理。

## 电子通行证资格申请

目前 `/pass/claim/` 是安全的前端流程预览：它展示邮箱注册、已有账号登录、密码一致性检查和邮箱验证提示，但不会发送或保存任何账号信息。不要在这个静态页面填写真实密码。

正式上线时，推荐使用“邮箱 + 密码 + 邮箱验证码”作为第一版账号体系：QQ 邮箱、163 邮箱等都可以使用，接入成本比短信登录低，也不需要先申请微信开放平台。服务器端必须使用 Argon2 或 bcrypt 保存密码哈希，不能保存明文密码；名额扣减也必须由服务器原子处理，不能依赖浏览器里的 JavaScript。

后续真实流程建议是：

1. 用户注册邮箱并完成验证码验证。
2. 用户登录后，在开放时间点击“申请购买资格”。
3. 服务器判断是否已经申请过，以及剩余名额，再写入资格记录。
4. 页面显示资格编号和后续通知，不在这一步收款。

手机号登录可以作为第二阶段加入，但需要短信服务和防刷策略；微信扫码登录也可以加入，但需要微信开放平台应用、回调域名和相关审核配置。因此当前先保留邮箱方案最合适。

## 3. 用 GitHub Pages 免费托管

GitHub Pages 对公开仓库免费，适合这个纯静态网站。

1. 注册或登录 GitHub，创建一个新的 **Public** 仓库，例如 `my-homepage`。
2. 把当前目录中的 `index.html`、`styles.css`、`script.js`、`CNAME` 上传到仓库根目录。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. Branch 选择 `main`，目录选择 `/ (root)`，点击 **Save**。
6. 等待几十秒到几分钟，GitHub 会生成一个 `https://你的用户名.github.io/my-homepage/` 地址。

也可以使用 Git 命令上传：

```bash
git init
git add .
git commit -m "create personal homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/my-homepage.git
git push -u origin main
```

## 4. 绑定 1ogic.cn

`CNAME` 文件已经写好，但还需要在域名服务商后台设置 DNS。

### 根域名 `1ogic.cn`

添加 4 条 `A` 记录，主机记录一般填 `@`：

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### `www.1ogic.cn`

再添加 1 条 `CNAME` 记录：

```text
主机记录：www
记录值：你的用户名.github.io
```

然后回到 GitHub：

1. 打开 **Settings → Pages → Custom domain**。
2. 填写 `1ogic.cn` 并保存。
3. 等待 DNS 生效后，勾选 **Enforce HTTPS**。

DNS 生效可能需要几分钟到 24 小时。不要删除仓库根目录的 `CNAME` 文件，否则 GitHub 可能会解除自定义域名绑定。

## 5. 其他免费托管选项

- **Cloudflare Pages**：免费额度很大，国内外访问体验通常不错，连接 GitHub 后自动部署。
- **Netlify**：拖拽目录即可发布，也支持自定义域名和 HTTPS。
- **Vercel**：适合后续升级为 Next.js 等框架；当前静态页面也能部署。

对这份模板而言，GitHub Pages 最简单；如果你已经在使用 Cloudflare 管理 `1ogic.cn` 的 DNS，Cloudflare Pages 也很顺手。
