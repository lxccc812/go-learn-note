# Go 环境配置

## gvm 安装
- win中 把 gvm 配置到 gitbash 中

[g/gvm](https://github.com/voidint/g)

下载二进制文件 `g.exe` 存放于以下路径
- /c
  - Users
    - username
      - `.g`
        - bin
          - g.exe // 或者重命名为gvm.exe (与最后的使用命令息息相关)
        - env

- 配置文件
```shell
# bash.bashrc
# gvm shell setup
if [ -f "${HOME}/.g/env" ]; then
    . "${HOME}/.g/env"
fi

```
```shell
# /c/Users/username/.g/env
#!/bin/sh
# gvm shell setup
export GOROOT="${HOME}/.g/go"
export PATH="${HOME}/.g/bin:${GOROOT}/bin:$PATH"
export G_MIRROR=https://golang.google.cn/dl/

```

- 重新加载 `bash.bashrc` 文件 `source ./bash.bashrc`

- g/gvm 的使用 (如果是g.exe 则使用 g [common],如果重命名为gvm.exe 则使用 gvm [common])
```shell
# 查看 g 的版本
g --version 

# 查询当前可供安装的stable状态的 go 版本
g ls-remote stable

# 安装目标 go 版本1.20.5
g install 1.20.5

# 查询已安装的 go 版本
g ls

# 查询可供安装的所有 go 版本
g ls-remote

# 切换到另一个已安装的 go 版本
g use 1.19.10

# 卸载一个已安装的 go 版本
g uninstall 1.19.10

# 清空 go 安装包文件缓存
g clean 

# 更新 g 软件本身
g self update

# 卸载 g 软件本身
g self uninstall
```

- go 项目中常见的需要忽略的文件
```.gitignore
# .gitignore
# Windows system files
Thumbs.db
Desktop.ini
$RECYCLE.BIN/

# Go binaries and build outputs
*.exe
*.dll
*.so
*.dylib
*.test
*.out

# Output of specific tools
coverage.out

# Go dependency directories
vendor/

# IDE/editor directories and files
# VS Code
.vscode/

# GoLand
.idea/

# Goland specific files
*.iml

# Temporary files
*.log
*.swp
*.swo
*.tmp
*~

# macOS system files (if applicable, in case you share the repo with macOS users)
.DS_Store
.AppleDouble
.LSOverride

```


