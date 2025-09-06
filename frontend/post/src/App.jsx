import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postlist from './components/Postlist';
import './App.css';

const App = () => {
  const [posts, setpost] = useState([]);
  const [filter, setFilter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // fetch posts (with filter) 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/posts',
           {
            
          params: filter ? { filter } :null
           });
        setpost(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [filter]);

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
          setpost([res.data, ...posts]);
          setTitle('');
          setContent('');
        });
    }
  };

  // Show confirmation popup
  const confirmDelete = (id) => {
    setShowDelete(true);
    setDeleteId(id);
  };

  // Delete post after confirmation
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => setpost(posts.filter(post => post.id !== id)));
    setShowDelete(false);
    setDeleteId(null);
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
      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by title..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
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
      <Postlist posts={posts} filter={filter} onDelete={confirmDelete} onEdit={handleEdit} />
      {/* Delete Confirmation Popup */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center top-40  h-40 bg-opacity-80 z-50">
          <div className="bg-gray-400 p-6 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleDelete(deleteId)}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => { setShowDelete(false); setDeleteId(null); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;