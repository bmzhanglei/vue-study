<template>
  <div class="border2">
    <h3 v-ant-ref="c => setChildrenRef('childrenE', c)">
      E 结点
    </h3>
    xxxxx
  </div>
</template>
<script>
export default {
  data(){
    return {
      ee:'eeeeee'
    }
  },
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
};
</script>
