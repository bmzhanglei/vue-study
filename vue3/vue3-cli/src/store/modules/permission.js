import { constantRoutes } from '@/router'
 
 const state = {
    routes: [],
    dynamicRoutes: []
  }

  const mutations = {
    SET_ROUTES(state, routes) {
      state.routes = constantRoutes.concat(routes)
      state.dynamicRoutes = routes
    }
  
  }

  const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => {
        if (route.meta?.roles !== undefined) {
          return route?.meta?.roles.includes(role)
        }
      })
    } else {
      return true
    }
  }

  export const filterAsyncRoutes = (routes, roles) => {
    const res = []  
    routes.forEach(route => {
      const r = { ...route }
      if (hasPermission(roles, r)) {
        if (r.children) {
          r.children = filterAsyncRoutes(r.children, roles)
        }
        res.push(r)
      }
    })
    return res
  }
  
  const actions = {
    ACTION_SET_ROUTES({ commit }, roles) {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit("SET_ROUTES", accessedRoutes)
      }
  }

 export default {
    namespaced: true,
    state,
    mutations,
    actions
}