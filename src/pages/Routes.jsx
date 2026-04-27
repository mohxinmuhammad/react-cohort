import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Post from './Post'
import About from './About'
import Services from './Services'
import Blog from './Blog'
import Contact from './Contact'
import FourOhFour from './FourOhFour'
import PostDetail from './PostDetail'

function RoutesPage() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/post' element={<Post />} />
      <Route path='/services' element={<Services />} />
      <Route path='/blog' element={<Blog />} />  
      <Route path='/contact' element={<Contact />} />
      <Route path='/post_detail/:id' element={<PostDetail />} />
      {/* 404 not found page */}
      <Route path='*' element={<FourOhFour />} />
      
    </Routes>
  )
}

export default RoutesPage