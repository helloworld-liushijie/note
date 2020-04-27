# JavaScript总结

> 对不熟悉的基础知识进行巩固,加深理解

```markup
<a href="javascript:">点击</a>

<script>
    document.write('hello')    
</script>
```

* es6七种数据类型
  * String 字符串
  * Number 数值
  * Boolean 布尔值
  * Null 空值
  * Undefined 未定义
  * Object 对象
  * Symbol es6新增

```javascript
console.log(typeof NaN) //"number"
console.log(typeof Infinity) //"number"
console.log(typeof null) //"object" => 不等于"null"

//js浮点运算,可能得到不准确结果
var c = 0.1 + 0.2 //0.30000000000000004
//解决方案:在后端进行运算,或者使用第三方库(mathjs)

//math.js使用
//0.1＋0.2
math.format(math.chain(math.bignumber(0.1)).add(math.bignumber(0.2)).done());

//0.2-0.1
math.format(math.chain(math.bignumber(0.2)).subtract(math.bignumber(0.1)).done());

//0.1*0.2
math.format(math.chain(math.bignumber(0.1)).multiply(math.bignumber(0.2)).done());

//0.1/0.2
math.format(math.chain(math.bignumber(0.1)).divide(math.bignumber(0.2)).done());
```

强制类型转换方法

```text
转String:
1. "".toString()
2. String("") => 其他的直接调用toString(),对于null和undefined,不会调用toString,直接转为"null" "undefined"

字符串转Number:
1.Number(num) => 非数字转为NaN,‘’或纯空格转为0,true转为1(false转为0),null转为0,undefined转为NaN
2.parseInt(num)/parseFloat(num) => 把字符串转为整数浮点数 “123px321” => 123 ++对非String调用,会先转为String,再操作++
//进制指定 parseInt(num,10) => 10进制解析
3.-0 => "1"-1 => 0

其他转Boolean:
Boolean(val) //[0,NaN,'',null,undefined] => false,其余全部为true => {}也是true
```

js进制表示

* 16进制: 0x开头
* 8进制: 0开头
* 2进制: 0b开头\(兼容性不好\)

