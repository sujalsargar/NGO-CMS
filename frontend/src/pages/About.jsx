import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-blue-600 text-white py-16 mb-12 rounded-lg">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-xl">
                Dedicated to creating sustainable, positive change in underserved communities.
              </p>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
              <p className="mb-6">
                Our NGO is dedicated to creating sustainable, positive change in underserved communities.
                We work across education, healthcare, skill development, and community empowerment to ensure 
                that every individual has the opportunity to thrive.
              </p>
              <p>
                Founded on the belief that meaningful change begins at the grassroots level, we partner with 
                local communities to identify their needs and co-create solutions that empower them to build 
                a better future for themselves and generations to come.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h2>
            <p className="text-lg mb-6">
              To empower individuals and communities through inclusive programs that promote education, health, 
              livelihood opportunities, and social well-being.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">📚 Education</h3>
                <p>Provide access to quality education for children and youth.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">🏥 Healthcare</h3>
                <p>Support healthcare and wellness initiatives.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">💼 Livelihood</h3>
                <p>Enable skill development and employment opportunities.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">🌱 Sustainability</h3>
                <p>Promote sustainable community-led solutions.</p>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Vision</h2>
            <p className="text-lg mb-6">
              A world where every person has equal access to opportunities, dignity, and a better quality of life.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold mb-2">💪 Empowerment</h3>
                <p>Build strong, self-reliant communities.</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold mb-2">🤝 Inclusiveness</h3>
                <p>Encourage social responsibility and inclusiveness.</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold mb-2">🌍 Sustainability</h3>
                <p>Create long-term impact through sustainable development.</p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💙</span>
                <div>
                  <h3 className="font-semibold">Compassion</h3>
                  <p className="text-gray-700">We believe in supporting communities with empathy and understanding.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <h3 className="font-semibold">Integrity</h3>
                  <p className="text-gray-700">We operate with transparency, honesty, and accountability in everything we do.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold">Sustainability</h3>
                  <p className="text-gray-700">We design programs that create long-lasting impact and growth.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📘</span>
                <div>
                  <h3 className="font-semibold">Education</h3>
                  <p className="text-gray-700">We promote learning as a fundamental tool for empowerment.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-gray-700">We work closely with local communities to ensure our programs meet real needs.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-700">Lives Impacted Through Education</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-700">Community Projects Completed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-700">Volunteers Engaged</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-700">Partnerships with Local Organizations</div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Founder – Neha Sharma</h3>
                <p className="text-sm text-gray-600">Visionary leader committed to community empowerment.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Program Director – Rohit Patel</h3>
                <p className="text-sm text-gray-600">Oversees project implementation and impact monitoring.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Communications Lead – Aisha Khan</h3>
                <p className="text-sm text-gray-600">Manages outreach, partnerships, and public relations.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Volunteer Coordinator – Arjun Mehta</h3>
                <p className="text-sm text-gray-600">Connects volunteers with meaningful opportunities.</p>
              </div>
            </div>
          </section>

          {/* Why We Exist */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Why We Exist</h2>
            <div className="max-w-4xl mx-auto bg-blue-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that meaningful change begins at the grassroots level. Our mission is to support 
                communities with resources, knowledge, and opportunities that help them build a better future 
                for themselves and generations to come. Every program we develop is designed with community 
                input, ensuring relevance, sustainability, and lasting impact.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;