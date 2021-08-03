<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
{{c}}
 <el-button @click="myclick($event)"> getMethod--</el-button>
  <comp-setup :titleInfo="titleInfo"></comp-setup>
</template>

<script lang="ts">
import CompSetup from './CompSetup.vue'
import { ref, defineComponent } from 'vue'
import { useStore } from "../store";

interface ToDo{
  name:string,
  flag:boolean
}

export default defineComponent({
  name: 'HelloWorld',
  data(){
    return{
      titleInfo:{
        value:"学习vue",
        color:"red"
      }
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
   components:{
    CompSetup
  },
  mounted(){
    this.$store.state.todos
  },
  emits:['getMethod'],
  setup: (props,ctx) => {
    const count = ref(0)
    const store = useStore()
     const myclick = (e:MouseEvent)=>{
      // console.log(e)
       count.value -= 2
       ctx.emit("getMethod", count.value)
    }    
    store.dispatch('getUsers')

    const c = store.state.counter

     ctx.expose({
      someMethod(c:number){
        console.log("someMethod!"+c)
      }
    })

    return { count,c ,myclick}
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
