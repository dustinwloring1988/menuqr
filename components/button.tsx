// button.tsx
import { Button } from '@radix-ui/react-button';

const DarkButton = () => (
  <Button
    css={{
      background: 'var(--primary-color)',
      color: 'var(--text-color)',
      '&:hover': {
        background: 'var(--primary-hover-color)',
        color: 'var(--text-color)'
      }
    }}
  >
    Click me!
  </Button>
);

export default DarkButton;