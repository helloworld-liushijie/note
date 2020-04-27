# vue组件通信

## 通信种类

* 父组件向子组件通信
* 子组件向父组件通信
* 隔代组件间通信
* 兄弟组件间通信

## 实现通信方式

* props
  * 通过一般属性实现父向子通信
  * 通过函数属性实现子向父通信
  * 缺点:隔代组件和兄弟组件间通信比较麻烦
* vue自定义事件
  * vue内置实现:代替函数类型的props
    * 绑定监听: &lt;mycamp @eventName="callback"
    * 绑定\(分支\)事件:this.$emit\('eventName',data\)
  * 缺点:只适合子向父通信
* 消息订阅与发布
  * 需要引入消息订阅与发布的实现库,如pubsub-js
    * 订阅消息:PubSub.subscribe\('msg',function\(msg,data\) {}\)
    * 发布消息:PubSub.publish\('msg',data\)
  * 优点: 此方式可用于任意关系组件间通信
* vuex
  * vuex是vue官方提供的集中式管理vue多组件共享状态数据的vue插件
  * 优点: 对组件间关系没有限制,且相比于pubsub库管理更集中,更方便
* slot
  * 是专门来实现父向子传递带数据的标签
  * 注意:通信的标签模板是在父组件中解析好后再传递给子组件的

