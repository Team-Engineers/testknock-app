import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import SubTopicQuestion from "./pages/subtopicQuestion/SubTopicQuestion";
import SubTopicsList from "./pages/subtopicslist/SubTopicsList";
import UserProfile from "./pages/user/UserProfile";
import Question from "./component/questions/Question";
import QuestionSection from "./component/question/QuestionSection";

// Define a custom PrivateRoute component to check authentication
function PrivateRoute({ element }) {
  // Function to check if the access token is expired
  const isAccessTokenValid = () => {
    const tokenData = JSON.parse(localStorage.getItem("accessToken"));
    // console.log("browser tokendata", tokenData);
    return tokenData && new Date().getTime() < tokenData.expiry;
  };


  if (!isAccessTokenValid()) {
    return <Navigate to="/login" />;
  }

  return element;
}

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/:topic/:subTopic"
            element={<PrivateRoute element={<SubTopicQuestion />} />}
          />
          <Route
            path="/:topic"
            element={<PrivateRoute element={<SubTopicsList />} />}
          />
          <Route
            path="/user"
            element={<PrivateRoute element={<UserProfile />} />}
          />
          <Route
            path="/questionpractice"
            element={<PrivateRoute element={<Question />} />}
          />
          <Route
            path="/quizquestion"
            element={<PrivateRoute element={<QuestionSection />} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
