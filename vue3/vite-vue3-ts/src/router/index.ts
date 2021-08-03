import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export type AppRouteRecordRaw = RouteRecordRaw & {hidden?:boolean}

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/home',   
            hidden:true,
            component:()=>import("@/views/Home.vue"),
            meta:{
                title:"代办列表",
                icon:""
            }
        },
            {
            path:'/add',
            component:()=>import("@/views/AddTodo.vue")
        },
    ] as AppRouteRecordRaw[]
})

export default router