
function sleep(delay) {
    // 获取一个初始时间
    let startTime = new Date().getTime()
    // 如果时间差小于延迟时间，就一直循环
    while (new Date().getTime() - startTime < delay) {
        continue
    }
}
function curry(func) {
    return function curried(...args) {
        console.log(args,func.length)
        if (args.length >= func.length) {
            return func.apply(this, args)
        } else {
           
            return function(...args2) {
                console.log(args2,this.toString())
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

function sum(a, b,c){
    return a * b*c
}
let currfn = curry(sum)
console.log(currfn(1)(3)) 


const curring = (fn,arr = [])=>{
    let len = fn.length;
    return (...args)=>{
        arr = arr.concat(args);
        if(arr.length<len){
            return curring(fn,arr)
        }
        return fn(...arr)
    }
}


function checkType2(type,content){
    return Object.prototype.toString.call(content)===`[object ${type}]`
}
let util = {};
// ['Number','String'].forEach(item=>{
//     util['is'+item] = curring(checkType2)(item)
// })
// console.log(util.isNumber(123))

// let set = new Set([2,'string',{'2':'kk'},{'2':'kk'}]);
// const map = new Map([[1,3],['ff',88]])

// const reporter = {
//     report: function(key, value) {
//       console.log("Key: %s, Value: %s", key, value);
//     }
// };

// map.forEach(function(value, key, map) {
// this.report(key, value);
// }, reporter);

// let a  = Object.create({},{a:{value:11,writable:true,configurable:false}})

// let o = {a:1,b:'bb'}
// let b = {a:2,c:'cc'}

// let c = Object.assign(o,b)

// // console.log({...o,...b})
// console.log(o?.a)
// console.log(new Date().toLocaleString().replace(/\b\d\b/g,'0$&'))

let a = [{idwww:1,a:1,b:'bb'},{idwww:2,a:2,b:'b'}]
let aa = [{idwww:1,a:2,b:'bb_new'},{idwww:2,a:2,b:'b'}]

function findDataUpdate(oldObj,newObj,id){
    let dataUpdate = []
    newObj.forEach(item=>{
        let cur_old = oldObj.filter(res=>res[id]==item[id])[0]
        let obj={}
        for(let i in item){
           if(item[i] != cur_old[i]) {
              Object.assign(obj,{[i]:item[i],[id]:item[id]})
           }
        }
        if(obj[id]){
            dataUpdate.push(obj)
        }   
    })
    return dataUpdate;
}
// console.log(findDataUpdate(a,aa,'idwww'))
