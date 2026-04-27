import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

function PostDetail() {

  const {id} = useParams()
  const [postDetailData, setPostDetailData] = useState([])
  // by Axios
  const fetchPostData = async () => {
    if(id){
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
      console.log(response.data);
      setPostDetailData(response.data)
    }
  }

  useEffect(() => {
    fetchPostData()
  }, [])

  return (
    <section className='page'>
      <h1>Post Detail</h1>
      <p>Post detail page</p>
      <p>Title: {postDetailData.title || 'No title found'}</p>
      <p>Body: {postDetailData.body || 'No body found'}</p>
    </section>
  )
}

export default PostDetail