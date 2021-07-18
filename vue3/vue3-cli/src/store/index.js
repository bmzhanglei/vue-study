import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters.js'
import modules from "./store";

// console.log(modules)

export default createStore({
  modules,
  getters,
  plugins:[createPersistedState({  //状态管理持久化
    storage:window.sessionStorage,
    reducer: data =>{
      console.log(data.app)
      return {
         app:{username:data.app.username}   //指定数据持久化
      }
    }
  })]  
})
