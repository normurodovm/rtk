import React from "react";
import { useNavigate } from 'react-router-dom';

export const Card = ({ id, title, description, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg">
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between">
        <button className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500" onClick={handleEdit}>
          Edit
        </button>
        <button className="bg-red-400 text-white p-2 rounded hover:bg-red-500" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
