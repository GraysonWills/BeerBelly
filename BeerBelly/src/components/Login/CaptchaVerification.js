import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaVerification = ({ onChange }) => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={onChange}
      />
    </div>
  );
};

export default CaptchaVerification;
