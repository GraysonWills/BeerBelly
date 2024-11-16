  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import LandingPage from './pages/Landing/LandingPage';
  import Home from './pages/Home/Home';
  import CustomNavbar from './components/Navbar';
  import Footer from './components/Footer';
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
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        
          <CustomNavbar style={{ position: 'sticky', top: 0, zIndex: 1000 }}/>
          
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
      </div>
    );
  }

  export default App;