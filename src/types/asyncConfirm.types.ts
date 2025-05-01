
export type ResolveFunction<TResult> = ((result: TResult) => void) | (() => void);

export interface UseModalComponentProps<TResult, TData> {
    onResolve: ResolveFunction<TResult>;
    data: TData | undefined;
}

export interface UseConfirmationModalProps<TResult, TData> {
    /**
     * The component to show for the confirmation, please use a static or memoized component
     */
    Component: React.FC<UseModalComponentProps<TResult, TData>>;
}


export interface ModalDataRef<TResolveResult> {
    resolve: ResolveFunction<TResolveResult>;
    currentPromisePostfixId: string;
}

export type AddConfirmEventData = {
    portal: React.ReactPortal;
    id: string;
}

export type RemoveConfirmEventData = {
    containerIdPostfix: string;
}

declare global {
    interface WindowEventMap {
        'add-confirm-event': CustomEvent<AddConfirmEventData>;
        'remove-confirm-event': CustomEvent<RemoveConfirmEventData>
    }
}
