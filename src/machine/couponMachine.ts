/* eslint-disable camelcase */
import { createMachine, assign, interpret } from 'xstate'
import { useActor } from '@xstate/vue'

interface couponItem {
  create_time: number
  end_time: number
  quota: number
  start_time: number
  status: number
  take_count: number
  used_amount: number
  used_count: number
  with_amoun: number
  _id: st
}

export interface Item extends couponItem {
  coupon_id?: st
  user_id?: st
}

interface Context {
  couponList: Item[]
  userCouponList: Item[]
}

const getCoupon = uni.$cloud.find('coupon', 'end_time>$cloudEnv_now')
const getUserCoupon = uni.$cloud
  .twoFind(
    { dbname: 'user-coupon', where: 'user_id=="64532023e766bb0085032f8b"' },
    {
      dbname: 'coupon',
      field:
        '_id  ,with_amoun,used_amount,start_time,end_time,status,quota,take_count,used_count',
    },
  )
  .get()

const assiginCoupon = assign({
  couponList: (context, event) => {
    const arr1 = [...event.data[0].result.data]
    const arr2 = [...event.data[1].result.data]
    // console.log(arr1, arr2)
    const { coupon_id, ...rest } = arr2[0]
    const obj = { ...coupon_id[0], coupon_id: coupon_id[0]._id }
    delete obj._id
    const newArr = [{ ...obj, ...rest }]
    // console.log(newArr)

    for (const obj2 of newArr) {
      // console.log(obj2)

      // 找到arr中id相同的对象的下标
      const index = arr1.findIndex((item) => item._id === obj2.coupon_id)
      // 如果找到了，就用arr2中的对象替换掉arr中的对象
      if (index !== -1) {
        arr1[index] = obj
      }
    }

    return arr1
  },
  userCouponList: (context, event) => {
    // console.log(event.data[1].result.data)

    const arr = [...event.data[1].result.data]
    const arr2 = []
    for (const item of arr) {
      const { coupon_id, ...rest } = item
      const obj = {
        ...coupon_id[0],
        coupon_id: coupon_id[0]._id,
        ...rest,
      }
      delete obj._id
      arr2.push(obj)
    }
    return arr2
  },
})

const couponMachine = createMachine<Context>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXADqgdgOgEsIwAbAYgDEwAXZACwG0AGAXUVG1gOoN3ZAAeiAIwAWABx4xAVnEAmAJxMAzCrnjhAdgA0IAJ4iFmvEeHLN0gGyXhC0ZYC+D3Wiy48JVAEMIBHFDIIXDBCHAA3VABrEJhqAGEMbBxmNiQQTm5eHH4hBBtJTXFNOTkmJnEmSzlpOV0DBDlVEzlNYRLNDqZpC2knF0T3Tx8-ALAAJzHUMbxMEi9qADMpgFs8WIS3ZNZ+DJ4+NNymOsQmPpBXJLxxybGyFJ3ULj3sg5EmOTx24oVhYXlxIoKY4IBSSZRWBRyMwKH6iJh2JzOEA4VDEeBpC77DiPTJYwSIAC0wnKeBsojaFUqFVEymBBKKeFEmh+lmkf0qNOsZ0x+CIpAeTyyOUQkgkNOK5k0ygU0hpwmBtlFsnBwmkygp0gUym5A3wQ18-gFuJeoFyciZpKU5S6pVEUKKCtBjOVbLVGq1Os2eFg6GQyDg6OxgrxuWlwk+lkh4gkWlsrNEwOqUi08JUmkszLVyjknsu1ymRuewoQBMsTFJYgpZUs1MUwKdyhp4kh5isTEziIcQA */
    id: 'coupon',
    context: {
      couponList: [],
      userCouponList: [],
    },
    initial: 'idel',
    states: {
      idel: {
        on: {
          Fetch: {
            target: 'loading',
          },
        },
      },
      loading: {
        invoke: {
          id: 'getCoupon',
          src: () => {
            return Promise.all([getCoupon, getUserCoupon]).then((res) => res)
          },
          onDone: {
            target: 'success',
            actions: 'assiginCoupon',
          },
          onError: {
            target: 'error',
          },
        },
      },
      success: {
        type: 'final',
      },
      error: {
        always: 'loading',
      },
    },
  },
  {
    services: {},
    actions: {
      assiginCoupon,
    },
  },
)

const service = interpret(couponMachine).start()

export const useCouponMachine = () => {
  return useActor(service)
}
