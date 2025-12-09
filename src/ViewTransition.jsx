import { cloneElement, isValidElement } from 'react';

/**
 * Lightweight ViewTransition helper for React 19:
 * - Applies a viewTransitionName to the single child element.
 * - Leaves render tree unchanged otherwise (keeps CSS ::view-transition-* working).
 */
export function ViewTransition({ name = 'vt-fade', children }) {
  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children, {
    style: {
      viewTransitionName: name,
      ...(children.props?.style || {}),
    },
  });
}
