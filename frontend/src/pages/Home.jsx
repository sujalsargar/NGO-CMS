import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProjectCard from '../components/common/ProjectCard';
import { getProjects } from '../api/projects';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Making a Difference Together</h1>
          <p className="text-xl mb-8">Join us in transforming lives and communities worldwide</p>
          <div className="space-x-4">
            <Link to="/donate" className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400">
              Donate Now
            </Link>
            <Link to="/get-involved" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Mission</h2>
              <p className="text-gray-700">
                To empower communities through sustainable development programs, education, 
                and healthcare initiatives that create lasting positive change.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Vision</h2>
              <p className="text-gray-700">
                A world where every individual has access to opportunities for growth, 
                dignity, and a better future for themselves and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Lives Touched</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">25</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;