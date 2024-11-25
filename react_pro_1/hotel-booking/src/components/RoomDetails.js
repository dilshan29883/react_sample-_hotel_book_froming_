import React from 'react';

const RoomDetails = ({ handleInputChange }) => {
  return (
    <div className="form-group">
      <label>Room Type</label>
      <select name="roomType" onChange={handleInputChange} required>
        <option value="">Select Room Type</option>
        <option value="single">Single Room</option>
        <option value="double">Double Room</option>
        <option value="suite">Suite</option>
      </select>
    </div>
  );
};

export default RoomDetails;
