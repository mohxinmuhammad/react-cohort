import './App.css'

function Form({ setUserData }) {
  return (
    <div className='row'>
      <form
        className='user-form'
        onSubmit={(e) => {
          e.preventDefault()
          setUserData((prevUserData) => [...prevUserData, { name: e.target.name.value, email: e.target.email.value }])
        }}
        autoComplete='on'
      >
        <div className='user-form__field'>
          <label htmlFor='user-name'>Name</label>
          <input
            id='user-name'
            name='name'
            type='text'
            placeholder='Jane Doe'
            autoComplete='name'
          />
        </div>
        <div className='user-form__field'>
          <label htmlFor='user-email'>Email</label>
          <input
            id='user-email'
            name='email'
            type='email'
            placeholder='you@example.com'
            autoComplete='email'
          />
        </div>
        <button className='user-form__submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
