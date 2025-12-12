import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { createDonation } from '../api/donations';
import { getProjects } from '../api/projects';

const Donate = () => {
  const [formData, setFormData] = useState({
    amount: '',
    project: '',
    payment_method: 'credit_card',
    frequency: 'one_time',
    donor_name: '',
    donor_email: '',
    donor_phone: '',
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createDonation(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Donation error:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p>Your donation has been received successfully.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">Make a Donation</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="amount">
                  Donation Amount ($) *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="project">
                  Select Project (Optional)
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">General Fund</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Donation Frequency *</label>
                <div className="space-y-2">
                  {[
                    { value: 'one_time', label: 'One Time' },
                    { value: 'monthly', label: 'Monthly' },
                    { value: 'quarterly', label: 'Quarterly' },
                    { value: 'yearly', label: 'Yearly' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value={option.value}
                        checked={formData.frequency === option.value}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Payment Method *</label>
                <div className="space-y-2">
                  {[
                    { value: 'credit_card', label: 'Credit Card' },
                    { value: 'debit_card', label: 'Debit Card' },
                    { value: 'net_banking', label: 'Net Banking' },
                    { value: 'upi', label: 'UPI' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="payment_method"
                        value={option.value}
                        checked={formData.payment_method === option.value}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="donor_name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="donor_name"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="donor_email">
                  Email *
                </label>
                <input
                  type="email"
                  id="donor_email"
                  name="donor_email"
                  value={formData.donor_email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="donor_phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="donor_phone"
                  name="donor_phone"
                  value={formData.donor_phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-300 font-semibold"
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;