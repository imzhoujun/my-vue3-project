import { createMachine, assign } from 'xstate'

// 定义一个状态机

// interface obj {
//   useropenid?: string
//   username: string
//   userimg: string
// }

// export const useUserDate = () => {
//   const first = createMachine({
//     /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjACZ0AT0FDkU5EA */
//     context: {
//       userData: uni.getStorageSync('userData'),
//     },
//   })

//   return {
//     first,
//   }
// }

export const useCart = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOkwCwEsA7KAYlQggG0AGAXUVAAcB7WAzAloxkAD0QAmAJzYArABoQATyEBGGgF9lUoiwhxeaLL1btO3XgIQBaOQA5xU2aYBsKkNpz5iUXWw5ceSfogAsgtaI5nLiyspAA */
  id: 'cart',
  initial: 'thing',
  context: {
    mycarts: [],
  },
  states: {
    thing: {
      on: {
        add: {
          target: 'thing',
          internal: true,
          actions: [
            assign({
              mycarts: (context: any, _value: any) => {
                console.log(context, _value)
                return context.mycarts.concat(_value.cartItem)
              },
            }),
          ],
        },
      },
    },
  },
})

export const userMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4DoCWEA2YAxADIDyA4gJIByA2gAwC6ioADgPazYAu27AdixAAPRADYAzAA5M9AJwBWAIwAmMQHY5KqSokSANCACeiVesxKpkyeqlK5c+2IC+zw6gw58RAKoAFABEAQQAVAFEGZiQQDi5eASFRBAl6JUx1MQUxFXoVdQU5MSkAFmLDEwQlS0xigq0U9XUVBR0pV3c0LDx2KChsfihKfkIIATAcfgA3dgBrcY8unr6BoYR+6YBjAEN4-kjIoViePkFopKk7TCllMTl6YvVilW0pcsQUiUxm+lSlehKFBIFOp2iAFphur1+oNhhh0OwsKw8DsAGYIgC2mHBkOWMLWU3Y212+yYh04xwSZ0QFzS1yUt3uj2eFzeCGaCnSCh+fwkxXo0iUEhUoOxS0gQxIFFIPhCB2iR12iUQcl5VxyxTE-OKqmyr2MiFKHO+qT5Go0xSkEhFnQhYogEv8wXCcrY5MVVMqguKsi0mgU2rk2serJSaUeDkccnUSgeymtnhx0NIyG4IzGE2mcyxNsTA2T3Hxmx2JxJUVdcROSrZmXSmUk9MtQIkSgUrLynwk+R+DhSchK8cWULzKcIcIRmCRqIx2YTSyTKcLhOLAlLZIrlNASTUHIyWWbRT0gJbrMuXJ+qWy6k7xUKA8wY-QhAASmEQk+AJoumJuysexT0GoVD7FRik7K8gTKfU2XoI0zxbE0uyUVw3BAfh2AgOAhAWNcKVOTdEAAWjEVkCI5CMHAeaRLXoWwXBQ8FcAIHD3XwhBSjkGpOwUZoWw1QpJBDflZHPP5LBjC0FDvXMYWY39WLEBTMEDf1LCkXJbC0NtNEwM8fgkKM7jAq16JzO0hlkjcRFMGCxEwBSnl0FUJEyFkoMNdIbwcWwUkta4pLnYduAsvCrLYlRWT5FQLG+f0FAKFsHDvB9gqrP4sjssQHP0vQXL1Coch3Ty+00KRHGkZDnCAA */
  id: 'user',
  // 初始上下文
  context: {
    loggedIn: false,
    name: null,
    email: null,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOGIN: 'loggingIn',
        // 添加一个UPDATE事件，用来更新上下文
        UPDATE: {
          actions: assign({
            name: (context, event) => event.name,
            email: (context, event) => event.email,
          }),
        },
      },
    },
    loggingIn: {
      invoke: {
        src: 'loginService',
        onDone: {
          target: 'loggedIn',
          // 将返回的用户信息赋值给上下文
          actions: assign({
            loggedIn: true,
            name: (context, event) => event.data.name,
            email: (context, event) => event.data.email,
          }),
        },
        onError: 'error',
      },
    },
    loggedIn: {
      on: {
        LOGOUT: 'loggingOut',
        // 添加一个UPDATE事件，用来更新上下文
        UPDATE: {
          actions: assign({
            name: (context, event) => event.name,
            email: (context, event) => event.email,
          }),
        },
      },
    },
    loggingOut: {
      invoke: {
        src: 'logoutService',
        onDone: {
          target: 'idle',
          // 将上下文重置为初始值
          actions: assign({
            loggedIn: false,
            name: null,
            email: null,
          }),
        },
        onError: 'error',
      },
    },
    error: {
      on: {
        RETRY: 'loggingIn',
      },
    },
  },
})

// interface StoreContext {
//   items: {
//     [key: string]: any
//   }[]
// }

// export const cartMachine = createMachine<StoreContext>({
//   /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOgJYQBswBiAQQBFyB9ASQBUBRAWQG0AGAXUVAAcB7WLky4+AO24gAHogCMANjbYA7ABYATDIAcSgKwAaEAE9ZOgMzYVbOWp0BfWwbRY8hEgCVmAeQBqDWo1ZOCX5BYTEJaQQAWhk2AE4DYwQZOIszGRt7RwwcfCJiAFUABXJSRnYuJBAQoRFxKsiojRVsGVM1TQz9I1lNFrsskFE+CDgJJ0xggVrwhsQm61b2zptE+blNbDYVDd1BiZciKdC6iMQ5HVaZJS1dNYRTVWxTHTjHgfsgA */
//   id: 'cart',
//   // 初始上下文
//   context: {
//     items: [],
//     total: 0,
//   },
//   initial: 'idle',
//   states: {
//     idle: {
//       on: {
//         ADD_ITEM: {
//           target: 'idle',
//           // 将新添加的商品加入到上下文中
//           actions: assign({
//             items: (context, event) => {
//               console.log(context, event, 'addtime')
//               return [...context.items, event.item]
//             },
//             // total: (context, event) => context.total + event.item.price,
//           }),
//         },
//         REMOVE_ITEM: {
//           target: 'idle',
//           // 将要移除的商品从上下文中删除
//           actions: assign({
//             items: (context, event) =>
//               context.items.filter((item) => item.id !== event.id),
//             total: (context, event) => context.total - event.price,
//           }),
//         },
//         // 添加一个UPDATE事件，用来更新上下文
//         UPDATE: {
//           target: 'idle',
//           actions: assign({
//             items: (context, event) => event.items,
//             // total: (context, event) => event.total,
//           }),
//         },
//       },
//     },
//   },
// })

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  context: {
    active: 0,
  },
  states: {
    inactive: {
      on: {
        TOGGLE: 'active',
        actions: [
          assign({
            active: (context, _event) => context.active + 1,
          }),
        ],
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
        actions: [
          assign({
            active: (context, _event) => context.active + 12,
          }),
        ],
      },
    },
  },
})

export const cartMachine = createMachine(
  {
    id: 'cart',
    initial: 'empty',
    context: {
      items: [{ name: '1' }, { name: '2' }],
      total: 0,
    },
    states: {
      empty: {
        on: {
          ADD_ITEM: {
            target: 'notEmpty',
            actions: ['addItem', 'updateTotal'],
          },
        },
      },
      notEmpty: {
        on: {
          ADD_ITEM: {
            target: 'notEmpty',
            actions: ['addItem', 'updateTotal'],
          },
          REMOVE_ITEM: {
            target: 'empty',
            cond: 'isLastItem',
            actions: ['removeItem', 'updateTotal'],
          },
          CLEAR_CART: {
            target: 'empty',
            actions: ['clearCart', 'updateTotal'],
          },
        },
      },
    },
  },
  {
    actions: {
      addItem: assign<Context>({
        items: (context, event) => context.items.push(event.item),
      }),
      removeItem: assign<Context>({
        items: (context, event) =>
          (context.items = context.items.filter(
            (item) => item.id !== event.item.id,
          )),
      }),

      clearCart: assign<Context>({
        items: (context, _event) => (context.items = []),
      }),
      updateTotal: assign<Context>({
        total: (context, _event) =>
          (context.total = context.items.reduce(
            (sum, item) => sum + item.price,
            0,
          )),
      }),
    },
    guards: {
      //只有context.items.length === 1 才能进行REMOVE_ITEM事件
      isLastItem: (context) => context.items.length === 1,
    },
  },
)
