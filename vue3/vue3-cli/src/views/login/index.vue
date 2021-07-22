<template>
   <div>
       <!-- 登陆页面{{aliasUser}}--{{myUser}}--{{age}} -->
      <SvgIcon class="icon" name="email" :size="16" color="red" @clickIcon="clickIcon"/>
       {{name}}---{{username}}
           <button @click="logins">登陆</button>
           <button @click="setName(9999)">setName</button>
           <app-link :to="link" target="_blank">Click me</app-link>
   </div>
</template>

<script>
import { computed, onMounted, getCurrentInstance,ref } from 'vue';
import {userLogin} from '@/apis/user'
import AppLink from '@/components/AppLink.vue'
import  router from "@/router";
import { useStore ,mapState,mapGetters,mapMutations} from "vuex";
 import constantRoutes from  '@/router/constantModules/userManager'
import { onBeforeRouteLeave ,onBeforeRouteUpdate} from 'vue-router';
export default {
    components:{AppLink},
    computed:{
        // ...mapState(['user']), 
        // ...mapState('user',{
        //     name:state => state.name,
        //     aliasUser:'name',
        //     myUser(){
        //         // console.log(this)
        //         return "myUser"
        //     }
        //     // aliasName:'user/name'
        // }), 
        ...mapState('user',['name']),
        ...mapState('app',['username']),

        ...mapGetters(['age'])
    },    
    methods:{
        ...mapMutations({
            setName:'user/SET_NAME'
        }),
        clickIcon(){
            console.log("clickIcon!")
        }
    },
   setup(){
      const { dispatch,state,commit } = useStore();
       
      setTimeout(()=>{
          commit("user/SET_NAME","newName")        
      },2000)


    // onBeforeRouteLeave((to,from)=>{
    //   const answer = window.confirm(
    //     'Do you really want to leave? you have unsaved changes!'
    //   )
    //   // 取消导航并停留在同一页面上
    //   if (!answer) return false
    // })

        const logins =  ()=>{
            userLogin({"username":"admin"}).then(res=>{            
                                   
                //    router.push("/layout/home/111");
                
                //    dispatch("app/setRouter", constantRoutes[0]);
                //    debugger
                    // router.addRoute(constantRoutes[0])  
                   router.push("/layout/home/123?name=ppp");
            })
        }

          onMounted(()=>{
                // console.log("constantRoutes",constantRoutes)
            })


        //  const link = ref("http://www.baidu.com")
        
         const link = ref("/layout/home/999")
        return {
            logins,
            link,
            state
        }
   }
}
</script>

<style scoped>
.icon:hover{cursor: pointer;background: #eee;}
</style>