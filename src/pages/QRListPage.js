import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';

const QRListPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await apiService.getMenuItems();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenuItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>QR Codes</h1>
      <ul>
        {menuItems.map((menuItem) => {
          const qrCode = menuItem.qrCode;
          return (
            <li key={qrCode}>
              <img src={qrCode} alt={`QR code for ${menuItem.name}`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QRListPage;