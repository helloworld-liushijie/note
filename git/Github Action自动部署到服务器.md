> 前端时间一直看见Github多了个Action,一直没有去仔细了解.最近服务器每次都要打包然后手动发布特别麻烦,恰好github action可以实现,所以let's go
>
> => 功能: 每次代码push到仓库,自动打包发布到域名下

部署环境:

	- github
	- 阿里云ECS服务器:ubuntu18.04

### 私钥配置与yml编写

#### 创建repo

![1585446666612](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585446666612.png)

#### 连接服务器创建密钥

```bash
$ ssh root@47.56.13.69 // 连接远程服务器,以root用户登录,也可以adduser添加用户
	- 输入服务器密码:******
$ cd ~ // 也可以省略,默认就在根目录
$ ssh-keygen -t rsa -C autodeployment -f deployment // 生成公钥与私钥
$ cat deployment.pub >> ~/.ssh/authorized_keys // 将公钥写入.ssh/authorized_keys => 如果没有该文件创建一个就行
$ vim ~/.ssh/authorized_keys // vim查看,此时authorized_keys会多出密钥
$ vim deployment // 拷贝deployment内容到github
```

#### github私钥

> 进入代码仓库 =>  Settigngs => 左侧Secrets => 复制私钥

![1585449150724](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585449150724.png)



#### github action工作流创建

> 因为是Node.js项目,所以选中Node.js > Set up this workflow

![1585449398501](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585449398501.png)



#### ssh deploy并复制到yml

> 这步可省略,后面会将配置好的发出来

```yaml
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions
# 可以按需求修改,比如push,pull_requesy某个分支时执行CI
# 因为我是yarn,如果npm就直接使用npm
# **复制后直接start commit**

name: Node.js CI

on:
  push:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    # 如果写了测试用例,也可以自动测试
    - run: yarn install
    - run: yarn build --if-present
      env:
        CI: true
    - name: Deploy
      uses: easingthemes/ssh-deploy@v2.0.7
      env:
        # Private Key secrets.ALIYUN就是刚才配置的密钥名
        SSH_PRIVATE_KEY: ${{ secrets.ALIYUN }}
        # For any initial/required rsync flags
        ARGS:  "-rltgoDzvO --delete"
        # Source directory dist/ 需要到远端服务器的文件目录 **填入自己的打包路径**
        SOURCE: "dist/"
        # Remote host **填入自己的域名**
        REMOTE_HOST: "47.56.13.69"
        # Remote user **填入自己的用户,一般都是root用户**
        REMOTE_USER: "root"
        # Target directory 此处填写的是我博客域名下的action pacth下 **填入自己的域名路径**
        TARGET: "/www/wwwroot/sineava.top/action/"
```

#### CI完成

![1585452364519](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585452364519.png)



### 服务器

> 此时进入域名下,就会发现多了自动打包的文件,不过此时直接域名访问会报错 => vue项目还缺vue.config.js配置

![1585452555398](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585452555398.png)



#### vue.config.js

```js
module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? './' : './',
    outputDir: 'dist',
    indexPath: 'index.html',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV === 'production',
    runtimeCompiler: false,
    productionSourceMap: true
}
```



> 然后push到github,会自动执行工作流 => 因为刚才创建了github工作流,所以别忘了先pull

#### CI再次完成

> 此时域名就可以访问到了

![1585453422388](C:\Users\a1690\AppData\Roaming\Typora\typora-user-images\1585453422388.png)

---

[视频参考(需要小飞机)](https://www.bilibili.com/video/BV1g7411K7vs)

[github secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)

[github action入门教程-廖雪峰](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[ssh deploy文档](https://github.com/marketplace/actions/ssh-deploy)