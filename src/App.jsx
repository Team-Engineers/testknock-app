import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SubTopicQuestion from "./pages/subtopicQuestion/SubTopicQuestion";
import SubTopicsList from "./pages/subtopicslist/SubTopicsList";
import UserProfile from "./pages/user/UserProfile";
import Quiz from "./pages/quiz/Quiz";
import PrivateRoutes from "./utils/PrivateRoutes";
import Nopage from "./pages/nopage/Nopage";
import ScrollToTop from "./component/scrolltotop/ScrollToTop";
import Admin from "./pages/admin/Admin";
import QuestionPush from "./component/questionPush/QuestionPush";
import QuestionUpdate from "./component/questionUpdate/QuestionUpdate";
const App = () => {
  const isUserSignedIn = () => {
    const tokenData = JSON.parse(localStorage.getItem("accessToken"));
    return tokenData && new Date().getTime() < tokenData.expiry;
  };

  const isUserAdmin = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if(storedUserData === null)return false;
    return storedUserData.isAdmin;
  };
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/:topic/:subTopic" element={<SubTopicQuestion />} />
            <Route exact path="/:topic" element={<SubTopicsList />} />
            <Route exact path="/user" element={<UserProfile />} />
            <Route exact path="/quiz/:topic" element={<Quiz />} />
            {isUserAdmin() ? (
              <>
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/admin/questionPush" element={<QuestionPush />} />
              <Route exact path="/admin/questionUpdate" element={<QuestionUpdate />} />
              </>
            ) : (
              ( <Route path="*" element={<Nopage />} />)
            )}
          </Route>
          {isUserSignedIn() ? (
            <Route exact path="/" element={<Home />} />
          ) : (
            <Route exact path="/login" element={<Login />} />
          )}

          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
