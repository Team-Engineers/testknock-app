import React from 'react'
import { Navigate, Outlet } from 'react-router'

const PrivateRoutes = () => {
  const isUserSignedIn = () => {
    const tokenData = JSON.parse(localStorage.getItem("accessToken"));
    return tokenData && new Date().getTime() < tokenData.expiry;
  };
  return (
    isUserSignedIn() ? <Outlet/> : <Navigate to = "/login"/>
  )
}

export default PrivateRoutes
