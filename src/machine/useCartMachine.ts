/* eslint-disable camelcase */
import { createMachine, assign, interpret } from 'xstate'
import { useActor } from '@xstate/vue'

const db = uniCloud.database()
// const postAddCart = async (option: {
//   user_id: st
//   goods_id: st
//   sku_id: st
// }) => {
//   return await uni.$cloud
//     .add('user-cart', {
//       user_id: option.user_id,
//       goods_id: option.goods_id,
//       sku_id: option.sku_id,
//     })
//     .then((_res: any) => {
//       console.log(_res, '加入购物车成功')
//     })
//     .catch((_err: Error) => {
//       console.log(_err, '加入购物车失败')
//     })
// }

export interface ListObj {
  add_date: number
  category_id: st
  comment_count: number
  goods_id: st
  goods_thumb: st
  index: number
  is_alone_sale: boolean
  is_best: boolean
  is_hot: boolean
  is_new: boolean
  is_on_sale: boolean
  is_real: boolean
  is_seckill: boolean
  ischeck: boolean
  last_modify_date: number
  market_price: number
  month_sell_count: number
  name: st
  price: number
  remain_count: number
  sku_id?: st
  total_sell_count: number
  user_id: st
  _id: st //user-cart id
  remark: st
}

interface MachineContext {
  cartList: ListObj[]
  total: number
  isAll: boolean
}
const context: MachineContext = {
  cartList: [],
  total: 0,
  isAll: false,
}

interface CartItem {
  goods_id: Array<{ [key: string]: any }>
  sku_id: Array<{ [key: string]: any }>
  user_id: string
  _id: string
  index: number
}

const getUserCart = async (): Promise<any> => {
  const db2 = db
    .collection('opendb-mall-sku')
    .field('_id,price,market_price,is_seckill')
    .getTemp()
  const db1 = db
    .collection('user-cart')
    .where({
      user_id: uni.$userData._id,
    })
    .getTemp()

  return await db
    .collection(db1, 'opendb-mall-goods', db2)
    .get({ getCount: true })
    .then((res) => {
      return res
    })
}

const assignCartList = assign<MachineContext>({
  cartList: (_context, _event) => {
    // console.log('请求了', _event)
    const arr: CartItem[] = _event.data.result.data
    const arr2: ListObj[] = arr.map((item: CartItem) => {
      // const {
      //   goods_id: [{ ...goods }],
      //   sku_id: [{ ...sku }],
      //   ...rest
      // } = item
      // return { ...goods, ...sku, ...rest } //返回不带goods_id, sku_id

      const { goods_id, sku_id, ...rest } = item
      return {
        ...goods_id[0],
        ...sku_id[0],
        goods_id: goods_id[0]._id,
        sku_id: sku_id[0]._id,
        ischeck: false,
        remark: '',
        ...rest,
      }
    })
    // console.log(arr2, 'arr2')

    return [...arr2]
  },
})
const clearCartList = assign<MachineContext>({
  cartList: (_context) => [],
})
const addItem = assign<MachineContext>({
  cartList: (context, event) => {
    // console.log(event, 'additem')
    console.log(context.cartList, 'context')

    const i = context.cartList.findIndex(
      (item) => item.goods_id === event.value[0].goods_id,
    )

    if (i != -1) {
      const updateItems = [...context.cartList]
      updateItems[i].index++
      return updateItems
    } else {
      return [
        ...context.cartList,
        { ...event.value[0], index: 1, ischeck: false },
      ]
    }
  },
})
const removeItem = assign<MachineContext>({
  cartList: (context, event) => {
    console.log(event)
  },
  // context.cartList.filter((item) => item.id !== event.item.id),
})
const assignAddIndex = assign<MachineContext>({
  cartList: (context, event) => {
    console.log(context, 'xstate: addIndex')
    const arr = [...context.cartList]
    arr[event.value].index++
    return arr
  },
})
const assignSubIndex = assign<MachineContext>({
  cartList: (context, event) => {
    const arr = [...context.cartList]
    arr[event.value].index--
    return arr
  },
})
const assignTotal = assign<MachineContext>({
  total: (context, _event) => {
    return context.cartList.reduce((sum, product) => {
      // console.log(product.ischeck)

      if (product.ischeck) {
        return sum + product.market_price * product.index
      } else {
        return sum
      }
    }, 0)
  },
})
const assignCheck = assign<MachineContext>({
  isAll: (context, event) => {
    // console.log(event.value)

    const checkedArr = event.value
    if (checkedArr.length === context.cartList.length) {
      context.cartList.map((item: ListObj) => (item.ischeck = true))
      return true
    } else {
      context.cartList.map((item: ListObj) => {
        if (checkedArr.includes(item.goods_id)) {
          item.ischeck = true
        } else {
          item.ischeck = false
        }
      })
      return false
    }
  },
})
const assignAllCheck = assign<MachineContext>({
  isAll: (context, _event) => {
    const flag = !context.isAll
    if (flag) {
      context.cartList.map((item: ListObj) => (item.ischeck = true))
    } else {
      context.cartList.map((item: ListObj) => (item.ischeck = false))
    }
    return flag
    // return {
    //   ...context,
    //   isAll: true,
    //   cartList: context.cartList.map((item: ListObj) => ({
    //     ...item,
    //     ischeck: true,
    //   })),
    // }
  },
})

const newCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDswHcDCBDATgFwDoBLCAGzAJjwBEs8sBiAMTDwGMALAbQAYBdRKAAOAe1hE8REckEgAHogC0ATh4EArADYA7AGYATAEZd2gCzaey-eoA0IAJ6J9BTaeUAOZZvW6epnu6a7vq6AL6hdqiYuIQk5ASkIlgQRMhQDBDSFKkAbiIA1hRUtPS8AkggouKS0rIKCPquBGbqhjx6VpqG3rYOSobKBPo86lruZuOaU1PhkejY+JSsC3gAMkSwhGAAtkJ49gzJEACSeDtlslUSUjIV9UaazYFBRqM8up52jghuugQ8hm0+lMpkMw2MyhMsxAURWSzwK3WmwIyBEeAAort9gw2ORcKdzvxLmJrrU7k5tIZ-jxGjoTO9Ib1vu5fC5lOpTO4wZpdCYzNDYTF4YiNoRURisQccDsRDkwATthcKlcardQPVFMC1F13v4jN0eT4vhT1ARIUDDCCtKYTLp1AL5kKqCLkeLMXsDkcFUrhCTVXUlLpDFTPDT9O5THTITxNMafhYCJ4rEn1FY7YYHdFFs6YkixWj3divcgIGA5D7Kn6bgGEIpdMpTP8LNptB5gyD3ro41zG75RtZtJp9NpAhmIjDHdnlrnRSiC5KGLAAK4AI2OJbLFZV1fJtcBjZHFn8-h4llcXb6CAbzhjw3U7nv3V5mbhOfwebnEo9DA2GA4YDYfItyrMl1UQTRBi6LxGUMDkOXGOM2kaRMjF0SN7zcQJtBfJ1p3fWc3QXLBSFIP8AKAollRAtV5EQNp3BcettAw5RjDcVo430ViCA+LQTFabo9XtAURFLeAKkFfBiWqHcwNrNw1HadpWy5S1-F5ONFAGU1fFMdRLAjExARjHDFjiMBpNJGiNWBR53EsfSI38ZjPH0TS2m0FCfD0rQjEHcxTNiMgilYEosEs-1dy0jxEwcgIOxcqw4z+YwgnZQ0plPHRsPHSSgviRJklSKAItk2iEAY5RB1YrR1H0YZlA8NzL01NQ0K6LlwxjO0IxyuYs3yihlzYNg4HE30ZNA8rTCMf5zCfXwDDaS1EMTSEPhBSEBnaVphP6188LWUVSqmjUQRvZsVPbdSL2+Qx3AYvT7L0fSbVQwLhRnZEdg9E7rMQNxGy43QeT0wFjFTWNL28ZwLFggwRwekIPrfI7XXnX6qMm-75IY-SepBnlB0pZQ4yBRsRjaINXq6ZHwlCIA */
    id: 'newCart',
    initial: 'idle',
    type: 'parallel',
    context,
    states: {
      idle: {
        states: {
          getData: {
            on: {
              Fetch: {
                target: 'loading',
              },
            },
          },
          loading: {
            invoke: {
              id: 'getData',
              src: 'getUserCart',
              onDone: {
                target: 'success',
                actions: 'assignCartList',
              },
            },
          },
          success: {
            type: 'final',
          },
        },

        initial: 'getData',
      },
      getCartList: {
        states: {
          empty: {
            on: {
              addItem: {
                target: 'notEmpty',
                actions: ['addItem'],
              },
            },
          },

          notEmpty: {
            on: {
              clearItem: {
                cond: 'isLength',
                target: 'empty',
                actions: ['clearCartList', 'assignTotal'],
              },

              removeItem: {
                cond: 'isLength',
                target: 'notEmpty',
                actions: ['removeItem', 'assignTotal'],
                internal: true,
              },

              addItem: {
                target: 'notEmpty',
                internal: true,
                actions: ['addItem', 'assignTotal'],
              },

              addIndex: {
                target: 'notEmpty',
                internal: true,
                actions: ['assignAddIndex', 'assignTotal'],
              },

              subIndex: {
                target: 'notEmpty',
                internal: true,
                actions: ['assignSubIndex', 'assignTotal'],
              },

              isCheck: {
                target: 'notEmpty',
                internal: true,
                actions: ['assignCheck', 'assignTotal'],
              },

              allCheck: {
                target: 'notEmpty',
                internal: true,
                actions: ['assignAllCheck', 'assignTotal'],
              },
            },
          },
        },

        initial: 'notEmpty',
      },
    },
  },
  {
    services: {
      getUserCart,
    },
    actions: {
      assignCartList,
      clearCartList,
      addItem,
      removeItem,
      assignAddIndex,
      assignSubIndex,
      assignCheck,
      assignAllCheck,
      assignTotal,
    },
    guard: {
      //只有context.items.length === 1 才能进行 Fetch事件
      cartLength: (context) => context.cartList.length === 0,
      isLength: (context) => context.cartList.length > 0,
    },
  },
)

const service = interpret(newCartMachine)
  .onChange((context) => {
    console.log('The context changed:', context)
  })
  .start()

export const useCartMachine = () => {
  return useActor(service)
}

// 正在搜索: xstate+pinia share data between pages
// // define a state machine for shopping cart data
// const cartMachine = createMachine({
//   id: 'cart',
//   initial: 'empty',
//   states: {
//     empty: {
//       on: {
//         ADD_ITEM: {
//           target: 'filled',
//           actions: 'addItem'
//         }
//       }
//     },
//     filled: {
//       on: {
//         ADD_ITEM: {
//           actions: 'addItem'
//         },
//         REMOVE_ITEM: {
//           actions: 'removeItem',
//           target: 'empty'
//         },
//         CHECKOUT: 'checkingOut'
//       }
//     },
//     checkingOut: {
//       type: 'final'
//     }
//   }
// });

// // define a service function to add an item to the cart
// const addItem = (context, event) => {
//   // get the item from the event payload
//   const item = event.item;
//   // check if the item already exists in the cart
//   const existingItem = context.items.find(i => i.id === item.id);
//   if (existingItem) {
//     // increment the quantity of the existing item
//     existingItem.quantity++;
//   } else {
//     // add the new item to the cart with quantity 1
//     context.items.push({ ...item, quantity: 1 });
//   }
// };

// // define a service function to remove an item from the cart
// const removeItem = (context, event) => {
//   // get the item id from the event payload
//   const itemId = event.itemId;
//   // find the index of the item in the cart
//   const index = context.items.findIndex(i => i.id === itemId);
//   if (index > -1) {
//     // remove the item from the cart
//     context.items.splice(index, 1);
//   }
// };

// // define a store with pinia
// export const useCartStore = defineStore('cart', () => {
//   // create a state property for cart items
//   const items = ref([]);
//   // create a state property for the state machine service
//   const service = ref(null);

//   // create an action to start the state machine service
//   const startService = () => {
//     service.value = interpret(cartMachine)
//       .withContext({ items: items.value })
//       .onTransition((state) => {
//         console.log(state.value);
//       })
//       .start();
//   };

//   // create an action to add an item to the cart
//   const addToCart = (item) => {
//     service.value.send({ type: 'ADD_ITEM', item });
//   };

//   // create an action to remove an item from the cart
//   const removeFromCart = (itemId) => {
//     service.value.send({ type: 'REMOVE_ITEM', itemId });
//   };

//   // create an action to checkout the cart
//   const checkout = () => {
//     service.value.send('CHECKOUT');
//   };

//   // create a getter to calculate the total price of the cart
//   const totalPrice = computed(() => {
//     return items.value.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);
//   });

//   return {
//     items,
//     service,
//     startService,
//     addToCart,
//     removeFromCart,
//     checkout,
//     totalPrice
//   };
// });

// <template>
// <div class="page-a">
// <h1>Page A</h1>
// <ul class="products">
// <li v-for="product in products" :key="product.id" class="product">
// <h3>{{ product.name }}</h3>
// <p>{{ product.price | currency }}</p>
// <button @click="addToCart(product)">Add to Cart</button>
// </li>
// </ul>
// </div>
// </template>

// <script setup>
// import { useCartStore } from '@/stores/cart';
// import { products } from '@/data/products';

// const { addToCart } = useCartStore();
// </script>

// <style scoped>
// /* some styles */
// </style>

// 导入xstate库
