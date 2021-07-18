<template>
  <router-view/>
</template>
<script>
import router from './router'
import constantRoutes from  '@/router/constantModules/userManager'
export default {
  beforeCreate(){
//     router.beforeEach(async (to,from ,next)=>{
// //   debugger
//   if(to.path!== "/login"){    
//     constantRoutes.forEach(item=>{
//       router.addRoute(item)
//       const r = router.getRoutes()
//       console.log(r)
//     })     
//     // next({ ...to, replace: true })
//   }
//     next()
     

// })   
  },
  setup(props,context) {
 
  },
}
</script>

<style>

</style>
