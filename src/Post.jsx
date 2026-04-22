import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Post() {

  const [postData, setPostData] = useState([])

  // by Fetch API
  // const fetchPostData = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  //   const data = await response.json()
  //   if(response.status === 200) {
  //     console.log(data);
  //     setPostData(data)
  //   } else {
  //     console.log('Error fetching post data');
  //   }
  //   console.log(data);
  //   setPostData(data)
  //   // const data = await response.json()
  //   // setPostData(data)
  // }

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
              </tr>
            </thead>
            <tbody>
              {postData.length > 0 ? (
                postData.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
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
