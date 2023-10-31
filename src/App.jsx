import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
// import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import SubTopicQuestion from "./pages/subtopicQuestion/SubTopicQuestion";
import SubTopicsList from "./pages/subtopicslist/SubTopicsList";
import UserProfile from "./pages/user/UserProfile";
import Question from "./component/questions/Question";
import QuestionSection from "./component/question/QuestionSection";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  const isUserSignedIn = () => {
    const tokenData = JSON.parse(localStorage.getItem("accessToken"));
    console.log("whtat value",tokenData)
    return tokenData && new Date().getTime() < tokenData.expiry;
  };
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/:topic/:subTopic" element={<SubTopicQuestion />} />
            <Route path="/:topic" element={<SubTopicsList />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/questionpractice" element={<Question />} />
            <Route path="/quizquestion" element={<QuestionSection />} />
          </Route>

          {
            isUserSignedIn() ? (
            <Route path="/" element={<Home />} />
            )
              :
              <Route path="/login" element={<Login />} />
          }
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
