<template>
  <div class="hello">
    {{value}}
   {{list1}}<br>
   ------{{$attrs}}--
   <button @click="btnHandle"> button</button>
   <Counter v-bind="$attrs"/>
  </div>
</template>

<script>
import Counter from "./Counter"
export default {
  name: "HelloWorld",
  inheritAttrs:true,
  props: {
    value: String
  },
  data(){
    return {
       list1:[], 
    }
  },
  components:{
    Counter
  },
  methods:{
    btnHandle(){
     this.$emit('input',"小红")
    }
  },
  created(){
   
   
    setTimeout(()=>{
       const l = [{name:'a'},{name:'b'},{name:'c'},{name:'d'},{name:'e'},{name:'f'}]

    // this.list1.length = l.length  // 修改数组长度 为for循环准备  这里vue是不会被监听的
    // this.list1 = [...l]
      // for(let i =0;i<l.length;i++){
      //     this.list1[i]=l[i] // 索引赋值 这里vue也是不会监听的
      //     console.log(this.list1[i])
      // }
    },3000)

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
