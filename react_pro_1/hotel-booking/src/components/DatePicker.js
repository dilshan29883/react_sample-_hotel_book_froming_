import React from 'react';

const DatePicker = ({ handleInputChange }) => {
  return (
    <div className="form-group">
      <label>Check-In Date</label>
      <input type="date" name="checkInDate" onChange={handleInputChange} required />
      
      <label>Check-Out Date</label>
      <input type="date" name="checkOutDate" onChange={handleInputChange} required />
    </div>
  );
};

export default DatePicker;

