# webpack快速上手

> 基于webpack4.+\(webpack4以下不适用\)=&gt;推荐根据官方文档进行使用
>
> -- 按照本教程,需要将webpack删除干净,否则可能与旧版本冲突

目录结构

```text
|-dist
    |-...
|-node_modules
    |-...
|-src
    |-css
        |-...
    |-js
        |-...
    |-images
        |-...
    |-index.html
    |-main.js => 项目的js入口文件
|-package.lock.json
|-package.json
|-webpack.config.js
```

## 必须步骤

* 初始化项目

```text
$ npm init -y (全部默认yes)
```

* 安装webpack

```text
$ npm install --save-dev webpack
$ npm install --save-dev webpack@<version>
```

* 安装webpack-cli\(4.+必须安装\)

```text
$ npm install --save-dev webpack-cli
```

* webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: './src/main.js', //入口文件
  output: {
    //打包到dist/bundle.js
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

* package.json=&gt;指向webpack.config.js

```javascript
"scripts": {
    "start": "webpack --config webpack.config.js",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
}
```

* 运行

```text
$ npm run start|dev|build =>"start|dev|build"来源于package.json中的配置
```

* 在index.html中引入bundle.js即可在浏览器运行

```markup
<script src="../dist/bundle.js"></script>
```

## 常见包安装

### jquery 安装

```text
$ npm i jquery -S
```

### bootstrap安装

```text
$ npm i bootstrap@3
```

## webpack-dev-server

> 这个工具用来实现自动打包编译

* 下载webpack-dev-server

```text
$ npm i webpack-dev-server -D
```

1. 配置方式1
2. 配置package.json script

```text
"server": "webpack-dev-server",

//复杂配置(自动打开,端口3000,根路径src,热部署)
"server": "webpack-dev-server --open --port 3000 --contentBase src --hot"
```

1. 配置方式2

```javascript
"server": "webpack-dev-server",

// 适用于webpack4+
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true, //自动打开浏览器
    port: 3000, //端口
    contentBase: 'src',//设置托管根目录
    hot: true //启用热更新
  }
};
```

* 运行

```text
npm run name(package.json配置的name:'server')
```

```text
//保存后会自动打包,需要更换为<script src="/bundle.js"></script> => localhost:8080/bundle.js
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from L:\front_project\webpack_study
i ｢wdm｣: Hash: 3bf740352707131c0daa
```

## html-webpack-plugin安装

> 1. 自动在内存中根据指定页面生成一个内存的页面
> 2. 自动把打包好的bundle.js追加到页面中去

```text
$ npm i html-webpack-plugin -D
```

js处理代码见下方webpack.config.js\(webpack只能默认打包处理js类型文件,其他需要相应插件\)

### 打包处理css文件\(需要其他插件\)

1. 安装style-loader css-loader

```text
$ cnpm i style-loader css-loader -D
```

1. 配置文件webpack.config.js \| main.js

```javascript
const path = require('path')
//导入在内存中生成html页面的插件,只要是插件都要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    //创建一个在内存中生成html页面的插件
    new htmlWebpackPlugin({
      //指定模板页面,将来会根据指定的模板路径生成内存中的页面
      template: path.join(__dirname,'./src/index.html'),
      //指定生成的页面名称
      filename: 'index.html'
    })
  ],
  module: { //这个节点用于配置所有第三方模块加载器
    rules: [ //所有第三方模块的匹配规则
       //配置所有.css文件的第三方loader规则 => 奇葩:调用规则是从右到左,注意顺序别写反了
      {test: /\.css$/,use: ['style-loader','css-loader']}
    ]
  }
};

//main.js导入
import './css/style.css'
```

### 打包处理less文件

1. 安装less

```text
//安装less与less loader
$ npm install --save-dev less-loader less
```

1. 配置文件webpack.config.js \| main.js

```javascript
rules: [ //所有第三方模块的匹配规则(less安装试了几遍,开始一直报错,但是莫名其妙又好了)
    {test: /\.css$/,use: ['style-loader','css-loader']},
    {test: /\.css$/,use: ['style-loader','css-loader','less-loader']}
]

//main.js导入
import './css/style.less'
```

### 打包处理sass文件\(不能使用npm,有墙\)

1. 安装sass\(sass-loader依赖于node-sass\)

```text
cnpm install node-sass -D
cnpm install sass-loader -D
```

1. 配置文件webpack.config.js \| main.js

```markup
rules: [
    {test: /\.scss$/,use: ['style-loader','css-loader','sass-loader']}
]

//main.js导入
import './css/style.scss'
```

### 打包处理图片

1. 安装url-loader\(依赖于file-loader\)

```text
$ cnpm i url-loader file-loader -D
```

1. 配置文件webpack.config.js

```javascript
rules: [
    //limit给定的值如果大于图片字节,采用base64编码(8为hash+name不变,后缀不变)
    {test: /\.(jpg|png|gif|jpeg|bmp)$/,use: ['url-loader?limit=7631&name=[hash:8]-[name].[ext]']}
]
```

### 打包处理字体文件

1. main.js

```javascript
//引用node_modules中文件,可以省略node_modules/,不写默认在node_modules中查找
import 'bootstrap/dist/css/bootstrap.css'
```

1. webpack.config.js

```javascript
//还是使用url-loader
rules: [
    {test: /\.(ttf|eot|svg|woff|woff2)$/,use: ['url-loader']}
]
```

## babel

> 在webpack中,默认只能处理一部分es6的语法,一些更高级的es6甚至es7语法,webpack是处理不了的,需要借助第三方的loader,来将高级语法转为低级语法,将结果交给webpack打包到bundle.js

1. 安装两套包

```text
$ cnpm i babel-loader @babel/core -D
//语法插件(用于转换es)
$ cnpm i @babel/preset-env @babel/polyfill -D
```

1. webpack.config.js

```javascript
rules: [
    //如果不排除node_modules,则会将node_moodules中所有的第三方js文件打包编译
    {test: /\.js$/,use: 'babel-loader',exclude: /node_modules/}
]
```

1. 在项目的根目录中,新建一个.babelrc的配置文件,这个配置文件属于json格式\(不能写注释,字符串必须双引号\)

.babelrc =&gt; 有兴趣的可以去了解下babel预设

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "targets": {
          "browsers": ["last 2 versions", "ie >= 10"]
        }
      }
    ]
  ]
}
```

1. 安装babel.config.js需要插件

```text
$ cnpm i @babel/plugin-proposal-class-properties
```

1. babel.config.js

```javascript
module.exports = {
    //使用箭头函数还需要加入箭头函数插件(下面)
    plugins: [ "@babel/plugin-proposal-class-properties" ]
}
```

## bug解决方案:

> 删除node\_modules,然后npm install =&gt;解决大部分问题

