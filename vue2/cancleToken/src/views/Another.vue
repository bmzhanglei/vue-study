<template>
    <div>
        <my-input :form.sync="form"></my-input>
        <button @click='getData'>获取数据</button>
    </div>
</template>

<script>
import MyInput from '../components/MyInput'
    export default {
        data(){
            return{
              form:{
                name:'rrr',
                age:88
              }
            }
        },
        components:{MyInput},
    
        methods:{
            getData(){
                console.log(this.form.name,this.form.age)
                this.form.name='指定到'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>