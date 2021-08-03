import MyButton from './MyButton.vue'
import MyInput from './MyInput.vue'
const componentPool = [MyInput,MyButton]
export default{
    install(app,options){
        //之前的写法
        // app.component(MyButton.name,MyButton)
        // app.component(MyInput.name,MyInput)
    // console.log('options',options)

    if(options.components){
        options.components.map(compName=>{
            componentPool.map(comp=>{
                if(compName === comp.name){
                    app.component(comp.name,comp)
                }
            })
        })
    }else{
        componentPool.map(comp=>{
            app.component(comp.name,comp)
        })
    }       
    }
}