import React, { useState, useEffect } from 'react';
import '../../css/AddedSuccessfully.css';

function AddedSuccessfully({ message = "Item added successfully!" }) {
  return (
    <>
      <div className="added-successfully">{message}</div>
    </>
  );
}

export default AddedSuccessfully;
