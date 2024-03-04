export interface ProxyFilter {
    (href: string, target: HTMLElement): boolean;
}
export declare function proxyEvent<T extends EventTarget>(target: T, proxyCallback: (href: string, target: HTMLElement) => void, customFilters?: () => Array<ProxyFilter>): () => void;
