
### 添加动态路由
```js
router.addRoute({
    path:"/about",
    name:'about',
    component:()=>import('./components/About.vue')
})
//在 About.vue 页面添加 <router-view></router-view>
router.addRoute('about',{
    path:'/about/info',
    name:'info',
    component:{
        render(){
            return h('div','info page')
        }
    }
})

//route是响应式对象，可监控变化
const route = useRoute()
watch(()=>route.query,(val,oldVal)=>{
    console.log(val) 
})

//路由守卫
onBeforeRouteLeave((to,from)=>{
    const answer = window.confirm("你确定离开当前页面吗？")
    if(!answer){
        return false
    }
})

//useLink 暴露 router-link 内部行为
//NavLink.vue
<NavLink to="/"></NavLink>
```

### 变化
实例创建方式
history选项替代了mode选项
* history: createWebHistory('/base-directory')
* hash: createWebHashHistory()
* abstract: createMemoryHistory()
base选项移至 createWebHistory 等方法中

### 没有路由通配符匹配
```js
{path:"/:pathMatch(.*)*",name:'not-found',component:NotFound}

//是用命名导航至404页面
router.resolve({
    name:'not-found',
    params:{
      pathMatch:['not','found']
    }
}).href   // /not%2Ffound 
```

### isReady() 替代 onReady() 方法
```js
router.push()
//before
router.onReady(onSuccess,onError)
//now
router.isReady().then(onSuccess).catch(onError)
```

### scrollBehavior变化
```js
scrollBehavior(to,from,savedPosition){
//{x:10,y:10} now {left:10,top:10}
  if(savedPosition){  
      return savedPosition  
  }else{
      return {top:0}
  }
}
```

### 现在keep-alive和transition必须用在router-view内部
```html
<!--before-->
<keep-alive>
    <router-view></router-view>
</keep-alive>

<!--now-->
<router-view v-slot="{Component}">
    <keep-alive>
       <component :is="Component"/>
    </keep-alive>
</router-view>
```

### router-link 移除了一票属性
* append
```html
<!--before-->
<router-link to="child-route" append>
<!--now-->
<router-link :to="append($route.path,'child-route')">
```
```js
app.config.globalProperties.append = (path,pathToAppend)=>{
    return path + pathToAppend
}
```

### tag/event
```html
<!--before-->
<router-link to="/xxx" tag event="dblclick"></router-link>
<!--now-->
<router-link to="/xx" custom v-slot="{navigate}">
  <span @dblclick="navigate"> xxx </span>
</router-link>
```

### mixins中的路由守卫将被忽略

### match 方法被移除，使用resolve替代
```js
// 移除router.getMatchedComponents()
router.currentRoute.value.matched
```

### 包括首屏导航在内，所有导航均为异步
```js
app.use(router)
router.isReady().then(() => app.mount("#app"))
//如果首屏存在路由守卫，则可以不等待就绪直接挂载，产生结果将和vue2相同
```

### route的parent属性被移除
```js
  const parent = this.$route.matched[this.$route.matched.length-2]
```

### pathToRegexpOptions选项被移除
* pathToRegexpOptions => strict
* caseSensitive => sensitive
```js
  createRouter({
      strict:boolean,
      sensitive:boolean
  })
```

### 使用history.state
```js
//之前
history.pushState(myState,'',url)
//现在
router.push(url)
//确实要用到底层
history.replaceState({...history.state,...myState},'')
```

### routes选项是必填项
```js
  createRouter({routes:[]})
```

### 命名子路由如果path为空的时候不再追加/
```js
[
    path:'/dashboard',
    children:[
        {path:'',component:DashboardDefault}
    ]
]
//以前生成url: /dashboard/
//副作用：给设置了重定向redirect 选项的字路由带来的副作用
[
    path:'/dashboard',
    children:[
        {path:'',redirect:'/dashboard/home'},//只能写完整的
        {path:"home",component:Home}
    ]
]
```

### $route 属性编码行为
params/query/hash
* Path/fullpath 不再做解码
* hash会被解码
* push,resolve和replace,字符串参数，或者对象参数path属性必须编码
* params / 会被解码
* query中 + 不处理 stringifyQuery
