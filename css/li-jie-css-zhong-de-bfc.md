# 理解css中的BFC

## 什么是BFC

> BFC:块格式化上下文
>
> Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

## BFC作用

> BFC用于形成一个完全独立的空间,让空间的子元素不会影响到外面的布局

## BFC使用

### 触发条件

> 此处只列举最常用的四种bfc触发规则,更多触发规则可以查看文章末尾的mdn链接,此处不讨论flex,grid解决相关问题

1. float不为none
2. position不为relative或static
3. overflow为auto scroll或hidden
4. display为table-cell或inline-block

### 作用

#### 解决浮动元素令父元素高度塌陷问题

* 出现原因分析

> 原因: \(子元素全是float元素 且 父元素没有设置高度\)
>
> 子元素使用float,浮动的子元素脱离文档流,父元素检测不到子元素的存在无法被撑开,导致父元素高度塌陷,后面布局出现混乱

![](../.gitbook/assets/bfc01.png)

```markup
<main class="container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</main>

<!-- 为了看起来直观,就直接把less放这儿了 -->
.container {
    padding: 10px;
    border: solid 1px red;
    div {
        float: left;
        width: 100px;
        height: 100px;
        &:nth-of-type(1) {
            background-color: sandybrown;
        }
        &:nth-of-type(2) {
            background-color: chartreuse;
        }
        &:nth-of-type(3) {
            background-color: cyan;
        }
        &:nth-of-type(4) {
            background-color: blue;
        }
    }
}
</less>
```

* 解决方案:

> overflow:hidden;
>
> display:table-cell;
>
> display:block;
>
> position:fixed;
>
> position:absolute;
>
> ...
>
> 当以上布局方案无法设置以上属性,可以使用如下方案:
>
> * 让父元素也浮动起来\(父元素和子元素一起脱离文档流\) fload:left=&gt;会影响父元素之后的排列引发其他问题
> * 给父元素设置固定高度=&gt;只适用于已经子级元素高度的情况下使用,不灵活且难以维护
> * 在浮动的子元素最后面增加一个空标签\(没有闭合的标签,如\ 与\\),设置{clear:both}来清除浮动,会增加无意义的标签,不利于维护
> * 为浮动的最后一个元素设置伪元素\(在父元素设置::after\) =&gt; 与方案三原理相同,after需要设置为块级元素
>
>   .container::after {
>
>   ​ content: '';
>
>   ​ display: block;
>
>   ​ clear: both;
>
>   }

![](../.gitbook/assets/bfc02.png)

#### 解决自适应的问题

* 出现原因分析

> 在通过浮动实现两栏自适应布局时\(左边宽度固定,右边自适应\) =&gt; 当右侧文字高度超出左侧高度时,会出现右侧文字出现在左侧的问题

![](../.gitbook/assets/bfc03.png)

```markup
<main class="container">
    <div class="left"></div>
    <div class="right">
        <!-- 这儿使用的是Loream乱数假文 --> 
    </div>
</main>

<!-- 为了看起来直观,就直接把less放这儿了 -->
<less>
    .container {
        div {
            &:nth-of-type(1) {
                height: 50px;
                float: left;
                width: 200px;
                background-color: sandybrown;
            }
            &:nth-of-type(2) {
                height: 500px;
                background-color: pink;
            }
        }
    }
</less>
```

* 解决方案

  * 左边左浮动,右边设置margin-let: 100px

  ```css
  .left {
      float: left;
      width: 200px;
  }
  .right {
      margin-left: 200px;
  }
  ```

  * 左边绝对定位,右边设置margin-let: 200px

  ```css
  .left {
      <!-- top/left/bottom/right自行设置 -->
      position: absolute;
  }
  .right {
      margin-left: 200px;
  }
  ```

  * 右侧元素设置顶线与右线位置为0,左线为200px

  ```css
  .left {
      position: absolute;
  }
  .right {
      position: absolute;
      top: 0;
      right: 0;
      left: 200px;
  }
  ```

![](../.gitbook/assets/bfc04.png)

#### 解决外边距垂直方向重合问题

* 出现原因分析

> 当两个块级元素分别设置margin-bottom:20px,margin-top:25px=&gt;此时实际两个块级边框距离为最大值\(25px\)

```markup
<p></p>
<p></p>

<less>
    p {
        width: 100px;
        height: 100px;
        &:nth-of-type(1) {
            margin-bottom: 20px;
            background-color: pink;
        }
        &:nth-of-type(1) {
            margin-bottom: 25px;
            background-color: cyan;
        }
    }
</less>
```

![](../.gitbook/assets/bfc05.png)

* 解决方案

  * 其中一个p元素外面包裹一层父元素

  ```markup
  <p></p>
  <div>
      <p></p>
  </div>

  <less>
      p {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
          background-color: pink;
      }
      div {
          overflow: hidden;
          p {
              margin-top: 20px;
              width: 100px;
              height: 100px;
              background-color: cyan;
          }
      }
  </less>
  ```

  * 用padding代替margin\(这个就不需要写代码\)

![](../.gitbook/assets/bfc06.png)

[mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

