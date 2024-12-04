import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signInWithRedirect } from '@aws-amplify/auth';
import { Card, Container } from 'react-bootstrap';
import './UserLogin.css';
import { AnimatePresence, motion } from 'framer-motion';
import SignUpForm from './SignUpForm';
import LoginContent from './LoginForm';
import ErrorMessage from '../ingredients/ErrorMessage/ErrorMessage';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleOAuthLogin = async (provider) => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleAuthAction = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? "signup" : "login"}
          initial={{ opacity: 0, scale: 0.95, x: -1000 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: [null, 50, 0]
          }}
          exit={{ opacity: 0, scale: 0.95, x: 1000 }}
          transition={{ 
            duration: 0.4,
            x: { type: "spring", stiffness: 300, damping: 30 }
          }}
        >
          <Container className="d-flex align-items-center justify-content-center vh-100">
            <Card className="shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
              {!isSignUp ? (
                <LoginContent 
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  verified={verified}
                  setVerified={setVerified}
                  handleOAuthLogin={handleOAuthLogin}
                  setIsSignUp={setIsSignUp}
                  onSubmit={handleAuthAction}
                />
              ) : (
                <SignUpForm 
                  onBackToLogin={() => setIsSignUp(false)} 
                  handleOAuthLogin={handleOAuthLogin}
                  onSubmit={handleAuthAction}
                />
              )}
            </Card>
          </Container>
        </motion.div>
      </AnimatePresence>
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <ErrorMessage 
          isVisible={showError} 
          message="Our authentication services are currently not active. Please check back later." 
        />
      </div>
    </>
  );
};

export default LoginForm;