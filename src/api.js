import axios from 'axios';

// Define the base URL for your API
const API_URL = 'http://localhost:5000/api/templates';

// Function to get the list of templates
export const getTemplates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// Function to create a new template
export const createTemplate = async (templateData) => {
  try {
    const response = await axios.post(API_URL, templateData);
    return response.data;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

// Function to update an existing template
export const updateTemplate = async (id, templateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, templateData);
    return response.data;
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};
