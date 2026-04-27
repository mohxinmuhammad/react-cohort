import {NavLink} from 'react-router-dom'

function NavBar() {

  return (
    <>
      <nav className='app-nav' aria-label='Main'>
        <ul className='app-nav__list'>
            <li key="home">
              <NavLink to="/" end={true} className='app-nav__link'>
                Home
              </NavLink>
              <NavLink to="/post" end={false} className='app-nav__link'>
                Post
              </NavLink>
              <NavLink to="/about" end={false} className='app-nav__link'>
                About Us
              </NavLink>
              <NavLink to="/services" end={false} className='app-nav__link'>
                Services
              </NavLink>
              <NavLink to="/blog" end={false} className='app-nav__link'>
                Blog
              </NavLink>
              <NavLink to="/contact" end={false} className='app-nav__link'>
                Contact Us
              </NavLink>
            </li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
