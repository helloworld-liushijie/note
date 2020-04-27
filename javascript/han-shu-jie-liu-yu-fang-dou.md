# 函数节流与防抖

## 函数节流

> 针对调用频率高的函数，通过设置定时器，使其在执行后间隔一段时间，才进行下一次的执行，避免重复频繁的调用导致的浏览器性能以及请求重复调用问题

```javascript
/**
 * 节流函数
 * @param 要被节流的函数
 * @delay 规定的时间
 */
function throttle(fn,delay) {
    //记录上一次函数触发时间
    var lastTime = 0
    return function() {
        //记录当前函数触发的时间
        var nowTime = Date.now()
        if(nowTime - lastTime > delay) {
            //修正this指向问题
            fn.call(this)
            //同步时间
            lastTime = nowTime
        }
    }
}

document.onclick = throttle(function() {
    console.log(`click函数被触发了${Date.now()}`)
},2000)
```

## 函数防抖

> 一个需要频繁触发的函数,在规定时间内,只让最后一次生效,前面的不生效

```javascript
/**
 * @param {*} fn 要被节流的函数
 * @param {*} delay 规定的时间
 */
function debounce(fn,delay) {
    //记录上一次的延时器
    var timer = null
    return function() {
        //清除上一次延时器
        clearTimeout(timer)
        //重新设置新的延时器
        timer = setTimeout(() => {
            fn.apply(this)
        },delay)
    }
}

document.onclick = debounce(() => {
    console.log(`click函数触发了${Date.now()}`)
},1000)
```

