import './App.css'
import { useActionState, useState } from 'react'

function App() {
  const handleSubmit = (prevData, formData) => {
    const firstName = (formData.get('firstName') ?? '').toString().trim()
    const lastName = (formData.get('lastName') ?? '').toString().trim()
    const email = (formData.get('email') ?? '').toString().trim()
    const phone = (formData.get('phone') ?? '').toString().trim()
    if(!firstName) {
      return { error: 'First Name is required' }
    } else if(!lastName) {
      return { error: 'Last Name is required' }
    } else if(!email) {
      return { error: 'Email is required' }
    } else if(!phone) {
      return { error: 'Phone is required' }
    } else if(phone && phone.length !== 10) {
      return { error: 'Phone must be 10 digits' }
    } else if(email && email.includes('@') === false) {
      return { error: 'Email must contain @' }
    } else if(firstName && firstName.length < 3) {
      return { error: 'First Name must be at least 3 characters' }
    } else if(lastName && lastName.length < 3) {
      return { error: 'Last Name must be at least 3 characters' }
    } else {
      return {
        ...prevData,
        firstName,
        lastName,
        email,
        phone,
        error: null,
        message: 'Form submitted successfully',
      }
    }
    // controlled error and validation
    // e.preventDefault()
    // if(firstName === '') {
    //   setError('First Name is required')
    // } else if(lastName === '') {
    //   setError('Last Name is required')
    // } else if(email === '') {
    //   setError('Email is required')
    // } else if(phone === '') {
    //   setError('Phone is required')
    // } else if(phone.length !== 10) {
    //   setError('Phone must be 10 digits')
    // } else if(email.includes('@') === false) {
    //   setError('Email must contain @')
    // } else if(firstName.length < 3) {
    //   setError('First Name must be at least 3 characters')
    // } else if(lastName.length < 3) {
    //   setError('Last Name must be at least 3 characters')
    // }else {
    //   setError('')
    //   setMessage('Form submitted successfully')
    // }
  }

  const [state, formAction, submitting] = useActionState(handleSubmit, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    error: null,
    message: null
  })

  return (
    <div>
      <h1>User Form</h1>
      {state?.message && <span style={{ color: 'green' }}>{state.message}</span>}
      {state?.error && <span style={{ color: 'red' }}>{state.error}</span>}
      {/* {error && <span style={{ color: 'red' }}>{error}</span>}
      {message && <span style={{ color: 'green' }}>{message}</span>} */}
      <form action={formAction}>
        <input type="text" name="firstName" placeholder="First Name" defaultValue={state?.firstName} />
        <br />  
        <input type="text" name="lastName" placeholder="Last Name" defaultValue={state?.lastName} />
        <br />
        <input type="email" name="email" placeholder="Email" defaultValue={state?.email} />
        <br />
        <input type="number" name="phone" placeholder="Phone" defaultValue={state?.phone} />
        <br />
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  )
  
}

export default App
