import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png'


const MobileLogin = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleToggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (

    <div className="form-container login w-100 sign-in-container">
      {isSignUpActive ?
       (
        <div className="h-100">
          <form action="#">
          <div className="d-flex align-items-center justify-content-between flex-column">
            <img src = {Logo} alt = "tiet-logo" className='img-fluid' style={{height:"120px"}}/>
              <h1 className='mt-3'>Sign Up</h1>
              {/* <span>use your email for registration</span> */}
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            <h6 className='mt-5' >Already have an account? <span className='text-primary' onClick={handleToggleForm}>Sign In</span></h6>
          </div>
          </form>
        </div>
      ) : (
        <form action="#">
          <div className="d-flex align-items-center justify-content-between flex-column">
          <img src = {Logo} alt = "tiet-logo" className='img-fluid' style={{height:"120px"}}/>
          <h1 className='mt-3'>Sign in</h1>
          {/* <span>use your account</span> */}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
          <h6 className='mt-5' >Forgot your password? <span className='text-primary'>Click Here</span></h6>
          <h6 className='mt-2' >Don't have an account? <span className='text-primary'  onClick={handleToggleForm}>Sign Up</span></h6>
          </div>
        </form>
      )}
    </div>
  );
};

export default MobileLogin;
