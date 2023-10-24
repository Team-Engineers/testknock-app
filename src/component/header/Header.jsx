import React from 'react'
import TietLogo from '../../assets/images/logo.png'
import UserProfile from '../../assets/images/user-profile.jpg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center w-100 p-2">
              <Link to = "/">
                <img src = {TietLogo} alt = "tietLogo" className='w-25'/>
              </Link>
              <div className="user-data d-flex justify-content-between gap-3 align-items-center">
                <div className="name">Ashutosh</div>
                <img src = {UserProfile} alt = "userLogo" className='' style = {{borderRadius:"50%", width : "2rem"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>    

    </>
  )
}

export default Header
