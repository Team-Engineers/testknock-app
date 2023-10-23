import React, { useEffect, useState } from 'react';
import './login.css';
import MobileLogin from './MobileLogin';
import Logo from '../../assets/images/logo.png'

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };


  useEffect(()=>{
    const checkIsMobileView = () =>{
      if(window.innerWidth < 768){
        setIsMobileView(true);
      }else{
        setIsMobileView(false)
      }
    }
    window.addEventListener('resize',checkIsMobileView);
    checkIsMobileView();

    return ()=>{
      window.addEventListener('resize',checkIsMobileView)
    }
  },[])


  return (
    <section className="login">
      {
        isMobileView ? (
          <MobileLogin/>
        ):(
          <div className={`container  ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
          <div className="row">
            <div className="col-md-6">
              <div className="form-container sign-up-container">
                <form action="#" className='flex items-center justify-center'>
                  <img src = {Logo} alt = "tiet-logo" className='img-fluid' style={{height:"120px"}}/>
                  <h1 className='mt-3'>Sign Up</h1>
  
                  {/* <span>use your email for registration</span> */}
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button>Sign Up</button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-container sign-in-container">
              <form action="#">
              <img src = {Logo} alt = "tiet-logo" className='img-fluid' style={{height:"120px"}}/>

                <h1 className='mt-3'>Sign in</h1>

                {/* <span>use your account</span> */}
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <h6 className='my-3'>Forgot your password?</h6>
                <button>Sign In</button>
              </form>
            </div>
          </div>
          <div className="col-md-12">
            <div className="overlay-container">
              <div className="overlay">
                <div className={`overlay-panel overlay-left ${isRightPanelActive ? 'overlay-active' : ''}`}>
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" id="signIn" onClick={handleSignInClick}>
                    Sign In
                  </button>
                </div>
                <div className={`overlay-panel overlay-right ${isRightPanelActive ? 'overlay-active' : ''}`}>
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start a journey with us</p>
                  <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        )
      }

    </section>
  );
};

export default Login;
