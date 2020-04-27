# 模块化开发协议

> 该文章用于对模块化开发的几种规范进行简单总结
>
> 按模块化演变流程:CommonJs=&gt;AMD=&gt;CMD

## CommonJs规范

> CommonJs规范主要实现者: Node.js
>
> **CommonJs模块的加载不适合网络加载,依赖的模块未加载会出现错误**
>
> \(导出\)exports &lt;=&gt; \(导入\)require

```text
文件目录如下(省略node_modules等文件) package.json入口文件index.js
    |- index.js
    |- config.js
```

* index.js

  ```javascript
  // 加载模块
  // const config = require('./config.js').config
  const { config } = require('./config.js')
  console.log(config.url) // https://www.baidu.com
  ```

* config.js

  ```javascript
  // 导出模块
  exports.config = {
      url: 'https://www.baidu.com'
  }
  ```

* 运行

  ```text
  node index.js
  ```

## AMD规范\(Asynchronous Module Definition\)

