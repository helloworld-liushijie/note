# 常见知识点

> 不做详细描述\(算法只讨论常规算法\)

## return break continue区别

> return: 结束当前方法,不论多少层循环
>
> break:结束当前循环
>
> continue:结束本次循环,继续下一循环

## get-element-by-id处理为getElementById

* 方案1\(应该有更优解\)

```javascript
toUpperCase("get-element-by-id") //getElementById
function toUpperCase(str) {
    var result = str.split("-").map((item,index) => {
        if(index == 0) return item
        return item[0].toUpperCase() + item.substr(1,item.length)
    })
    return result.join("")
}
```

* 方案2:正则解决

```javascript
toUpperCase("get-element-by-id") //getElementById
function toUpperCase(str) {
    return str.replace(/-\w/g,i => i.toUpperCase().substr(1,1))
}
```

## 数字反转

```javascript
reversion([1,2,3,4,5,6,7,8]) //[8,7,6,5,4,3,2,1] => 奇数位也可
function reversion(arr) {
    for(var i = 0;i < arr.length/2;i++) {
        var temp = arr[i]
        arr[i] = arr[arr.length-i-1]
        arr[arr.length-i-1] = temp
    }
}
```

## 去除数组重复元素

* 解法1

```javascript
//removeRepeatNum([1,2,3,2,5,7,1,2])
function removeRepeatNum(arr) {
    var t = []
    //此步骤不能少,否则进不去循环
    t[0] = arr[0] 
    for(var i = 0;i < arr.length;i++) {
        for(var j = 0;j < t.length;j++) {
            if(arr[i] == t[j]) {
                break
            }
            if(j == t.length-1) {
                t.push(arr[i])
            }
        }
    }
    return t
}
```

* 解法2\(自己的解决方案\)

```javascript
//removeRepeatNum([1,2,3,2,5,7,1,2])
function removeRepeatNum(arr) {
    var arrs = []
    for(var i = 0; i < arr.length-1;i++) {
        //不存在相同元素
        var flag = false;
        for(var j = i+1;j < arr.length-1;j++) {
            if(arr[j] == arr[i]) {
                flag = true
            }
        }
        if(!flag) arrs.push(arr[i])
    }
    return arrs
}
```

## 绝对定位元素水平垂直居中方案

html

```markup
<div class="container">
    <div class="content"></div>
</div>
```

* 方案1

```css
.container {
    width: 400px;
    height: 400px;
    background-color: gray;
    position: relative;
    .content {
        width: 100px;
        height: 100px;
        background-color: green;

        //解决方案
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}
```

* 方案2

```css
.container {
    width: 400px;
    height: 400px;
    background-color: gray;
    position: relative;
    .content {
        width: 100px;
        height: 100px;
        background-color: green;
        border-radius: 50%;

        //解决方案
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        //margin-left: -50px; //移动元素宽一半
        //margin-top: -50px;//移动元素高一半
    }
}
```

* 方案3\(flex解决方案\)

```css
.container {
    width: 400px;
    height: 400px;
    background-color: gray;
    position: relative;
    //解决方案
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 100px;
        height: 100px;
        background-color: green;
        position: absolute;
    }
}
```

## 纯css绘制三角形

html

```markup
<div class="triangle"></div>
```

```css
.triangle {
    width: 0;
    height: 0;
    border: solid 100px;
    border-bottom-color: green;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
}
```

## call和apply的区别和性能\(修正this指向\)

> //call可以多个参数,apply只能两个参数,第二个参数为数组
>
> fn.call\(obj,10,20,30\)
>
> fn.apply\(obj,\[10,20,30\]\)
>
> call性能要优于applay\(尤其是传给函数的参数超过3个的时候\)

```javascript
let arr = [10,20,30],
    obj = {}

function fn(a,b,c) {
    console.log(a) //10
    console.log(b) //20
    console.log(c) //30
}


// fn.call(obj,10,20,30)
// 使用es6展开函数把数组每一项传递给函数
// fn.call(obj,...arr)
fn.apply(obj,arr)
```

## 简单性能测试

> 代码的性能测试都和测试的环境有关系,例如cpu,内存,gpu,浏览器都会导致性能的不同

```javascript
console.time('test')
for(let i = 0;i < 1000;i++) {

}
console.timeEnd('test')
```

## 实现\(5\).add\(3\).minus\(2\),使其输出结果为6

```javascript
~ function() {
    //=>每一个方法执行完,都要返回Number实例,才可以继续调用Nubmer类原型中的方法
    var check = (n => {
        n = Number(n)
        return isNaN(n) ? 0 : n
    })
    function add(n) {
        n = check(n)
        return this + n
    }
    function minus(n) {
        n = check(n)
        return this - n
    }
    Number.prototype.add = add;
    Number.prototype.minus = minus;
    // ['add','minus'].forEach(item => {
    //     Number.prototype[item] = eval(item)
    // })
}();
console.log((5).add(3).minus(2)) //6
```

## 箭头函数与普通函数

### 箭头函数与普通函数的区别

* 箭头函数语法上比普通函数更简洁

```javascript
//普通函数写法
// function fn(x) {
//     return function(y) {
//         return x + y
//     }
// }
//箭头函数写法(只有一行参数可以省略{})
var fn = x => y => x + y
```

* 箭头函数没有this,它里面的this来自函数所处的上下文中的this\(使用call/apply等任何方式都无法改变this指向\)

```javascript
let obj = {name: 'google'}
let fn1 = function() {
    console.log(this) //{name: 'google'}
}
fn1.call(obj)
let fn2 = () => {
    console.log(this) //指向所处上下文this,此处为window
}
fn2.call(obj)
```

* 箭头函数没有arguments\(类数组\),只能基于...arg获取传递的参数集合

```javascript
let fn = (...args) => {
    console.log(args)
}
fn(1,2,3)
```

* 箭头函数不能被new执行\(因为:箭头函数没有this也没有prototype\)

## 从字符串str查询子串substr是否存在,存在返回位置,不存在返回-1\(不使用IndexOf等内置方法\)

```javascript
~ function() {
    String.prototype.matches = function(substr) {
        let reg = new RegExp(substr)
        return reg.exec(this) ? reg.exec(this).index : -1
    }
}()

let str = 'abcdefg',
    substr = 'efg';
str.matches(substr)
```

## url网址匹配验证

```javascript
let str = 'http://www.baidu.com/index.html?name=reg&age=10#audio'
//^:以...开头
//$:以...结尾
//?:?前面出现0次或1次
let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i
console.log(reg.test(str))
```

## 编写正则验证\(一个6-16位的字符串,必须同时包含大小写字母和数字且开头不能为数字\)

```javascript
//?!:反向预查 ?=:正向预查
let reg = /(?!^[a-zA-Z]+$)(?!^[A-Z0-9]+$)(?!^[0-9a-z]+$)^[a-zA-Z0-9]{6,16}$/
```

## 编写 正则验证\(1-10位,数字，字母，下划线组成字符串,必须有\_\)

```javascript
//使用反向预查 \w:包括字母数字下划线
let reg1 = /(?![a-zA-Z0-9]+$)^\w{1,10}$/
```

## 实现$attr\(name,val\)遍历

> 传入name,val 返回属性为name,值为val的元素集合
>
> 如: let arr = $attr\('class','box'\) //返回class为box的元素集合

```markup
<div class="img s">hello</div>
```

```javascript
function $attr(property,val) {
    let elements = $('*'),
        arr = [];
    // [].forEach.call(elements,item => {})
    //Array.from() 把非数组转换为数组
    Array.from(elements).forEach(item => {
        //存储的是当前元素property对应的属性值
        let itemVal = $(item).attr(property)
        if(property === 'class') {
            //样式类属性名特殊处理
            new RegExp(`\\b${val}\\b`).test(itemVal) ? arr.push(item) : null
            return
        }
        if(itemVal === val) arr.push(item)
    })
    return arr
}
$attr('class','img')
```

## 英文字母汉字组成的字符串,用正则给英文单词前后加空格

```javascript
let str = 'no作no死,你行你上,不行no哔哔',
    reg = /\b[a-z]+\b/ig;
str = str.replace(reg,val => {
    //正则捕获到的内容
    return ` ${val} `
}).trim() //"no 作 no 死,你行你上,不行 no 哔哔"
```

## 数组扁平化处理

> 编写一个程序,实现数组扁平化,并去除其中重复部分数据,最终得到一个升序且不重复的数组

```javascript
let arr = [[1,2,,3],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]]]
console.log(flat.call({},arr)) //[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]
function flat(arr) {
    //方法1: 使用es6提供的Array.prototype.flat处理=>会默认去除空元素
    //[...new Set(arr)]也可以转为数组
    //return Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b)

    //方法2: toString()不管几级,都会变成‘,’分隔的字符串,没有中括号和所谓的层级
    //return [...new Set(arr.toString().split(',').map(item => Number(item)))].sort((a,b) => a-b)

    //方法3: JSON.stringify() => "[[1,2,3],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]]]"
    return [...new Set(JSON.stringify(arr).replace(/(\[|\])/g,'').split(','))].map(item =>                                Number(item)).sort((a,b) => a-b)
}

//方法4:使用Array.some() => 存在数组返回true,...会展开第一级
while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
}
let result = [...new Set(arr)].sort((a,b) => a-b) //[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]

//方法5:使用递归
~ function() {
    function myFlat() {
        let result = [],
            _this = this;
        let fn = arr => {
            for(let i = 0;i < arr.length;i++) {
                let item = arr[i]
                if(Array.isArray(item)) {
                    fn(item)
                    continue
                }
                result.push(item)
            }
        }
        fn(_this)
        return result
    }
    Array.prototype.myFlat = myFlat
}()
console.log(Array.from(new Set(Array.from(arr).myFlat())).sort((a,b) => a-b))
```

## 模拟new关键字

> 需求分析:
>
> 基于内置的new关键字,创建Dog的实例sanmao,实例可以调用原型上的属性和方法,现在要自己实现一个\_new方法,模拟出内置new后的结果
>
> let sanmao = \_new\(Dog,'三毛'\)

```javascript
function Dog(name) {
    this.name = name
}
Dog.prototype.bark = function() {
    console.log('bark')
}
Dog.prototype.sayName = function() {
    console.log(`hi ${this.name}`)
}
function _new(fn,...arg) {
    //创建对象obj,对象原型链指向fn
    //let obj = {}
    //obj.__proto__ = fn.prototype
    let obj = Object.create(fn.prototype)
    fn.call(obj,...arg)
    return obj
}
let sanmao = _new(Dog,'旺财')
sanmao.bark() // bark
sanmao.sayName() //hi 旺财
```

## 异步情况下的变量问题

* 方案1:使用let块级作用域

```javascript
//let存在块级作用域,每一次循环都会在当前块作用域形成一个私有变量i存储0-999
for(let i = 0;i < 1000;i++) {
    //定时器是异步编程,每一轮循环设置定时器,无需等定时器触发执行,继续下一轮循环
    setTimeout(() => {
        console.log(i)
    },1000)
}
```

* 方案2:形成闭包

```javascript
//第一种写法
for(var i = 0;i < 100;i++) {
    void function(i) {
        setTimeout(() => {
            console.log(i)
        },1000)
    }(i)
}
//第二种写法
for(var i = 0;i < 100;i++) {
    setTimeout((i => () => console.log(i))(i),1000)
}
```

* 方案3:使用bind

```javascript
var fn = m => {
    console.log(m)
}
for(var i = 0;i < 100;i++) {
    setTimeout(fn.bind(null,i),1000)
}
```

## 求满足条件的值

> * 1.{}=={} 两个对象比较,比较的是堆内存的地址
>   * 2.null==undefined \(true\) / null === undefined \(false\)
>   * 3.NaN == NaN \(false\) =&gt; NaN和谁都不相等
>   * 4.\[12\] == \['12'\] \(true\) 对象和字符串比较,是把对象toString\(\)转换为字符串后再进行比较
>   * 5.剩余所有情况在进行比较的时候,都是转换为数字\(前提数据类型不一样\)
>   * 对象转数字: 先转换为字符串,再转换为数字
>   * 字符出转数字:只要出现一个非数字字符,结果就是NaN
>   * 布尔转数字: true-&gt; 1 flase-&gt; 0
>   * ==进行比较的时候,如果左右两边数据类型不一样,则先转换为相同数据类型,然后再进行比较
>   * null转数字0
>   * undefined转数字NaN
>
> //a = ?使等式成立
>
> if\(a == 1 && a == 2 && a == 3\) {
>
> ​ console.log\('ok'\)
>
> }

```javascript
//方法1:a.toString(),此时存在私有toString,则不再调用原型链上的toString
var a = {
    n:0,
    toString: function() {
        return ++this.n
    }
}

//方法2:shift返回结果是被删除后的
var a = [1,2,3]
a.toString = a.shift

if(a == 1 && a == 2 && a == 3) {
    console.log('ok')
}
```

## 数据处理

> 需求: 某公司1到12月份的销售额存在一个对象里面,如下
>
> {
>
> ​ 1: 222,
>
> ​ 2:123,
>
> ​ 5:888
>
> }
>
> 处理为如下结构: \[222,123,null,null,888,null,null,null,null,null,null,null\] \(没有的月份为null\)

```javascript
//方案1
let obj = {1:111,2:222,5:555}
let arr = new Array(12).fill(null).map((item,index) => {
        return obj[index+1] || null
    }) //[111, 222, null, null, 555, null, null, null, null, null, null, null]

//方案2
let obj = {1:111,2:222,5:555}
obj.length = 13
let arr = Array.from(obj).slice(1).map(item => {
    return typeof item == 'undefined' ? null : item
})//[111, 222, null, null, 555, null, null, null, null, null, null, null]

//方案3
let obj = {1:111,2:222,5:555}
let arr = new Array(12).fill(null)
Object.keys(obj).forEach(item => {
    arr[item-1] = obj[item]
})//[111, 222, null, null, 555, null, null, null, null, null, null, null]
```

## 函数柯理化

> 简单柯理化形式
>
> fucntion fn\(x\) {
>
> ​ return function\(y\) {
>
> ​ console.log\(x+y\)
>
> ​ }
>
> }
>
> 需求: 请实现一个add函数,满足如下功能\(不固定层级\)
>
> add\(1\) //1
>
> add\(1\)\(2\) //3
>
> add\(1,2\)\(3\) //6
>
> add\(1\)\(2\)\(3\) //6

```javascript
//代码看的一脸懵逼,有兴趣的可以具体看下这方面的知识
function currying(fn,length) {
    length = length || fn.length
    return function(...args) {
        if(args.length >= length) {
            return fn(...args)
        }
        return currying(fn.bind(null,...args),length - args.length)
    }
}
function add(n1,n2,n3) {
    return n1+n2+n3
}
add = currying(add,3)
console.log(add(1)(2)(3))
```

## 端口占用查错

> 记录一次3306端口占用问题

```text
λ netstat -aon|findstr "3306"
  TCP    127.0.0.1:3306         0.0.0.0:0              LISTENING       4724

λ tasklist | findstr "4724"
mysqld.exe                    4724 Services                   0     18,048 K

==> kill mysqld.exe服务
```

