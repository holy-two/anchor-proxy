export interface ProxyFilter {
  (href: string, target: HTMLElement): boolean
}

export function proxyEvent<T extends EventTarget>(
  target: T,
  proxyCallback: (href: string, target: HTMLElement) => void,
  customFilters: () => Array<ProxyFilter> = () => []
) {
  const eventHandler = ((e: MouseEvent) => {
    let link = e.target

    if (link instanceof Element) {
      link = link.closest('a,area')
    }

    if (
      !(link instanceof HTMLAnchorElement) &&
      !(link instanceof SVGAElement) &&
      !(link instanceof HTMLAreaElement)
    ) {
      return
    }

    const linkTarget = link instanceof HTMLElement
      ? link.target
      : link.href.baseVal

    const href = link instanceof HTMLElement
      ? link.href
      : link.href.baseVal

    if (link.hasAttribute('download') ||
      !link.href ||
      (linkTarget && linkTarget !== '_self') ||
      origin !== location.origin ||
      e.button !== 0 || // left clicks only
      e.metaKey || // new tab (mac)
      e.ctrlKey || // new tab (windows)
      e.altKey || // download
      e.shiftKey || // new window
      e.defaultPrevented ||
      customFilters().some(filter => !filter(href, link as HTMLElement))) {
      return
    }

    e.preventDefault()
    proxyCallback(href, link as HTMLElement)

  }) as EventListenerOrEventListenerObject

  target.addEventListener('click', eventHandler)

  return () => {
    target.removeEventListener('click', eventHandler)
  }
}
