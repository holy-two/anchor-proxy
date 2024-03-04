import { LitElement } from 'lit';
import { ProxyFilter } from './core';
export interface AnchorClickEventDetail {
    href: string;
    target: HTMLElement;
}
export declare class AnchorClickEvent extends CustomEvent<AnchorClickEventDetail> {
    constructor(href: string, target: HTMLElement);
}
/**
 * An example element.
 *
 * @slot - This element has a slot
 */
export declare class AnchorProxy extends LitElement {
    proxyFilters: ProxyFilter[];
    constructor();
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'anchor-proxy': AnchorProxy;
    }
    interface HTMLElementEventMap {
        'anchor-click': AnchorClickEvent;
    }
}
