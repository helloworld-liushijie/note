# 跨域问题

## 同源策略

* 是浏览器安全策略
* 协议名，域名，端口号必须完全一致

### 跨域

> 违背了同源策略就会产生跨域

* 解决方式
  * jsonp\(前后端设置\)
  * cors\(后端设置\)
  * 服务器代理\(后端设置\)

前端方案

```javascript
//创建script标签
var script = document.createElement('script')
//设置回调函数
function getData(data) {
    //数据请求回来被触发的函数
    console.log(data)
}
//设置script的src属性,设置请求地址
script.src = 'http://localhost:3000?callback=getData'
//让script生效
document.body.appendChild(script)
```

