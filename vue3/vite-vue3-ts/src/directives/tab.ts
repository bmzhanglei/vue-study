export default {
    mounted(el:HTMLElement,binding){
      const {className,activeClass,curIndex} = binding.value
      const oItmeBtns = el.getElementsByClassName(className)
      console.log(oItmeBtns)
      oItmeBtns[curIndex].className += ` ${activeClass}`
    },
    updated(el:HTMLElement,binding){
      const oldCurIndex = binding.oldValue.curIndex
      const {className,activeClass,curIndex} = binding.value
      const oItmeBtns = el.getElementsByClassName(className)

      oItmeBtns[oldCurIndex].className = className
      oItmeBtns[curIndex].className += ` ${activeClass}`
    }
}