# Enter / Exit ViewTransition Demo

Vite + React 19 app that shows a panel entering and exiting with the View Transitions API (with graceful fallback when the API is unavailable).

## Features

- **Explicit show/hide controls** so you can replay the transition at will.
- **Native View Transition trigger**: state updates are wrapped in `document.startViewTransition` when supported, otherwise it falls back to normal React state updates.
- **Named snapshot for styling**: the panel uses `viewTransitionName: 'vt-fade'` so CSS can target it with `::view-transition-*` pseudo-elements.
- **Larger animated surface**: the panel is roomy to make the motion easy to notice, with helpful placeholder text when hidden.

### Key code

Transition wrapper (fallback-safe):

```jsx
const runWithViewTransition = update => {
  if (typeof document !== 'undefined' && document.startViewTransition) {
    document.startViewTransition(() => startTransition(update));
  } else {
    startTransition(update);
  }
};
```

Named snapshot + content:

```jsx
{show && (
  <div className="enter-exit-panel" style={{ viewTransitionName: 'vt-fade' }}>
    <h2>Interactive Panel</h2>
    <p>This element enters and exits with a ViewTransition animation.</p>
    <div className="panel-body">
      <ul>
        <li>Entrance: fade, lift, and de-blur.</li>
        <li>Exit: fade, rise, and blur out.</li>
        <li>Re-show any time with the controls.</li>
      </ul>
    </div>
  </div>
)}
```

CSS for the named transition:

```css
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

Open the URL Vite prints (default http://localhost:5173). For best results use a Chromium-based browser with the View Transitions API enabled. You can also build for production with:

```bash
npm run build
```
