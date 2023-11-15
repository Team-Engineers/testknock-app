import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSliceName, setSliceProfilePic } from "../../utils/userSlice";
import axios from "axios";
import { API } from "../../utils/constants";
import TietLoader from "../../component/Loader/Loader";

const MobileLogin = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [userExist, setUserExist] = useState(false);

  const handleToggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

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
        setIsSignUpActive(!isSignUpActive);
      } else {
      }
    } catch (error) {
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
    <div className="form-container login w-100 sign-in-container">
      {isSignUpActive ? (
        <div className="h-100">
          <form action="">
            <div className="d-flex gap-3 align-items-center justify-content-between flex-column">
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
                  Password must be 8 characters long and contain at least one
                  uppercase letter, one lowercase letter, and one number.
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
              <h6 className="mt-2">
                Already have an account?{" "}
                <Link className="text-primary" onClick={handleToggleForm}>
                  Sign In
                </Link>
              </h6>
            </div>
          </form>
        </div>
      ) : (
        <form action="">
          <div className="d-flex gap-3 align-items-center justify-content-between flex-column">
            <img src={Logo} alt="tiet-logo" className="img-fluid" />
            <h1 className="mt-3">Sign in</h1>
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
                The username and/or password you specified are not correct.
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
            <h6 className="mt-2">
              Don't have an account?{" "}
              <Link className="text-primary" onClick={handleToggleForm}>
                Sign Up
              </Link>
            </h6>
          </div>
        </form>
      )}
    </div>
  );
};

export default MobileLogin;
