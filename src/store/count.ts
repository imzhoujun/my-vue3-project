import { assign, createMachine, interpret } from 'xstate'
import { useActor } from '@xstate/vue'
const counterMachine = createMachine({
  id: 'counter',
  context: {
    count: 0,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: assign({
            count: (context: { count: number }) => context.count + 1,
          }),
        },
        DECREMENT: {
          actions: assign({
            count: (context: { count: number }) => context.count - 1,
          }),
        },
      },
    },
  },
})

const service = interpret(counterMachine).start()

export const useToggleMachine = () => {
  return useActor(service)
}
