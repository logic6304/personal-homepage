# 1ogic.cn 个人主页

这是一个无需构建工具的静态个人主页模板，适合直接部署到 GitHub Pages。页面包含：

- 响应式布局，兼容手机和桌面端
- 深色 / 浅色主题切换，自动记忆选择
- 作品展示、关于我、动态记录和邮箱联系
- `CNAME` 已配置为 `1ogic.cn`

## 1. 修改内容

用编辑器打开 `index.html`，搜索并替换以下内容：

- `Logic`：你的名字或网名
- `hello@1ogic.cn`：你的邮箱
- GitHub、X、LinkedIn 链接
- 作品名称、描述和链接
- `img src`：替换成你自己的图片地址

如果不想依赖外部图片，可以把图片放进当前目录的 `images` 文件夹，然后把地址改成 `images/avatar.jpg` 这类相对路径。

## 2. 用 GitHub Pages 免费托管

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

## 3. 绑定 1ogic.cn

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

## 4. 其他免费托管选项

- **Cloudflare Pages**：免费额度很大，国内外访问体验通常不错，连接 GitHub 后自动部署。
- **Netlify**：拖拽目录即可发布，也支持自定义域名和 HTTPS。
- **Vercel**：适合后续升级为 Next.js 等框架；当前静态页面也能部署。

对这份模板而言，GitHub Pages 最简单；如果你已经在使用 Cloudflare 管理 `1ogic.cn` 的 DNS，Cloudflare Pages 也很顺手。
