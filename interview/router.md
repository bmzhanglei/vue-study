
### vue-router有两种传参方式

(1)通过在router.js文件中配置path的地方动态传递参数 eg: path: '/detail/:id' 然后在组件内通过this.$route.params.id即可获取

(2).在router-link标签中传递参数

```html
<router-link :to={ params: { x: 1 }  } />
```
也通过this.$route.params获取 

注意：这里通过router-link传递参数的方式是隐式传参

### 2. vue-router 路由模式有几种？
* hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器
* history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式
* abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### 3. vue-router 中常用的 hash 和 history 路由模式实现原理
（1）hash 模式的实现原理
早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：` https://www.word.com#search`
hash 路由模式的实现主要是基于下面几个特性：
* URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
* hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
* 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
* 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

（2）history 模式的实现原理
HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：
```
window.history.pushState(data, title, path);
window.history.replaceState(null, null, path);
```
history 路由模式的实现主要基于存在下面几个特性：
* pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
* 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
* history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。


### 18、vue-router 路由模式有几种？
vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}
其中，3 种路由模式的说明如下：

hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；

history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### 19、能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？
 1. hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

https://www.word.com#search
hash 路由模式的实现主要是基于下面几个特性：

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

2. history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。


### vue-router 的导航钩子,主要用来作用是拦截导航,让他完成跳转或取消。
全局的:前置守卫、后置钩子（beforeEach，afterEach）beforeResolve
单个路由独享的:beforeEnter
组件级的: beforeRouteEnter（不能获取组件实例 this）、beforeRouteUpdate、beforeRouteLeave
这是因为在执行路由钩子函数beforRouteEnter时候，组件还没有被创建出来；
先执行beforRouteEnter，再执行组件周期钩子函数beforeCreate，可以通过 next 获取组件的实例对象，如：next( (vm)=>{} )，参数vm就是组件的实例化对象。

### 完整的 vue-router 导航解析流程
  1. 导航被触发；
  2. 在失活的组件里调用beforeRouteLeave守卫；
  3. 调用全局beforeEach守卫；
  4. 在复用组件里调用beforeRouteUpdate守卫；
  5. 调用路由配置里的beforeEnter守卫；
  6. 解析异步路由组件；
  7. 在被激活的组件里调用beforeRouteEnter守卫；
  8. 调用全局beforeResolve守卫；
  9. 导航被确认；
  10. 调用全局的afterEach钩子；
  11. DOM更新；
  12. 用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数。

  ### vue-router如何响应 路由参数 的变化？
    * 原来的组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用。你可以简单地 watch (监测变化) $route 对象：
    ```js
     const User = {
            template: '...',
            watch: {
                '$route' (to, from) {
                // 对路由变化作出响应...
                }
            }
        }

        const User = {
            template: '...',
            watch: {
                '$route' (to, from) {
                // 对路由变化作出响应...
                }
            }
        }
    ```

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