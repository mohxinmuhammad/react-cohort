
import Collage from './components/contextAPI/collage'
// import { collageContext } from './context/collageContext'
// import { useContext } from 'react'
import {useState} from 'react'

import{useEffect} from 'react'
// useContext
function App() {
  const [name, setName] = useState('Asad')
  const [count, setCount] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [timer, setTimer] = useState(0)
  const [show, setShow] = useState(false)

  // console.log(name);
  
  const callOnce = (message) => {
    console.log(message);
  }
  
  const counting = () => {
    if(startTimer){
      setTimeout(() => {
        setTimer((timer) => timer + 1);
        console.log("timer:", timer);
        
      }, 1000);
    }
  }

  // call on all state change
  useEffect(() => {
    callOnce("calling on rerender")
  });

  // call ontime on init
  useEffect(() => {
    callOnce("Call Once")
  }, []);
  
  // bind with state or props - dependencies
  useEffect(() => {
    callOnce("Call on name change")
  }, [name]);


  useEffect(() => {
    console.log("start timer", startTimer);
    if(startTimer){
      console.log("if block");
      
      counting()
    }else{
      setTimer(0);
    }
  }, [startTimer, timer])
  // callOnce() 
  return (
    <>
    <section className="lesson-card" style={{ backgroundColor: 'steelblue', border: '1px solid black' }}>
      <h2>Main Page</h2>
      <h3>{name}</h3>
      {/* <input type="text" value={name} onChange={ e => {setName(e.target.value)}} />
      <br />
      <input type="number" value={count} onChange={ e => {setCount(e.target.value)}} /> */}
      <div className="row">
      <h3>Time: {timer}</h3>
      <button onClick={() => setStartTimer(!startTimer)}> {!startTimer ? "start" : "stop"}</button>
      {/* <button onCLick={() => setStartTimer(false)}> stop</button> */}
      </div>

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
