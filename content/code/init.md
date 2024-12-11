```js
const { logEvent } = useBrowserLamion({
  accessKey: "YOUR_ACCESS_KEY_HERE",
});

function log() {
  logEvent("My first event 👋");
}
```

---

```html
<button @click="log()">Very imporant element</button>
```
