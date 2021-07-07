
### 前后端分离开发端难点
  * 权限管理
  * 路由规则
  * 全局 store 结构实现
  * 前端数据缓存设计与实现（防止异步资源端重复发送与浪费）

### Composition Api
  * ref 和 reactive
  * computed 和 watch
  * 新的生命周期函数
  * 自定义函数 - Hooks函数 

### 其他新增特性
  * Teleport - 瞬间组件的位置
  * Suspense - 异步加载组件
  * 全局API的修改和优化

### Vue2遇到的难题
  * 随着功能的增长，复杂组件的代码变得难以维护（Vue3按照逻辑分类）
  * vue2对于typescript的支持非常有限（没有考虑ts的集成和推论的问题）
  * Mixin的缺点
    1. 命名冲突
    2. 不清楚暴露出来变量的作用
    3. 重用到其他component经常会遇到的问题

### Vue2全局API遇到的问题
  * 在单元测试中，全局配置非常容易污染全局环境
  * 在不同的apps中，共享一份有不同配置的Vue对象，也变得非常困难
```js
//vue2
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/*  */)
Vue.mixin(/*  */)
Vue.component(/*  */)
Vue.directive(/*  */)

Vue.prototype.customProperty = ()=>{}
new Vue({
    render:h=>h(App)
}).$mount("#app")

//vue3
import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.isCustomElement = tag => tag.startsWith("app-")
app.use(/*  */)
app.mixin(/*  */)
app.component(/*  */)
app.directive(/*  */)

app.config.globalProperties.customProperty = ()=>{}
app.mount("#app")
```

### 全局配置：Vue.config -> app.config
  * config.productionTip 被删除
  * config.ignoredElements 改名为config.isCustomElement
  * config.keyCodes被删除

  
### Global Api Treeshaking

### Restful Api 设计理念
  > https://api.example.com/teams
  + verbs
    1. GET /teams:  列出所有球队 
    2. POST /teams:  新建一个球队 
    3. GET  /teams/ID:  获取某个球队的信息 
    4. PUT /teams/ID:  更新某个球队的信息 (提供球队的全部信息)
    5. PATCH /teams/ID:  更新某个球队的信息 (提供球队的部分信息)
    6. DELETE  /teams/ID: 删除某个球队
  + 复杂结构 一对多
    1. GET /teams/ID/players: 列出某个指定球队的所有球员

  + 常见状态码
    * 200 OK - [GET]:服务器成功返回用户请求的数据
    * 201 CREATED - [POST/PUT/PATCH]:用户新建或修改数据成功
    * 204 NO CONTENT - [DELETE]：用户删除数据成功
    * 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）
    * 403 Forbidden - [*]：表示用户得到授权（与401错误相对），但是访问是被禁止的
    * 404 NOT FOUND - [*]: 用户发出的请求针对的是不存在的记录，服务器没有进行操作
