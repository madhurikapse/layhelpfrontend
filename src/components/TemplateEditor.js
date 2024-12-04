import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import './Editor.css'; 

function TemplateEditor() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [template, setTemplate] = useState({
    name: '',
    content: '',
    type: 'user-created',
    image_url: '', 
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/templates/${id}`)
        .then(response => setTemplate(response.data))
        .catch(error => console.error('Error fetching template:', error));
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      axios.put(`http://localhost:8000/api/templates/${id}`, template)
        .then(() => navigate('/')) 
        .catch(error => console.error('Error updating template:', error));
    } else {
    
      axios.post('http://localhost:8000/api/templates', template)
        .then(() => navigate('/'))  
        .catch(error => console.error('Error saving template:', error));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    if (id) {
      axios.delete(`http://localhost:8000/api/templates/${id}`)
        .then(() => navigate('/')) 
        .catch(error => {
          console.error('Error deleting template:', error);
          alert('Failed to delete the template.');
        });
    }
  };

  return (
    <div className="template-editor bg-gray-100 min-h-screen p-8">
     
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800 mr-8" />
          <span className="text-lg font-medium">Back</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {id ? "Edit Template" : "Create Template"}
        </h1>
      </div>

      <div className="form-group mb-6">
        <label htmlFor="template-name" className="block text-xl text-gray-700 mb-2">Template Name</label>
        <input
          type="text"
          id="template-name"
          name="name"
          value={template.name}
          onChange={handleChange}
          placeholder="Enter template name"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="form-group mb-6">
        <label htmlFor="template-content" className="block text-xl text-gray-700 mb-2">Template Content</label>
        <textarea
          id="template-content"
          name="content"
          value={template.content}
          onChange={handleChange}
          placeholder="Enter template content"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="form-group mb-6">
        <label htmlFor="image-url" className="block text-xl text-gray-700 mb-2">Image URL</label>
        <input 
          type="text" 
          id="image-url"
          name="image_url"
          value={template.image_url}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {template.image_url && (
        <div className="image-preview mb-6">
          <img 
            src={template.image_url} 
            alt="Template Image" 
            className="w-full h-auto border border-gray-300 rounded-lg"
          />
        </div>
      )}

      <div className="editor-buttons flex justify-between gap-4 mt-8">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Template
        </button>

        {id && (
          <button
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleDelete}
          >
            Delete Template
          </button>
        )}
      </div>
    </div>
  );
}

export default TemplateEditor;
