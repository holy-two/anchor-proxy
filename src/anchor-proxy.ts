import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ProxyFilter, proxyEvent } from './core'

export interface AnchorClickEventDetail {
  href: string
  target: HTMLElement
}

export class AnchorClickEvent extends CustomEvent<AnchorClickEventDetail> {
  constructor(
    href: string,
    target: HTMLElement
  ) {
    super('anchor-click', {
      detail: {
        href, target
      }
    })
  }
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 */
@customElement('anchor-proxy')
export class AnchorProxy extends LitElement {
  @property()
  proxyFilters: ProxyFilter[] = []

  constructor() {
    super()
    proxyEvent(this, (href, target) => {
      this.dispatchEvent(new AnchorClickEvent(href, target))
    }, () => this.proxyFilters)
  }


  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'anchor-proxy': AnchorProxy
  }

  interface HTMLElementEventMap {
    'anchor-click': AnchorClickEvent
  }
}
