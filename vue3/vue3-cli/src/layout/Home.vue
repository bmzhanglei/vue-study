<template>
  <div class="home">
    <img alt="Vue logo" src="~assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){

    const route = useRoute()  
    console.log(route.params)

   onMounted(()=>{
      console.log("onMounted!!!")

      // let img = new Image()
      // img.src = require("assets/logo.png")
      // document.querySelector(".home").appendChild(img)

      // fetch("/api/user").then(res=>res.json()).then(res=>{
      //   console.log(res)
      // })

      if(window.init){ 
          var a=1; 
        }else{ 
          var a=2; 
        }
   })
  }
}
</script>
<style scoped>


</style>
