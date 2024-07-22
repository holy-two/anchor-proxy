var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/index.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/core.ts
function proxyEvent(target, proxyCallback, customFilters = () => []) {
  const eventHandler = (e) => {
    let link = e.target;
    if (link instanceof Element) {
      link = link.closest("a,area");
    }
    if (!(link instanceof HTMLAnchorElement) && !(link instanceof SVGAElement) && !(link instanceof HTMLAreaElement)) {
      return;
    }
    const linkTarget = link instanceof HTMLElement ? link.target : link.href.baseVal;
    const href = link instanceof HTMLElement ? link.href : link.href.baseVal;
    if (link.hasAttribute("download") || !link.href || linkTarget && linkTarget !== "_self" || origin !== location.origin || e.button !== 0 || // left clicks only
    e.metaKey || // new tab (mac)
    e.ctrlKey || // new tab (windows)
    e.altKey || // download
    e.shiftKey || // new window
    e.defaultPrevented || customFilters().some((filter) => !filter(href, link))) {
      return;
    }
    e.preventDefault();
    proxyCallback(href, link);
  };
  target.addEventListener("click", eventHandler);
  return () => {
    target.removeEventListener("click", eventHandler);
  };
}

// src/index.ts
var AnchorClickEvent = class extends CustomEvent {
  constructor(href, target) {
    super("anchor-click", {
      detail: {
        href,
        target
      }
    });
  }
};
var AnchorProxy = class extends LitElement {
  constructor() {
    super();
    this.proxyFilters = [];
    proxyEvent(
      this,
      (href, target) => {
        this.dispatchEvent(new AnchorClickEvent(href, target));
      },
      () => this.proxyFilters
    );
  }
  render() {
    return html` <slot></slot> `;
  }
};
__decorateClass([
  property()
], AnchorProxy.prototype, "proxyFilters", 2);
AnchorProxy = __decorateClass([
  customElement("anchor-proxy")
], AnchorProxy);
export {
  AnchorClickEvent,
  AnchorProxy
};
