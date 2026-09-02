# 1ogic.cn 个人主页

这是杨易的个人主页，使用无需构建工具的静态文件，适合直接部署到 GitHub Pages。页面包含：

- 响应式布局，兼容手机和桌面端
- 深色 / 浅色主题切换，自动记忆选择
- 个人介绍、明日方舟电子通行证展示、动态记录和 QQ 联系
- 独立的匿名提问页面：`https://1ogic.cn/message/`
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

主页入口指向 `https://1ogic.cn/message/`。由于 GitHub Pages 只有静态托管能力，接收问题需要一个表单服务。当前页面使用 Formspree 的配置占位符：

1. 打开 [Formspree](https://formspree.io/)，注册并创建一个新表单。
2. 复制它提供的表单地址，格式类似 `https://formspree.io/f/xxxxxx`。
3. 打开 `message/index.html`，找到 `action="https://formspree.io/f/YOUR_FORM_ID"`。
4. 用你的真实地址替换 `YOUR_FORM_ID`。
5. 重新上传 `message` 文件夹。

Formspree 有免费额度。页面不收集姓名和邮箱，但任何第三方表单服务都可能记录基础访问日志，因此页面已经提醒访客不要提交敏感信息。

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
