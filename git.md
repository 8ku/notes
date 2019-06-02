### git

#### 删除某个文件夹

- `git init`初始化本地仓库

- `git remote add origin https://github.com/PrincetonUniversity/EVCM.git`

- `git pull origin master`

- `git rm -r --cached 文件夹路径`

- `git commit -m'内容文本'` 

- （最好不使用）按Esc，`:wq`,hit Enter

- `git push -u origin master`

  

  

  *How to fix Git Error ‘Your local changes to the following files will be overwritten by merge’*

- `git reset --hard`

- `git pull`

#### 添加文件夹/文件

- 把文件夹/文件拉到本地仓库
- `git add -A`或`git add .`
- `git status`查看是否添加成功，都是绿色表示添加成功
- `git commit -m'内容文本'`确认添加
- `git push -u origin master`推送到github
- `git remote -v`查看当前在哪个远程仓库

#### create a readme.md file before build and push a new book (important!)

#### 输出各种格式

- pdf：gitbook pdf
- epub： gitbook epub
- mobi：gitbook mobi

### Topora

- 下划线：ctrl+u
- 删除线：~~
- 高亮：==
- table：ctrl+t
- 分割线：三个-
- 数学公式：$$
- 代码：`
- 代码块：三个~