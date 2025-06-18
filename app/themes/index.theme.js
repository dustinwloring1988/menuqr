// index.theme.js
import { createTheme } from '@radix-ui/react-theme';
import darkMode from './dark-mode';

const theme = createTheme({
  ...darkMode,
});

export default theme;