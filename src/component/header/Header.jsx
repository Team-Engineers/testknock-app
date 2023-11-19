import React, { useEffect, useState } from "react";
import TietLogo from "../../assets/images/logo.png";
import WhiteTietLogo from "../../assets/images/white-tietLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import PROFILEPIC_URL from "../../assets/images/user.jpg";

const HeaderSection = styled.section`
  &.light {
    background: transparent;
    position: relative;

    .container-fluid {
      position: absolute;
    }

    .name {
      color: white;
    }
  }

  &.solid {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    background: ${(props) => (props.darkTheme ? "#333" : "#fff")};
    min-width: -moz-max-content;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 9999;
    color: ${(props) => (props.darkTheme ? "#fff" : "inherit")};
    transition: background-color 0.3s ease-in-out;

    .container-fluid {
      position: relative;
    }

    .name {
      color: inherit;
    }
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

  ul {
    text-decoration: none;
    list-style: none;
    margin-right: 15px;
    padding-left: 15px;
    margin-top: 15px;
  }

  li {
    a,
    button {
      color: #79090b;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        color: #79090b;
        font-weight: bold;
        text-decoration: bold;
      }
    }
    button.logout-btn {
      color: #79090b;
      font-weight: bold;

      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: #79090b;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
}
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutUser());
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderSolid(true);
      } else {
        setIsHeaderSolid(false);
      }
    };
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
    if (isHomePage === false) {
      setIsHeaderSolid(true);
    }
  }, [isHomePage]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const setDetails = () => {
      const storedUserData = JSON.parse(localStorage.getItem("user"));

      if (storedUserData) {
        dispatch(setSliceName(storedUserData.name));
        dispatch(setSliceEmail(storedUserData.email));
        dispatch(
          setSliceProfilePic(storedUserData.profilePic || PROFILEPIC_URL)
        );
        dispatch(setSliceBranch(storedUserData.branch));
        dispatch(setSliceYear(storedUserData.year));
        dispatch(setSliceInstitute(storedUserData.institute));
        dispatch(setSliceContact(storedUserData.contact));
        setIsAdmin(storedUserData.isAdmin)
      } else {
        localStorage.removeItem("accessToken");
        Navigate("/login");
      }
    };

    setDetails();
  }, [Navigate, dispatch]);

  const userName = useSelector((state) => state.user.name);
  const firstName = userName && userName.split(" ")[0];
  const profilePic = useSelector((state) => state.user.profilePic);
  const logoSrc = isHeaderSolid ? TietLogo : WhiteTietLogo;
  return (
    <HeaderSection className={isHeaderSolid ? "solid" : "light"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/">
                <img
                  src={logoSrc}
                  alt="tietLogo"
                  className=""
                  style={{ width: "3.5rem", padding: "7px" }}
                />
              </Link>
              <div className="user-data d-flex justify-content-between gap-3 align-items-center">
                <Link to="/user">
                  <div className="name" style={{ color: "#79090b", fontWeight: "bold" }}>{firstName}</div>
                </Link>

                <div className="profile-pic" onClick={handleDropdownToggle}>
                  <Link>
                    <img
                      src={profilePic}
                      alt="userLogo"
                      width="40"
                      height="40"
                      className="rounded-circle border border-red"
                      style={{ objectFit: "cover", border: "2px solid red" }}
                    />
                  </Link>
                  <DropdownMenu isOpen={isDropdownOpen}>
                    <ul>
                      <li>
                        <Link to="/user">Profile</Link>
                      </li>
                      {isAdmin ? (
                        <li>
                          <Link to="/admin/questionEdit">Admin Panel</Link>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        <button
                          className="btn p-0 logout-btn"
                          onClick={handleLogOut}
                        >
                          Log Out
                        </button>
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
