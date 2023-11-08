import React, { useEffect, useState } from "react";
import "./login.css";
import MobileLogin from "./MobileLogin";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSliceName, setSliceProfilePic } from "../../utils/userSlice";
import axios from "axios";
import { API } from "../../utils/constants";
import TietLoader from "../../component/Loader/Loader";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  useEffect(() => {
    const checkIsMobileView = () => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
    window.addEventListener("resize", checkIsMobileView);
    checkIsMobileView();

    return () => {
      window.removeEventListener("resize", checkIsMobileView);
    };
  }, []);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSignUp = async () => {
    if (disableButton) return; // Prevent multiple submissions
    setIsLoading(true);
    setDisableButton(true); // Disable the button

    if (!validateEmail(email)) {
      setIsLoading(false);
      setDisableButton(false);
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API}/auth/signup`, userData);
      if (response.status === 200) {
        alert("Signup successful");
        setIsRightPanelActive(false);
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Signup failed");
    } finally {
      setIsLoading(false);
      setDisableButton(false); // Enable the button
    }
  };

  const handleSignIn = async () => {
    if (disableButton) return; // Prevent multiple submissions
    setIsLoading(true);
    setDisableButton(true); // Disable the button

    if (!validateEmail(email)) {
      setIsLoading(false);
      setDisableButton(false);
      return;
    }
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API}/auth/signin`, userData);
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        const tokenExpiry = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 days
        const tokenData = {
          token: user.accessToken,
          expiry: tokenExpiry,
        };
        localStorage.setItem("accessToken", JSON.stringify(tokenData));
        dispatch(setSliceName(user.name));
        if (user.profilePic !== "") {
          dispatch(setSliceProfilePic(user.profilePic));
        }
        Navigate("/");
      } else {
        setIsLoading(false);
        alert("Signin failed, email or username is wrong");
      }
    } catch (error) {
      if (error.response) {
        alert("Signin failed, email or username is wrong");
      }

      alert("Signin failed");
    } finally {
      setIsLoading(false);
      setDisableButton(false);
    }
  };

  return (
    <section className="login">
      {isMobileView ? (
        <MobileLogin />
      ) : (
        <div
          className={`container  ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="row">
            <div className="col-md-6">
              <div className="form-container sign-up-container">
                <form
                  action="#"
                  className="d-flex align-items-center justify-content-center"
                >
                  <img
                    src={Logo}
                    alt="tiet-logo"
                    className="img-fluid"
                    style={{ height: "120px" }}
                  />
                  <h1 className="mt-3">Sign Up</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleSignUp}
                    disabled={isLoading || disableButton}
                  >
                    Sign Up
                  </button>
                  {isLoading && <TietLoader />}
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-container sign-in-container">
                <form action="#">
                  <img
                    src={Logo}
                    alt="tiet-logo"
                    className="img-fluid"
                    style={{ height: "120px" }}
                  />
                  <h1 className="mt-3">Sign in</h1>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Link to="/forgotpassword">
                    <h6 className="my-3">Forgot your password?</h6>
                  </Link>
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading || disableButton}
                  >
                    Sign In
                  </button>
                  {isLoading && <TietLoader />}
                </form>
              </div>
            </div>
            <div className={`col-md-12 ${isLoading ? 'd-none' : 'd-block'}`}>
              <div className="overlay-container">
                <div className="overlay">
                  <div
                    className={`overlay-panel overlay-left ${
                      isRightPanelActive ? "overlay-active" : ""
                    }`}
                  >
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </button>
                  </div>
                  <div
                    className={`overlay-panel overlay-right ${
                      isRightPanelActive ? "overlay-active" : ""
                    }`}
                  >
                    <h1>Hello, Friend!</h1>
                    <p>
                      Enter your personal details and start a journey with us
                    </p>
                    <button
                      className="ghost"
                      id="signUp"
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
