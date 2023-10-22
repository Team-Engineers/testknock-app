import React, { useState } from 'react';

const MobileLogin = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleToggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (
    <div className="form-container w-100 sign-in-container">
      {isSignUpActive ?
       (
        <div className="h-100">
          <form action="#">
            <h1>Create Account</h1>
            <span>use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className='btn btn-dark text-white my-3' onClick={handleToggleForm}>
            Sign In
          </div>
            <button>Sign Up</button>

          </form>

        </div>
      ) : (
        <form action="#">
          <h1>Sign in</h1>
          <span>use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <div className='btn btn-dark text-white my-3'  onClick={handleToggleForm}>
            Sign Up
          </div>
          <button>Sign in</button>
        </form>
      )}
    </div>
  );
};

export default MobileLogin;
