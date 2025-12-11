import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { getProjects, createProject, updateProject, deleteProject } from '../../api/projects';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    short_description: '',
    start_date: '',
    end_date: '',
    location: '',
    beneficiaries: 0,
    image: '',
    status: 'active',
  });

  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // MOCK DATA UNTIL BACKEND IS CONNECTED
    const mockProjects = [
      {
        id: 1,
        title: "Education for All",
        description: "Providing quality education to underprivileged children.",
        short_description: "Building schools and training teachers in rural areas.",
        start_date: "2023-01-01",
        end_date: "2024-12-31",
        location: "Rural India",
        beneficiaries: 5000,
        image: "https://via.placeholder.com/400x300?text=Education+Project",
        status: "active"
      },
      {
        id: 2,
        title: "Clean Water Initiative",
        description: "Installing water purification systems in remote villages.",
        short_description: "Bringing safe drinking water to 10,000+ people.",
        start_date: "2023-03-15",
        end_date: "2025-03-15",
        location: "Sub-Saharan Africa",
        beneficiaries: 10000,
        image: "https://via.placeholder.com/400x300?text=Water+Project",
        status: "active"
      }
    ];

    setProjects(mockProjects);
    setLoading(false);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('short_description', formData.short_description);
      formPayload.append('start_date', formData.start_date);
      formPayload.append('end_date', formData.end_date);
      formPayload.append('location', formData.location);
      formPayload.append('beneficiaries', formData.beneficiaries);
      formPayload.append('status', formData.status);

      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      let response;

      if (formData.id) {
        response = await updateProject(formData.id, formPayload);
      } else {
        response = await createProject(formPayload);
      }

      // For now, mock push new project
      const newProject = {
        ...formData,
        id: projects.length + 1,
        image: imageFile ? URL.createObjectURL(imageFile) : formData.image
      };

      setProjects([...projects, newProject]);

      // Reset form
      setFormData({
        id: null,
        title: '',
        description: '',
        short_description: '',
        start_date: '',
        end_date: '',
        location: '',
        beneficiaries: 0,
        image: '',
        status: 'active',
      });
      setImageFile(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Edit handler
  const handleEdit = (project) => {
    setFormData(project);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading projects...</div>
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

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Manage Projects</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showForm ? "Cancel" : "Add New Project"}
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {formData.id ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSubmit}>
                
                {/* TITLE */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* SHORT DESCRIPTION */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Short Description *</label>
                  <input
                    type="text"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* FULL DESCRIPTION */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Full Description *</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* DATES */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End Date *</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                {/* LOCATION */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* BENEFICIARIES */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Beneficiaries *</label>
                  <input
                    type="number"
                    name="beneficiaries"
                    min="0"
                    value={formData.beneficiaries}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Upload Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border rounded"
                  />

                  {imageFile && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        className="w-32 h-24 object-cover rounded"
                        alt="Preview"
                      />
                    </div>
                  )}
                </div>

                {/* STATUS */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                {/* BUTTONS */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {formData.id ? "Update Project" : "Create Project"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setImageFile(null);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* PROJECT LIST */}
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded shadow overflow-hidden">
                <img
                  src={project.image || "https://via.placeholder.com/400x300"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.short_description}
                  </p>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>📍 {project.location}</span>
                    <span>👥 {project.beneficiaries}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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

export default ManageProjects;
