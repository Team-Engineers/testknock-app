import React from "react";
import Logo from "../../assets/images/logo.png";
import "../login/login.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ForgotContainer = styled.div`
  padding: 1rem;
  height: fit-content;
  box-shadow: 1px 1px 3px 0px #706868;
  background : white;
`;


const ForgotPassword = () => {
  return (
    <div className="form-container  login w-100 sign-in-container">
      <ForgotContainer>
        <form action="#">
          <div className="d-flex align-items-center justify-content-between flex-column gap-3">
            <img
              src={Logo}
              alt="tiet-logo"
              className="img-fluid"
              style={{ height: "120px" }}
            />
            <h1 className="mt-3">Forgot Password</h1>
            {/* <span>use your email for registration</span> */}
            <input type="email" placeholder="Email" />
            <button>Reset Password</button>
            <h6 className="mt-5">
              Already have an account?{" "}
              <Link to ='/login' className="text-primary">Sign In</Link>
            </h6>
          </div>
        </form>
      </ForgotContainer>
    </div>
  );
};

export default ForgotPassword;
