import { useState } from 'react'

/**
 * Grandchild: receives message + setter from above. Typing here updates
 * state that lives in the grandparent (child → parent flow, repeated down the tree).
 */
function GrandchildEditor({ message, onMessageChange }) {
  return (
    <div className="lesson-nest lesson-nest--deep">
      <p className="lesson-role">Grandchild</p>
      <p className="lesson-caption">
        Calls <code>onMessageChange</code> so the grandparent’s state updates.
      </p>
      <label className="lesson-label" htmlFor="gp-message">
        Edit the shared message
      </label>
      <textarea
        id="gp-message"
        className="lesson-textarea"
        rows={3}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type here — state is stored in the grandparent"
      />
    </div>
  )
}

/**
 * Middle: does not own the message; it only forwards props (prop drilling).
 */
function ParentMiddle({ message, onMessageChange }) {
  return (
    <div className="lesson-nest">
      <p className="lesson-role">Parent (middle — passes props through)</p>
      <GrandchildEditor message={message} onMessageChange={onMessageChange} />
    </div>
  )
}

/**
 * Grandparent → Parent → Grandchild: one piece of state, owned at the top.
 */
export function GrandparentLesson() {
  const [message, setMessage] = useState('Hello from the top!')

  return (
    <section className="lesson-card" aria-labelledby="lesson-grandparent">
      <h2 id="lesson-grandparent">3. Grandparent → grandchild</h2>
      <p className="lesson-lead">
        Same idea as the form demo, but with a single string. The middle component
        does not read or edit <code>message</code>; it only passes props. That is
        why people later reach for Context or other tools when this chain gets long.
      </p>
      <div className="lesson-nest lesson-nest--root">
        <p className="lesson-role">Grandparent (owns state)</p>
        <p className="lesson-live">
          Current message: <strong>{message || '(empty)'}</strong>
        </p>
        <ParentMiddle message={message} onMessageChange={setMessage} />
      </div>
    </section>
  )
}
