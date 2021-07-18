<template>
  <div class="about">
    <h1>This is an about page ! {{$utils.add(1)}}</h1>  
    <button @click="change('zh')">ZH</button>
    <button @click="change('en')"> EN</button>
    <button @click="setUsername">Vux--setUsername</button>
    <div>{{username}}</div>
  </div>
</template>

<script>
import {computed, getCurrentInstance}  from 'vue'
import { useStore } from "vuex";
export default {
  setup() {
    const { getters, commit, dispatch } = useStore();
    const username = computed(()=>getters.username("😄"))

    const {proxy} = getCurrentInstance()
    const change = (lang)=>{
      proxy.$i18n.locale = lang
    }

    const setUsername= async ()=>{
        await dispatch("app/setUsername", "zhangsan"+Math.random());
    }
      
    return {
      change,
      setUsername,
      username
    }

  },
}
</script>
