import { memo, useRef } from 'react'

function CallbackDemoChild({ label, onPing }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div className='demo-callback-child'>
      <p>
        <strong>{label}</strong> — renders:{' '}
        <code>{renderCount.current}</code>
      </p>
      <button type='button' onClick={onPing}>
        Run parent callback
      </button>
    </div>
  )
}

export default memo(CallbackDemoChild)
