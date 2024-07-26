import "../dist/index.js"

window.onload = function () {
  const ap = document.querySelector("anchor-proxy")
  if (ap)
    ap.addEventListener("anchor-click", e => {
      const replace = async () => {
        // 設置當前點擊的 `<a data-current>`
        if (e.detail.target.hasAttribute("data-current")) return
        ap.querySelector("a[data-current]")?.removeAttribute("data-current")
        e.detail.target.setAttribute("data-current", "")
        // 請求目標頁面
        const main = document.querySelector("main")
        const res = await fetch(e.detail.href)
        const html = await res.text()
        // 替換内容
        const main_content = html.match(/<main>(([\s\S])*?)<\/main>/)?.[1] ?? ""
        main.innerHTML = main_content
        // 替換標題
        const title = html.match(/<title>(([\s\S])*?)<\/title>/)?.[1] ?? ""
        document.title = title
      }
      /**
       * https://developer.mozilla.org/zh-CN/docs/Web/API/View_Transitions_API
       */
      if (document.startViewTransition) {
        document.startViewTransition(replace)
      } else {
        replace()
      }
    })
}
