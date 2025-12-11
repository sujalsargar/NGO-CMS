import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Donate from './pages/Donate';
import Login from './pages/Login';
import About from './pages/About';     // ← NEW
import Contact from './pages/Contact'; // ← NEW
import Media from './pages/Media';     // ← NEW
import Register from './pages/Register';
import GetInvolved from './pages/GetInvolved';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageBlogs from './pages/admin/ManageBlogs';
import ViewDonations from './pages/admin/ViewDonations';
import ViewVolunteers from './pages/admin/ViewVolunteers';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/media" element={<Media />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/get-involved" element={<GetInvolved />} />
{/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/projects" element={<AdminRoute><ManageProjects /></AdminRoute>} />
          <Route path="/admin/blogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
          <Route path="/admin/donations" element={<AdminRoute><ViewDonations /></AdminRoute>} />
          <Route path="/admin/volunteers" element={<AdminRoute><ViewVolunteers /></AdminRoute>} />




        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;