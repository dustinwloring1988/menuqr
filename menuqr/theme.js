```javascript
// Function to toggle between light and dark modes
export function toggleTheme() {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    // Switch to light mode
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  } else {
    // Switch to dark mode
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
}

// Initialize theme on app load
export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
```

## 2. Update `Header.js` to Support Dark Mode

Let's check for the header component:

```bash
ls -la ./components/Header*
```
