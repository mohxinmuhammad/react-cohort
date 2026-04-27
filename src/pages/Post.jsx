import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

function Post() {

  const [postData, setPostData] = useState([])

  // by Axios
  const fetchPostData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPostData(response.data)
  }

  useEffect(() => {
    fetchPostData()
  }, [])

  return (
    <>
    <div className='row'>
        {postData.length > 0 && <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postData.length > 0 ? (
                postData.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td><NavLink to={"/post_detail/" + post.id} end={false} className='app-nav__link'> <i className='fa-solid fa-eye'>view</i></NavLink></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No post data found</td>
                </tr>
              )}
            </tbody>
        </table>}
    </div>
    </>
  )
}

export default Post
