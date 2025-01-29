import React, { useState } from 'react';
import axios from 'axios';

const Delete = ({ employeeId, handleClose, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${employeeId}`);
      refreshData();  // To re-fetch the data after deletion
      handleClose();  // Close the delete dialog
    } catch (err) {
      setError('Failed to delete employee.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this employee?</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='delete-btn' onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Yes, Delete'}
      </button>
      <button className='cancel-btn' onClick={handleClose}>Cancel</button>
    </div>
  );
};

export default Delete;
