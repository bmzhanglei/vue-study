<script lang='tsx'>
import {defineComponent,ref} from 'vue'
export default defineComponent({
    setup(props,ctx){
      const arr = ref<number[]>([1,2,3])
      const click = (e:MouseEvent,val:number):void=>{
          console.log(e)
      }
     return ()=>(
         <>
            {
                arr.value.map((item,index)=>{
                    return  (<div onClick={(e)=>{click(e,index)}}>{'Comp-'+item}</div>)
                })
            }                  
        </>
     )
    },
})
</script>
<style scoped>
 div:hover{background-color: #eee;cursor: default;}
</style>