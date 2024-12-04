---
navigation:
  title: "First steps"
  order: 2
---

```html
<button id="btnLogin">Login</button>
```

```js
document.getElementById("btnLogin").addEventListener("click", () => {
  logEvent("Login button click");
});
```
