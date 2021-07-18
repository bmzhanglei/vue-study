
//vue3  watchEffect
const count = ref(0)

function  getData(){
    return new Promise((resolve,reject)=>{
        resolve(100)
    })
}

setTimeout(()=>{
    count.value = 2
},1000)

//如果要访问 dom ,必须放到 onMounted
const stop = watchEffect(async (onInvalidate)=>{
    console.log(count.value)   //1
    const data = await getData();
     //这里隐式返回promise  ,可以对其进行处理
    onInvalidate(()=>{
        console.log("onInvalidate is triggered!")  //count变化,这里先执行
    })
},{
  flush: 'pre' | 'post' | 'sync', //默认 pre
  onTrack(e){
      debugger //的时候用，只会在开发模式下用
    console.log('track',e) //首次会打印
  },
  onTrigger(e){
    debugger //的时候用 只会在开发模式下用
    console.log('trigger',e) //依赖改变的时候才会执行
  }
})

onBeforeUpdate(()=>{
    console.log("onBeforeUpdate")  //2   默认在更新之后调用
})


//react useEffect
const [count,setCount] = useState(0)

setTimeout(()=>{
    setCount(1)
},2000)

useEffect(()=>{  //这里不能用 async ，否则隐式返回promise 会和下面的return 冲突
    const getNewData = async ()=>{
        const data = await getData()  //promise错误只能在这个函数里处理
    }
    getNewData()
    console.log(count)
    return ()=>{
        console.log("onInvalidate is triggered!")  //count变化,这里先执行
    }
},[count])

//vue watch
const stop = watch(count,(newCount,oldCount,onInvalidate)=>{
    onInvalidate(()=>{
        console.log("onInvalidate is triggered!")
    })
},{
    flush:'pre' | 'post' | 'sync',
    onTrack(e){},
    onTrigger(e){},
})