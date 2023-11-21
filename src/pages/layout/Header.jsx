import React from 'react'
import TietLogo from '../../assets/images/logo.png'
import UserProfile from '../../assets/images/user.jpg'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components';

const UserImage = styled.img`
  width: 25%;
  border: 2px solid red;
  border-radius: 50%;
`;


const Header = () => {
  return (
    <>
        <div className="d-flex justify-content-between align-items-center w-100 p-2">
          <Link to = "/">
            <img src = {TietLogo} alt = "tietLogo" className='w-25'/>
          </Link>
          <div className="user-data d-flex justify-content-between gap-3 align-items-center">
          <div className="name">Ashutosh</div>
          {/* Apply the UserImage styled component */}
          <UserImage src={UserProfile} alt="userLogo" />
        </div>
      </div>
        <Outlet/>

    </>
  )
}

export default Header
