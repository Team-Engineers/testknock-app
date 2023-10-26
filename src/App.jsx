import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import SubTopicQuestion from "./pages/subtopicQuestion/SubTopicQuestion";
import QuestionSeries from "./component/questions/QuestionSeries";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/:topic/:subTopic" element={<SubTopicQuestion />} />
        <Route path="/question" element={<QuestionSeries />} />"
      </Routes>
    </BrowserRouter>
  );
};

export default App;