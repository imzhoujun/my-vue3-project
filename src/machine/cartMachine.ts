import { createMachine, assign } from 'xstate'

interface Item {
  id: number
  name: st
  price: number
}

interface CounterContext {
  items: Item[]
  total: number
}

export const cartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOjAWwAdMBPAYgEEARSgfQEkAVAUQFkBtABgF1FQCB7WAEtMQ-gDteIAB6IAjBwAs2DgE4AbAFZtAJkXr1GjgA4ANCGKIAtHs3Y5AZgDsi1Zo5qDizcYC+v8zQsbHF+TCZCEgpqemZ2bikBYVEJKVkEHSc5bAdHB0U5dWN1B1VVJXNLBFUdbC8HDh1i9ScOLJ1-QIwcUPDIsgAlVgB5ADUmWNZOHiQQJJExSVn0q01VbIcdH3UFTS2nJ1VK+R11bDdVZzlVYw4DA78AkCCesIiiMgBhABkmcgGaJ9-gxpolBAtUstEJtjPZFC51FtTk5TupjggrAoOCoDop4Z4lM5-E9QhA4FIXmDkos0tYSqocltirt9od0VYHJs6oV6mU7qdFJ1nt1cP0qRClqAVgdsDpMg4SsYGvk5Np0ZdsAdLnJjHJDnJvPohS8Qm8xbN5ilJTJEBx0ZlYYpjG5bk5bninOpib4gA */
    id: 'cart',
    initial: 'empty',
    schema: {
      context: {} as CounterContext,
    },
    context: {
      items: [],
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
      addItem: assign({
        Items: (context: CounterContext, _event) => {
          console.log(context.items)
          // return [...context.items, { ..._event.item }]
          return context.items.push(_event.item)
        },
      }),
      removeItem: (context, event) =>
        (context.items = context.items.filter(
          (item) => item.id !== event.item.id,
        )),

      clearCart: (context, _event) => (context.items = []),

      updateTotal: (context, _event) =>
        (context.total = context.items.reduce(
          (sum, item) => sum + item.price,
          0,
        )),
    },
    guards: {
      //只有context.items.length === 1 才能进行REMOVE_ITEM事件
      isLastItem: (context) => context.items.length === 1,
    },
  },
)
