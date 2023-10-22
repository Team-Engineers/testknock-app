import React, { useState } from 'react';
import './styles.css';
import logo from './logo.png'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <span>use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
        <img src={logo} alt="Logo" style={{ width: '120px', height: '120px' }} /> 
          {/* <h1>Sign in</h1>
          <span>use your account</span> */}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href=".">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h2>Already have an account?</h2>
            <button className="ghost" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome User!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className="ghost" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
