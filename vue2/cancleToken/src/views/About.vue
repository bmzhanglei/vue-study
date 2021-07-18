<template>
  <div class="about">
    <h1>This is an about page</h1>
    <textarea name="" id="" cols="30" rows="1"></textarea>
    <div contentEditable='true' class='edit'>11</div>

      <button @click='add'>add</button>
      <input type="text" value='xxxxx' @blur='onBlur'/>
  </div>
</template>

<script>
  import { AApi, BApi, CApi ,DApi} from '../api';
  import axios from 'axios';
  export default {
    name: 'about',
    methods:{
      add(){
        console.log('add')
      },
      onBlur(){
         console.log('blur')
      }
    },
    mounted() {
      AApi().then(res=>{
        console.log(res)
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('请求被关闭了');
        } else {
          console.log('请求出问题了');
        }
      });

      BApi().then(res=>{
        console.log(res)
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('请求被关闭了');
        } else {
          console.log('请求出问题了');
        }
      });

      CApi().catch(err => {
        if (axios.isCancel(err)) {
          console.log('请求被关闭了');
        } else {
          console.log('请求出问题了');
        }
      });

      DApi().then(res=>{
        debugger
      })
    }
  }
</script>
<style>
textarea{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height:15px
}

.edit{
border:1px solid #dddddd;width:100px;outline:0px;
  text-align: left;
 overflow: hidden;
 height: 20px;
   text-overflow: ellipsis;
   white-space: nowrap;
  /*  white-space: wrap;
  
  word-break: break-all;
  word-wrap: break-word; */
}
.edit:focus{
   height: auto;
   white-space:normal;
  text-overflow:initial;

}
</style>
