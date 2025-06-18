// dark-mode.js
import { useState } from 'react';
import { useTheme } from '@radix-ui/react-theme';

const DarkMode = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const theme = useTheme();

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    if (darkModeEnabled) {
      theme.set('dark-mode', true);
    } else {
      theme.set('dark-mode', false);
    }
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkModeEnabled ? 'Enable Light Mode' : 'Enable Dark Mode'}
      </button>
    </div>
  );
};

export default DarkMode;