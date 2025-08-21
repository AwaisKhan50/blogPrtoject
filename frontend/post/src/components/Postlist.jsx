import React from 'react';

const Postlist = ({ posts = [], onDelete, onEdit }) => {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2 rounded shadow">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <small className="text-gray-500">
            {post.created_at ? new Date(post.created_at).toLocaleString() : ''}
          </small>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-yellow-400 text-white px-2 py-1 rounded"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Postlist;