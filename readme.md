# @holy-two/anchor-proxy

透過 WebComponent 封裝的一個對所有的 `a` 標簽進行代理事件及攔截的功能

## 基本

```html
<script type="module">
  import "@holy-two/anchor-proxy"
</script>

<anchor-proxy>
  <a href="/">主頁</a>
</anchor-proxy>

<script type="module">
  const ap = document.createElement("anchor-proxy")

  ap.addEventListener("anchor-click", e => {
    console.log(e.detail)
  })
</script>
```

### 例外

```html
<script type="module">
  const ap = document.createElement("anchor-proxy")

  ap.proxyFilters = [
    (href, target) => !target.hasAttribute("data-proxy-disabled"),
  ]
</script>
<anchor-proxy>
  <a href="/">主頁</a>
  <a href="/admin" data-proxy-disabled>後臺</a>
</anchor-proxy>
```
