export default usePromise;
export declare function usePromise<R>(): PromiseSnapshot<R>;
interface PromiseSnapshot<R> extends State<R>, Getters, Methods<R> {
    readonly error: any;
    readonly result: R | null | undefined;
    readonly status: PromiseStatus;
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
    readonly hasResult: boolean;
    readonly hasError: boolean;
}
interface Methods<R> {
    start(promise: Promise<R>): Promise<R>;
}
declare type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected';
