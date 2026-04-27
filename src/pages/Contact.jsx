import { Link } from 'react-router-dom'

function Contact() {
  return (
    <section className='page'>
      <h1>Contact</h1>
      <p>Reach out — we would love to hear from you.</p>
      <p>
        <Link to='/'>Back to home</Link>
      </p>
    </section>
  )
}
export default Contact
