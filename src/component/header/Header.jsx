import React from 'react'
import TietLogo from '../../assets/images/logo.png'
import UserProfile from '../../assets/images/user-profile.jpg'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div className="flex justify-between items-center w-full p-2">
          <Link to = "/">
            <img src = {TietLogo} alt = "tietLogo" className='w-20'/>
          </Link>
          <div className="user-data flex justify-between gap-3 items-center">
            <div className="name">Ashutosh</div>
            <img src = {UserProfile} alt = "userLogo" className='w-12 rounded-full'/>
          </div>
        </div>
        <Outlet/>

    </>
  )
}

export default Header
