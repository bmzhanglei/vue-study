<template>
 <ul>
    <li v-for="item in todos" :key="item.id">{{item.name}}</li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, defineComponent} from 'vue'
import { useStore } from '../store';
  const {state,dispatch} = useStore();
 const todos = computed(()=>state.todos?.todos)
</script>


<style>

</style>