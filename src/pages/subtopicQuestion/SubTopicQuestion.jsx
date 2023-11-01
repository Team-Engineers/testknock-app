import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import Question from "../../component/questions/Question";
import { Navigate, useParams } from "react-router-dom";
import Nopage from "../nopage/Nopage";

const SubTopicQuestion = () => {
  const { topic } = useParams();
  const notAllowed = ["login","register","forgotpassword","signup"]
  if(topic.includes(notAllowed)){
    return <Navigate to = "/"/>
  }
  const allowedTopics = ["QUANTITATIVE APTITUDE", "DATA INTERPRETATION", "LOGICAL REASONING", "VERBAL ABILITY AND READING COMPREHENSION"];

  if (!allowedTopics.includes(topic)) {
    return <Nopage/>
  }

  return (
    <div>
      <Header />
      <BreadCrumbBanner />
      <Question />
      <Footer />
    </div>
  );
};

export default SubTopicQuestion;
