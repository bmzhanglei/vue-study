<template>
  <div :class="{active:isActive}" @click="navigate">
      {{route.name}}     
  </div>
</template>

<script>
import {RouterLink,useLink} from 'vue-router'
export default {
    props:{
       ...RouterLink.props,
       inActiveClass:String
    },
    setup(props){
        //获取RouterLink内部属性和方法
       const {route,href,isActive,isExactActive,navigate} = useLink(props)
       return {route,isActive,navigate}
    }
}
</script>
<style scoped>
.active{
    background-color: green;
}
</style>