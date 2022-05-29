
### Highlights:
   1. Performance
   2. Tree-shaking surport 
   3. Composition API
   4. Fragment, Teleport,Suspense
   5. Better TypeScript support
   6. Custom Renerer API //允许用户自定义目标渲染平台

### Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？—— 响应式优化（高频，重点！！！）
   * defineProperty API 的局限性最大原因是它只能针对单例属性做监听
   * Proxy API的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作， 这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码
   * 响应式是惰性的
     1. vue2 执行 Object.defineProperty 把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗
     2. vue3 处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，减少性能消耗。

### Vue3.0 编译做了哪些优化？（底层，源码）
  1. 生成 Block tree
    * 在2.0里，渲染效率的快慢与组件大小成正相关：组件越大，渲染效率越慢。并且，对于一些静态节点，又无数据更新，这些遍历都是性能浪费。
    * 在3.0里，渲染效率不再与模板大小成正相关，而是与模板中动态节点的数量成正相关
  2. slot 编译优化
    * Vue.js 2.x 中，如果有一个组件传入了slot，那么每次父组件更新的时候，会强制使子组件update，造成性能的浪费。
    * 动态slot指的是在slot上面使用v-if，v-for，动态slot名字等会导致slot产生运行时动态变化但是又无法被子组件track的操作。
  3. diff算法优化

### Vue3.0是如何变得更快的？（底层，源码）
  1. diff方法优化
    * Vue2.x 中的虚拟dom是进行全量的对比。
    * Vue3.0 中新增了静态标记（PatchFlag）：在与上次虚拟结点进行对比的时候，值对比带有patch flag的节点，并且可以通过flag 的信息得知当前节点要对比的具体内容化。
  2. hoistStatic 静态提升
    * Vue2.x : 无论元素是否参与更新，每次都会重新创建
    * Vue3.0 : 对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用。
  3. cacheHandlers 事件侦听器缓存 
    * 默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可。

### setup的使用
1. setup的执行时机
beforeCreate:组件被创建出来，组件的methods和data还没初始化好
setup ：在beforeCreate和created之间执行
created:组件被创建出来，组件的methods和data已经初始化好了
2. setup注意点
由于在执行setup的时候，created还没有创建好，所以在setup函数内我们是无法使用data和methods的。
所以vue为了让我们避免错误的使用，直接将setup函数内的this执行指向undefined
setup函数只能是同步而不能是异步

### .sync修饰符与v-model的区别
**相同点：**都是语法糖，都可以实现父子组件中的数据的双向通信。
区别点：
格式不同。 v-model=“num”, :num.sync=“num” 
v-model： @input + value  
:num.sync: @update:num
* 在vue3中
v-model="val",v-model:text="inputText",
子组件
pops:{
  modelValue:String,
  text:String
},
emits:['update:modelValue','update:text']
setup(props,ctx){
  ctx.emit('update:text',params)
}

另外需要特别注意的是: v-model只能用一次；.sync可以有多个。

### Vue中如何扩展一个组件
1. 按照逻辑扩展和内容扩展来列举，
  * 逻辑扩展有：mixins、extends、composition api；
  * 内容扩展有slots；
2. 分别说出他们使用方法、场景差异和问题。
3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化

### diff算法
1.Vue中的diff算法称为patching算法，它由Snabbdom修改而来，虚拟DOM要想转化为真实DOM就需要通过patch方法转换。
2.最初Vue1.x视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟DOM和patching算法支持，但是这样粒度过细导致Vue1.x无法承载较大应用；Vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，此时就需要引入patching算法才能精确找到发生变化的地方并高效更新。
3.vue中diff执行的时刻是组件内响应式数据变更触发实例执行其更新函数时，更新函数会再次执行render函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转化为对应的DOM操作。
4.patch过程是一个递归过程，遵循深度优先、同层比较的策略；以vue3的patch为例：
首先判断两个节点是否为相同同类节点，不同则删除重新创建
如果双方都是文本则更新文本内容
如果双方都是元素节点则递归更新子元素，同时更新元素属性
更新子节点时又分了几种情况：
  新的子节点是文本，老的子节点是数组则清空，并设置文本；
  新的子节点是文本，老的子节点是文本则直接更新文本；
  新的子节点是数组，老的子节点是文本则清空文本，并创建新子节点数组中的子元素；
  新的子节点是数组，老的子节点也是数组，那么比较两组子节点，更新细节blabla
vue3中引入的更新策略：编译期优化patchFlags、block等

### vue3新特性
1. api层面Vue3新特性主要包括：
   Composition API、
   SFC Composition API语法糖、
   Teleport传送门、
   Fragments 片段、
   Emits选项、
   自定义渲染器、
   SFC CSS变量、
   Suspense
2. 另外，Vue3.0在框架层面也有很多亮眼的改进：
    更快
      虚拟DOM重写
      编译器优化：静态提升、patchFlags、block等
      基于Proxy的响应式系统
    更小：更好的摇树优化
    更容易维护：TypeScript + 模块化
    更容易扩展
      独立的响应化模块
      自定义渲染器

### 如果让你从零开始写一个vue路由，说说你的思路
一个SPA应用的路由需要解决的问题是页面跳转内容改变同时不刷新，同时路由还需要以插件形式存在，所以：
1. 首先我会定义一个createRouter函数，返回路由器实例，实例内部做几件事：
    保存用户传入的配置项
    监听hash或者popstate事件
    回调里根据path匹配对应路由
2. 将router定义成一个Vue插件，即实现install方法，内部做两件事：
    实现两个全局组件：router-link和router-view，分别实现页面跳转和内容显示
    定义两个全局变量：$route和$router，组件内可以访问当前路由和路由器实例

### key的作用
1. key的作用主要是为了更高效的更新虚拟DOM。
2. vue在patch过程中判断两个节点是否是相同节点是key是一个必要条件，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。
3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。
4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

### nextTick的使用和原理
1. nextTick是等待下一次 DOM 更新刷新的工具方法。
2. Vue有个异步更新策略，意思是如果数据变化，Vue不会立刻更新DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用nextTick。
3. 开发时，有两个场景我们会用到nextTick：
  * created中想要获取DOM时；
  * 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度。
4. nextTick签名如下：function nextTick(callback?: () => void): Promise<void>
  * 所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以await nextTick()方法返回的Promise之后做这件事。
5. 在Vue内部，nextTick之所以能够让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数(flushSchedulerQueue)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，callback自然能够获取到最新的DOM值。

### watch 与 watchEffect 区别
watch
  1. 刚开始不会侦听，只有当数据改变时候才会侦听   
  2. 具体侦听某一个属性的值
  3. 能侦听属性之前的值和现在值
  4. 可配置的，要不要深度监视
     可以修改为非惰性 ，需要  immediate : true
     深度监视：deep: true
watchEffect：
  1. 非惰性，页面加载就能侦听到  
  2. 更加抽象，侦听所有属性值，在内部变化的值都可以侦听到 
  3. 不能访问之前的值，只能获取当前属性最新值

### 怎么缓存当前的组件？缓存后怎么更新？
1. 开发中缓存组件使用keep-alive组件，keep-alive是vue内置组件，keep-alive包裹动态组件component时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>  
```
2. 结合属性include和exclude可以明确指定缓存哪些组件或排除缓存指定组件。vue3中结合vue-router时变化较大，之前是keep-alive包裹router-view，现在需要反过来用router-view包裹keep-alive：
```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```
3. 缓存后如果要获取数据，解决方案可以有以下两种：
beforeRouteEnter：在有vue-router的项目，每次进入路由的时候，都会执行beforeRouteEnter
```js
beforeRouteEnter(to, from, next){
  next(vm=>{
    console.log(vm)
    // 每次进入路由执行
    vm.getData()  // 获取数据
  })
},
//actived：在keep-alive缓存的组件被激活的时候，都会执行actived钩子
activated(){
	  this.getData() // 获取数据
},
```
4. keep-alive是一个通用组件，它内部定义了一个map，缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的component组件对应组件的vnode，如果该组件在map中存在就直接返回它。由于component的is属性是个响应式数据，因此只要它变化，keep-alive的render函数就会重新执行。

### 从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织

### 总结的vue最佳实践有哪些
1. 编码风格方面：
    命名组件时使用“多词”风格避免和HTML元素冲突
    使用“细节化”方式定义属性而不是只有一个属性名
    属性名声明时使用“驼峰命名”，模板或jsx中使用“肉串命名”
    使用v-for时务必加上key，且不要跟v-if写在一起
2. 性能方面：
    路由懒加载减少应用尺寸
    利用SSR减少首屏加载时间
    利用v-once渲染那些不需要更新的内容
    一些长列表可以利用虚拟滚动技术避免内存过度占用
    对于深层嵌套对象的大数组可以使用shallowRef或shallowReactive降低开销
    避免不必要的组件抽象
3. 安全：
    不使用不可信模板，例如使用用户输入拼接模板：template: <div> + userProvidedString + </div>
    小心使用v-html，:url，:style等，避免html、url、样式等注入

### 说说从 template 到 render 处理过程
1. Vue中有个独特的编译器模块，称为“compiler”，它的主要作用是将用户编写的template编译为js中可执行的render函数。
2. 之所以需要这个编译过程是为了便于前端程序员能高效的编写视图模板。相比而言，我们还是更愿意用HTML来编写视图，直观且高效。手写render函数不仅效率底下，而且失去了编译期的优化能力。
3. 在Vue中编译器会先对template进行解析，这一步称为parse，结束之后会得到一个JS对象，我们成为抽象语法树AST，然后是对AST进行深加工的转换过程，这一步成为transform，最后将前面得到的AST生成为JS代码，也就是render函数。

### Vue实例挂载的过程中发生了什么?
1. 挂载过程指的是app.mount()过程，这个过程中整体上做了两件事：初始化和建立更新机制
2. 初始化会创建组件实例、初始化组件状态，创建各种响应式数据
3. 建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行patch将前面获得vnode转换为dom；同时首次执行渲染函数会创建它内部响应式数据之间和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数。