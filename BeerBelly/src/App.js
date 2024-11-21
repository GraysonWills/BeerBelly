import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import LandingPage from './pages/Landing/LandingPage';
import Home from './pages/Home/Home';
import HowTo from './pages/How/HowTo';
import LocationServices from './pages/Location/LocationServices';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import navlinks from './content/navlinks.json';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './pages/Login/LoginPage';



//Different animation variants
const pageTransitions = {
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 0.3 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
    transition: { duration: 0.4 }
  }
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.2 },
        onComplete: () => window.scrollTo(0, 0)
      }}
      transition={{ 
        duration: 0.3,
        delay: 0.2 // This gives time for the scroll to complete
      }}
    >
      {children}
    </motion.div>
  );
};
const AnimatedRoutes = () => {
  const location = useLocation();
  
  const pageComponents = {
    Home: <Home />,
    "Find By Taste": <Home />,
    "How To": <HowTo />,
    "Locations": <LocationServices />,
    "Recipes": <Home />,
    "Login": <LoginPage />
  }; 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          } 
        />
        {Object.entries(navlinks).map(([name, { link }]) => (
          <Route 
            key={name} 
            path={link} 
            element={
              <PageTransition>
                {pageComponents[name]}
              </PageTransition>
            } 
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Router>
          <ScrollToTop />
          <CustomNavbar style={{ position: 'sticky', top: 0, zIndex: 1000 }}/>
          <AnimatedRoutes />
        </Router>
      </div>
    );
  }
export default App;