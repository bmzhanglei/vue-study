<template>
  <div class="hello">
    <h5>自定义指令</h5>
    <div class="tab" @click="handleTabClick($event)" v-tab="{
        className:'item-btn',
        activeClass:'active',
        curIndex
      }">
        <button data-index="0" class="item-btn">选项1</button>
        <button data-index="1" class="item-btn">选项2</button>
        <button data-index="2" class="item-btn">选项3</button>
      </div>
         <h5>插件</h5>
         <my-button>我的按钮</my-button> 
         <my-input placeholder="66666666"></my-input>
  </div>
</template>

<script>
import {ref}  from 'vue'
import {tab} from '@/directives'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   components: {
    // About,MyBook
  },
  directives:{
    tab
  },
  setup(){
      // derective
    let curIndex = ref(0)
    const handleTabClick=(e)=>{  
      if(e.target.tagName.toLowerCase() === "button"){
         curIndex.value = e.target.dataset.index
      }    
    }

    return {
      handleTabClick,
      curIndex
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
  background-color: yellow;
}
</style>
