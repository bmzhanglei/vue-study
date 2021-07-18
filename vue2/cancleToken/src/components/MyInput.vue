<template>
    <div>
         <input type="text" v-model="form.name" />
         <input type="text" v-model="form.age"/>
        <span> &#xd7;</span>&#10005;&#9800;&trade;<hr>
         
    </div>
</template>

<script>
    export default {    
       
        props:{
            form:{
                type:Object,
                default(){
                    return {
                        name:'xxx',
                        age:333
                    }
                }
            },
           
         
        },
        data(){
            return {
                 arr:[{name:'xx',age:4},{name:'yx',age:44}],
            }
        },
        watch:{
            'form.name'(){
                console.log(this.form.name+'------>')
            }
        },
          mounted(){
           let names =  this.arr.map((item)=>{
                 return  item.name
             })

             console.log(names)
            }
        
    }
</script>

<style scoped>
span{
    color:blue;
    display:inline-block;
    font-size:60px;
    font-weight: lighter;
    transform: rotate(-45deg);
}
</style>