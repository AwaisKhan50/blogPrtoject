import React from 'react'

const Postlist = ({ posts=[] }) => {
  return (
   <div>
        {posts.map(post => (
          <div key={post.id} className="border p-4 mb-2 rounded shadow">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <small className="text-gray-500">{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
  )
}

export default Postlist