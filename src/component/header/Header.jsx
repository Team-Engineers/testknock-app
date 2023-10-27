import React, { useState } from "react";
import TietLogo from "../../assets/images/logo.png";
import UserProfile from "../../assets/images/user-profile.jpg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderSection = styled.section`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  background: ${props => (props.darkTheme ? "#333" : "#fff")};
  min-width: -moz-max-content;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9999;
  height: 76px;
  color: ${props => (props.darkTheme ? "#fff" : "inherit")};

  .light-theme,.dark-theme{
    cursor : pointer;
  }
`;

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // const userName = useSelector

  return (
    <HeaderSection darkTheme={isDarkTheme}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/">
                <img src={TietLogo} alt="tietLogo" className="w-25" />
              </Link>
              <div className="user-data d-flex justify-content-between gap-3 align-items-center">
                <div className={isDarkTheme ? "light-theme" : "dark-theme"} onClick={toggleTheme}>
                  <i className={isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                </div>
                <div className="name" style={{ color: isDarkTheme ? "#fff" : "inherit" }}>
                  Ashutosh
                </div>
                <img
                  src={UserProfile}
                  alt="userLogo"
                  style={{ borderRadius: "50%", width: "2rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default Header;
