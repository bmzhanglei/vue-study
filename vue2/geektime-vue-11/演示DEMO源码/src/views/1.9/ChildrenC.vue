<template>
  <div class="border1">
    <h2>C 结点</h2>
    <!-- <ChildrenE v-ant-ref="c => setChildrenRef('childrenE', c)"/> -->
    <ChildrenE/>
    <ChildrenF />
  </div>
</template>
<script>
import ChildrenE from "./ChildrenE";
import ChildrenF from "./ChildrenF";
export default {
  components: {
    ChildrenE,
    ChildrenF
  },
  // inject: {
  //   setChildrenRef: {
  //     default: () => {}
  //   }
  // }
};
</script>
