  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import LandingPage from './pages/Landing/LandingPage';
  import Home from './pages/Home/Home';
  import CustomNavbar from './components/landing/Navbar';
  import navlinks from './content/navlinks.json';

  function App() {
    // Map component names to their actual components
    const pageComponents = {
      Home: <Home />,
      "Find By Taste": <Home />,
      "How To": <Home />,
      "Locations": <Home />,
      "Recipes": <Home />
    };

    return (
      <Router>
        <CustomNavbar />
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />
          {/* Dynamic routes from navlinks.json */}
          {Object.entries(navlinks).map(([name, { link }]) => (
            <Route 
              key={name} 
              path={link} 
              element={pageComponents[name]} 
            />
          ))}
        </Routes>
      </Router>
    );
  }

  export default App;
