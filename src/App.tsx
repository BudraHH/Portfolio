import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';

function App() {
  // useBreakpointLogger();
  // useDocumentTitle('BudraPortfolio');

  const [welcomeRendered, setWelcomeRendered] = useState(() => {
    const stored = localStorage.getItem('welcome_seen');
    if (!stored) return false;

    const timestamp = parseInt(stored, 10);
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // If the timestamp is valid and less than 24 hours old, skip welcome
    if (!isNaN(timestamp) && now - timestamp < ONE_DAY) {
      return true;
    }

    // Otherwise, clear it and show welcome
    localStorage.removeItem('welcome_seen');
    return false;
  });

  useEffect(() => {
    if (welcomeRendered) {
      // Store the timestamp of when they entered the portfolio
      localStorage.setItem('welcome_seen', Date.now().toString());
    }
  }, [welcomeRendered]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col relative min-h-screen font-sans bg-background antialiased 
      px-6 md:px-16 lg:px-14 xl:px-28 2xl:px-32 3xl:px-44 mx-auto w-full max-w-[2560px]">

        <Navbar welcomeRendered={welcomeRendered} />

        <AnimatePresence mode="wait">
          {welcomeRendered ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-h-screen"
            >
              <Outlet />
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Welcome setWelcomeRendered={setWelcomeRendered} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
