import { reactive, computed } from '@vue/composition-api'
import { extend } from 'vue-extend-reactive'

export default usePromise

export function usePromise<R>(): PromiseSnapshot<R> {
  const state: State<R> = reactive({
    error: undefined,
    result: undefined,
    status: 'standby',
  })

  const getters: Getters = reactive({
    isStandby: computed(() => state.status === 'standby'),
    isPending: computed(() => state.status === 'pending'),
    isFulfilled: computed(() => state.status === 'fulfilled'),
    isRejected: computed(() => state.status === 'rejected'),
    isSettled: computed(() => getters.isFulfilled || getters.isRejected),
    hasResult: computed(() => getters.isSettled ? state.result != null : undefined),
    hasError: computed(() => getters.isSettled ? state.error != null : undefined),
  })

  async function start(promise: Promise<R>): Promise<R> {
    state.error = undefined
    state.result = undefined
    state.status = 'pending'

    let result

    try {
      result = await promise
    } catch (error) {
      state.error = error
      state.status = 'rejected'

      throw error
    }

    state.error = null
    state.result = result
    state.status = 'fulfilled'

    return result
  }

  return extend(extend(state, getters), <Methods<R>>{ start })
}

interface PromiseSnapshot<R> extends State<R>, Getters, Methods<R> {
  readonly error: any
  readonly result: R | null | undefined
  readonly status: PromiseStatus
}

interface State<R> {
  error: any
  result: R | null | undefined
  status: PromiseStatus
}

interface Getters {
  readonly isStandby: boolean
  readonly isPending: boolean
  readonly isFulfilled: boolean
  readonly isRejected: boolean
  readonly isSettled: boolean
  readonly hasResult: boolean | undefined
  readonly hasError: boolean | undefined
}

interface Methods<R> {
  start(promise: Promise<R>): Promise<R>
}

type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected'
