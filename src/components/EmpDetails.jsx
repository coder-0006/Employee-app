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

const EmpDetails = () => {
  const [data, setData] = useState([]); // Array to store employee data
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [open, setOpen] = useState(false); // Controls add/edit dialog visibility
  const [selectedRow, setSelectedRow] = useState(null); // Selected row for editing

  // Fetch data from API on component mount
  const fetchData = async () => {
    try {
      const response = await axios.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch when the component mounts
  }, []);

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Open the add/edit dialog
  const handleOpen = () => {
    setOpen(true);
    setSelectedRow(null); // Clear selected row for new employee
  };

  // Close the add/edit dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle row selection for editing
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true); // Open dialog with selected data
  };

  // Filter data based on search query (search by ID)
  const filteredData = data.filter((row) =>
    row.id.toString().includes(searchQuery)
  );

  // Handle employee deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Function to reload the data after add/edit
  const handleAddEditEmployee = () => {
    fetchData(); // Reload employee list after add/edit
    handleClose(); // Close the dialog
  };

  return (
    <div>
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Button className="add-new" onClick={handleOpen}>
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
                  <div className="table-actions">
                    <Button className="edit-btn" onClick={() => handleRowClick(row)}>
                      Edit
                    </Button>
                    <Button className="delete-btn" onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedRow ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <AddEdit
            initialData={selectedRow}
            handleClose={handleClose}
            handleAddEditEmployee={handleAddEditEmployee}
            refreshData={fetchData}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpDetails;
