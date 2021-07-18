import { createRouter, createWebHashHistory,useRouter } from 'vue-router'
import {cancelTokenSources } from '@/apis/https';

const constantFiles = require.context('./constantModules', true, /\.js$/)
let constantModules= []
constantFiles.keys().forEach((key) => {
  if (key === './index.js') return
   constantModules = constantModules.concat(constantFiles(key).default)
})

const asyncFiles = require.context('./permissionModules', true, /\.js$/)
let permissionModules= []
asyncFiles.keys().forEach((key) => {
  if (key === './index.js') return
  permissionModules = permissionModules.concat(asyncFiles(key).default)
})


export const constantRoutes = constantModules

export const dynamicRoutes = permissionModules

const router = createRouter({
  history: createWebHashHistory(),
  // routes:constantRoutes
  routes:[
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    }
  ]
})

// debugger
// router.addRoute(constantModules[0])

// router.beforeEach(async (to,from ,next)=>{
//   // debugger
//   if(to.path!== "/login"){    
//     constantModules.forEach(item=>{
//       router.addRoute(item)
//     })   
//     // next({path:to.path})
//   }

//   next()

// })

router.afterEach(async (to,from ,next) => { // 路由跳转杀请求
  console.log(cancelTokenSources)
  for (const [cancelToken, cancel] of cancelTokenSources) {
    cancel(cancelToken); // cancel 正在pending的请求
  }
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matcher // reset router
}

export default router
