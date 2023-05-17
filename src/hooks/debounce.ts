/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
export default function debounce(
  func: Function,
  delay = 1000,
  immediate = false,
): Function {
  let timer: number | undefined

  return function (this: unknown, ...args: any[]) {
    if (immediate) {
      func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 搜索
export function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: any = ''
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
