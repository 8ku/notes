## git

### 拉取到本地

- `git clone url`

### 拉取某个文件夹

- `git init`  在本地建立一个空仓库
- `git remote add -f origin https://github.com/8ku/note.git`
  - 如果网络错误导致失败，remove它，`git remote rm origin` ，重新remote
- `git config core.sparsecheckout true`    开启sparse checkout模式
- `echo 文件夹/文件 >> .git/info/sparse-checkout`
- `git pull origin master`  拉取，如果失败，可以试试`git checkout master`
- `git add .` 编辑完成后准备上传
- `git commit -m’add some new stuff`   添加 commit
- `git push -u origin master`   推到仓库

### Sparse-checkout 文件设置

- 子目录匹配

  - 如果名称前带斜杠，`/docs/`，表示只匹配根目录下的文件目录， 如前不带斜杠，则匹配所有有该目录名称的目录（包括父目录）

- 通配符 *

  - 在sparse-checkout文件中支配通配符 * 

    ```
    *docs/
    index.*
    *.gif
    ```

  - 支持 ！排除

    ```
    /*
    !/docs/
    ```

    

### 删除某个文件夹

- `git init`初始化本地仓库

- `git remote add origin https://github.com/8ku/note.git`

- `git pull origin master`

- `git rm -r --cached 文件夹路径`

- `git commit -m'内容文本'` 

- （最好不使用）按Esc，`:wq`,hit Enter

- `git push -u origin master`

  

  

  *How to fix Git Error ‘Your local changes to the following files will be overwritten by merge’*

- `git reset --hard`

- `git pull`

### 添加文件夹/文件

- 把文件夹/文件拉到本地仓库
- `git add -A`或`git add .`
- `git status`查看是否添加成功，都是绿色表示添加成功
- `git commit -m'内容文本'`确认添加
- `git push -u origin master`推送到github
- `git remote -v`查看当前在哪个远程仓库

#### create a readme.md file before build and push a new book (important!)

### 输出各种格式

- pdf：gitbook pdf
- epub： gitbook epub
- mobi：gitbook mobi

## Topora

- 下划线：ctrl+u
- 删除线：~~
- 高亮：==
- table：ctrl+t
- 分割线：三个-
- 数学公式：$$
- 代码：`
- 代码块：三个~

## gitbook 

### 安装

需要先安装NodeJS,然后使用命令安装gitbook:

```
npm install gitbook-cli -g
```

- 把仓库中的template文件夹copy到新文件夹中
- 在summary里把每章节的路径写上，用`gitbook init` 生成绑定目录的md文件
  - 或先新建每章节的文件，最后在summary中把目录写上，用`gitbook init`绑定
- 在notebook-xxxx，右键 git bash here，`gitbook build` ，如提示插件未安装，则先安装再build
- 生成后把notebook-xxxx里的 _book 文件夹内的文件剪切到和 notebook-xxxx同级目录下
- 把书籍路径增加到index.html中
- 在根目录用git push到仓库中

## git clone到本地很慢

设置代理，socks5代理端口号查询代理软件

```java
//设置代理
git config --global https.proxy https://127.0.0.1:1086
git config --global http.proxy https://127.0.0.1:1086
//只对github.com
git config --global http.https://github.com.proxy socks5://127.0.0.1:1086
//取消所有代理 
unset ALL_PROXY
//取消github代理
git config --global --unset http.https://github.com.proxy
//打开 git 配置文件
vi ~/.gitconfig
[http "https://github.com/"]
    proxy = http://127.0.0.1:1081
[https "https://github.com/"]
    proxy = http://127.0.0.1:1081
```

### [使用SSH](https://help.github.com/cn/github/authenticating-to-github/checking-for-existing-ssh-keys)

1. 检查是否存在现有SSH密钥，在Git Bash：`ls -al ~/.ssh`
2. 生成新SSH密钥 `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
3. 将 SSH 密钥复制到剪贴板 `clip < ~/.ssh/id_rsa.pub`
4. 打开github账户 设置页面，添加新的SSH密钥