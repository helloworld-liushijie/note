# vscode插件

> 该文档专门用于记录vscode中推荐的插件的配置\(所有插件的下载均不做描述\) =&gt; 均从vscode插件市场下载

## Prettier - Code formatter

> 该插件用于代码格式化,可配合eslint使用,同一代码风格

* 下载插件
* 格式化快捷键
  * alt+shift+f
* 实现ctrl+s保存文件自动格式化
  * setting.json添加如下

    ```javascript
    "editor.formatOnSave": true,
    "editor.detectIndentation": false
    ```

  * 项目根目录添加.prettierrc.js,配置如下\(更多配置参考官网\)

    ```javascript
    module.exports = {
        semi: false, // 行位是否使用分号，默认为true
        trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
        singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
        printWidth: 160, // 一行的字符数，如果超过会进行换行，默认为80
        tabWidth: 4, // 一个tab代表几个空格数
        useTabs: true, // 启用tab缩进
        bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
        disableLanguages: 'vue', // 不格式化vue文件,单独配置
        trailingComma: false // 'es5=>会在对象末尾加逗号/all/false'
    }
    ```

  * Detect Indentation取消勾选 =&gt; 解决prettier tabWidth: 4不生效问题

