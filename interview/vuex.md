#### Vuex通过什么方式提供响应式数据的？
* new Vue({})
#### $store 是如何挂载到实例this上的

#### 核心概念
* State -- this.$store.state.xxx 取值 mapState
* Getter -- this.$store.getters.xxx 取值 mapGetters
* Mutation -- this.$store.commit("xxx") 赋值 mapMutations
* Action -- this.$store.dispatch("xxx") 取值 mapActions
* Module

#### 底层原理
* State: 提供一个响应式数据
* Getter: 借助Vue的计算属性computed来实现缓存
* Mutation: 更改state方法
* Action: 触发mutation方法
* Module: Vue.set动态添加state到响应式数据中

#### router 解决的问题
* 监听URL的变化，并在变化前后执行响应的逻辑
* 不同的URL对应不同的组件
* 提供多种方式改变URL的API(URL的改变不能导致浏览器刷新)

#### 使用方式
* 提供一个路由配置表，不同URL对用不同的组件配置
* 初始化路由实例 new VueRouter()
* 挂载到Vue实例上
* 提供一个路由占位，用来挂载URL匹配到的组件

#### 路由类型
* Hash模式 丑，无法使用锚点定位
* History模式 需要后端配合，IE9不兼容（可使用强制刷新处理）

#### 底层原理
* 通过 router-link,$router.push,a href,浏览器前进后退,手动更改url 触发 updateRoute -> Vue.util.defineReactive_route --> router-view