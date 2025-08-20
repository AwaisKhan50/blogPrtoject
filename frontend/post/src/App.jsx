import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Postlist from './components/Postlist'
import './App.css' // Assuming you have some styles in App.css
 useState
const App = () => {


  const [posts, setpost] = useState([])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // fetch post 
  useEffect(() => {
     axios.get('http://localhost:5000/posts')
        .then((res)=>setpost(res.data))
        .catch((error) => console.error('Error fetching posts:', error));
  }, [])

  const handleSubmit=(e)=>{
    e.preventDefault()
    const postData = { title, content };
    axios.post('http://localhost:5000/posts', postData)
      .then((res) => {
        setpost([...posts, res.data]);
        console.log(res.data);
        setTitle('');
        setContent('');
      })       
  }
  
  return (
     <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📌 My Blog</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Post</button>
      </form>

      {/* Posts */}
      <Postlist posts={posts} />
    </div>
  )
}

export default App