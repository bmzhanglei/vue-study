

### isProxy  isReactive  isReadonly
  1. 只有 reactive 和 readonly 创建出来的对象才是 isProxy(state) //true

### shallowReactive   shallowReadonly    //用的少

### toRaw：响应式对象转换成普通的对象  markRaw：返回对象本身，并不是深度的    //用的少
```js
  const obj = {}
  const rawObj = markRaw(obj)
  const proxyObj = reactive(rawObj)  //会跳过这个响应式 还是返回普通对象
  const newProxyObj = reactive({proxyObj})  //会变成响应式对象
```

### errorHandler（了解）  warnHandler（了解）  globalProperties(添加全局属性)

```js
//main.js
const app = createApp(App)
app.config.globalProperties.utils = utils

//使用
setup(){
  const {ctx} = getCurrentInstance()
  console.log(ctx.utils)
}

//child.vue
export default {
    props:{
        utils:Object
    },
    setup(){
         const {ctx} = getCurrentInstance()
         console.log(ctx.utils)  //打印props传递过来的utils,局部的优先级高
    }
}
```

### isCustomElement  optionMergeStrategies
```js
app.config.isCustomElement = tag => {
    return tag.startsWith('jsjiajia-');  //凡是以  jsjiajia- 开头的标签忽略警告
}

//vite.config.js里面配置
module.exports = {
    vueCompilerOptions:{
        isCustomElement:(tag)=>{
            return /^Jsjiajia-/.test(tag);
        }
    }
}

//只针对option api
app.config.optionMergeStrategies.custom = (toVal,fromVal)=>{
    return fromVal || toVal
}

//child.vue  mixin是无法传参的
export default{
    custom:"This is App\'s option",
    created(){
       console.log(this.$options.custom) 
    }
}
```
