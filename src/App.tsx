import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { useBreakpointLogger } from './hooks/useBreakpointLogger';

function App() {
  useBreakpointLogger();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
