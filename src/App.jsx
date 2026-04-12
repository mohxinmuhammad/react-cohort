import { useState } from 'react'
import './App.css'
import { ParentChildLesson } from './components/lessons/ParentChildLesson'
import { GlobalFormDrilling } from './components/lessons/GlobalFormDrilling'
import { GrandparentLesson } from './components/lessons/GrandparentLesson'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [globalInteractionCount, setGlobalInteractionCount] = useState(0)

  function handleFieldChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleGlobalFormAction() {
    setGlobalInteractionCount((n) => n + 1)
  }

  return (
    <>
      <section id="center">
        <header className="lesson-page-header">
          <h1>State with props</h1>
          <p className="lesson-intro">
            This page shows how data moves in React without Context or Redux:{' '}
            <strong>parent → child</strong> (values), <strong>child → parent</strong>{' '}
            (callbacks), <strong>deep trees</strong> (prop drilling), and{' '}
            <strong>global-ish state</strong> by lifting it to <code>App</code> and
            passing it down.
          </p>
        </header>

        <div className="lesson-stack">
          <ParentChildLesson />
          <GlobalFormDrilling
            form={form}
            onFieldChange={handleFieldChange}
            totalInteractions={globalInteractionCount}
            onPrimaryAction={handleGlobalFormAction}
          />
          <GrandparentLesson />
        </div>
      </section>

      <div className="ticks" aria-hidden />
      <div className="ticks" aria-hidden />
      <section id="spacer" />
    </>
  )
}

export default App
