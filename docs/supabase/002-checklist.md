# Supabase 集成检查清单

在开始使用之前,请确保完成以下步骤:

## 🔧 设置检查清单

### 1. Supabase 项目

- [ ] 已创建 Supabase 账号
- [ ] 已创建新的 Supabase 项目
- [ ] 已获取 Project URL
- [ ] 已获取 anon public key

### 2. 数据库配置

- [ ] 已在 SQL Editor 中运行 `supabase/schema.sql`
- [ ] `categories` 表已创建
- [ ] `dishes` 表已创建
- [ ] RLS 策略已启用
- [ ] 索引已创建
- [ ] 触发器已创建

### 3. 环境变量

- [ ] 已复制 `.env.example` 为 `.env`
- [ ] 已填入 `VITE_SUPABASE_URL`
- [ ] 已填入 `VITE_SUPABASE_ANON_KEY`
- [ ] `.env` 文件在 `.gitignore` 中

### 4. 用户管理

- [ ] 已创建至少一个管理员用户
- [ ] 用户已设置为 "Auto Confirm"
- [ ] 已记录管理员邮箱和密码

### 5. 本地测试

- [ ] `npm install` 成功
- [ ] `npm run dev` 启动成功
- [ ] 可以查看菜单页面
- [ ] 点击"管理"可以看到登录表单
- [ ] 可以使用管理员账号登录
- [ ] 登录后可以进入管理后台

### 6. 功能测试

- [ ] 可以添加新分类
- [ ] 可以添加新菜品
- [ ] 可以编辑现有菜品
- [ ] 可以删除菜品
- [ ] 可以切换分类页面位置(正面/背面)
- [ ] 可以调整分类顺序
- [ ] 退出登录正常工作

### 7. 数据验证

- [ ] 在 Supabase Dashboard 中可以看到数据
- [ ] 刷新页面后数据依然存在
- [ ] 多个设备/浏览器可以看到相同数据

## 🚀 部署检查清单

### 准备部署

- [ ] 代码已提交到 Git
- [ ] 已推送到 GitHub/GitLab
- [ ] `.env` 未被提交
- [ ] 构建测试通过: `npm run build`

### Vercel 部署

- [ ] 已在 Vercel 导入项目
- [ ] 已添加环境变量
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
- [ ] 部署成功
- [ ] 可以访问生产环境
- [ ] 生产环境可以登录

### 功能验证

- [ ] 生产环境菜单正常显示
- [ ] 生产环境可以登录管理后台
- [ ] 生产环境可以编辑数据
- [ ] PDF 导出正常工作
- [ ] 打印功能正常工作
- [ ] 移动端响应式正常

## 📊 性能检查

- [ ] 首屏加载时间 < 3秒
- [ ] 图片已优化
- [ ] 没有控制台错误
- [ ] 网络请求正常

## 🔒 安全检查

- [ ] RLS 策略正确配置
- [ ] 环境变量未泄露
- [ ] HTTPS 已启用
- [ ] 管理员密码强度足够

## 📱 兼容性检查

- [ ] Chrome 浏览器正常
- [ ] Safari 浏览器正常
- [ ] Firefox 浏览器正常
- [ ] iOS Safari 正常
- [ ] Android Chrome 正常

## 🎯 下一步

完成所有检查项后:

1. ✅ 记录管理员账号信息
2. ✅ 设置数据备份计划
3. ✅ 添加更多菜品和分类
4. ✅ 分享给团队成员
5. ✅ 收集用户反馈

---

**需要帮助?**
- 查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- 查看 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- 联系技术支持
