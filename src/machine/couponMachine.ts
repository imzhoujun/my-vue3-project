import { createMachine, assign, interpret } from 'xstate'
import { useActor } from '@xstate/vue'

const getDiscount = async () => {
  return await uni.$cloud
    .find('coupon', 'end_time>$cloudEnv_now')
    .then((res: any) => {
      return res.result.data
    })
}

const assiginCoupon = assign({
  couponList: (context, event) => {
    const arr = [...event.data]
    console.log(arr, 'coupon')
    return arr
  },
})
const couponMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXADqgdgOgEsIwAbAYgDEwAXZACwG0AGAXUVG1gOoN3ZAAeiAIwAWABx4xAVnEAmAJxMAzCrnjhAdgA0IAJ4iFmvEeHLN0gGyXhC0ZYC+D3Wiy48JVAEMIBHFDIIXDBCHAA3VABrEJhqAGEMbBxmNiQQTm5eHH4hBBtJTXFNOTkmJnEmSzlpOV0DBDlVEzlNYRLNDqZpC2knF0T3Tx8-ALAAJzHUMbxMEi9qADMpgFs8WIS3ZNZ+DJ4+NNymOsQmPpBXJLxxybGyFJ3ULj3sg5EmOTx24oVhYXlxIoKY4IBSSZRWBRyMwKH6iJh2JzOEA4VDEeBpC77DiPTJYwSIAC0wnKeBsojaFUqFVEymBBKKeFEmh+lmkf0qNOsZ0x+CIpAeTyyOUQkgkNOK5k0ygU0hpwmBtlFsnBwmkygp0gUym5A3wQ18-gFuJeoFyciZpKU5S6pVEUKKCtBjOVbLVGq1Os2eFg6GQyDg6OxgrxuWlwk+lkh4gkWlsrNEwOqUi08JUmkszLVyjknsu1ymRuewoQBMsTFJYgpZUs1MUwKdyhp4kh5isTEziIcQA */
    id: 'coupon',
    context: {
      couponList: [],
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
          src: 'getDiscount',
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
    services: {
      getDiscount,
    },
    actions: {
      assiginCoupon,
    },
  },
)

const service = interpret(couponMachine).start()

export const useCouponMachine = () => {
  return useActor(service)
}
