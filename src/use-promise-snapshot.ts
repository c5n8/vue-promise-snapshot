import { reactive, computed, watch } from '@vue/composition-api'
import { extend } from 'vue-extend-reactive'

export default usePromiseSnapshot

export { usePromiseSnapshot as usePromise }

export function usePromiseSnapshot<R>(): PromiseSnapshot<R> {
  const props: Props<R> = reactive({
    promise: null,
  })

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
    hasResult: computed(() =>
      getters.isSettled ? state.result != null : undefined
    ),
    hasError: computed(() =>
      getters.isSettled ? state.error != null : undefined
    ),
  })

  async function start<T>(promise: Promise<T>): Promise<T> {
    props.promise = promise

    return await promise
  }

  watch(
    () => props.promise,
    async (promise) => {
      state.error = undefined
      state.result = undefined

      if (promise == null) {
        state.status = 'standby'

        return
      }

      state.status = 'pending'

      let result

      try {
        result = await promise
      } catch (error) {
        state.error = error
        state.status = 'rejected'

        return
      }

      state.error = null
      state.result = result
      state.status = 'fulfilled'
    }
  )

  return extend(extend(extend(state, props), getters), <Methods>{ start })
}

interface PromiseSnapshot<R> extends Props<R>, State<R>, Getters, Methods {
  readonly error: any
  readonly result: R | null | undefined
  readonly status: PromiseStatus
}

interface Props<R> {
  promise: Promise<R | any> | null
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

interface Methods {
  start<T>(promise: Promise<T>): Promise<T>
}

type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected'
