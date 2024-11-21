import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import FormInput from './FormInput';
import SignInButton from './SignInButton';
import RememberMe from './RememberMe';
import CaptchaVerification from './CaptchaVerification';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaAmazon } from 'react-icons/fa';
import OAuthButton from './OAuthButton';

const SignUpForm = ({ onBackToLogin, handleOAuthLogin }) => {
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 21;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateAge(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Must be 21 or older to sign up';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Process signup
    }
  };

  return (
    <Card.Body>
      <h2 className="text-center mb-4">Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          isInvalid={!!errors.firstName}
          feedback={errors.firstName}
        />
        <FormInput
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          isInvalid={!!errors.lastName}
          feedback={errors.lastName}
        />
        <FormInput
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          isInvalid={!!errors.email}
          feedback={errors.email}
        />
        <FormInput
          type="date"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          isInvalid={!!errors.dateOfBirth}
          feedback={errors.dateOfBirth}
        />
        <RememberMe />
        <CaptchaVerification onChange={(value) => setVerified(!!value)} />
        <SignInButton text="Sign Up" />

        <div className="position-relative my-4">
  <hr />
  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
    or continue with
  </span>
</div>

<div className="d-grid gap-2">
  <OAuthButton icon={FcGoogle} provider="Google" onClick={() => handleOAuthLogin('Google')} />
  <OAuthButton icon={FaFacebook} provider="Facebook" onClick={() => handleOAuthLogin('Facebook')} />
  <OAuthButton icon={FaAmazon} provider="Amazon" onClick={() => handleOAuthLogin('Amazon')} />
</div>
        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <a href="#" onClick={onBackToLogin} className="text-primary text-decoration-none">
            Sign In
          </a>
        </div>
      </Form>
    </Card.Body>
  );
};

export default SignUpForm;