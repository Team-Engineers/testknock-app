import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
const App = () => {
  return (
    <HashRouter>
      <Routes>
          <Route exact path="/" element= {  <Home /> }/>
          <Route path="/login" element= {  <Login/> }/>
      </Routes>
    </HashRouter>
  );
};

export default App;