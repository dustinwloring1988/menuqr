import React, { useState } from 'react';
import '../styles/globals.css'; // Ensure globals.css is imported

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <header className="header">
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;