import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element= {  <Home /> }/>
          <Route  path="login" element= {  <Login/> }/>
      </Routes>
    </BrowserRouter>

  );
};

export default App;