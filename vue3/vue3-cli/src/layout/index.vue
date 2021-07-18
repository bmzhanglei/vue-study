<template>
  <div>Layout组件
     <router-link to="/layout/home"> {{$t('msg.Home')}}-{{ll}}</router-link> |
     <router-link to="/layout/about">{{$t('about.About')}}</router-link>
      <router-view /> 
  </div>
</template>

<script>
import { getCurrentInstance , watch,computed,ref, toRef} from 'vue';
import Home from '@/layout/Home.vue'
export default {
   setup(){
    const {proxy:{$i18n:{locale}},appContext:{config:{globalProperties:{$utils}}}} =getCurrentInstance()
     console.log(locale)

     const Component = Home
     debugger
    //let lang = computed(()=>getCurrentInstance().proxy.$i18n)  
   
     const ll = toRef(getCurrentInstance().proxy.$i18n,"locale")
  
        watch(ll,(val,oldVal)=>{
        
        })

     

    return {
      ll,
      Component
    }
   }
}
</script>

<style>

</style>