import React from 'react';
import { Link } from 'react-router-dom';

const NewQRPage = () => {
  return (
    <div>
      <h1>Scan QR Codes</h1>
      <ul>
        {/* render QR code list here */}
      </ul>
      <Link to="/qr/new">Add New QR Code</Link>
    </div>
  );
};

export default NewQRPage;