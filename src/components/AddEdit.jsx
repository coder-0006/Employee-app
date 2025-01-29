import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, DialogActions } from '@mui/material';

const AddEdit = ({ initialData, handleClose, refreshData }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }

    setCountries(["USA", "India", "Canada", "UK", "Germany"]); // Hardcoded country list
  }, [initialData]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.emailId.includes('@')) newErrors.emailId = "Invalid email address";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.country) newErrors.country = "Please select a country";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (initialData) {
        await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${initialData.id}`, formData);
      } else {
        await axios.post("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee", formData);
      }

      handleClose();
      refreshData(); //  Refresh the employee list to immediately show new data
    } catch (error) {
      console.error("Error saving employee data:", error);
    }
  };

  return (
    <div className="dialog-container">
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        margin="dense"
      />

      <TextField
        label="Email ID"
        name="emailId"
        value={formData.emailId}
        onChange={handleChange}
        error={!!errors.emailId}
        helperText={errors.emailId}
        fullWidth
        margin="dense"
      />

      <TextField
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        error={!!errors.mobile}
        helperText={errors.mobile}
        fullWidth
        margin="dense"
      />

      <TextField
        select
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        error={!!errors.country}
        helperText={errors.country}
        fullWidth
        margin="dense"
      >
        {countries.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </TextField>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddEdit;
