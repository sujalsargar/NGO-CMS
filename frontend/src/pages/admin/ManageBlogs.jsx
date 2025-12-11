import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import BlogCard from '../../components/common/BlogCard';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../api/blogs';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    thumbnail: '',
    author: 'Admin User', // In real app, this would be current user
  });
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, use mock data until backend is ready
    const mockBlogs = [
      {
        id: 1,
        title: "How Education Changed My Life",
        content: "I grew up in a small village where access to education was limited. Thanks to the NGO's education program, I was able to complete my schooling and go on to university. Today, I'm a teacher myself, helping other children achieve their dreams.",
        excerpt: "One student's journey from poverty to becoming a teacher.",
        thumbnail: "https://via.placeholder.com/400x250?text=Education+Story",
        author_details: { full_name: "Admin User" },
        created_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        title: "The Power of Clean Water",
        content: "Access to clean water transformed our community. Before, we spent hours each day fetching water from distant sources. Now, with the new water purification system, children can attend school instead of spending their days carrying water jugs.",
        excerpt: "How clean water changed a village's daily life.",
        thumbnail: "https://via.placeholder.com/400x250?text=Clean+Water",
        author_details: { full_name: "Admin User" },
        created_at: "2024-02-20T14:30:00Z"
      }
    ];
    
    setBlogs(mockBlogs);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(formData);
      // Refresh blogs list
      setBlogs([...blogs, { ...formData, id: blogs.length + 1, created_at: new Date().toISOString() }]);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        thumbnail: '',
        author: 'Admin User',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading blogs...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add New Post'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">{formData.id ? 'Edit Post' : 'Add New Post'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="title">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="excerpt">
                    Excerpt (for cards) *
                  </label>
                  <input
                    type="text"
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="content">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="8"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="thumbnail">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    disabled
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {formData.id ? 'Update Post' : 'Create Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        title: '',
                        content: '',
                        excerpt: '',
                        thumbnail: '',
                        author: 'Admin User',
                      });
                      setShowForm(false);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={blog.thumbnail || 'https://via.placeholder.com/400x250'} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(blog.created_at).toLocaleDateString()} • {blog.author_details?.full_name || 'Admin'}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageBlogs;