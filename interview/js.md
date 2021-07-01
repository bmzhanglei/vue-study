
### 什么是闭包

`闭包是指有权访问另一个函数作用域中的变量的函数；`

```js
function aaa(){
  var name = "xxx"
  return function bbb(){
    alert(name);
  }
}
```

### 函数去抖（debounce）
当调用函数n秒后，才会执行该动作
```js
function debounce(delay, cb) {
    let timer
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
            cb()
        }, delay)
    }
}
```

### 函数节流（throttle）
```js
function throttle(cb, delay) {
    let startTime = Date.now()
    return function () {
        let currTime = Date.now()
        if (currTime - startTime > delay) {
            cb()
            startTime = currTime
        }
    }
}
```

### 实现一个sleep函数
由于js是单线程的，可以利用伪死循环阻塞主线程来达到延迟执行的效果
```js
function sleep(delay) {
    // 获取一个初始时间
    let startTime = new Date().getTime()
    // 如果时间差小于延迟时间，就一直循环
    while (new Date().getTime() - startTime < delay) {
        continue
    }
}
```

### 函数柯里化
```js
function curry(func) {
    return function curried(...args) {     
        if (args.length >= func.length) {
            return func.apply(this, args)
        } else {           
            return function(...args2) {           
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}
const curring = (fn,arr = [])=>{
    let len = fn.length;
    return (...args)=>{
        arr = arr.concat(args);
        if(arr.length<len){
            return curring(fn,arr)
        }
        return fn(...arr)
    }
}

function sum(a, b,c){
    return a * b*c
}
let currfn = curry(sum)
currfn(3)(5)(6)
```

* 掌握高阶函数的使用，使用高阶函数解决异步问题 (把函数作为参数【回调函数】或者返回值【柯里化】的一类函数)
* 掌握发布订阅模式和观察者模式
* 掌握Promise核心应用，使用promise解决异步编程问题
* 实现一个完整promise库
* 扩展promise中常见方法，all,race,finally
* 掌握generator的使用以及co库的应用
* 异步终极解决方案async + await

```js
const say = (...args)=>{
    //todo...
    console.log('speak',args)
}
Function.prototype.before = function(cb){
    return (...args)=>{
        cb();
        this(...args);
    }
}
let newSay = say.before(function(){
    console.log('before say...')
})
newSay('a','b');  //传递参数
```

### 判断类型四种方式 constructor instanceof typeof Object.prototype.toString.call()
* 函数柯里化，把一个函数的范围进行缩小，让函数变得更具体一些
```js
function checkType(type){
    return function (content){
        return Object.prototype.toString.call(content)===`[object ${type}]`
    }
}
function checkType2(type,content){
    return Object.prototype.toString.call(content)===`[object ${type}]`
}
let util = {};
['Number','String'].forEach(item=>{
    util['is'+item] = curring(checkType2)(item)
})
console.log(util.isString('hhhh'))
```

* 函数反柯里化 让一个函数范围变大

* 并发操作，就是两个操作互不影响
```js
let after = (times,fn)=>()=>--times == 0 && fn()

let out = after(2,()=>{
    console.log(renderObj)
})
let renderObj = {}
fs.readFile('./name.txt','utf8',(err,data)=>{
    renderObj.name = data;
    out()
})
fs.readFile('./age.txt','utf8',(err,data)=>{
    renderObj.age = data;
    out()
})
```
