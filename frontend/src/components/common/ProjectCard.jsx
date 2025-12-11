import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img 
        src={project.image || 'https://via.placeholder.com/400x300'} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.short_description || project.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>📍 {project.location}</span>
          <span>👥 {project.beneficiaries} beneficiaries</span>
        </div>
        <Link 
          to={`/projects/${project.id}`}
          className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;