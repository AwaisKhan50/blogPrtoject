import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postlist from './components/Postlist';
import './App.css';

const App = () => {
  const [posts, setpost] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  // fetch posts
  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then((res) => setpost(res.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Add or update post
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content };
    if (editId) {
      // Update
      axios.put(`http://localhost:5000/posts/${editId}`, postData)
        .then((res) => {
          setpost(posts.map(post => post.id === editId ? res.data : post));
          setEditId(null);
          setTitle('');
          setContent('');
        });
    } else {
      // Add
      axios.post('http://localhost:5000/posts', postData)
        .then((res) => {
          setpost([...posts, res.data]);
          setTitle('');
          setContent('');
        });
    }
  };

  // Delete post
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => setpost(posts.filter(post => post.id !== id)));
  };

  // Start editing
  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editId ? 'Update Post' : 'Add Post'}
        </button>
        {editId && (
          <button
            type="button"
            className="ml-2 bg-gray-400 text-white p-2 rounded"
            onClick={() => { setEditId(null); setTitle(''); setContent(''); }}
          >
            Cancel
          </button>
        )}
      </form>
      {/* Posts */}
      <Postlist posts={posts} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;