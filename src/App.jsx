import { useState } from 'react'
import './App.css'
import Form from './Form'
import List from './List'
import Post from './Post'

function App() {
  const [userData, setUserData] = useState([])

  return (
    <>
    <div className='container'>
        <h2>User Management</h2>
        {/* <Form setUserData={setUserData} />
        <List userData={userData} /> */}
        <Post />
    </div>
    </>
  )
}

export default App
