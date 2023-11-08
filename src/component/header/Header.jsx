import React, { useEffect, useState } from "react";
import TietLogo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../utils/userSlice";
import {
  setSliceEmail,
  setSliceName,
  setSliceProfilePic,
  setSliceBranch,
  setSliceYear,
  setSliceContact,
  setSliceInstitute,
} from "../../utils/userSlice";
import PROFILEPIC_URL  from "../../assets/images/user-profile.jpg";


const HeaderSection = styled.section`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  background: ${(props) => (props.darkTheme ? "#333" : "#fff")};
  min-width: -moz-max-content;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9999;
  height: 76px;
  color: ${(props) => (props.darkTheme ? "#fff" : "inherit")};

  .light-theme,
  .dark-theme {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 50px; 
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};

  ul  {
    text-decoration : none;
    list-style : none;
    margin-right: 15px;
    padding-left: 15px;
  }
`;

const Header = () => {
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
  
    dispatch(logoutUser());
    window.location.reload();
  };
  

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const Navigate = useNavigate();


  useEffect(() => {
    const setDetails = () => {
      const storedUserData = JSON.parse(localStorage.getItem("user"));

      if (storedUserData) {
        // User data is present in localStorage
        dispatch(setSliceName(storedUserData.name));
        dispatch(setSliceEmail(storedUserData.email));
        dispatch(
          setSliceProfilePic(storedUserData.profilePic || PROFILEPIC_URL)
        );
        dispatch(setSliceBranch(storedUserData.branch));
        dispatch(setSliceYear(storedUserData.year));
        dispatch(setSliceInstitute(storedUserData.institute));
        dispatch(setSliceContact(storedUserData.contact));
      } else {
        localStorage.removeItem("accessToken");
        Navigate("/login");
      }
    };

    setDetails();
  }, [Navigate,dispatch]);



  const userName = useSelector((state) => state.user.name);
  const firstName = userName && userName.split(" ")[0];
  const profilePic = useSelector((state) => state.user.profilePic);
  


  return (
    <HeaderSection
    //  darkTheme={isDarkTheme}
     >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/">
                <img src={TietLogo} alt="tietLogo" className="w-25" />
              </Link>
              <div className="user-data d-flex justify-content-between gap-3 align-items-center">
                {/* <div
                  className={isDarkTheme ? "light-theme" : "dark-theme"}
                  onClick={toggleTheme}
                >
                  <i
                    className={
                      isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon"
                    }
                  ></i>
                </div> */}
                <Link to="/user">
                  <div
                    className="name"
                    // style={{ color: isDarkTheme ? "#fff" : "inherit" }}
                  >
                    {firstName}
                  </div>
                </Link>
                 <div
                  className="profile-pic"
                  onClick={handleDropdownToggle}
                >
                  <img
                    src={profilePic}
                    alt="userLogo"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <DropdownMenu isOpen={isDropdownOpen}>
                    <ul>
                      <li>
                        <Link to="/user">Profile</Link>
                      </li>
                      <li>
                        <button className="btn p-0 text-primary"  onClick={handleLogOut}>Log Out</button>
                      </li>
                    </ul>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default Header;
