import { reactive, computed } from 'vue';
import { extend } from './dictionary';
export default usePromise;
export function usePromise() {
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
        hasResult: computed(() => getters.isSettled && state.result !== null),
        hasError: computed(() => getters.isSettled && state.error !== null),
    });
    async function start(promise) {
        state.error = undefined;
        state.result = undefined;
        state.status = 'pending';
        let result;
        try {
            result = await promise;
        }
        catch (error) {
            state.error = error;
            state.result = null;
            state.status = 'rejected';
            throw error;
        }
        state.error = null;
        state.result = result;
        state.status = 'fulfilled';
        return result;
    }
    return extend(extend(state, getters), { start });
}
