```javascript
import React, { useEffect, useState } from 'react';
import { toggleTheme, initializeTheme } from '../menuqr/theme';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();

    // Set the initial state based on localStorage
    if (localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Add event listener for theme changes
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('theme');
      setIsDarkMode(theme === 'dark');
    });

    return () => {
      window.removeEventListener('storage', () => {});
    };
  }, []);

  return (
    <header className={isDarkMode ? 'dark' : ''}>
      <button onClick={() => { toggleTheme(); setIsDarkMode(!isDarkMode); }}>
        Toggle Dark Mode
      </button>
      {/* header content */}
    </header>
  );
};

export default Header;
```

## 3. Update `Card.js` to Support Dark Mode

Let's check for the card component:

```bash
ls -la ./components/Card*
```
