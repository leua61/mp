# ANIMATION_FIX_NOTES

修复内容：

1. 恢复六色线条边框 `.rg` 的运动动画。
2. 使用 CSS `@property --a` 注册角度变量，让 `conic-gradient(from var(--a), ...)` 可以平滑旋转。
3. 给 `.rg` 添加 `animation: rgSpin 7.5s linear infinite`。
4. `html.na` 现在只在显式 `?anim=0` 或 `?noanim` 时关闭动画；测试/完美视图不再自动关掉六色边框。
5. `m.html / perfect.html / preview_flat.html / index.html` 已给 `css/main.css` 加 `?v=anim1`，避免浏览器缓存旧 CSS。
