<template>
   <div>
       登陆页面
       <button @click="logins">登陆</button>
   </div>
</template>

<script>
import { computed, onMounted, getCurrentInstance } from 'vue';
import {userLogin} from '@/apis/user'
import  router from "@/router";
import { useStore } from "vuex";
 import constantRoutes from  '@/router/constantModules/userManager'
export default {
   setup(){
      const { dispatch,state } = useStore();
        const logins =  ()=>{
            userLogin({"username":"admin"}).then(res=>{   
                // router
                // debugger       
                                   
                //    router.push("/layout/home/111");
                
                //    dispatch("app/setRouter", constantRoutes[0]);
                //    debugger
                // router.addRoute(state.app.addRouters)  
                   router.push("/layout");
            })
        }

          onMounted(()=>{
                // console.log("constantRoutes",constantRoutes)
            })

        return {
            logins
        }
   }
}
</script>

<style>

</style>