import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { getAllVolunteers } from '../../api/volunteers';

const ViewVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, use mock data until backend is ready
    const mockVolunteers = [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1234567890",
        message: "I'm passionate about education and would love to help with teaching or tutoring programs.",
        project: { title: "Education for All" },
        created_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael@example.com",
        phone: "+0987654321",
        message: "I have experience in healthcare and would like to volunteer at your mobile clinics.",
        project: { title: "Healthcare Access" },
        created_at: "2024-02-20T14:30:00Z"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily@example.com",
        phone: "+1122334455",
        message: "I'm a graphic designer and would love to help with creating promotional materials for your projects.",
        project: { title: "Clean Water Initiative" },
        created_at: "2024-03-10T09:00:00Z"
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setVolunteers(mockVolunteers);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading volunteers...</div>
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
          <h1 className="text-4xl font-bold text-center mb-8">All Volunteer Applications</h1>
          
          <div className="space-y-6">
            {volunteers.map(volunteer => (
              <div key={volunteer.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{volunteer.name}</h3>
                    <div className="text-gray-600">
                      {volunteer.email} • {volunteer.phone}
                    </div>
                    {volunteer.project && (
                      <div className="text-sm text-blue-600 mt-1">
                        Interested in: {volunteer.project.title}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(volunteer.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 whitespace-pre-line">
                    {volunteer.message}
                  </p>
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

export default ViewVolunteers;