import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Card.css';

function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [tab, setTab] = useState('library');

  useEffect(() => {
    axios.get('http://localhost:8000/api/templates')
      .then(response => {
        console.log(response.data); // Log to check the response data
        setTemplates(response.data);
      })
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      {/* Tab Buttons */}
      <div className="flex justify-start gap-4 mb-6">
        <button 
          onClick={() => setTab('library')}
          className={`px-6 py-2 rounded-lg text-lg font-medium ${tab === 'library' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
        >
          Template Library
        </button>
        <button 
          onClick={() => setTab('saved')}
          className={`px-6 py-2 rounded-lg text-lg font-medium ${tab === 'saved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
        >
          Saved Templates
        </button>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 text-sm mb-4">Created on: {new Date(template.createdAt).toLocaleDateString()}</p>
            <Link
              to={`/editor/${template._id}`}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit Template
            </Link>
            
            <div className="mt-4">
              <img
                src={template.image_url || 'https://via.placeholder.com/150'} // Use template's image_url or placeholder
                alt={template.name} // Use template name for alt text
                className="w-full h-auto object-cover rounded-lg mt-4"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Button */}
      <div className="mt-6 text-center">
        <Link
          to="/editor"
          className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Create Template
        </Link>
      </div>
    </div>
  );
}

export default TemplateList;
