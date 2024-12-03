---
navigation:
  title: "Installation guide"
---

# Installation

Get started with Lamion by creating a new project or adding it to an existing application.

---

### Browser project

\
1\. Add script to end of html or head

```html
<script src="https://unpkg.com/@lamion-libs/browser@0.0.1/dist/bundle.js"></script>
```

\
2\. Init logger (do not forget replace placeholder with your access key)

```js
const { useLogger, flush } = useBrowserLamion({
  accessKey: "YOUR_ACCESS_KEY_HERE",
});

const loginLogger = useLogger("login", "authorization");
```

\
3\. Make a log
```js
document.getElementById("btnLogin").addEventListener("click", () => {
  loginLogger.log();
});
```

---

### NPM project

Lamion is also available as npm package.

1\. Install lamion
```cmd
npm i @lamion-libs/browser --save
```
