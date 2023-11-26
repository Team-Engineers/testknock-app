import React, {useState } from "react";
import "./login.css";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSliceName, setSliceProfilePic } from "../../utils/userSlice";
import axios from "axios";
import { API } from "../../utils/constants";
import TietLoader from "../../component/Loader/Loader";
import LoginImage from '../../assets/images/login-image.jpg'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

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
    setEmailValid(isValid);
    setEmail(enteredEmail);
  };

  return (
    <section className="login">
        <div
          className={`container`}
          id="container"
        >
          <div className="row">
            <div className="col-6">
              <div className="form-container sign-in-container">
                <form action="">
                  <img src={Logo} alt="tiet-logo" className="img-fluid tiet-logo" />

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
            <div className="col-6 p-0">
                <div className="login-image">
                  <img src = {LoginImage} className="img-fluid" alt = "tiet-brainstorming" />
                </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Login;
