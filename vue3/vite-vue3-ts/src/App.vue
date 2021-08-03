<template>
   <!-- <Jsjiajia-icon>Jsjiajia-{{$utils.add(1,3)}}-{{$t("msg.Home")}}</Jsjiajia-icon> -->
 <h3>Jsjiajia-{{$utils.add(1,3)}}-{{$t("msg.Home")}}</h3> 
  <my-button>我的按钮</my-button> <br>

  <div class="tab" @click="handleTabClick($event)" v-tab="{
  className:'item-btn',
  activeClass:'active',
  curIndex
}">
   <button data-index="0" class="item-btn">选项1</button>
   <button data-index="1" class="item-btn">选项2</button>
   <button data-index="2" class="item-btn">选项3</button>
</div>

  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld ref="hw" @getMethod="getMethod" msg="Hello Vue 3 + TypeScript + Vite" />
   
  <div @click="$store.commit('add')">{{$store.state.counter}}</div>

  <router-view></router-view>
</template>

<script lang="ts">
import { computed,ComputedRef, defineComponent,ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { useStore } from './store';
import {tab} from '@/directives'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  directives:{
    tab
  },
  setup(){
    const {dispatch} = useStore()

    const hw = ref<ComputedRef | null>(null)
    const getMethod = (count:number) => {     
      hw.value.someMethod(count)
    }

     let curIndex = ref(0)
     const handleTabClick=(e:MouseEvent)=>{
        if(e.target.tagName.toLowerCase() === "button"){
         curIndex.value = e.target.dataset.index
      }    
     }
    // onMounted(()=>{
      
    // })
    console.log(import.meta.env) 
  
    dispatch("todos/initTodo")
    return {
       hw,
      getMethod,
      curIndex,
      handleTabClick
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
div{
  cursor: default;
}
.active{
  background-color: orange;
}
</style>
