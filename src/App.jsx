import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import SubTopicQuestion from "./pages/subtopicQuestion/SubTopicQuestion";
import SubTopicsList from "./pages/subtopicslist/SubTopicsList";
import UserProfile from "./pages/user/UserProfile";
import ScrollToTop from "./component/scrolltotop/ScrollToTop";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import QuestionSeries from "./component/questions/QuestionSeries";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/:topic/:subTopic" element={<SubTopicQuestion />} />
          <Route path="/:topic" element={<SubTopicsList />} />
          <Route path="/user" element={<UserProfile />} />
        <Route path="/questionpractice" element={<QuestionSeries />} />"
            
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
