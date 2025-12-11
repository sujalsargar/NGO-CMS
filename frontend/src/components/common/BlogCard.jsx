import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x250';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={getImageUrl(blog.thumbnail)} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(blog.created_at)} • {blog.author_details?.full_name || 'Admin'}
        </div>
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt || blog.content?.slice(0, 140) + '...'}</p>
        <Link to={`/blog/${blog.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;