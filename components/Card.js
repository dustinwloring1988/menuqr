```javascript
import React, { useEffect, useState } from 'react';

const Card = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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
    <div className={`card ${isDarkMode ? 'dark' : ''}`}>
      {children}
    </div>
  );
};

export default Card;
```

## 4. Update `tailwind.config.ts` to Support Dark Mode

Let's check and update the Tailwind configuration:
