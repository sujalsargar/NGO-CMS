import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { getProject } from '../api/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔷 FULL DEMO DATA (Matching the Projects Page)
  const defaultProjects = [
    {
      id: 'p1',
      title: 'Education for All Initiative',
      description: `Transforming Lives Through Learning. Education is the foundation of empowerment. Through this initiative, we help underprivileged children access quality learning materials, mentoring, and digital education tools.
      
      What we do:
      • Provide school kits, textbooks, and digital learning resources
      • Offer scholarships and tutoring support
      • Establish community learning centers in rural areas
      
      Our Impact:
      📘 500+ children supported annually
      🏫 3 digital learning centers established
      🧑‍🏫 40+ volunteer teachers engaged
      
      Why it matters:
      Every child deserves equal opportunities to learn, grow, and succeed—regardless of income, gender, or location.`,
      location: 'Rural Districts',
      beneficiaries: 500,
      start_date: '2023-01-01',
      end_date: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p2',
      title: 'Community Health & Wellness',
      description: `Health Access for Every Community. This program brings essential healthcare support to regions with limited medical services. We conduct health camps, distribute hygiene essentials, and promote preventive health awareness.
      
      What we do:
      • Free medical checkups and basic treatments
      • Distribution of hygiene kits and essential medicines
      • Workshops on nutrition, mental health, and hygiene
      
      Our Impact:
      🩺 2,000+ individuals medically screened
      💊 600+ families receiving monthly hygiene kits
      🧠 Health awareness sessions held in 10+ communities
      
      Why it matters:
      Healthy individuals create stronger, more resilient communities.`,
      location: 'Remote Villages',
      beneficiaries: 2000,
      start_date: '2023-03-01',
      end_date: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p3',
      title: 'Women Empowerment & Skills',
      description: `Unlocking Potential, Inspiring Independence. Women are powerful drivers of change. This project equips women with practical skills and financial literacy to help them gain independence and confidence.
      
      Training Includes:
      • Tailoring & stitching
      • Computer basics and digital literacy
      • Handicrafts and small-business training
      • Financial literacy workshops
      
      Our Impact:
      👩‍🏫 300+ women trained
      💼 120+ women started their own small businesses
      🤝 25+ self-help groups formed
      
      Why it matters:
      When women thrive, families and communities grow stronger.`,
      location: 'Urban Slums',
      beneficiaries: 300,
      start_date: '2023-06-01',
      end_date: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p4',
      title: 'Clean Water & Sanitation',
      description: `Safe Water. Healthy Communities. Access to clean water is a basic right. This project ensures marginalized communities have safe drinking water and proper sanitation facilities.
      
      What we do:
      • Install water purification units
      • Build community water wells
      • Conduct sanitation and hygiene awareness programs
      
      Our Impact:
      💧 1,500+ people now have access to clean water
      🚰 8 water filtration systems installed
      🧴 Hygiene workshops conducted in 10 villages
      
      Why it matters:
      Clean water reduces disease, improves education outcomes, and transforms daily life.`,
      location: 'Drought-prone Areas',
      beneficiaries: 1500,
      start_date: '2023-02-01',
      end_date: '2024-12-01',
      image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'p5',
      title: 'Environmental Sustainability',
      description: `Planting Today for a Greener Tomorrow. To fight climate change and promote ecological balance, we organize community-led environmental initiatives.
      
      What we do:
      • Tree plantation drives
      • Waste management and recycling awareness
      • Public space clean-up campaigns
      
      Our Impact:
      🌳 5,000+ trees planted
      🧹 20+ community clean-up drives
      🏫 Environmental education in schools
      
      Why it matters:
      A healthy planet ensures a better future for the next generation.`,
      location: 'Various Regions',
      beneficiaries: 5000,
      start_date: '2023-04-22',
      end_date: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=800',
    }
  ];

  useEffect(() => {
    const fetchProject = async () => {
      // 1. First check if the ID matches a Demo Project (p1, p2, etc.)
      const demoProject = defaultProjects.find(p => p.id === id);
      
      if (demoProject) {
        setProject(demoProject);
        setLoading(false);
        return; 
      }

      // 2. If not a demo project, try to fetch from Backend API
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Helper to fix image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/1200x400';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl font-semibold text-blue-600">Loading details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="text-2xl font-bold text-gray-800 mb-4">Project not found</div>
          <Link to="/projects" className="text-blue-600 hover:underline">Return to Projects List</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
            <span className="mr-2">←</span> Back to Projects
          </Link>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Hero Image */}
            <div className="h-64 md:h-96 w-full relative">
                 <img 
                    src={getImageUrl(project.image)} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-8 text-white">
                          <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
                      </div>
                  </div>
            </div>
            
            <div className="p-6 md:p-10">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 border-b pb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Location</div>
                  <div className="font-bold text-gray-800 text-lg mt-1">{project.location}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Beneficiaries</div>
                  <div className="font-bold text-blue-600 text-lg mt-1">{project.beneficiaries}+</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Start Date</div>
                  <div className="font-bold text-gray-800 text-lg mt-1">{new Date(project.start_date).toLocaleDateString()}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Status</div>
                  <div className="font-bold text-green-600 text-lg mt-1 uppercase">Active</div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid md:grid-cols-3 gap-10">
                 <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">About This Initiative</h2>
                    <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {project.description}
                    </div>
                 </div>

                 {/* Sidebar CTA */}
                 <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-4">
                        <h3 className="text-xl font-bold mb-4">Support This Cause</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Your contribution can help us reach more beneficiaries and create deeper impact.
                        </p>
                        <Link 
                            to="/donate" 
                            className="block w-full text-center bg-yellow-500 text-blue-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition shadow-md mb-4"
                        >
                            Donate Now
                        </Link>
                        <Link 
                            to="/get-involved" 
                            className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition"
                        >
                            Volunteer
                        </Link>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;