import { defineStore } from 'pinia'
import { interpret } from 'xstate'
// import { cartMachine } from '../../machine/cartMachine'
// import { toggleMachine } from '../hooks/userState'

// export const useCartStore = defineStore('useCart', () => {
//   // 创建状态服务
//   const toggleService = interpret(toggleMachine).start()
//   const { send } = toggleService
//   console.log(toggleService);

//   // 定义响应式数据
//   const current = ref(toggleMachine.initialState)

//   // 监听状态变化并更新数据
//   toggleService.onTransition((state) => {
//     console.log(state, 'transition')

//     current.value = state
//   })

//   // 定义发送事件的方法
//   const toggle = () => {
//     send('TOGGLE')
//   }

//   return {
//     current,
//     toggle,
//   }
// })

interface Item {
  id: number
  name: st
  price: number
}

export const useCartStore = defineStore('useCart', () => {
  // 创建状态服务
  const cartService = interpret(cartMachine).start()
  // 定义响应式数据
  const current = ref(cartMachine.initialState)
  // 监听状态变化并更新数据
  cartService.onTransition((state) => {
    current.value = state
  })

  // 定义发送事件的方法
  const addItem = (item: Item) => {
    cartService.send({ type: 'ADD_ITEM', item })
  }
  const removeItem = (item: Item) => {
    cartService.send({ type: 'REMOVE_ITEM', item })
  }
  const clearCart = () => {
    cartService.send('CLEAR_CART')
  }
  // 返回模板中需要用到的数据和方法
  return {
    current,
    addItem,
    removeItem,
    clearCart,
  }
})
