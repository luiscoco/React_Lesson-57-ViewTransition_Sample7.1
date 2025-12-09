// EnterExitDemo.jsx
import { startTransition, useState } from 'react';
import { ViewTransition } from './ViewTransition.jsx';

export default function EnterExitDemo() {
  const [show, setShow] = useState(true);

  const runWithViewTransition = update => {
    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => startTransition(update));
    } else {
      startTransition(update);
    }
  };

  const hidePanel = () => runWithViewTransition(() => setShow(false));
  const showPanel = () => runWithViewTransition(() => setShow(true));

  return (
    <div className="enter-exit-demo">
      <header className="demo-header">
        <div>
          <p className="eyebrow">View Transition</p>
          <h1>Enter & Exit Panel</h1>
          <p className="lede">Smoothly animate the panel as it appears and disappears.</p>
        </div>
        <div className="controls">
          <button onClick={showPanel} disabled={show}>
            Show panel
          </button>
          <button className="secondary" onClick={hidePanel} disabled={!show}>
            Hide panel
          </button>
        </div>
      </header>

      {!show && (
        <div className="placeholder">
          <p>The panel is hidden. Click “Show panel” to bring it back with the transition.</p>
        </div>
      )}

      {show && (
        <ViewTransition name="vt-fade">
          <div className="enter-exit-panel">
            <h2>Interactive Panel</h2>
            <p>
              This element enters and exits with a ViewTransition animation.
            </p>
            <div className="panel-body">
              <p>
                The panel is larger now, giving the transition more surface to showcase the motion.
              </p>
              <ul>
                <li>Entrance: fade, lift, and de-blur.</li>
                <li>Exit: fade, rise, and blur out.</li>
                <li>Re-show any time with the controls.</li>
              </ul>
            </div>
          </div>
        </ViewTransition>
      )}
    </div>
  );
}
