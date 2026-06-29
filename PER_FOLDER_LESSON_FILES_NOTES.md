# Per-folder lesson file lists

现在的加载方式是：

1. `catalog.js` 只记录主界面要显示/加载的课程文件夹。
2. 每个课程文件夹自己保存 `_lesson_files.js`。
3. `js/boot.js` 加载课程时先读取 `lessons/<folder>/_lesson_files.js`，再按里面的顺序加载该课程的脚本。

这样不再需要根目录维护一个包含所有课程脚本路径的 `lesson_manifest.js`。

新增或改名课程脚本后，在项目根目录运行：

```bash
node tools/build_lesson_files.js
```

为了兼容旧命令，下面这个命令也可以用：

```bash
node tools/build_lesson_manifest.js
```

GitHub Pages 可以正常使用，因为玩家访问时只是在读取每个课程文件夹里已经存在的静态 `_lesson_files.js`。
