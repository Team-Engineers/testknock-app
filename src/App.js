import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact'
import Nopage from './pages/nopage/Nopage'
import Header from './pages/layout/Header';
import Banner from './pages/home/Banner'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route  path="/" element= {  <Header /> }>
            <Route index element = {<Home/>}/>
            <Route path = "banner" element = {<Banner/>} />
            <Route  path="contact" element= {  <Contact/> }/>
            <Route path = "*" element = {<Nopage/>}/>


          </Route>
          <Route  path="login" element= {  <Login/> }/>
          
      </Routes>
    </BrowserRouter>

  );
};

export default App;
