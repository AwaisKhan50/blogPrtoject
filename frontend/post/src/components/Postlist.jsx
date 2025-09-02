import React from 'react';

const highlightText = (text, filter) => {
  if (!filter) return text;
  const regex = new RegExp(`(${filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <span key={i} style={{ backgroundColor: '#ffe066', color: '#222' }}>{part}</span>
      : part
  );
};

const Postlist = ({ posts = [], filter = '', onDelete, onEdit }) => {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2 rounded shadow">
          <h2 className="font-bold">{highlightText(post.title, filter)}</h2>
          <p>{post.content}</p>
          <small className="text-gray-500">
            {post.created_at && new Date(post.created_at).toLocaleString() }
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