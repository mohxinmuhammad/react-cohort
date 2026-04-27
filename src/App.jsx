import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

function App() {
  return (
    <div className='container'>
      <nav className='app-nav' aria-label='Main'>
        <ul className='app-nav__list'>
          {NAV.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className='app-nav__link'>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className='app-main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
