import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import AddEdit from './AddEdit'; 
import Delete from './Delete'; // Import the Delete component

const EmpDetails = () => {
  const [data, setData] = useState([]); // Employee data
  const [searchQuery, setSearchQuery] = useState(''); // Search term
  const [open, setOpen] = useState(false); // Add/Edit dialog open state
  const [selectedRow, setSelectedRow] = useState(null); // Employee being edited
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); //Delete dialog open state
  const [employeeToDelete, setEmployeeToDelete] = useState(null); //Employee being deleted

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    setSelectedRow(null);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDeleteClick = (row) => {
    setEmployeeToDelete(row);
    setDeleteDialogOpen(true);
  };

  const filteredData = data.filter((row) =>
    row.id.toString().includes(searchQuery)
  );

  const refreshData = async () => {
    try {
      const response = await axios.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Button className='add-new' variant="contained" onClick={handleOpen}>
        Add New
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.emailId}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => handleRowClick(row)}>
                    Edit
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDeleteClick(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedRow ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <AddEdit initialData={selectedRow} handleClose={handleClose} refreshData={refreshData} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <Delete 
            employeeId={employeeToDelete ? employeeToDelete.id : null} 
            handleClose={handleClose} 
            refreshData={refreshData} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpDetails;
