// 防抖函数
export function debounce(fn, interval = 300) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}
