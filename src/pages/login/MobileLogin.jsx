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

  const handleToggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

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
        setIsSignUpActive(!isSignUpActive);
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
    <div className="form-container login w-100 sign-in-container">
      {isSignUpActive ? (
        <div className="h-100">
          <form action="#">
            <div className="d-flex align-items-center justify-content-between flex-column">
              <img
                src={Logo}
                alt="tiet-logo"
                className="img-fluid"
                style={{ height: "120px" }}
              />
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
              {isLoading && (
                <TietLoader/>
              )}
              <h6 className="mt-5">
                Already have an account?{" "}
                <Link className="text-primary" onClick={handleToggleForm}>
                  Sign In
                </Link>
              </h6>
            </div>
          </form>
        </div>
      ) : (
        <form action="#">
          <div className="d-flex align-items-center justify-content-between flex-column">
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
            <button
              onClick={handleSignIn}
              disabled={isLoading || disableButton}
            >
              Sign In
            </button>
            {isLoading && (
              <TietLoader/>
            )}
            <h6 className="mt-5">
              Forgot your password?{" "}
              <Link to="/forgotpassword" className="text-primary">
                Click Here
              </Link>
            </h6>
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
