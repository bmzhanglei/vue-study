

```js
//传值给默认值
import {withDefaults,defineExpose} from "vue"
type Props ={
    title:string;
    size?:number
}
const props = withDefaults(defineProps<Props>(),{
    title:"123"
})

//emit
const emit = defineEmits(["change-page"])
function changePage(){
    emit("change-page")
}

//暴露自组件里的变量
const a = "a"
function getName(){}
defineExpose({
    a,
    getName
})
//父组件通过ref调用
```