export default usePromiseSnapshot;
export { usePromiseSnapshot as usePromise };
export declare function usePromiseSnapshot<R>(): PromiseSnapshot<R>;
interface PromiseSnapshot<R> extends Props<R>, State<R>, Getters, Methods {
    readonly error: any;
    readonly result: R | null | undefined;
    readonly status: PromiseStatus;
}
interface Props<R> {
    promise: Promise<R | any> | null;
}
interface State<R> {
    error: any;
    result: R | null | undefined;
    status: PromiseStatus;
}
interface Getters {
    readonly isStandby: boolean;
    readonly isPending: boolean;
    readonly isFulfilled: boolean;
    readonly isRejected: boolean;
    readonly isSettled: boolean;
    readonly hasResult: boolean | undefined;
    readonly hasError: boolean | undefined;
}
interface Methods {
    start<T>(promise: Promise<T>): Promise<T>;
}
declare type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected';
