# AnchorProxy

通过WebComponent封装一个对所有超链接进行代理事件拦截的功能

## 用法

### 通过js/ts引入

```typescript
import  "anchorproxy"

const ap = document.createElement('anchor-proxy')

const anchor = document.createElement('a')

anchor.href = 'https://github.com'

anchor.innerHTML = "github"

ap.appendChild(anchor)

document.querySelector('#app')!.appendChild(ap)

ap.addEventListener('anchor-click',e=>{
  console.log(e.detail)
})
```

### 通过html引入
```html
<!-- 在head里 -->
<script src="./dist/anchor-proxy.js"></script>


<!-- 在body里 -->
<anchor-proxy>
  <!-- 其他的标签省略 -->
  <a href="/">链接</a>
</anchor-proxy>
```
