import React from 'react';

const GuestInfo = ({ handleInputChange }) => {
  return (
    <div className="form-group">
      <label>Number of Guests</label>
      <input
        type="number"
        name="guests"
        min="1"
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default GuestInfo;
