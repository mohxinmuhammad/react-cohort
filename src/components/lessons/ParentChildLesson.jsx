import { useState } from 'react'

/** Child only displays data from above — parent → child. */
function CountDisplay({ count }) {
  return (
    <p className="lesson-hint">
      <span className="lesson-tag">Child (read)</span> The parent passed{' '}
      <code>count</code>: <strong>{count}</strong>
    </p>
  )
}

/** Child calls a function the parent gave it — child → parent. */
function CountControls({ onIncrement, onReset }) {
  return (
    <div className="lesson-row">
      <span className="lesson-tag">Child (events up)</span>
      <button type="button" className="form-submit" onClick={onIncrement}>
        +1 (notifies parent)
      </button>
      <button type="button" className="lesson-btn-secondary" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

/**
 * State lives in the parent. Children receive values and callbacks as props.
 * No “global” store — just one parent and its descendants.
 */
function ParentWithChildren() {
  const [count, setCount] = useState(0)

  return (
    <div className="lesson-nest lesson-nest--root">
      <p className="lesson-role">Parent (owns state)</p>
      <p className="lesson-caption">
        Down: <code>count</code> → child. Up: child buttons call{' '}
        <code>setCount</code> via props.
      </p>
      <CountDisplay count={count} />
      <CountControls
        onIncrement={() => setCount((c) => c + 1)}
        onReset={() => setCount(0)}
      />
    </div>
  )
}

export function ParentChildLesson() {
  return (
    <section className="lesson-card" aria-labelledby="lesson-parent-child">
      <h2 id="lesson-parent-child">1. Parent ↔ child</h2>
      <p className="lesson-lead">
        State stays in the parent. Pass <strong>data down</strong> and{' '}
        <strong>callbacks up</strong> so children stay controlled and predictable.
      </p>
      <ParentWithChildren />
    </section>
  )
}
