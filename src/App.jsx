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
import Nopage from "./pages/nopage/Nopage";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/:topic/:subTopic" element={<SubTopicQuestion />} />
            <Route exact path="/:topic" element={<SubTopicsList />} />
            <Route exact path="/user" element={<UserProfile />} />
            <Route exact path="/questionpractice" element={<Question />} />
            <Route exact path="/quizquestion" element={<QuestionSection />} />
          </Route>
          {
            isUserSignedIn() ? (
            <Route exact path="/" element={<Home />} />
            )
              :
              <Route exact path="/login" element={<Login />} />
          }
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;