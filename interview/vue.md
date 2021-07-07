#### 属性 事件 插槽
* 自定义属性
```js
props:{  
  propE:{
    type:Object,
    default:()=>{}
  },
  propF:{
    validator:function(value){
      return ['success','warning','danger'].includes(value)
    }
  },
  propChange:{
    type:Function,
    default:()=>{}
  }
}
```
* 原生属性attrs  inheritAttrs:false
* 特殊属性class、style
* 普通事件
* 修饰符事件
* 普通插槽
* 作用域插槽
```html
<!--Slot.vue-->
<slot name='item' v-bind="{value:'vue'}"> </slot>
<!--index.vue-->
<SlotDemo>
  <template v-slot:item="props">
     <p>item slot-scope {{props.value}}</p>
  </template>
</SlotDemo>

<!--大属性-->
<BigProps 
  :slot-title="getTitle()"
  :slot-scope-item="getItem"
></BigProps>

methods:{
  getTitle(){
    return [
      this.$createElement("p","title slot1")
      this.$createElement("p","title slot2")
    ]    
  },
  getItem(props){
    return [
      this.$createElement("p",`item slot-scope ${JSON.stringify(props)}`)
    ]
  }
}

<VNodes :vnode="slotScopeItem({value:'vue'})"/>
components:{
   VNodes:{
     functional:true,
     render:(h,ctx) => ctx.props.vnodes
   }
},
props:{
  slotTitle:Array,
  slotScopeItem:{
    type:Function,
    default:()=>{}
  }
}
```

#### 双向绑定 or 单向数据流
* Vue是单向数据流，不是双向绑定
* Vue的双向绑定不过是语法糖
* Object.defineProperty 是用来做响应式更新的，和双向绑定没关系
```html
<PersonalInfo v-model="phoneInfo" :zip-code.sync="zipCode"/>
<PersonalInfo :phone-info="phoneInfo" @change="val=>(phoneInfo=val)" 
   :zip-code="zipCode" @update:zipCode="val=>(zipCode=val)"/>

<!--PersonalInfo.vue-->
<input :value="phoneInfo.phone" type="number" @input="handlePhoneChange"/>
<input :value="zipCode" @input="handleZipCodeChange"/>
```
```js
export default{
  name:"PersonalInfo",
  model:{
    prop:"phoneInfo",
    event:"change"
  },
  props:{
    phoneInfo:Object,
    zipCode:String
  },
  methods:{
    handlePhoneChange(e){
      this.$emit("change",{...this.phoneInfo,phone:e.target.value})
    },
    handleZipCodeChange(e){
      this.$emit('update:zipCode',e.target.value);
    }
  }
}
```

#### 如何触发组件更新
+ 数据来源
  - 来自父元素属性
  - 来自组件自身的状态 data
  - 来自状态管理器，如vuex,Vue.observable

#### 生命周期
* 创建阶段 beforeCreate -> created -> beforeMount -> render -> mounted 
* 更新阶段 beforeUpdate -> render -> updated 
* 销毁阶段 beforeDestory -> destroyed -> unbind

#### 常用高级特性 provide/inject

#### 查看组件生命周期和指令周期钩子的运行顺序
* beforeCreated -> data -> created -> beforeMount -> render -> bind -> mounted -> inserted
* 更新 componentUpdated -> beforeUpdate -> render -> updated
* 销毁 beforeDestroy -> destroyed -> unbind

#### 设计一个秒杀倒计时组件
* Demo 1.6_a

#### 对 Watch1 Demo进行节流改造，即直到用户停止输入超过500毫秒后，才更新fullName
* setTimeout
* lodash debounce 
* Demo 1.5/Watch1_pro

#### 数组有那些方法支持响应式更新，如不支持如何处理，底层原理如何实现的？
* 支持：push(),pop(),shift(),unshift(),splice(),sort(),reverse()
* 不支持：filter()、concat()、slice()
* 原理同样是使用Object.defineProperty对数组方法进行改写

#### 扩展PersonalInfo Demo对手机号做非空且合法校验，如不合法则给出错误提示

#### 子组件为何不可以修改父组件传递Prop,如果修改了，Vue是如何监控到属性的修改并给出警告的？
```js
//父组件
handleProxyChange(val){
  window.isUpdatingChildComponent = true;
  ...
}
//子组件
propsP{
  info:Object
},
created(){
  this.temp = {name:''};
  Object.keys(this.temp).forEach(key=>{
    proxy(this.info,this.temp,key)
  })
}
//proxy.js
const sharedPropertyDefinition={
  enumerable:true,
  configuarable:true
};
export default function proxy(target,temp,key){
  sharedPropertyDefinition.get=function proxyGetter(){
    return temp[key];
  }
  sharedPropertyDefinition.set=function proxySetter(val){
    temp[key] = val;
    if(!window.isUpdatingChildComponent){
      console.error(`不可以更改：${key}`);
    }
    window.isUpdatingChildComponent = false;
  }
  Object.defineProperty(target,key,sharedPropertyDefinition);
}
```

#### this.$emit的返回值是什么？
* this
* 如果需要返回值可以使用回调参数
```js
//子组件
handleChange(e){
  const res = this.$emit('change',e.target.value,val=>{
    console.log(val)
  })
  console.log(res, res === this)
}
//父组件
handleEventChange(val,callback){
  this.name = val;
  callback("hello");
}
```

#### 相同名称的插槽是合并还是替换？
* v2.5版本，普通插槽合并、作用域插槽替换
* v2.6版本，都是替换


#### 使用2.6最新 API Vue.observable 优化响应式 provide
```js
provide() {
    this.theme = Vue.observable({
      color: "blue"
    });
    return {
      theme: this.theme
    };
  },
```

#### 获取跨层级组件实例 ref (拒绝递归) callback ref
* 主动通知 （setXxxRef）
* 主动获取 （getXxxRef）

#### v-ant-ref 指令回调中能否更改响应式数据？ why?
* 不能，会死循环

#### 为什么不能用index作为key?
* 更新 DOM 性能问题
* 会引入状态Bug问题

#### template vs JSX

#### SPA的缺点有哪些，如何解决？
* SEO 
* 首屏渲染时间长
#### 对于动态内容，如果不使用SSR，如何做SEO
* 使用无头浏览器（phantomjs、headlessChrome）