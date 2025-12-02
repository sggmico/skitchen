# Supabase 集成设置指南

本项目已集成 Supabase 作为后端数据库和认证系统。

## 功能特性

- ✅ 管理后台需要认证登录
- ✅ 菜单数据存储在 Supabase 数据库
- ✅ 分类数据存储在 Supabase 数据库
- ✅ 仅认证用户可以编辑数据
- ✅ 游客可以查看菜单(只读访问)

## 设置步骤

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 填写项目信息:
   - Project Name: `sgg-kitchen` (或其他名称)
   - Database Password: 设置一个强密码
   - Region: 选择离你最近的区域
4. 等待项目创建完成

### 2. 获取项目凭证

1. 在项目 Dashboard 中,点击 "Settings" (设置图标)
2. 点击 "API"
3. 复制以下信息:
   - `Project URL` (项目 URL)
   - `anon public` key (匿名公钥)

### 3. 配置环境变量

1. 在项目根目录创建 `.env` 文件:
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件,填入你的 Supabase 凭证:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. 创建数据库表

1. 在 Supabase Dashboard 中,点击 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase/schema.sql` 文件的内容
4. 粘贴到 SQL Editor 中
5. 点击 "Run" 执行 SQL

这将创建:
- `categories` 表 - 存储分类信息
- `dishes` 表 - 存储菜品信息
- 相关的索引和触发器
- Row Level Security (RLS) 策略

### 5. 创建管理员用户

1. 在 Supabase Dashboard 中,点击 "Authentication" → "Users"
2. 点击 "Add user" → "Create new user"
3. 填写:
   - Email: 你的管理员邮箱
   - Password: 设置一个强密码
   - 勾选 "Auto Confirm User"
4. 点击 "Create user"

### 6. 启动应用

```bash
npm run dev
```

现在访问应用:
- 普通用户可以查看菜单
- 点击"管理"按钮会要求登录
- 使用第5步创建的邮箱和密码登录
- 登录后可以编辑菜单和分类

## 数据迁移

如果你已经在本地存储了数据,可以通过以下方式迁移:

1. 登录管理后台
2. 手动创建分类和菜品,或者
3. 使用 Supabase Dashboard 的 "Table Editor" 批量导入

## 安全说明

### Row Level Security (RLS)

数据库已配置 RLS 策略:

- **查看权限**: 所有人都可以查看菜单(包括未登录用户)
- **编辑权限**: 只有认证用户可以创建/更新/删除数据

### 认证流程

1. 用户点击"管理"按钮
2. 显示登录表单
3. 使用 Supabase Auth 验证邮箱和密码
4. 登录成功后才能访问管理功能
5. 可以点击"退出登录"按钮登出

## 故障排查

### 连接失败

- 检查 `.env` 文件是否正确配置
- 确认 Supabase 项目 URL 和密钥正确
- 检查网络连接

### 认证失败

- 确认用户已在 Supabase 中创建
- 检查用户是否已确认(Auto Confirm)
- 验证邮箱和密码是否正确

### 数据加载失败

- 检查数据库表是否正确创建
- 查看浏览器控制台的错误信息
- 验证 RLS 策略是否正确配置

## 备份与恢复

Supabase 提供自动备份功能。你也可以:

1. 通过 SQL Editor 导出数据
2. 使用 Supabase CLI 进行备份
3. 在 Dashboard 的 "Database" → "Backups" 中管理备份

## 下一步

- [ ] 配置自定义域名
- [ ] 启用额外的安全措施
- [ ] 设置数据库备份计划
- [ ] 添加更多管理员用户(如需要)

## 相关链接

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Auth 指南](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
