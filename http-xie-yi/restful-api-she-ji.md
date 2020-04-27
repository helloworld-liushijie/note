# restful api设计

> 在请求中经常发送restful请求,但是一直没有系统了解过restful的设计原则

## http语义-动词

* GET：查询
* POST：创建
* PUT：更新
* PATCH：局部更新
* DELETE：删除

## 状态码

* 200：请求成功,返回数据
* 3XX：请求成功,但需要改变请求资源的方式
* 4XX：请求有错误
* 5XX：服务器内部错误

## 数据封装

```javascript
JSON {
    code: xxx,
    msg: success|error,
    data: [
        ...
    ]
}
```

## 结果返回

GET：返回资源对象列表/单个资源对象

POST：返回新生成的资源对象

PUT：返回被修改后的玩正资源对象

PATCH：返回被修改的属性

DELETE：空\(状态码204\)

## api设计\(TODO\)

* GET
  * GET: /todos =&gt; 获取整个todo列表
  * GET: /todos/id =&gt; 获取单个资源
* POST
  * POST: /todos =&gt; 创建todo
* PATCH
  * PATCH: /todos/id =&gt; 修改id对应资源
* DELETE
  * DELETA: /todos/id =&gt; 删除id对应资源

