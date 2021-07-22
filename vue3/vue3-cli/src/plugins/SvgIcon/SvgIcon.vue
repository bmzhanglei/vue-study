<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      color: props.color,
    }"
    @mousedown="clickIcon"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: "email",
    },
    size: {
      type: Number,
      default: 32,
    },
    color: {
      type: String,
      default: "#000",
    },
  },
  setup(props,ctx) {
    const clickIcon = ()=>{
       ctx.emit("clickIcon")
    }
    return {
      clickIcon,
      props
    };
  },
};
</script>
