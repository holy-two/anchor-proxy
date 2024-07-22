import * as lit from 'lit';
import { LitElement } from 'lit';

interface ProxyFilter {
    (href: string, target: HTMLElement): boolean;
}

interface AnchorClickEventDetail {
    href: string;
    target: HTMLElement;
}
declare class AnchorClickEvent extends CustomEvent<AnchorClickEventDetail> {
    constructor(href: string, target: HTMLElement);
}
declare class AnchorProxy extends LitElement {
    proxyFilters: ProxyFilter[];
    constructor();
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "anchor-proxy": AnchorProxy;
    }
    interface HTMLElementEventMap {
        "anchor-click": AnchorClickEvent;
    }
}

export { AnchorClickEvent, type AnchorClickEventDetail, AnchorProxy };
