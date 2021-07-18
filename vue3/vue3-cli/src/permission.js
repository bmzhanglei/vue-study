import constantRoutes from  '@/router/constantModules/userManager'
import router from './router'
import store from "./store";
router.beforeEach(async (to,from ,next)=>{
  // const store = useStore()

  if(to.path!== "/login"){   
    // if(!store.getters.addRouters){    
    //   await store.dispatch("app/setRouter", constantRoutes[0]);
    // }
    // console.log(to.matched)

    // console.log(store.getters.addRouters)
    // router.addRoute(store.getters.addRouters)
    const r2 = router.getRoutes()
    console.log(r2)
    constantRoutes.forEach(item=>{
      router.addRoute(item)
      const r = router.getRoutes()
      console.log(r)
    }) 
    next()
    // if(to.path==="/layout/home"){
    //   next({path:to.path})    
    // }else{
      
    // }
    // next({ ...to, replace: true })
  }
  next()

//  setTimeout(()=>{
// },100)
     

})          
            