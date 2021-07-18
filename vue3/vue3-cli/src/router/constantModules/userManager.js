

import Home from '@/layout/Home.vue'
import Layout from '@/layout/index.vue'
const UserManagerRouter = [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    // },
    {
        
        path: '/layout',
        name: 'Layout',
        component: ()=>import('@/layout/index.vue'),
        redirect: '/layout/home',
        children:[
            {
                path: 'home',
                name: 'Home',
                component: Home
            },
            {
                path: 'about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/layout/About.vue')
            }
        ]
      }
    
  ]
  export default UserManagerRouter