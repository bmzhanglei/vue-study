<template>
  <div class="border2">
    <h3 :style="{ color: theme.color }">E 结点</h3>
    <button @click="handleClick">改变color为green</button>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    theme: {
      default: ()=>({color:"pink"})
    }
  },
  methods: {
    handleClick() {
      if (this.theme.changeColor) {
        const color= this.theme.color==="blue"?"green":"blue"
        this.theme.changeColor(color);
      }
    }
  }
};
</script>
