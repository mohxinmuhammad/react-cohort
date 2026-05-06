import { useState, useMemo, useCallback, useRef } from 'react'
import './App.css'
import CalculatedValue from './pages/CalculatedValue'
import CallbackDemoChild from './pages/CallbackDemoChild'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(0)

  // --- useMemo: caches a computed VALUE; factory runs only when deps change
  const memoRunCount = useRef(0)
  const memoizedTotal = useMemo(() => {
    memoRunCount.current += 1
    const n = Number(count) || 0
    let acc = n
    for (let i = 0; i < 500; i++) acc += i % 7
    return acc
  }, [count])

  // --- useCallback: caches a FUNCTION reference; new fn only when deps change
  const stablePing = useCallback(() => {
    alert(`useCallback handler — count is ${count}`)
  }, [count])

  const unstablePing = () => {
    alert(`inline handler — count is ${count}`)
  }

  return (
    <div className='lesson'>
      <h1>useMemo vs useCallback</h1>

      <section className='lesson__section'>
        <h2>Difference in one line</h2>
        <ul className='lesson__list'>
          <li>
            <strong>useMemo</strong> — remembers a <em>value</em> (number, object,
            JSX, anything). Skips redoing expensive work until dependencies change.
          </li>
          <li>
            <strong>useCallback</strong> — remembers a <em>function</em>. It is
            roughly <code>useMemo(() =&gt; yourFn, deps)</code>. Use when you pass
            callbacks into <code>memo</code> children or into other hooks’
            dependency arrays.
          </li>
        </ul>
      </section>

      <section className='lesson__section'>
        <h2>useMemo — expensive calculation</h2>
        <p>
          The loop runs only when <code>count</code> changes. Click “Bump data” —
          that updates <code>data</code>, not <code>count</code>, so the number
          below should <strong>not</strong> increase.
        </p>
        <label className='lesson__label'>
          count{' '}
          <input
            type='text'
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <p>
          Memoized total: <strong>{memoizedTotal}</strong>
        </p>
        <p>
          Times the memo factory ran: <strong>{memoRunCount.current}</strong>
        </p>
        <button type='button' onClick={() => setData((d) => d + 1)}>
          Bump data (unrelated state): {data}
        </button>
      </section>

      <section className='lesson__section'>
        <h2>useCallback + React.memo child</h2>
        <p>
          Both children are wrapped in <code>memo()</code>. Bump <strong>data</strong>{' '}
          only: the <strong>stable</strong> child keeps the same callback reference,
          so its render count should stay flat. The <strong>unstable</strong> child
          gets a new inline function every parent render, so it re-renders every time.
        </p>
        <CallbackDemoChild label='Stable callback (useCallback)' onPing={stablePing} />
        <CallbackDemoChild
          label='Unstable callback (new function each render)'
          onPing={unstablePing}
        />
      </section>

      <section className='lesson__section'>
        <h2>Child component with useMemo inside</h2>
        <CalculatedValue count={count} />
      </section>
    </div>
  )
}

export default App
