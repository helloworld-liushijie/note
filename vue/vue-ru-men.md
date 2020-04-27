# vue入门

## vue引用

```markup
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## vue基本代码结构

```markup
<div id="app">
    {{msg}}
</div>
<script>
var vm = new Vue({
    //非常重要,如果不在此区域定义的属性不会生效
    el: '#app',
    data: {
           msg: 'LOGIN IN'
    }
})
</script>
```

### v-text,v-cloak,v-html

```javascript
<div id="app">
    <div v-cloak>{{ msg }}</div>
    <div v-text="msg"></div>
    <div v-html="msg2"></div>
</div>

<script>
    var vue = new Vue({
        el: '#app',
        data : {
            msg: 'Hello World',
            msg2: '<h2>Hi</h2>'
        }
    })
</script>
```

> 三者区别说明:
>
> v-cloak:用于在网速较慢的时候,vue还未完成渲染,会显示,此属性用于对进行隐藏
>
> v-text:作用与相同,但是在网速较慢的时候,直接不进行显示
>
> v-html:可以对html进行渲染

### v-bind数据绑定

```markup
<input type="button" value="按钮" v-bind:title="title"/>
<!-- 简写 :title等同于v-bind:title,v-bind里面可以写合法的js表达式 -->
<input type="button" value="按钮" :title="title + '123'"/>
<script>
    var vue = new Vue({
        el: '#app',
        data : {
            title: 'Title'
        }
    })
</script>
```

### v-on事件绑定

```markup
<div id="app">
    <!-- v-on:后面跟事件类型,如click,keyups -->
    <input type="button" value="按钮" v-on:click="show"/>
    <!-- 缩写@click -->
    <input type="button" value="按钮" @click="show"/>
</div>

<script>
    var vue = new Vue({
        el: '#app',
        methods: {
            show:function() {
                alert("hello");
            }
        }
    })
</script>
```

### 跑马灯效果实现

> 需求:点击"浪起来"实现跑马灯效果,点击"低调"停止跑马灯效果

```markup
<div id="app">
    <input type="button" value="浪起来" @click="lang"/>
    <input type="button" value="低调" @click="stop"/>
    <h4>{{msg}}</h4>
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: '猥琐发育,别浪~~',
            intervalId: null
        },
        methods: {
            lang() {
                if(this.intervalId != null) return;
                this.intervalId = setInterval(() => {
                    var start = this.msg.charAt(0);
                    var end = this.msg.substr(1);
                    this.msg = end + start;
                },400)
            },
            stop() {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    })
</script>
```

### 事件修饰符

> * .stop 阻止冒泡
> * .prevent 阻止默认事件
> * .capture 添加事件侦听器时使用事件捕获模式
> * .self 只当事件在该元素本身\(比如不是子元素\)触发时触发回调
> * .once 事件只触发一次

```markup
<!-- 事件修饰符可以合并使用:如@click.stop.prevent -->
<div id="app">
    <div id="area" @click="divClick" style="background: darkcyan">
        <!-- 阻止冒泡事件 -->
        <input type="button" value="按钮" @click.stop="btnClick"/>
        <a href="https://www.baidu.com/" @click.prevent="linkClick">阻止默认行为</a>
    </div>
</div>

<script>
    var vm = new Vue({
        el: '#app',
        methods: {
            divClick() {
                alert("div_click");
            },
            btnClick() {
                alert("btn_click");
            },
            linkClick() {
                alert("触发点击事件")
            }
        }
    })
</script>
```

### v-model实现双向数据绑定

> 实现V修改同步到M,M修改同步到V,v-model只能运用在表单元素中,如下
>
>  select checkbox textarea

```markup
<div id="app">
    <!-- 修改input,span内容也会改变 -->
    <span>{{msg}}</span><br/>
    <input type="text" v-model="msg">
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'this is a msg'
        }
    })
</script>
```

### v-model实现简易计算器效果

```markup
<div id="app">
    <input type="text" v-model="n1"/>
    <select v-model="opt">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <input type="text" v-model="n2"/>
    <button @click="calc">=</button>
    <input type="text" v-model="result"/>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            n1: 0,
            n2: 0,
            result: 0,
            opt: '-'
        },
        methods: {
            calc() {
                //只是demo,不要过于纠结细节
                var codeStr = 'this.n1' + this.opt + this.n2;
                this.result = eval(codeStr);
            }
        },
    })
</script>
```

## 在vue中使用样式

### 使用class样式

1. 数组

   ```markup
   <h1 :class="['red','thin']">this is a eval h1</h1>
   ```

2. 数组中使用三元表达式

   ```markup
   <h1 :class="['red','thin',isactive?'active':'']">this is a eval h1</h1>
   ```

3. 数组中嵌套对象

   ```markup
   <h1 :class="['red','thin',{'active':isactive}]">this is a eval h1</h1>
   ```

4. 直接使用对象

   ```markup
   <h1 :class="{red:true,italic:true,active:true,thin:true}">this is a eval h1</h1>
   ```

### 使用内联样式

1. 直接在元素上通过`:style`的形式,书写样式对象

   ```markup
   <h1 :style="{color:'red','font-size':'40px'}">this is a eval h1</h1>
   ```

2. 将样式对象,定义到`data`中,并直接引用到`:style`中

   * 在data上定义样式\(注意:如果属性存在'-',必须添加单引号\)

   ```javascript
   data: {
       h1StyleObj: {color:'red','font-size': '40px','font-weight': '200'}
   }
   ```

   * 在元素中,通过属性绑定的形式,将样式对象应用到元素中:

   ```markup
   <h1 :style="h1StyleObj">this is a eval h1</h1>
   ```

3. 在`:style`中通过数组,引用多个`data`上的样式对象

   * 在data上定义样式\(注意:如果属性存在'-',必须添加单引号\)

   ```javascript
   data: {
       h1StyleObj: {color:'red','font-size': '40px','font-weight': '200'},
       h1StyleObj2: {font-style: 'italic'}
   }
   ```

   * 在元素中,通过属性绑定的形式,将样式对象应用到元素中

   ```markup
   <h1 :style="[h1StyleObj,h1StyleObj2]">this is a eval h1</h1>
   ```

## vue指令

### v-for与key属性

> 2.20+的版本中,当在组件中使用v-for时,key现在是必须的
>
> 当Vue.js用v-for正在更新已渲染过的元素列表时,它默认用"就地复用"策略,如果数据项的顺序被改变,Vue将不是移动DOM元素来匹配数据项的顺序,而是简单复用此处每个元素,并且确保它在特定索引下显示已被渲染过的每个元素。
>
> 为了给Vue一个提示,以便它能追踪每个节点的身份,从而复用和重新排序现有元素,你需要单独为每项提供一个唯一key属性

1. 迭代数组

   ```markup
   <ul>
       <li v-for="(item,i) in list">索引:{{i} --- 姓名:{{item.name}} --- 年龄:{{item.age}}}</li>
   </ul>
   ```

2. 迭代对象中的属性\(顺序为:值,键,索引\)

   ```markup
   <!-- 循环遍历对象身上的属性 -->
   <div v-for="(val,ke,i) in userInfo">{{{val}} --- {{key}} --- {{i}}}</div>
   ```

3. 迭代数字\(i从1开始\)

   ```markup
   <p v-for="i in 10">{{i}}</p>
   ```

### v-if和v-show

> `v-if`每次都会重新删除或创建元素;`v-for`每次不会重新进行DOM的删除和创建操作,只是切换display:none样式;
>
> `v-if`有较高的切换性能消耗,`v-for`有较高的初始渲染消耗;如果元素涉及到频繁的切换,最好不要使用v-if

```markup
<div id="app">
    <input type="button" @click="flag=!flag" value="切换">
    <h3 v-if="flag">这是v-if控制的元素</h3>
    <h3 v-show="flag">这是v-show控制的元素</h3>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            flag: true
        }
    })
</script>
```

## 案例: 使用vue实现品牌新增,删除以及关键字搜索和时间处理

```markup
<div id="app">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">添加品牌</h3>
        </div>
        <div class="panel-body form-inline">
            <label>
                id:
                <input type="text" class="form-control" v-model="id">
            </label>
            <label>
                name:
                <input type="text" class="form-control" v-model="name">
            </label>
            <input type="button" value="添加" class="btn btn-primary" @click="add">
            <label>
                搜索名称关键字
                <!-- 在vue中的所有指令,在调用的时候都以v-开头 -->
                <input type="text" class="form-control" v-model="keywords">
            </label>
        </div>
    </div>

    <table class="table table-hover table-bordered table-striped">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>ctime</th>
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in search(keywords)" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.ctime | dateFormat('yyyy-MM-dd')}}</td>
                <td>
                    <a href="#" @click.prevent="del(item.id)">删除</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<script>
    //全局过滤器
    Vue.filter('dateFormat',function(dateStr,pattern = '') {
        //根据给定字符串获取特定时间
        var dt = new Date(dateStr)
        //yyyy-mm-dd
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        if(pattern && pattern.toLowerCase() == 'yyyy-mm-dd') {
            return `${y}-${m}-${d}`
        } else {
            var hh = dt.getHours()
            //padStart:开始填充;padEnd():末尾填充(如两位填充数字1: 01 和 10)
            var mm = (dt.getMinutes()).toString().padStart(2,'0')
            var ss = (dt.getSeconds()).toString().padStart(2,'0')
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
    })
    var vm = new Vue({
        el: '#app',
        data: {
            id:null,
            name:null,
            keywords:'',
            list: [
                {id : 1,name: '奔驰',ctime: new Date()},
                {id : 2,name: '宝马',ctime: new Date()},
                {id : 3,name: '保时捷',ctime: new Date()}
            ]
        },
        methods: {
            add() {
                var car = {id: this.id,name: this.name,ctime: new Date()};
                this.list.push(car);
                this.id = this.name = null;
            },
            del(id) {
                // this.list.some((item,i) => {
                //     if(item.id == id) {
                //         this.list.splice(i,1);
                //         return true;
                //     }
                // })

                var index = this.list.findIndex(item => {
                    if(item.id == id) {
                        return true;
                    }
                })
                this.list.splice(index,1);
            },
            search(keywords) {
                //"测试".indexOf('')等于0
                // var newList = [];
                // this.list.forEach(item => {
                //     if(item.name.indexOf(keywords) != -1) {
                //         newList.push(item);
                //     }
                // })
                // return newList;

                return this.list.filter(item => {
                    if(item.name.includes(keywords)) {
                        return true;
                    }
                })
            }
        },
        filters: { //定义私有过滤器【过滤器名称和处理函数】
            //如果同名,
            dateFormat:function(dateStr,pattern) {
                return "私有过滤器"
            }
        }
    })
</script>
```

## vue-devtools安装

> 推荐翻墙安装,搜索`Vue.js devtools`
>
> 注意事项:
>
> vue扩展程序需要勾选允许访问文件网址和收集各项错误;同时引入的vue.js不能使用min.js

## 过滤器

> vue.js允许自定义过滤器,可被用作一些常见文本格式化.过滤器可以用在两个地方:`mustache插值`和`v-bind表达式`.过滤器应该被添加在js表达式的尾部,由"管道"符指示

### 私有过滤器

> 过滤器调用: Vue.filter\('过滤器名称',function\(\){}\)
>
> //过滤器中的function,第一个参数已经规定死了,永远都是过滤器管道符前面传递过来的数据

1. html元素

```markup
<td>{{item.ctime | dataFormat('yyyy-mm-dd')}}</td>
```

1. 私有filter定义方式

```javascript
filters: {
    dataFormat(input,pattern = '') {
        ...
    }
}
```

* 替换'单纯'为'邪恶'

```markup
<div id="app">
    <p> {{msg | msgFormat('邪恶') | str}}</p>
</div>
<script>
    Vue.filter('msgFormat',function(msg,arg) {
        return msg.replace(/单纯/g,arg);
    })
    Vue.filter('str',function(msg) {
        return msg+"---";
    })
    var vm = new Vue({
        el: '#app',
        data: {
            msg: '曾经,我也是一个单纯的少年,单纯的我,傻傻的问,谁是世界上最单纯的男人'
        }
    })
</script>
```

## 自定义按键修饰符

* 1.x中自定义键盘修饰符\(了解不推荐\)

```javascript
Vue.directive('on').keyCodes.f2 = 113;
```

* 2.x中自定义键盘修饰符
* 通过`Vue.config.keyCodes.名称 = 按键值`来自定义按键修饰符的别名

```javascript
Vue.config.keyCodes.f2 = 113;
```

1. 使用自定义的按键修饰符

```markup
<input type="text" v-model="name" @keyup.f2="add">
```

## 自定义指令

> 参数1：指令的名称,在定义的时候不需要加v-前缀,在调用的时候,必须加上v-前缀
>
> 参数2：一个对象,对象身上有一些指令相关的函数,函数可以在特定的阶段,执行相关的操作

* 使用Vue.directive\(\)定义全局指令 

```markup
<input id="search" type="text" class="form-control" v-model="keywords" v-focus v-color="'blue'">
<script>
    //自动获取焦点
    Vue.directive('focus',{
        //在每个函数中,第一个参数永远是el,表示被绑定了指令的那个元素,这个el参数是一个原生js对象
        bind:function(){}, //每当指令绑定在元素上的时候,会立即执行这个bind函数,只执行一次
        inserted:function(el){
            el.focus();
        },//元素插入到dom中的时候会执行inserted函数,触发一次
        updated:function(){}//当VNode更新的时候,会执行updated,可能会触发多次
    });

    //写法一:全局
    //修改字体颜色
    Vue.directive('color',{
        bind: function(el,expression) {
            el.style.color = binding.value;
            console.log(binding.name);//color
            console.log(binding.value);//blue
            console.log(binding.expression);//'blue'
        }
    })

    //写法二:私有
    var vue = new Vue({
        el: '#app',
        directives: {
            'color': {
                bind: function(el,binding) {
                    el.style.color = binding.value;
                    ...
                }
            }
        }
    })
</script>
```

### 函数简写

> 在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

## vue实例的生命周期

* 什么是生命周期:从vue实例创建,运行到销毁期间,总是伴随着各种各样的事件,这些事件统称为生命周期
* 生命周期钩子: 生命周期事件的别名
* 主要的生命周期函数分类
  * 创建期间的生命周期函数
    * beforeCreate: 实例刚在内存中被创建出来,此时,还没有初始化好data 和 methods属性
    * created: 实例已经在内存中创建ok,此时data和Methods已经创建ok,此时还没有开始编译模板
    * beforeMount: 此时已经完成模板的编译,但是还没有挂在到页面中
    * mounted: 此时,已经将编译好的模板,挂在到了页面指定的容器中显示
  * 运行期间的生命周期函数
    * beforeUpdate: 状态更新之前执行此函数,此时data中的状态值是最新的,但是界面上显示的数据还是旧的,因为此时还没有开始渲染DOM节点
    * updated: 实例更新完毕之后调用此函数,此时data中的状态值和页面上显示的数据,都已经完成了更新,界面已经被重新渲染好了
  * 销毁期间的生命周期
    * beforeDestory: 实例销毁之前调用,在这一步,实例仍然完全可用
    * destoryedL Vue实例销毁后调用,调用后,vue实例指示的所有东西都会解除绑定,所有的事件监听器都会移除,所有的子实例也会被销毁

```markup
<div id="app">
    <input type="button" value="触发change" @click="msg='this is not a msg'">
    <h3 id="h3">{{msg}}</h3>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'this is a msg'
        },
        methods: { 
            show() {
                console.log("this is a function")
            }
        },
        //实例化周期
        beforeCreate() { // first life cycle function
            //在beforeCreate生命周期函数执行的时候,data和methos中的数据都还没有初始化
            console.log(this.msg)//undefined
        },
        created() { //second life cycle function
            //如果要调用methods中的方法,或操作data中的数据,最早只能在created中操作
            console.log(this.msg)//this is a msg
        },
        beforeMount() { //third life cycle function
            //模板已经在内存中编辑完成,尚未把模板渲染到页面中去,页面中的元素还未替换过来
            console.log(document.getElementById("h3").innerText)//{{msg}}
        },
        mounted() { //fourth life cycle function
            //内存中的模板,已经真实的挂载到了页面中,用户已经可以看到渲染好的页面("实例创建"的最后一个生命周期函数)
            console.log(document.getElementById("h3").innerText)//this is a msg
        },
        //运行中周期
        beforeUpdate() {
            //数据被改变触发,此时页面中显示的数据还未与最新数据同步,data数据已经最新
            console.log(document.getElementById("h3").innerText)//页面数据:this is a msg
            console.log(this.msg)//data中的msg数据:this is not a msg
        },
        updated() {
            //此时,页面和data数据已经保持同步,都是最新的
            console.log(document.getElementById("h3").innerText)//页面数据:this is not a msg
            console.log(this.msg)//data中的msg数据:this is not a msg
        },
    })
</script>
```

![](../.gitbook/assets/lifecycle.png)

## vue-resource实现get,post,jsonp请求

> 除了vue-resource外,还可以使用axios实现数据的请求
>
> 用于测试请求的api\(有兴趣的小伙伴可以自己写api接口测试\)
>
> 1. get请求: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
> 2. post请求: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
> 3. jsonp请求: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

[vue-resource github docs](https://github.com/pagekit/vue-resource)

```markup
<!-- 依赖于vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>

<div id="app">
    <input type="button" value="get请求" @click="getInfo">
    <input type="button" value="post请求" @click="postInfo">
    <input type="button" value="jsonp请求" @click="jsonpInfo">
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            getInfo() {
                var get_url = 'https://jsonplaceholder.typicode.com/users'
                this.$http.get(get_url).then(response => {
                    console.log(response.body)
                })
            },
            postInfo() {
                //emulateJSON:Send request body as application/x-www-form-urlencoded content type
                var post_url = 'https://jsonplaceholder.typicode.com/users'
                this.$http.post(post_url,{},{emulateJSON:true}).then(response => {
                    console.log(response.body)
                })
            },
            jsonpInfo() {
                var jsonp_url = "https://jsonplaceholder.typicode.com/users"
                this.$http.jsonp(jsonp_url).then(response => {
                    console.log(response.body)
                })
            }
        }
    })
</script>
```

## vue-resource

### 结合node手写jsonp

> 前提:已经安装了node.js,参考[node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)
>
> vscode本地服务器启动: 下载Live Server插件&gt; open with live server
>
> nodejs app启动: vscode &gt; debug &gt; start debugging

1. JSONP的实现原理
   * 由于浏览器的安全限制,不允许ajax访问协议不同,域名不同,端口不同的数据接口,浏览器认为这种访问不安全
   * 可以通过动态创建script标签的形式,把script标签的src属性,指向数据接口的地址,因为script标签不存在跨域限制,这种数据获取方式,称作jsonp\(根据jsonp的实现原理,jsonp只支持get请求\)
   * 具体实现过程
     * 先在客户端定义一个回调方法,预定义对数据的操作
     * 再把这个回调方法的名称,通过url传参的形式,提交到服务器的数据接口
     * 服务器数据接口组织好要发送给客户端的数据,再拿到客户端传过来的回调方法命名成,拼接出一个调用这个方法的字符串,发送给客户端去解析执行
     * 客户端拿到服务器返回的字符串之后,当作script脚本去解析执行,这样就能够拿到jsonp的数据了

client\_jsonp.html

```markup
<script>
    function showInfo(data) {
        console.log(data) //{name: "zhangsan", age: 18, gender: "male"}
    }
</script>

<script src="http://127.0.0.1:3000/getscript?callback=showInfo"></script>
```

node\_module/app.js

```javascript
//导入http内置模板
const http = require('http')
//这个核心模块,能够帮我们解析url地址,从而拿到pathname query
const url_module = require('url')

//创建一个http服务器
const server = http.createServer()
//监听http服务器的request请求
server.on('request',function(req,res) {
    //const url = req.url
    const {pathname:url,query} = url_module.parse(req.url,true)
    if(url == '/getscript') {
        //拼接一个合法的js脚本
        //var scriptStr = 'show()'
         var data = {
            name: 'zhangsan',
            age: 18,
            gender: 'male'
        }

        var scriptStr = `${query.callback}(${JSON.stringify(data)})`
        //res.end发送给客户端,客户端拿到后当作js代码解析执行
        res.end(scriptStr)
    } else {
        res.end('404')
    }
})

//指定端口号并启动服务器监听
server.listen(3000,function() {
    console.log('server listen at http://127.0.0.1:3000')
})
```

此时[`http://127.0.0.1:5500/client_jsonp.html`](http://127.0.0.1:5500/client_jsonp.html) \(live server默认5500端口\),控制台此时输出 ok

### 案例:vue-resource实现品牌列表改造

前端代码:

```markup
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>vue resource改造品牌列表</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
</head>
<body>
    <div id="app">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">添加品牌</h3>
            </div>
            <div class="panel-body form-inline">
                <label>
                    NAME
                    <input type="text" class="form-control" v-model="name" >
                </label>
                <input type="button" class="btn btn-success" value="新增" @click="add" >
                <input type="button" class="btn btn-success" value="获取品牌列表" >
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>ctime</th>
                    <th>operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.cname}}</td>
                    <td>
                        <a href="" @click.prevent="remove(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script>
        const global_url = "http://127.0.0.1:8080";
        var vm = new Vue({
            el: '#app',
            data: {
                name:'',
                list: {}
            },
            created() {
                this.$http.get(`${global_url}/api/getprodList`).then(response => {
                    var data = response.body
                    if(status == 0) {
                        this.list = data.msg
                    } else {
                        alert("数据获取失败")
                    }
                })
            },
            methods: {
                add() {
                    this.$http.post(`${global_url}/api/addproduct`,{name:this.name},{emulateJSON:true}).then(response => {
                        var data = response.body
                        if(status == 0) {
                            this.list = data.msg
                            this.name = null
                        } else {
                            alert("添加失败")
                        }
                    })
                },
                remove(id) {
                    //this.list.splice(this.list.findIndex(item => item.id === id), 1)
                    this.$http.delete(`${global_url}/api/removeproduct/${id}`).then(response => {
                        var data = response.body
                        if(status == 0) {
                            this.list = data.msg
                        } else {
                            alert("删除失败")
                        }
                    })
                }
            }
        })
    </script>
</body>
</html>
```

> 因为视频的api链接失效了,所以自己按照api文档手写了一个\(凑合使用\),熟悉后端的可以自己写一个

[后端api代码](https://github.com/helloworld-liushijie/api)

### vue-resource全局配置数据接口的根域名

```javascript
//Note that for the root option to work, the path of the request must be relative. This will use this the root option: Vue.http.get('someUrl') while this will not: Vue.http.get('/someUrl').
Vue.http.options.root = '/root';
//such as: api/getprodList不能写成/api/getprodList => 不能使用绝对路径
Vue.http.options.root = 'http://127.0.0.1:8080'
this.$http.get(`api/getprodList`).then(response => {})
```

### 全局启用emulateJSON

```javascript
Vue.http.options.emulateJSON = true;
```

## [vue动画](https://cn.vuejs.org/v2/guide/transitions.html)

> 动画能够提高用户的体验,帮助用户更好的理解页面中的功能

### 自定义动画

```markup
<style>
    /* v-enter 是进入之前,元素的起始状态,还没开始进入;v-leave-to: 是动画离开之后,离开的终止状态 */
    .v-enter,
    .v-leave-to {
        opacity: 0;
        transform: translateX(200px);
    }

    /* v-enter-active:入场动画的时间段;v-leave-active:离场动画的时间段 */
    .v-enter-active,
    .v-leave-active {
        transition: all .8s ease;
    }

    .my-enter,
    .my-leave-to {
        opacity: 0;
        transform: translateY(200px);
    }

    /* v-enter-active:入场动画的时间段;v-leave-active:离场动画的时间段 */
    .my-enter-active,
    .my-leave-active {
        transition: all .8s ease;
    }
</style>
<div id="app">
    <input type="button" value="toggle" @click="flag = !flag"><br/>
    <input type="button" value="toggle" @click="flag1 = !flag1">
    <!-- 需求: 点击按钮,让h3显示,再点击让h3隐藏 -->
    <!-- 使用transition元素(vue官方提供),把需要控制的元素包裹起来 -->
    <transition> 
        <h3 v-if="flag">this is h3</h3>
    </transition>
    <!-- 自定义动画,分别设置效果,将默认v改为name值即可 -->
    <transition name="my"> 
        <h6 v-if="flag1">this is h6</h6>
    </transition>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            flag: false,
            flag1: false
        },
        methods: {}
    })
</script>
```

### 使用第三方动画库

```markup
<link href="https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css" rel="stylesheet">
    <!-- 
        使用transition元素(vue官方提供),把需要控制的元素包裹起来
        如果动画不生效可以加上animated bounceIn
        使用:duration设置入场和离场动画时长(ms) => 分开设置动画时间 :duration="{enter:200,leave:400}"
    -->
    <transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="400"> 
    <h3 v-if="flag">
        this is h3
    </h3>
</transition>
```

### 钩子函数实现半场动画

```markup
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
```

```markup
<style>
    .ball {
        background-color: red;
        width: 20px;
        padding-top:20px;
        border-radius: 50%;
    }
</style>
<div id="app">
    <input type="button" value="快到碗里来" @click="flag=!flag">
    <transition
                @before-enter="before_enter"
                @enter="enter"
                @after-enter="after_enter">
        <div class="ball" v-show="flag"></div>        
    </transition>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data: {
            flag: false
        },
        methods: {
            //注意: 动画钩子函数的第一个参数el,表示要执行动画的那个dom元素,是个原生的js dom对象
            before_enter(el){
                //before-enter:表示动画入场之前,此时动画尚未开始,可以在before-enter中,设置元素开始动画之前的起始样式
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                //一定要设置el.style.transition的时间（如果只使用js钩子的话）,不然没有过渡效果。
                el.offsetWidth
                //enter:表示动画开始之后的样式,设置完成动画后的结束状态
                el.style.transform = 'translate(150px,450px)'
                el.style.transition = 'all 1s ease'
                //这里的done其实就是after_enter函数的引用
                done()
            },
            after_enter(el){
                this.flag = !this.flag
                console.log('ok')
            }
        }
    })
</script>
```

### 列表动画

```markup
<!-- 在实现列表过渡的时候,如果需要过渡的元素,是通过v-for循环渲染出来的,
    不能使用transition包裹,需要使用trnasitionGroup -->
<!-- 给transition-group添加appear属性,实现页面加载入场时候的效果 -->
<!-- tag:元素 => 指定transition-group渲染为指定元素,默认渲染为span -->
<transition-group appear enter-active-class="animated rollIn" leave-active-class="animated hinge"                 :duration="1500" tag="ul">
    <li v-for="item in list" :key="item.id">
        {{item.name}}
        <span><a href="" @click.prevent="remove(item.id)">删除</a></span>
    </li>
</transition-group>
```

## Vue组件

> 什么是组件:组件的出现,就是为了拆分Vue实例的代码量,能够让我们以不同的组件,来划分不同的功能,将来我们需要什么样的功能,就可以去调用对应的组件

### 组件化和模块化的区别

* 模块化: 是从代码逻辑的角度进行划分的；方便代码分层开发,保证每个代码模块的职能单一
* 组件化: 是从UI界面的角度进行划分的；前端的组件化,方便UI组件的重用

### 全局组件定义的三种方式

* 使用Vue.extend配合Vue.component方法

```javascript
var login = Vue.extend({
    template: '<h1>登录</h1>'
})
Vue.component('login',login)
```

* 直接使用Vue.component方法

```javascript
Vue.component('register',{
    template: '<h1>注册</h1>'
})
```

* 将模板字符串,定义到script标签中

```markup
<script id="impl" type="x-template">
    <div><a href="#">登录</a> | <a href="注册"></a></div>
</script>
```

同时,需要使用Vue.component来定义组件

```javascript
Vue.component('account',{
    template: '#impl'
})
```

**show me code**

```markup
<!-- 在被空值的#app外面,使用template元素,定义组件的HTML结构 -->
<template id="temp1">
    <div>
        <h1>这是通过template元素,在外部定义的组件结构</h1>
        <span>great</span>
    </div>
</template>
<template id="register">
    <div>
        <span>register</span>
    </div>
</template>

<div id="app">
    <!-- 如果要使用组件,直接,把组件的名称以HTML标签的形式,引入到页面中;驼峰命名需要转为'-':myComp1 => my-comp1 -->
    <my-comp1></my-comp1>
    <my-comp2></my-comp2>
    <my-comp3></my-comp3>
    <login></login>
    <register></register>
</div>

<script>
    /**
        注意: 不论哪种方式创建出来的组件,组件的template属性指向的模板内容,必须有且只能有唯一的一个根元素
        如: <div><span></span></div> => <div></div><span></span>会报错,存在两个根元素
    **/
    //方式1. 使用Vue.extend创建全局Vue组件
    var comp1 = Vue.extend({
        template: '<h3>这是使用Vue.extend创建的组件</h3>'
    })
    Vue.component('myComp1', comp1)

    //方式2. 使用Vue.component('组件的名称',创建出来的组件模板对象)
    Vue.component('myComp2',{
        template: '<div><h3>这是直接使用Vue.component创建出来的组件</h3></div>'
    })

    //方式3
    Vue.component('myComp3',{
        template: '#temp1'
    })

    var vm = new Vue({
        el: '#app',
        components: { //定义私有组件
            login: {
                template: '<h1>Login</h1>'
            },
            register: {
                template: '#register'
            }
        }
    })
</script>
```

### 组件定义data和method

```markup
<div id="app">
    <comp></comp>
    <counter></counter>
    <counter></counter>
</div>

<template id="temp1">
    <div>
        <input type="button" value="+1" @click="increment">
        <h3>{{count}}</h3>
    </div>
</template>
<script>
    //var dataObj = {count: 0}
    Vue.component('counter',{
        template: '#temp1',
        data: function() {
            //需要在内部返回,如果使用全局组件会共享变量
            return {count: 0}
        },
        methods: {
            increment() {
                this.count++
            }
        }
    })

    //组件可以有自己的data数据,组件的data和实例的data有点儿不一样,组件的data必须是一个方法,内部还必须返回一个对象
    Vue.component('comp',{
        template: '<h1>{{msg}}</h1>',
        data: function() {
            return {
                msg: '这是组件中的data定义的数据'
            }
        }
    })

    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    })
</script>
```

### 组件切换

* 方式1：

```markup
<div id="app">
    <a href="" @click.prevent="flag = true">登录</a>
    <a href="" @click.prevent="flag = false">注册</a>
    <login v-if="flag"></login>
    <register v-else="flag"></register>
</div>
<script>
    Vue.component('login',{
        template: '<h1>login</h1>'
    })

    Vue.component('register',{
        template: '<h1>register</h1>'
    })

    var vm = new Vue({
        el: '#app',
        data: {
            flag: true
        }
    })
</script>
```

* 方式2:实现组件切换

```markup
<div id="app">
    <a href="" @click.prevent="comName = 'login'">登录</a>
    <a href="" @click.prevent="comName = 'register'">注册</a>
    <!-- Vue提供了component,来展示对应名称的组件;component是一个占位符,:is可以用来栈实的组件名称,直接字符串需要单引号 -->
    <!-- <component :is="'register'"></component> -->
    <transition mode="out-in" enter-active-class="animated rollIn" leave-active-class="animated hinge"                 :duration="1500">
        <component :is="comName"></component>
    </transition>
</div>
<script>
    Vue.component('login',{
        template: '<h1>login</h1>'
    })

    Vue.component('register',{
        template: '<h1>register</h1>'
    })

    var vm = new Vue({
        el: '#app',
        data: {
            flag: true,
            comName: 'login'
        }
    })
</script>
```

### 组件传值

#### 父组件向子组件传值

* 组件实例定义方式,一定要使用props属性来定义父组件传递过来的数据

```markup
<div id="app">
    <son :finfo="msg"></son>
</div>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            //data上的数据,都是可读可写的
            msg: '这是父组件的消息'
        },
        components: {
            son: {
                template: '<h1>子组件{{finfo}}</h1>',
                //prop中的数据,都是只读的,无法重新赋值
                props: ['finfo']
            }
        }
    })
</script>
```

#### 子组件调用父组件方法,向父组件传值

```markup
<template id="temp1">
    <div>
        <h1>这是子组件</h1>
        <input type="button" value="这是子组件的按钮,点击触发父组件传递过来的func方法" @click="myclick">
    </div>
</template>
<div id="app">
    <!-- 父组件向子组件传递方法,使用的是事件绑定机制;v-on,当我们定义了
        一个事件属性之后,子组件就能够通过某些方式来调用这个方法 -->
    <comp1 @func="show"></comp1>
</div>
<script>
    var comp1 = {
        template: '#temp1',
        data() {
            return {
                sonmsg: {name: 'apple',price: 20}
            }
        },
        methods: {
            myclick() {
                //当点击子组件的按钮,拿到父组件传递过来的func方法
                //$emit() : 触发
                this.$emit('func',this.sonmsg)
            }
        }
    }

    var vm = new Vue({
        el: '#app',
        data: {
            msg: '父组件消息',
            dataFromSon: null
        },
        methods: {
            show(data) {
                this.dataFromSon = data
                //获取子组件传递过来的数据
                console.log(data)
            }
        },
        components: {
            comp1
        }
    })
</script>
```

#### 案例: 组件实现评论功能

```markup
<div id="app">
    <ul class="list-group">
        <cmt-box @func="loadComment"></cmt-box>
        <li class="list-group-item" v-for="item in list" :key="item.id">
            <span class="badge">评论人: {{item.user}}</span>
            {{item.content}}
        </li>
    </ul>
</div>

<template id="temp1">
    <div>
        <div class="form-group">
            <label>评论人:</label>
            <input type="text" class="form-control" v-model="user">
        </div>
        <div class="form-group">
            <label>评论内容:</label>
            <textarea class="form-control" v-model="content"></textarea>
        </div>
        <div class="form-group">
            <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
        </div>
    </div>
</template>
<script>
    var commentBox = {
        template: '#temp1',
        data() {
            return {
                user: '',
                content: ''
            }
        },
        template: '#temp1',
        methods: {
            /**
                 * 发表评论的业务逻辑:
                 * 1.评论数据存到哪里去? 存放到localStorage中 localStorage.setItem('cmts','')
                 * 2.先组织出一个最新的评论数据对象
                 * 3.想办法将第二步中得到的评论对象,存储到localStorage中
                 *  3.1 localStorage只支持存放字符串数据,需要先调用JSON.stringify
                 *  3.2 在保存的最新评论之前,先从localStorage中获取到之前的评论数据(string),转换为一个数组对象,然后把
                 *      最新的评论,push到这个数组
                 *  3.3 如果获取到localStorage中的评论字符串,为空不存在,则返回一个'[]' 让JSON.parse去转换
                 *  3.4 把最新的评论列表数组,再次嗲用JSON.stringify转为数组字符串,然后调用localStorage.setItem()
                 **/
            postComment() {
                var comment = {id: Date.now(),user:this.user,content: this.content}
                var list = JSON.parse(localStorage.getItem('cmts') || '[]')
                list.push(comment)
                localStorage.setItem('cmts',JSON.stringify(list))
                this.user = this.content = ''

                this.$emit('func')
            }
        }
    }
    var vm = new Vue({
        el:'#app',
        data:{
            list: [
                {id: 1,user: 'libai',content: '天生我材必有用'},
                {id: 2,user: '江小白',content: '劝君更进一杯酒'}
            ]
        },
        created() {
            this.loadComment()
        },
        methods:{
            loadComment() {
                var list = JSON.parse(localStorage.getItem('cmts') || '[]')
                this.list = list
            }
        },
        components: {
            'cmt-box': commentBox
        }
    });
</script>
```

### 使用ref获取dom元素和组件引用

```markup
<div id="app">
    <input type="button" value="获取元素" @click="getElement">
    <h3 ref="mynode">哈哈</h3>
    <login ref="mylogin"></login>
</div>
<script>
    var login = {
        template: '<h1>登录组件</h1>',
        data() {
            return{
                msg: 'son msg'
            } 
        },
        methods: {
            show() {
                console.log('调用了子组件的方法')
            }
        }
    }

    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            getElement() {
                console.log(this.$refs.mylogin.msg) //son msg
                this.$refs.mylogin.show()//调用了子组件的方法
            }
        },
        components: {
            login
        }
    });
</script>
```

## Vue路由

### 什么是路由

> 1. 后端路由: 对于普通网站,所有的超链接都是URL地址,所有的URL地址都对应服务器上对应的资源
> 2. 前端路由:对于单页面应用程序来说,主要通过URL中的hash\(\#号\)来实现不同页面之间的切换,同时,hash有一个特点:HTTP请求中不会包含hash相关的内容,所以,单页面程序中的页面跳转主要用hash来实现
> 3. 在单页面应用程序中,这种通过hash改变来切换页面的方式,称作前端路由

### 在vue中使用vue-router

1. 导入vue-router组件类库

```markup
<script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
```

1. 使用router-link组件来导航

```markup
<!-- 使用router-link组件来导航 -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
```

1. 使用router-view组件来显示匹配到的组件

```markup
<!-- 使用router-view组件来显示匹配到的组件 -->
<router-view></router-view>
```

1. 使用`Vue.extend`创建组件

```javascript
// 使用Vue.extend来创建登录/注册组件
var login = Vue.extend({
    template: '<h1>登录组件</h1>'
})
var register = Vue.extend({
    template: '<h1>注册组件</h1>'
})
```

1. 创建一个路由router实例,通过routers属性来定义路由匹配规则

```javascript
var router = new VueRouter({
    routes: [
        {path： '/login',component: login},
        {path: '/register',component: register}
    ]
})
```

1. 使用router属性来使用路由规则

```javascript
var vm = new Vue({
    el: '#app',
    router: router
})
```

```markup
<div id="app">
    <!-- 注意:此处需要加'#'号 -->
    <!-- <a href="#/login">登录</a>
    <a href="#/register">注册</a> -->

    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <!-- 显示匹配到的组件 -->
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录组件</h1>'
    }

    var register = {
        template: '<h1>注册组件</h1>'
    }

    //2.创建一个路由对象,当导入vue-router包之后,在window全局对象中,就有了一个路由的构造函数,叫做VueRouter
    var routerObj = new VueRouter({
        //表示路由匹配规则
        routes: [
            //每个路由规则,都是一个对象,{path: '表示监听哪个路由链接地址';
            //component: '表示如果路由是前面匹配到的path,则显示对应组件(值必须是组件模板对象,不能是引用名称)'}
            {path: '/',redirect: '/register'},
            {path: '/login',component: login},
            {path: '/register',component: register}
        ],
        //使用自定义class
        //linkActiveClass: 'myactive'
    })

    var vm=new Vue({
        el:'#app',
        data:{},
        methods:{},
        //将路由规则对象注册到vm实例上,用来监听url地址的变化,然后展示对应的组件
        //http://127.0.0.1:5500/router_basic.html#/ => 会使用#哈希路由
        router: routerObj
    });
</script>
```

### 路由传参

* 方式1

```markup
<div id="app">
    <!-- 如果在路由中,使用查询字符串,给路由传参 -->
    <router-link to="/login?id=10&name=zhangsan">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录 --- {{$route.query.id}} --- {{$route.query.name}}</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }

    var route = new VueRouter({
        routes: [
            {path: '/login',component: login},
            {path: '/register',component: register}
        ]
    })

    var vm = new Vue({
        el:'#app',
        router: route
    });
</script>
```

* 方式2

```markup
<div id="app">
    <!-- 如果在路由中,使用查询字符串,给路由传参 -->
    <router-link to="/login/12/zhangsan">登录</router-link>
    <router-view></router-view>
</div>
<script>
    var login = {
        template: '<h1>登录 --- {{$route.params.id}} --- {{$route.params.name}}</h1>'
    }

    var route = new VueRouter({
        routes: [
            {path: '/login/:id/:name',component:login}
        ]
    })

    var vm = new Vue({
        el:'#app',
        router: route
    });
</script>
```

### 路由嵌套

```markup
<div id="app">
    <router-link to="/account">Account</router-link>
    <router-view></router-view>
</div>
<template id="temp1">
    <div>
        <h1>这是Account组件</h1>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    var account = {
        template: '#temp1'
    }
    var login = {
        template: '<h1>登录</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }
    var router = new VueRouter({
        routes: [
            {
                path: '/account',
                component: account,
                children: [
                    {path: 'login',component:login},
                    {path: 'register',component:register}
                ]
            }
            // {path: '/account/login',component: login},
            // {path: '/account/register',component: register}
        ]   
    })
    var vm = new Vue({
        el:'#app',
        router:router
    });
</script>
```

### 命名视图实现经典布局

1. 标签代码结构

```markup
<div id="app">
    <router-view></router-view>
    <div class="content">
        <router-view name="a"></router-view>
        <router-view name="b"></router-view>
    </div>
</div>
```

1. js代码结构

```markup
<script>
    var header = Vue.component('header',{
        template: '<div class="header">header</div>'
    })
    var sidebar = Vue.component('sidebar',{
        template: '<div class="sidebar">sidebar</div>'
    })
</script>
```

show me code

```markup
<!-- css样式就不写了 -->
<div id="app">
    <router-view></router-view>
    <div class="container">
        <router-view name="left"></router-view>
        <router-view name="main"></router-view>
    </div>
</div>
<script>
    var header = {
        template: '<h1 class="header">header头部区域</h1>'
    }
    var leftbox = {
        template: '<h1 class="left">leftbox侧边栏区域</h1>'
    }
    var mainbox = {
        template: '<h1 class="main">mainbox主体区域</h1>'
    }
    var router = new VueRouter({
        routes: [
            {path: '/',components: {
                default: header,
                left: leftbox,
                main: mainbox
            }}
        ]
    })
    var vm=new Vue({
        el:'#app',
        router: router
    });
</script>
```

## Vue监视

### 案例: watch监视名称改变

```markup
<div id="app">
    <input type="text" v-model="first_name"> + 
    <input type="text" v-model="last_name"> =
    <input type="text" v-model="fullname">
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            first_name: '',
            last_name: '',
            fullname: ''
        },
        //使用这个属性,可以监视data中指定数据的变化,然后触发这个watch中对应的function处理函数
        watch: {
            first_name: function(newVal,oldVal) {
                this.fullname = `${newVal}-${this.last_name}`
            },
            last_name: function() {
                this.fullname = `${this.first_name}-${this.last_name}`
            }
        }
    })
</script>
```

### watch监视路由改变

```markup
<script>
    var login = {
        template: '<h1>登录</h1>'
    }
    var register = {
        template: '<h1>注册</h1>'
    }
    var router = new VueRouter({
        routes: [
            {path: '/login',component: login},
            {path: '/register',component: register}
        ]
    })
    var vm = new Vue({
        el: '#app',
        router: router,
        watch: {
            '$route.path': function(newVal,oldVal) {
                if(newVal === '/login') {
                    console.log('欢迎登录')
                } else if(newVal === '/register') {
                    console.log('欢迎注册')
                }
            }
        }
    }) 
</script>
```

## computed计算属性

```markup
<script>
    var vm=new Vue({
        el:'#app',
        data:{
            firstname: '',
            lastname: ''
        },
        methods:{},
        //在computed中,可以定义一些属性,这些属性叫做计算属性,计算属性的本质就是一个方法,只不过我们
        //在使用这些属性的时候,是把它们的名称直接当作属性来使用,并不会把计算属性当作方法去调用
        computed: {
            //只要计算属性这个function内部,所用到的任何data数据发生变化,就会重新计算这个属性的值
            //计算属性的求值结果,会被缓存起来,方便下次使用,如果任何属性未发生改变,不会重新计算属性求值
            'fullname': function() {
                return this.firstname + '-' + this.lastname
            }
        }
    })
</script>
```

## vue render渲染

```markup
<div id="app">
    <login></login>
</div>
<script>
    var login = {
        template: '<h1>这是登录组件</h1>'
    }
    var vm = new Vue({
        el:'#app',
        /**
        render(h) { //该形参是一个方法，能够把指定的组件模板渲染为html结构
            //return的结果会直接替换el指定的那个容器(区别于components)
            return h(login)
        }
        **/
        render: h => h(login)
    });
</script>
```

## NRM

> 作用: 提供一些常见的NPM镜像地址,能够让我们快速的切换安装包时候的服务器地址

nrm的安装使用

```text
-- 全局安装nrm包
$ npm i nrm -g
-- 查看当前所有可用的镜像源地址以及当前使用的镜像源地址
$ nrm ls
-- 切换不同的镜像源地址
$ nrm use npm 或 nrm use taobao...
```

## Webpack

> webpack的详细上手,参考写的另一篇文章&lt;&gt;

### 说明

1. 网页中引用的常见静态资源
   * JS
     * .js .jsx .coffee .ts\(TypeScript\)
   * CSS
     * .css .less .sass=&gt;.scss
   * images
     * .jpg .png .gif .bmp .svg
   * 字体文件\(fonts\)
     * .svg .ttf .eot .woff .woff2
   * 模板文件
     * .ejs .jade .vue\[webpack中定义组件的方式\]
2. 引入过多静态资源的问题
   * 网页加载速度慢,需要发起很多二次请求
   * 要处理错综复杂的依赖关系
3. 解决上述问题
   * 合并,压缩,精灵图,图片的base64编码
   * 使用requireJS
   * Gulp,Webpack\(推荐\)
4. webpack可以做什么事情
   * 能处理js文件之间的互相依赖关系
   * 能处理js的兼容问题,把高级的，浏览器不兼容的语法,转为低级的,浏览器能识别的语法

### webpack安装

1. 全局安装webpack

```text
$ npm i webpack -g
```

1. 在项目根目录安装到项目依赖中

```text
$ npm i webpack --save-dev
```

### webpack使用vue

1. 安装vue

```text
$ cnpm i vue -S
```

1. main.js导入vue.js\(

```javascript
//在webpack中使用vue
//注意: 在webpack中,使用import Vue from 'vue'导入的vue构造函数,功能不完整,只提供了runtime-only方式,并没有提供像网页中那样的使用方式
//方式1:
import Vue from '../node_modules/vue/dist/vue.js'
//方式2:
//第一步
import Vue from 'vue'
//第二步:在webpack.config.js设置导入路径
module.exports = {
    ...
    resolve: {
        alias: {
          //设置vue被导入时的路径
          'vue$': 'vue/dist/vue.js'
        }
      }
}

/**
  * 包的查找规则：
  * 1. 找项目根目录中有没有node_modules文件夹
  * 2. 在node_modules中根据包名找vue文件夹
  * 3. 在vue文件夹中,找一个package.json的包配置文件
  * 4. 在package.json文件中,查找一个main属性[main属性指定了这个包被加载时候的入口文件]
  * "main": "dist/vue.runtime.common.js"不全
  */
var vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    }
})
```

### 实际开发使用vue

1. 安装vue-loader

```text
//用于.vue文件
$ cnpm i vue-loader vue-template-compiler -D
```

1. src/login.vue文件\(webpack中推荐.vue组件模板文件定义组件,由template,script,style组成\)

```text
<template>
    <div>
        <h1>这是登录组件</h1>
    </div>
</template>
```

1. main.js入口文件

```javascript
import Vue from 'vue'

//导入login组件
import login from './login.vue'

/**
  * 包的查找规则：
  * 1. 找项目根目录中有没有node_modules文件夹
  * 2. 在node_modules中根据包名找vue文件夹
  * 3. 在vue文件夹中,找一个package.json的包配置文件
  * 4. 在package.json文件中,查找一个main属性[main属性指定了这个包被加载时候的入口文件]
  */
var vm = new Vue({
    el: '#app',
    render(createElements) {
        return createElements(login)
    }
})
```

1. webpack.config.js

```javascript
const path = require('path')
//导入在内存中生成html页面的插件,只要是插件都要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
//导入vueloaderplugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        }),
        new VueLoaderPlugin()
    ],
    module: { //这个节点用于配置所有第三方模块加载器
        rules: [ //所有第三方模块的匹配规则
            {test: /\.css$/,use: ['style-loader','css-loader']},
            //配置处理.less文件的第三方loader
            {test: /\.less$/,use: ['style-loader','css-loader','less-loader']},
            {test: /\.scss$/,use: ['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|jpeg|bmp)$/,use: ['url-loader?limit=10&name=[hash:8][name].[ext]']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/,use: ['url-loader']},
            //配置babel来转换高级的es语法
            {test: /\.js$/,use: 'babel-loader',exclude: /node_modules/},
            //配置文件转换vue
            {test: /\.vue$/,use: 'vue-loader'}
        ]
    },
    resolve: {
        alias: {
            //设置vue被导入时的路径
            'vue$': 'vue/dist/vue.js'
        }
    }
};
```

1. index.html

```markup
<div id="app">
    <login></login>
</div>
```

### export default和export

> //node中向外暴露成员的形式
>
> module.exports = {}和exports = {}
>
> //在es6中导入模块: import 模块名称 from '模块标识符' / import '表示路径'
>
> //es6向外暴露成员: export default/export
>
> export:使用export向外暴露的成员,只能使用{}的形式接收,可以向外暴露多个成员
>
> export.default:在一个模块中,只允许向外暴露一次

test.js

```javascript
// module.exports = {
//     name: 'zhangsan',
//     age: 20
// }

var info = {
    name: 'zhangsan',
    age: 20
}

export default info

//可以不全部导出 import info,{title} => 只导出title
export var title = 'hello'
export var content = 'world'
ecport var color = 'red'
```

main.js

```javascript
//export default暴露的,可以任意变量接收
import person,{title,content,color as co} from './test.js'
console.log(person) //{name:'zhangsan',age:20}
console.log(title)  //hello
console.log(content)//world
console.log(co) //red
```

### 结合webpack使用vue-router

> 使用参考: [vue-router npm 安装](https://router.vuejs.org/zh/installation.html)

1. 安装vue-router

```text
npm install vue-router
```

1. 如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能：

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import account from './vue/account.vue'

const router = new VueRouter({
  routes: [
    {path:'/login',component: account} //http://localhost:3000/#/login
  ]
})

Vue.use(VueRouter)

var vm = new Vue({
    el: '#app',
    render: h => h(app), //如果存在render,必须把router组件放入app.vue中
    router
})
```

1. account.vue

```text
<template>
    <div>
        <h1>这是登录组件</h1>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
    /* 
        scoped:定义为私有样式(默认全局样式) 
        普通的style标签只支持普通的样式,如果要启用scss或less,需要为style元素,设置lang属性
    */
    body {
        div {
            color: red;
        }
    }
</style>
```

1. app.vue

```text
<template>
    <div>
        <h1>这是app组件</h1>
        <router-view></router-view>
    </div>
</template>
```

#### 抽离路由模块

* 新建router.js用于抽离router模块

```javascript
import VueRouter from 'vue-router'
import account from './vue/account.vue'

const router = new VueRouter({
    routes: [
        {path:'/login',component: account}
    ]
})

export default router
```

* main.js

```javascript
import Vue from 'vue'
import app from './vue/app.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: h => h(app),
    router
})
```

* 其他的不改变

## Mint UI

> 基于 Vue.js 的移动端组件库,只适用于vue项目\(具体操作请参考官网,此处就只简单上手\)

1. 安装

```text
// 安装
# Vue 1.x
npm install mint-ui@1 -S
# Vue 2.0
npm install mint-ui -S
```

1. 引入组件

```javascript
// 引入全部组件,部分引入配置见mint ui官网
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
// 按需引入部分组件,组件参考mint ui官网
import { Cell, Checklist } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```

1. app.vue

```text
<template>
    <div>
        <mt-button type="default" @click="show">danger</mt-button>
        <h1>这是app组件</h1>
        <router-view></router-view>
    </div>
</template>

<script>
//导入toast
import {Toast} from 'mint-ui'
export default {
    data() {
        return {}
    },
    methods: {
        show() {
            Toast('hello')
        }
    }
}
</script>
```

## MUI

> 使用方法:github&gt;mui项目拷贝,复制dist目录到src&gt;lib下

* 在main.js引用

```javascript
//dist改名为mui,方便区分
import './lib/mui/css/mui.min.css'
```

* 在app.vue中引用

```text
<!-- 示例 -->
<button type="button" class="mui-btn mui-btn-royal mui-btn-outlined">紫色</button>
```

## vuex

> vuex是vue配套的公共数据管理工具,可以把一些共享的数据,保存到vuex中,方便整个程序中的任何组件直接获取或修改我们的公共数据

* npm安装

```text
$ npm install vuex --save
```

* main.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

* 创建vuex实例,得到数据仓储对象,并挂载到vm实例上

```javascript
var store = new Vuex.Store({
    state: {
        //专门用于存储数据
        count: 0
    },
    mutations: {
        //如果要操作store中的state值,只能通过调用mutation提供的方法,才能操作对应的数据,
        //不推荐直接操作state中的数据,避免数据紊乱,不能快速定位到错误原因
        increment(state,num) {
            state.count++
        }
    },
    getters: {
        //注意:getters,只负责对外提供数据,不负责修改数据,如果需要修改使用mutations
        //$store.getters.mutations
        mutations: function(state) {
            //如果引用的state内部数据发生改变,就会触发
            return state.count
        }
    }
    //如果子组件想要调用mutations中的方法,只能使用this.$store.commit('方法名')
})

//1. state中的数据,不能直接修改,如果想修改,必须通过mutations
//2. 如果组件想要直接从state中获取数据,需要this.$store.state.***
//3. 如果组件,想要修改数据,必须使用mutations提供的方法,需要通过this.$store.commit('方法名称','可选参数')
//4. 如果store中state上的数据,在对外提供的时候,需要做一层包装,推荐使用getters,如果需要使用getters,使用this.$store.getters.***

var vm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store //将vuex创建的store挂载到vm实例上
})
```

* 获取vuex上的数据\(不推荐\)

```markup
<h1>
    <!-- 不推荐直接获取 -->    
    {{$store.state.count}}
</h1>

<script>
    export default() {
        methods: {
            countChanged() {
                //调用vuex中increment方法
                this.$store.commit('increment',1)
            }
        }    
    }
</script>
```

资料参考

[vue.js guide](https://cn.vuejs.org/v2/guide/)

[vue-router guide](https://router.vuejs.org/zh/)

[vuex guide](https://vuex.vuejs.org/zh/)

[keycode键盘 按键 - 键码 对应表](https://www.cnblogs.com/yiven/p/7118056.html)

[animate.css](https://daneden.github.io/animate.css/)

[webpack](https://www.webpackjs.com/)

[windows npm安装webpack](https://www.cnblogs.com/liuliwei/p/9202433.html)

[webpack和webpack cli的安装卸载](https://www.cnblogs.com/ssw-men/p/10936173.html)

[mint ui](https://mint-ui.github.io/#!/zh-cn)

