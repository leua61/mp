# 自动加载说明

现在项目采用“目录分散清单”方式加载课程：

1. `catalog.js` 只记录主界面要显示/加载的课程文件夹。
2. 每个课程文件夹内都有自己的 `_lesson_files.js`。
3. `js/boot.js` 进入某个课程文件夹时，先加载 `lessons/<folder>/_lesson_files.js`，再按里面的顺序加载该课程的 JS 文件。

这样不需要在根目录维护一个包含全部课程脚本路径的总 `lesson_manifest.js`。

## 新增/改名课程脚本后

在项目根目录运行：

```bash
node tools/build_lesson_files.js
```

兼容旧命令：

```bash
node tools/build_lesson_manifest.js
```

旧命令现在只是转到 `build_lesson_files.js`。

## GitHub Pages

GitHub Pages 是静态托管，不能在玩家访问时运行 Node，也不能让浏览器真正扫描服务器目录。

但是这个方案可以正常部署到 GitHub Pages，因为 `_lesson_files.js` 是普通静态文件。玩家打开网页时，浏览器只读取：

```txt
catalog.js
lessons/<folder>/_lesson_files.js
lessons/<folder>/<具体课程脚本>.js
card_bindings.js
```

## 本地开发

可以用任意静态服务器，例如：

```bash
python -m http.server 8000
```

然后访问：

```txt
http://localhost:8000/
```
