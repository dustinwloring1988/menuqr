// layout.tsx
import { Layout } from '@radix-ui/react-layout';
import { ThemeProvider } from '@radix-ui/react-theme';
import { darkMode } from 'app/themes/index.theme';
import DarkMode from 'app/logic/dark-mode';

const AppLayout = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <Layout>
        {/* Your app's content here */}
      </Layout>
      <DarkMode />
    </ThemeProvider>
  );
};

export default AppLayout;