import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/admin/projects" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📊</div>
              <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
              <p className="text-gray-600">Create, edit, and delete projects</p>
            </Link>
            
            <Link 
              to="/admin/blogs" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📝</div>
              <h2 className="text-xl font-semibold mb-2">Manage Blog Posts</h2>
              <p className="text-gray-600">Create, edit, and delete blog posts</p>
            </Link>
            
            <Link 
              to="/admin/donations" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">💰</div>
              <h2 className="text-xl font-semibold mb-2">View Donations</h2>
              <p className="text-gray-600">See all donation records</p>
            </Link>
            
            <Link 
              to="/admin/volunteers" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">👥</div>
              <h2 className="text-xl font-semibold mb-2">View Volunteers</h2>
              <p className="text-gray-600">Manage volunteer applications</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;