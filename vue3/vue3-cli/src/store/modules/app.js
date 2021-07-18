
const state = {
   username:"", 
   addRouters:null
}

const mutations = {
    SET_USERNAME(state,payload){
        state.username = payload
    },  
    SET_ROUTER(state,payload){
        state.addRouters = payload
    }
}

const actions = {
    setUsername({commit},payload){
        return new Promise((resolve)=>{
            commit("SET_USERNAME",payload)
            resolve()
        })
    },
    setRouter({commit},payload) {
        commit("SET_ROUTER",payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}