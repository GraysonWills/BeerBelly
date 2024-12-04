import React from 'react';
import { Form } from 'react-bootstrap';
import FormInput from './FormInput';
import SignInButton from './SignInButton';
import RememberMe from './RememberMe';
import CaptchaVerification from './CaptchaVerification';
import OAuthButton from './OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const LoginContent = ({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  verified, 
  setVerified, 
  handleOAuthLogin, 
  setIsSignUp,
  onSubmit 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RememberMe />
      {/* <CaptchaVerification onChange={setVerified} /> */}
      <SignInButton text="Sign In" onClick={onSubmit} />

      <div className="position-relative my-4">
        <hr />
        <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
          or continue with
        </span>
      </div>

      <div className="d-grid gap-2">
        <OAuthButton icon={FcGoogle} provider="Google" onClick={() => handleOAuthLogin('Google')} />
        <OAuthButton icon={FaFacebook} provider="Facebook" onClick={() => handleOAuthLogin('Facebook')} />
      </div>

      <div className="text-center mt-4">
        <span>New to our platform? </span>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp(true);
          }} 
          className="text-primary text-decoration-none"
        >
          Sign Up!
        </a>
      </div>
    </Form>
  );
};

export default LoginContent;