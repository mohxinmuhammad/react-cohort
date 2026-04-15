
import Collage from './components/contextAPI/collage'
// import { collageContext } from './context/collageContext'
// import { useContext } from 'react'
// useContext
function App() {
  return (
    <>
    <section className="lesson-card" style={{ backgroundColor: 'steelblue', border: '1px solid black' }}>
      <h2>Main Page</h2>
      <Collage />
    </section>
      {/* <section id="center">
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
      <section id="spacer" /> */}
    </>
  )
}

export default App
