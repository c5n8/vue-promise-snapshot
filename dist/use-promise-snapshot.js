import { reactive, computed, watch } from 'vue';
import { extend } from 'vue-extend-reactive';
export default usePromiseSnapshot;
export { usePromiseSnapshot as usePromise };
export function usePromiseSnapshot() {
    const props = reactive({
        promise: null,
    });
    const state = reactive({
        error: undefined,
        result: undefined,
        status: 'standby',
    });
    const getters = reactive({
        isStandby: computed(() => state.status === 'standby'),
        isPending: computed(() => state.status === 'pending'),
        isFulfilled: computed(() => state.status === 'fulfilled'),
        isRejected: computed(() => state.status === 'rejected'),
        isSettled: computed(() => getters.isFulfilled || getters.isRejected),
        hasResult: computed(() => getters.isSettled ? state.result != null : undefined),
        hasError: computed(() => getters.isSettled ? state.error != null : undefined),
    });
    async function start(promise) {
        props.promise = promise;
        return await promise;
    }
    watch(() => props.promise, async (promise) => {
        state.error = undefined;
        state.result = undefined;
        if (promise == null) {
            state.status = 'standby';
            return;
        }
        state.status = 'pending';
        let result;
        try {
            result = await promise;
        }
        catch (error) {
            state.error = error;
            state.status = 'rejected';
            return;
        }
        state.error = null;
        state.result = result;
        state.status = 'fulfilled';
    });
    return extend(extend(extend(state, props), getters), { start });
}
