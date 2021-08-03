<template>

 <input type="text" v-model="name" @keydown.enter="addTodo"/>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

    const name = ref("")
    const {dispatch,state} = useStore()
    const router = useRouter()

  const addTodo = async()=>{
    await dispatch("todos/addTodo",name.value)
    router.push("/")
  }
</script>

<style>

</style>