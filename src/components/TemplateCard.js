import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
function TemplateCard({ template }) {
  const { id, name, created_at, type } = template;

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <div className="template-card">
      <h3>{name}</h3>
      <p>Created on: {formattedDate}</p>
      <p>Type: {type === 'user-created' ? 'User Created' : 'Library Template'}</p>
      <Link to={`/editor/${id}`} className="edit-button">
        Edit Template
      </Link>
    </div>
  );
}

export default TemplateCard;
