import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProjectCard from '../components/common/ProjectCard';
import { getProjects } from '../api/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔷 THIS IS YOUR NEW CONTENT (Used if Database is empty)
  const defaultProjects = [
    {
      id: 'p1',
      title: 'Education for All Initiative',
      description: 'Transforming Lives Through Learning. Education is the foundation of empowerment. Through this initiative, we help underprivileged children access quality learning materials, mentoring, and digital education tools. We provide school kits, textbooks, and establish community learning centers.',
      location: 'Rural Districts',
      beneficiaries: 500, // 500+ children
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p2',
      title: 'Community Health & Wellness',
      description: 'Health Access for Every Community. This program brings essential healthcare support to regions with limited medical services. We conduct health camps, distribute hygiene essentials, and promote preventive health awareness to build resilient communities.',
      location: 'Remote Villages',
      beneficiaries: 2000, // 2000+ individuals
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p3',
      title: 'Women Empowerment & Skills',
      description: 'Unlocking Potential, Inspiring Independence. Women are powerful drivers of change. This project equips women with practical skills like tailoring, digital literacy, and financial planning to help them gain independence and start small businesses.',
      location: 'Urban Slums',
      beneficiaries: 300, // 300+ women
      image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p4',
      title: 'Clean Water & Sanitation',
      description: 'Safe Water. Healthy Communities. Access to clean water is a basic right. This project ensures marginalized communities have safe drinking water by installing purification units, building wells, and conducting hygiene workshops.',
      location: 'Drought-prone Areas',
      beneficiaries: 1500, // 1500+ people
      image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p5',
      title: 'Environmental Sustainability',
      description: 'Planting Today for a Greener Tomorrow. To fight climate change and promote ecological balance, we organize community-led tree plantations, waste management drives, and environmental education in schools.',
      location: 'Various Regions',
      beneficiaries: 5000, // 5000+ trees/people
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=800',
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        // Only use API data if it exists, otherwise use your new default content
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to default on error
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* 🔷 UPDATED HERO SECTION */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Projects That Create Lasting Change</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Our Projects reflect our commitment to building stronger, healthier, and more empowered communities.
              Each initiative is guided by compassion, sustainability, and the belief that meaningful change begins with collective action.
            </p>
          </div>
        </div>

        {/* 🔷 MAIN CONTENT */}
        <div className="container mx-auto px-4 py-12">
          
          {/* Intro Text */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
             <p className="text-gray-600 text-lg">
               Our initiatives are designed to create sustainable development, empower communities, and open opportunities where they are needed most. 
               Every project is carefully planned, community-driven, and monitored to ensure meaningful, long-term impact.
             </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;