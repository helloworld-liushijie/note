![](C:\Users\a1690\Desktop\img\v2-c327c810e7b80cd27568e92d5a6d5721_r.jpg)

## 序言

> typescript需要通过编译执行,不同于javascript解释执行,在代码编写过程中就会直接报错,写过Java的就容易理解
>
> TypeScript是JavaScript的一个超集,主要提供了**类型系统**和**对 ES6 的支持**



### 加载

You can install TypeScript via npm

```bash
$ npm install -g typescript
```

Then run the compiler via `tsc`

```bash
$ npx tsc //=> such as tsc app.ts
```



## typescript

> 使用javascript/typescript实现点击sum功能
>
> 这儿推荐一个npm库lite-server,检测代码改变,类似的还有nodemon



### 数据类型

#### javascript数据类型

```typescript
// boolean
let isDone: boolean = false
// let flag:boolean = new Boolean(1) // ❌ => 使用构造函数 Boolean 创造的对象不是布尔值,而是Boolean对象
let flag: Boolean = new Boolean(1) // ✅

// number
let num: number = 10

// string
let str: string = 'hello'

// svoid(写过java的就清楚这个)
let unuseable: void = undefined
function setName(name: string): void {
    this.name = name
}

// null
let null: null = null
// undefined
let undefined: undefined = undefined
/**
 *	与 void 的区别是，undefined 和 null 是所有类型的子类型。s
 *	也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
 */
let num: number = undefined // ✅
let num: number = null // ✅
let result: number = void // => error: Type 'void' is not assignable to type 'number'.

// any: 任意类型
let some: any = 1
any = 'hhh' // 可以赋任意类型值
// 变量如果在声明的时候未指定类型,就会被识别为任意类型
let hi = 2
// 等价于 let hi: any = 2

// ---------
// 接口
// => 这种定义,变量必须与接口完全一致
interface Person {
    name: string;
    age: number;
    address: string
}

let tom: Person = {
    name: "tom",
    age: 21,
    address: "重庆"
}

// => “?:”这种定义,变量不必与接口完全一致(不能定义未存在类型)
interface Car {
    drive: Function;
    coast: number;
    color?: string
}

let bwm: Car = {
    drive: function() {
        console.log('drive');
    },
    coast: 300000
}

// [propName: string]: any可以使变量定义不存在的类型,但必须是指定的类型
interface Book {
    readonly name: string, // name属性制度
    price?: number,
    [propName: string]: any
}

let harrypotter: Book = {
    name: '哈利波特',
    from: '人民出版社'
}
console.log(harrypotter) // {name: "哈利波特", from: "人民出版社"}
bwm.drive() // drive
console.log(tom) // {name: "tom", age: 21, address: "重庆"}

// 指定变量类型与返回值类型
let res: (num1:number,num2:number) => number = function (num1:number,num2:number): number {
    return num1 + num2
}

console.log(res(2,3)) // 5

// ---------
// 函数传递默认值
// 可选参数必须在最后(设置默认值就不必)
function concatName (firstName: string,lastName: string,isConcat?: boolean) {
    if (isConcat) {
        return firstName.concat(lastName)
    }
    return firstName
}
console.log(concatName('xiao','ming',true)) // xiaoming
console.log(concatName('li','lei')) // li

// 默认值,此时默认值就可以不放到最后
function printInfo(firstName: string = 'li',lastName: string): void {
    console.log(firstName + lastName) // lilei
}
printInfo(undefined,'lei')

// 重载
// 功能:123=>数字321,字符串hello=>olleh
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: string | number): string | number {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    }
    return x.split('').reverse().join('')
}
console.log(reverse(123)) // 321
console.log(reverse('hello')) // olleh

// -------
// 类型断言
interface Cat {
    name: string;
    run(): void
}
interface Duck {
    mame: string,
    swim(): void
}

// 断言:类型断言只能够「欺骗」TypeScript 编译器，
// 无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
function isDuck (animal: Cat | Duck) {
    // 将 animal 断言成 Fish
    if (typeof (animal as Duck).swim === 'function') {
        return true
    }
    return false
}
```



### code

- javascript

  ```js
  const num1 = document.querySelector('#num1')
  const num2 = document.querySelector('#num2')
  const btn = document.querySelector('button')
  
  function add({num1,num2}) {
      // 类型处理
      if (typeof num1 === 'number' && typeof num2 === 'number') {
          return num1 + num2
      }
      return +num1 + +num2
  }
  
  btn.addEventListener('click', () => {
      alert(add({num1:num1.value,num2:num2.value}))
  })
  ```

  

- typescript

  ```typescript
  // 原有js类型问题导致,最终得到的结果偏离,ts需要提前处理数据
  const num1 = document.querySelector('#num1')! as HTMLInputElement // '!'告诉typescript永远不会产生null
  const num2 = document.querySelector('#num2')! as HTMLInputElement
  const btn = document.querySelector('button')
  
  function add(num1:number,num2:number) {
      return num1 + num2
  }
      
  btn.addEventListener('click', () => {
      // 需要数据类型与形参相同,所以需要转换数据类型
      alert(add(+num1.value,+num2.value))
  })
  ```



- 类型指定

  ```js
  function add(num1: number,num2: number,printResult: boolean,result:string) {
      if (printResult) {
          return `${result}${num1+num2}`
      }
      console.log(num1,num2)
  }
  let num: number
  num = 10
  console.log(num)
  // let str = 'str'
  // str = 1 // 注意:Type '1' is not assignable to type 'string'.ts(2322)
  const num1 = 1
  const num2 = 20
  const printResult = true
  const result = 'result is '
  const res = add(num1,num2,printResult,result)
  console.log(res)
  ```



- typescript的几种类型

  >number,string,boolean,object,Array,Tuple,Enum,Any

  ```typescript
  enum Sex {MALE,FEMALE} // 枚举
  
  const person: {
      name: string; // 注意是';',不是','
      age: number;
      hobbies: string[]; // 字符串数组
      role: [number,string], // tuple元组
      sex: any // 任意类型
  } = {
      name: 'zs',
      age: 21,
      hobbies: ['music', 'movie'],
      role: [1,'author'],
      sex: Sex.MALE
  }
  
  let value: any[] // 混合数组
  value = ['hello', 1, false]
  
  console.log(person.name)
  
  for (const hobby of person.hobbies) {
      console.log(hobby)
  }
  
  if(person.sex === Sex.MALE) {
      console.log('is man')
  } else {
      console.log('is female');
  }
  
  ```



- 联合数据类型

  ```typescript
  type Combinable = number | string
  type ConversionDescriptor = 'as number' | 'as string'
  // 联合数据类型
  function combine(
      input1: Combinable,
      input2: Combinable,
      resultConversion: ConversionDescriptor
  ) {
      let result
      if (
          (typeof input1 === 'number' && typeof input2 === 'number') ||
          resultConversion === 'as number'
      ) {
          result = +input1 + +input2
      } else {
          result = input1.toString() + input2.toString()
      }
      return result
  }
  
  console.log(combine(10, 20, 'as number')) // 30
  console.log(combine(0, 50, 'as number')) // 50
  console.log(combine('hello', 'world', 'as string')) // helloworld
  ```



- function

  ```typescript
  function add(num1: number, num2: number): string {
      // :string指定返回类型
      return num1.toString() + num2.toString()
  }
  function printResult(str: string): void {
      console.log('num combine str is ' + str)
  }
  
  printResult(add(1, 2)) // 12
  
  let combine: Function
  combine = add
  console.log(combine(11, 0)) // 110
  
  function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
      const res = n1 + n2
      callback(res)
  }
  addAndHandle(10, 20, (res) => {
      console.log(res) // 30
  })
  ```



- unknown

  ```typescript
  let userInput: unknown
  let userName: string
  
  if (typeof userInput === 'string') {
      userName = userInput
  }
  
  function throwError(err: string, errcode: number) {
      throw { err, errcode } // error {err: "page not found", errcode: 404}
  }
  
  throwError('page not found', 404)
  ```




### typescript complier

> 每次编写typescript都需要手动重新tsc编译成js(过于繁琐),所以let's go

```bash
$ tsc app.ts --watch | -w // 避免每次都要手动编译
```



- 初始化typescript

  ```bash
  $ tsc --init // 初始化typescript,并生成tsconfig.json
  $ tsc // 将目录下的ts文件编译成js文件
  $ tsc --watch // 监听ts文件,改变自动编译
  ```

- tsconfig.json配置

  ```json
  {
    "compilerOptions": {
      /** 默认配置 */	
      // 此处列举几个不错的配置项
      "target": 'es5', // 指定代理ecma version
      "module": 'commonjs', // 指定module规范
     	"outDir": './dist', // 编译文件输出到dist目录
      "removeComments": true, // 移除编译文件注释
      "noEmit": true, // 不编译成js
      "noEmitOnError": true, // typescript编写出错,不会编译成js(false即使出错也会编译,默认)
      "sourceMap": true,                        /** 生成map debug文件 */
      "strict": 启用所有严格检查选项(不详解)
    },
    /** 自定义配置 */
    "exclude": [ // 指定文件tsc时不再编译成js
        "demo.ts",
        "*.dev.ts", // 也可以指定通配符
        "**/*.dev.ts", // 任意文件夹下的任意.dev.ts文件
        "node_modules" // 排除node_modules
    ],
    ”include“: [ // 只编译指定文件
        "app.ts",
        "analysis.ts"
    ]
  }
  ```

  

---

[typescript官网](https://www.typescriptlang.org/)

[typescript入门教程](https://ts.xcatliu.com/)

[typescript tsconfig.json[中文]]([https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Compiler%20Options.html](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Compiler Options.html))