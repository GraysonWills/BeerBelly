import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signInWithRedirect } from '@aws-amplify/auth';
import { Card, Container } from 'react-bootstrap';
import './UserLogin.css';
import { AnimatePresence, motion } from 'framer-motion';
import SignUpForm from './SignUpForm';
import LoginContent from './LoginForm';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleOAuthLogin = async (provider) => {
    Amplify.configure({
      Auth: {
        Cognito: {
          region: 'YOUR_REGION',
          userPoolId: 'YOUR_USER_POOL_ID',
          userPoolClientId: 'YOUR_CLIENT_ID',
          signUpVerificationMethod: 'code',
          loginWith: {
            oauth: {
              domain: 'YOUR_COGNITO_DOMAIN',
              scopes: ['email', 'openid', 'profile'],
              redirectSignIn: ['http://localhost:3000/'],
              redirectSignOut: ['http://localhost:3000/'],
              responseType: 'code'
            }
          }
        }
      }
    });

    try {
      await signInWithRedirect(provider);
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  return (
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
              />
            ) : (
              <SignUpForm onBackToLogin={() => setIsSignUp(false)} />
            )}
          </Card>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};
export default LoginForm;