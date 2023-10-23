import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { HashRouter } from 'react-router-dom';
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