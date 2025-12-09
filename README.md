# Enter / Exit ViewTransition Demo

Vite + React 19 (canary) demo that animates a panel entering and exiting with the View Transitions API, falling back gracefully when the API is unavailable.

## What it shows

- Show/hide controls so you can replay the motion at will, plus a placeholder when the panel is hidden.
- Prefers `ReactDOM.startViewTransition` (React 19 canary) or `document.startViewTransition` with `ReactDOM.flushSync`, falling back to `startTransition` when no View Transition API exists.
- A reusable `<ViewTransition>` helper that applies `viewTransitionName` to its single child without changing the render tree, keeping CSS `::view-transition-*` selectors working.
- A named snapshot (`vt-fade`) styled with blur + lift on enter and fade + rise on exit.
- Glassmorphic styling to make the animated surface clear and roomy.

## Key code

Transition trigger with React canary + browser fallback:

```jsx
const runWithViewTransition = update => {
  const reactStartVT =
    typeof ReactDOM.startViewTransition === 'function'
      ? ReactDOM.startViewTransition.bind(ReactDOM)
      : null;

  const browserStartVT =
    typeof document !== 'undefined' && typeof document.startViewTransition === 'function'
      ? document.startViewTransition.bind(document)
      : null;

  const startVT = reactStartVT || browserStartVT;

  if (startVT) {
    startVT(() => ReactDOM.flushSync(update));
    return;
  }

  startTransition(update);
};
```

Applying the named snapshot via the helper:

```jsx
<div className="panel-slot">
  {show ? (
    <ViewTransition name="vt-fade">
      <div className="enter-exit-panel">
        <h2>Interactive Panel</h2>
        <p>This element enters and exits with a ViewTransition animation.</p>
        <div className="panel-body">
          <p>The panel is larger now, giving the transition more surface to showcase the motion.</p>
          <ul>
            <li>Entrance: fade, lift, and de-blur.</li>
            <li>Exit: fade, rise, and blur out.</li>
            <li>Re-show any time with the controls.</li>
          </ul>
        </div>
      </div>
    </ViewTransition>
  ) : (
    <div className="placeholder">
      <p>The panel is hidden. Click "Show panel" to bring it back with the transition.</p>
    </div>
  )}
</div>
```

CSS for the named transition:

```css
@keyframes vt-fade-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes vt-fade-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateY(-12px) scale(0.98);
    filter: blur(6px);
  }
}

::view-transition-new(vt-fade) {
  animation: vt-fade-in 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-old(vt-fade) {
  animation: vt-fade-out 260ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173) in a Chromium-based browser with the View Transitions API enabled. Build for production with:

```bash
npm run build
```
