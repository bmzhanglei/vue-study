<template>
  <div class="home">
    <h1>This is an home page</h1>
    {{getMsg}}<br>


    <base-layout>    
    v-slot部分
    
     <template #header v-slot='slotProps'>
        <h1> header {{slotProps.a}}</h1>
     </template>
    </base-layout>

<button @click='tansHandler'>点我</button>
<button @click='push'>PUSH</button>
<transition name='fade'  @before-enter='beforeEnter'
v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
>
<h2 v-show='show'>动画案例哈哈</h2>

</transition>


<transition>
 <button v-bind:key="docState" @click='pClick'>
 
  </button>
</transition>


  </div>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue'
export default {
  name: 'home',
  data(){
    return {
      docState:"saved",
      val:'on',
      show:true,
      msg:"msgsdfsdf",
      slotProps:{
        a:111
      }
    }
  },
  created(){
    this.$route.query
    debugger
  },
  components:{
    BaseLayout
  },
  computed:{
    //  buttonMessage: function () {
    //     switch (this.docState) {
    //       case 'saved': return 'Edit'
    //       case 'edited': return 'Save'
    //       case 'editing': return 'Cancel'
    //     }
    //   }
 
    getMsg:function(){
      return this.msg+'----'+Math.random()
    }
  },

  methods:{
    tansHandler(){
      this.$set(this,'show',!this.show)
    },
    beforeEnter(){
      console.log('beforeEnter')
    },
    enter(){
      console.log('enter')
    },
    afterEnter(){
      console.log('afterEnter')
    },
    enterCancelled(){
      console.log('enterCancelled')
    },
    pClick(){
      if(this.docState=='edited'){
            this.$set(this,'docState','editing')
      }else if(this.docState=='saved'){
            this.$set(this,'docState','edited')
      }else if(this.docState=='editing'){
            this.$set(this,'docState','saved')
      }
     
    },
    push(){
      // this.$router.push({name:'home',query:{a:111}})
      let routeData = this.$router.resolve({ path: '/home', query: { id: 11111} });
      window.open(routeData.href, '_self');
      // this.$router.push({path: '/home?url=' + this.$route.path});
    }
  },
  mounted(){
    // setInterval(()=>{
    //    this.$set(this,'msg',(Math.random()*1000).toFixed(0)+"")
    //    console.log(this.msg)
    // },3000)
  }
}
</script>
<style>
.fade-enter-active{
 /* transition: all .3s ease-in; */
 /* animation: bounce-in .5s; */
}
.fade-leave-active{
 /* transition: all .3s ease-out; */
 /* animation: bounce-in .5s reverse; */
}
.fade-enter,.fade-leave-to{
  /* transform: translateX(20px); 
  opacity: 0;*/
} 
@keyframes bounce-in{
  0%{
    transform: scale(0)
  }
  50%{
    transform: scale(1.5)
  }
  100%{
    transform: scale(1)
  }
}
</style>
