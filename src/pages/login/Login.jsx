import React, { useEffect, useState } from "react";
import "./login.css";
import MobileLogin from "./MobileLogin";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
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
  const [showError, setShowError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [userExist, setUserExist] = useState(false);

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

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };
  const handleSignUp = async () => {
    if (disableButton || !passwordValid || !emailValid) return;
    setUserExist(false);
    setIsLoading(true);
    setDisableButton(true);
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API}/auth/signup`, userData);
      if (response.status === 200) {
        setIsRightPanelActive(false);
      } else {
        // alert("Signup failed");
      }
    } catch (error) {
      // alert("Signup failed");
      setUserExist(true);
    } finally {
      setIsLoading(false);
      setDisableButton(false);
    }
  };

  const handleSignIn = async () => {
    if (disableButton || !emailValid) return;
    setShowError(false);
    setIsLoading(true);
    setDisableButton(true);

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
        setShowError(true);
      }
    } catch (error) {
      if (error.response) {
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
      setDisableButton(false);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    const isValid = isEmailValid(enteredEmail);
    setUserExist(false);
    setEmailValid(isValid);
    setEmail(enteredEmail);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const isValid = isPasswordValid(enteredPassword);

    setPasswordValid(isValid);
    setPassword(enteredPassword);
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
                <form action="">
                  <img src={Logo} alt="tiet-logo" className="img-fluid" />

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
                    onChange={handleEmailChange}
                  />
                  {!emailValid && (
                    <h6 className="error-message">
                      Please enter a valid email address.
                    </h6>
                  )}

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                  {!passwordValid && (
                    <h6 className="error-message">
                      Password must be 8 characters long and contain at least
                      one uppercase letter, one lowercase letter, and one
                      number.
                    </h6>
                  )}

                  {userExist && (
                    <h6 className="text-danger">Email already Exist</h6>
                  )}

                  <button
                    onClick={handleSignUp}
                    disabled={
                      password === "" ||
                      email === "" ||
                      !emailValid ||
                      !passwordValid ||
                      isLoading ||
                      disableButton
                    }
                  >
                    Sign Up
                  </button>
                  {isLoading && <TietLoader />}
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-container sign-in-container">
                <form action="">
                  <img src={Logo} alt="tiet-logo" className="img-fluid" />

                  <input
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                  />
                  {!emailValid && (
                    <h6 className="error-message">
                      Please enter a valid email address.
                    </h6>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {showError ? (
                    <h6 className="text-danger">
                      The username or password you specified are not
                      correct.
                    </h6>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={handleSignIn}
                    disabled={
                      password === "" ||
                      email === "" ||
                      !emailValid ||
                      isLoading ||
                      disableButton
                    }
                  >
                    Sign In
                  </button>
                  {isLoading && <TietLoader />}
                </form>
              </div>
            </div>
            <div className={`col-md-12 ${isLoading ? "d-none" : "d-block"}`}>
              <div className="overlay-container">
                <div className="overlay">
                  <div
                    className={`overlay-panel overlay-left ${
                      isRightPanelActive ? "overlay-active" : ""
                    }`}
                  >
                    <h1>Existing user?</h1>
                    <p>
                      <b>
                        Please log in with your personal information to stay in
                        touch with us.
                      </b>
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
                    <h1>New here?</h1>

                    <p>
                      <b>
                        Enter your personal details and start a journey with us
                      </b>
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
