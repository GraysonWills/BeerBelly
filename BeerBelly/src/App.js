import React, { useState, useEffect } from 'react';
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
import AgeVerificationModal from './components/AgeVerificationModal/AgeVerificationModal';
import RestrictedPage from './components/RestrictedPage/RestrictedPage';
import LoginPage from './pages/Login/LoginPage';
import { Navigate } from 'react-router-dom';



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
        transition: { duration: 0.3 }, // Shortened for snappier response
        onComplete: () => window.scrollTo(0, 0)
      }}
      transition={{ 
        duration: 0.1,
        delay: 0.4 // This gives time for navbar to close
      }}
    >
      {children}
    </motion.div>
  );
};const AnimatedRoutes = () => {
  const location = useLocation();
  
  const pageComponents = {
    Home: <Home />,
    "Find By Taste": <Home />,
    "How To": <HowTo />,
    "Locations": <LocationServices />,
    "Recipes": <Home />,
    "Restricted": <RestrictedPage />,
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};
function App() {
  const [showAgeModal, setShowAgeModal] = useState(false);
  const isAgeVerified = localStorage.getItem('isAgeVerified');

  if (!isAgeVerified) {
    return (
      <AgeVerificationModal 
        show={true}
        onVerified={() => window.location.reload()}
      />
    );
  }

  if (isAgeVerified === 'false') {
    return <RestrictedPage />;
  }

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


