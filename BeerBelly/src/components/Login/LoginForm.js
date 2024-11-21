import React from 'react';
import FormInput from './FormInput';
import RememberMe from './RememberMe';
import CaptchaVerification from './CaptchaVerification';
import SignInButton from './SignInButton';
import { Card, Form} from 'react-bootstrap';
import OAuthButton from './OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaAmazon } from 'react-icons/fa';


const LoginForm = ({ username, setUsername, password, setPassword, verified, setVerified, handleOAuthLogin, setIsSignUp }) => {
  return (
    <Card.Body>
      {/* <h2 className="text-center mb-4">Welcome Back</h2> */}
      <Form>
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
        <SignInButton text="Sign In" />
        {/* <CaptchaVerification onChange={(value) => setVerified(!!value)} /> */}

        <div className="position-relative my-4">
          <hr />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
            or continue with
          </span>
        </div>

        <div className="d-grid gap-2">
          <OAuthButton icon={FcGoogle} provider="Google" onClick={() => handleOAuthLogin('Google')} />
          <OAuthButton icon={FaFacebook} provider="Facebook" onClick={() => handleOAuthLogin('Facebook')} />
          {/* <OAuthButton icon={FaAmazon} provider="Amazon" onClick={() => handleOAuthLogin('Amazon')} /> */}
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
    </Card.Body>
  );
};

export default LoginForm;
