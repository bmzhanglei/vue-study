

import { userLogin, userInfo } from '@/apis/user'
import { removeToken, setToken,getToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import store from '@/store'
const state = {
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: ''
  }

  const mutations={
      SET_TOKEN(state, token) {
        state.token = token
      },    
      SET_NAME(state, name) {
        state.name = name
      },    
      SET_AVATAR(state, avatar) {
        state.avatar = avatar
      },    
      SET_INTRODUCTION(state, introduction) {
        state.introduction = introduction
      },    
      SET_ROLES(state, roles) {
        state.roles = roles
      },    
      SET_EMAIL(state, email) {
        state.email = email
      }
  }

  const actions = {
    async ACTION_LOGIN({ commit },userInfo) {
        let { username, password } = userInfo
        username = username.trim()
        await userLogin({ username, password }).then(async(res) => {
          if (res?.code === 0 && res.data.accessToken) {
            setToken(res.data.accessToken)
            commit('SET_TOKEN', res.data.accessToken)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      ACTION_RESET_TOKEN({ commit }) {
        removeToken()
        commit("SET_TOKEN", '')
        commit("SET_ROLES", [])
      },

      async ACTION_GET_USER_INFO({ commit }) {
        if (state.token === '') {
          throw Error('token is undefined!')
        }
        await userInfo().then((res) => {
          if (res?.code === 0) {
            commit("SET_ROLES", res.data.roles)
            commit("SET_NAME", res.data.name)
            commit("SET_AVATAR", res.data.avatar)
            commit("SET_INTRODUCTION", res.data.introduction)
            commit("SET_EMAIL", res.data.email)
            return res
          } else {
            throw Error('Verification failed, please Login again.')
          }
        })
      },
    
      async ACTION_CHANGE_ROLES({ commit },role ) {
        const token = role + '-token'      
        commit(UserMutationTypes.SET_TOKEN, token)
        setToken(token)
        await store.dispatch(ACTION_GET_USER_INFO, undefined)
        store.dispatch(ACTION_SET_ROUTES, state.roles)
        store.state.permission.dynamicRoutes.forEach((item) => {
          router.addRoute(item)
        })
      },
    
      ACTION_LOGIN_OUT( { commit }) {
        console.log(commit)
        removeToken()
        commit(SET_TOKEN, '')
        commit(SET_ROLES, [])
        resetRouter()
      }
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions
}