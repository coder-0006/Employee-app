import React from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Delete = ({ open, handleClose, id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      handleClose(); // Close dialog after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this employee?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
