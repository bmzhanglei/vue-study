
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