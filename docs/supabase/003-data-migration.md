# 数据迁移到 Supabase

如果你已经有本地存储的菜单数据,可以通过以下步骤迁移到 Supabase:

## 方法一: 通过管理后台手动迁移

1. 确保已完成 Supabase 设置(参考 SUPABASE_SETUP.md)
2. 启动应用: `npm run dev`
3. 打开浏览器开发者工具(F12)
4. 在 Console 中运行以下代码获取本地数据:

```javascript
// 获取本地存储的分类
const localCategories = JSON.parse(localStorage.getItem('sgg_menu_cats') || '[]');
console.log('分类数据:', localCategories);

// 获取本地存储的菜品
const localDishes = JSON.parse(localStorage.getItem('sgg_menu_dishes') || '[]');
console.log('菜品数据:', localDishes);
```

5. 登录管理后台
6. 根据打印的数据,手动创建分类和菜品

## 方法二: 使用 Supabase Table Editor 批量导入

### 导入分类数据

1. 准备 CSV 文件 `categories.csv`:
```csv
name,is_front,display_order
热菜小炒,true,0
爽口凉菜,true,1
招牌主食,false,2
```

2. 在 Supabase Dashboard:
   - 进入 "Table Editor"
   - 选择 "categories" 表
   - 点击 "Insert" → "Import data via spreadsheet"
   - 上传 CSV 文件

### 导入菜品数据

1. 准备 CSV 文件 `dishes.csv`:
```csv
name,category,price,description,spicy_level,popular
烟肝尖,热菜小炒,38,火爆嫩滑,2,true
素炒饼,热菜小炒,28,酱香焦脆,0,false
```

2. 在 Supabase Dashboard:
   - 进入 "Table Editor"
   - 选择 "dishes" 表
   - 点击 "Insert" → "Import data via spreadsheet"
   - 上传 CSV 文件

## 方法三: 使用 SQL 插入语句

1. 在 Supabase SQL Editor 中运行:

```sql
-- 插入分类
INSERT INTO categories (name, is_front, display_order) VALUES
  ('热菜小炒', true, 0),
  ('爽口凉菜', true, 1),
  ('招牌主食', false, 2);

-- 插入菜品
INSERT INTO dishes (name, category, price, description, spicy_level, popular) VALUES
  ('烟肝尖', '热菜小炒', 38, '火爆嫩滑', 2, true),
  ('素炒饼', '热菜小炒', 28, '酱香焦脆', 0, false);
```

## 验证迁移

迁移完成后:

1. 刷新应用页面
2. 检查菜单是否正确显示
3. 登录管理后台
4. 验证可以正常编辑数据

## 清理本地数据(可选)

迁移成功后,如果不需要本地备份,可以清除:

```javascript
localStorage.removeItem('sgg_menu_dishes');
localStorage.removeItem('sgg_menu_cats');
```

## 注意事项

- Supabase 使用 UUID 作为 ID,不是数字或字符串
- 价格字段是 numeric 类型,会保留小数
- 确保分类名称与菜品的 category 字段匹配
- 迁移前建议先在本地备份数据
