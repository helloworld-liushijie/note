> 今天心血来潮,想试下将web项目打包成apk(以前没打包过apk,所以当成小白的初次尝试吧)



## web项目打包

> 如果yarn build后不能通过index.html直接访问,记得配置vue.config.js

```js
module.exports = 
    // 这几项很关键,其他的就不贴出来了
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    indexPath: 'index.html'
}
```



## hbuilder打包成apk

- 将web项目打包后的dist导入hbuilder
- 在根目录增加manifest.json文件(不知道的新建一个项目会自动生成文件,然后按需求修改即可)
- 顶部发行->原生App-云打包(输入整数),然后点击打包即可
- 耐心等待