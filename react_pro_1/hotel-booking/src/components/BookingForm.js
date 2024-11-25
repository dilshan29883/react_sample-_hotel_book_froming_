import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';
import GuestInfo from './GuestInfo';
import RoomDetails from './RoomDetails';


const BookingForm = () => {
  const [formData, setFormData] = useState({
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    fullName: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';

    if (!formData.roomType) errors.roomType = 'Room type is required';
    if (!formData.checkInDate) errors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) errors.checkOutDate = 'Check-out date is required';
    if (formData.checkInDate && formData.checkOutDate && formData.checkOutDate <= formData.checkInDate) {
      errors.checkOutDate = 'Check-out date must be after check-in date';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:8000/api/book', formData); // Updated to use the 8000 port
        setSuccessMessage('Booking successful!');
        console.log(response.data);
      } catch (error) {
        console.error('There was an error making the booking', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <RoomDetails handleInputChange={handleInputChange} />
      {errors.roomType && <p className="error">{errors.roomType}</p>}

      <DatePicker handleInputChange={handleInputChange} />
      {errors.checkInDate && <p className="error">{errors.checkInDate}</p>}
      {errors.checkOutDate && <p className="error">{errors.checkOutDate}</p>}

      <GuestInfo handleInputChange={handleInputChange} />

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <button type="submit" className="btn-book-now" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default BookingForm;
