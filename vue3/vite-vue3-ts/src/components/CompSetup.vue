<template>
  <Comp></Comp>
  ------------------------------------------------<br />
  {{ count }}
  ------------------------------------------------<br />
  <div v-for="item in items" :key="item.id">
    {{ item.name + "---" + item.id}}
  </div>
  {{ titleInfo.value }}<br />
  <el-input v-model="todoName" @keydown.enter="addTodo(newTodo(todoName))"></el-input>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import type { TitleInfo, Todo } from "../types";
export default defineComponent({
  name: "CompSetup",
  data() {
    return {
    //   count: 222,
    //   todoName: "CompSetup",
    //   items: [] as Todo[],
    };
  },
  props: {
    // titleInfo: {
    //   type: Object as PropType<TitleInfo>,
    //   required: true,
    // },
  },
  created() {},
  computed: {
    // newTodo(){
    //     return (name:string):Todo=>({
    //         id:this.items.length+1,
    //         name:name,
    //         completed:false
    //     })
    // }
  },
  methods: {
    // addTodo(item:Todo):void{
    //     this.items.push(item)
    // }
  },
});
</script>

<script lang="ts" setup>
import { ref} from "vue";
import Comp from "./Comp.vue";
import {useStore} from '../store/index'

// 定义属性
defineProps({
  titleInfo: {
    // 结合断言和PropType
    type: Object as PropType<TitleInfo>,
    required: true,
  },
});

const store = useStore()
const count = ref(111);

const items = ref([] as Todo[]);

const todoName = ref("");
const newTodo = computed(() => (name: string): Todo => ({
  id: items.value.length + 1,
  name: name,
  completed: false,
}));
const addTodo = (item: Todo): void => {
  items.value.push(item);
  todoName.value = "";
};
</script>
