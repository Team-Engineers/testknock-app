import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import { Navigate, useParams } from "react-router-dom";
import Nopage from "../nopage/Nopage";
import PracticeQuestions from "../../component/practicequestions/PracticeQuestions";

const SubTopicQuestion = () => {
  const { topic } = useParams();
  const notAllowed = ["login","register","forgotpassword","signup"]
  if(topic.includes(notAllowed)){
    return <Navigate to = "/"/>
  }
  const allowedTopics = ["QUANTITATIVE_APTITUDE", "DATA_INTERPRETATION", "LOGICAL_REASONING", "VERBAL_ABILITY_AND_READING_COMPREHENSION"];

  if (!allowedTopics.includes(topic)) {
    return <Nopage/>
  }

  return (
    <div>
      <Header />
      <BreadCrumbBanner />
      <PracticeQuestions />
      <Footer />
    </div>
  );
};

export default SubTopicQuestion;
