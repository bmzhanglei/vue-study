<template>
  <div>
    {{ $data }}
    <br />
    <button @click="() => (a += 1)">a+1</button><br>
    ------------------------------------------------------<br>
     <Functional :name="b" /><br>

       <TempVar
          :var1="`hello ${name}`"
          :var2="destroyClock ? 'hello vue' : 'hello world'"
        >
          <template v-slot="{ var2 }">
           <h2> {{ name }}</h2>
            {{ var2 }}
          </template>
        </TempVar>

  </div>
</template>
<script>
import Functional from "./Functional";
import TempVar from "./TempVar";
export default {
  components:{Functional,TempVar},
  data: function() {
    return {
      destroyClock:true,
      name:"章三",
      a: 1,
      b: { c: 2, d: 38888888 },
      e: {
        f: {
          g: 4
        }
      },
      h: []
    };
  },
  created(){
    setTimeout(()=>{
      this.destroyClock = false
    },3000)
  },
  watch: {
    a: function(val, oldVal) {
      this.b.c += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    "b.c": function(val, oldVal) {
      this.b.d += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    "b.d": function(val, oldVal) {
      this.e.f.g += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    e: {
      handler: function(val, oldVal) {
        this.h.push("😄");
        console.log("new: %s, old: %s", val, oldVal);
      },
      deep: true
    },
    h(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    }
  }
};
</script>
