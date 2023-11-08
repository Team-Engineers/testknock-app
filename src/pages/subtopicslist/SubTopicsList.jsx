import React from "react";
import Header from "../../component/header/Header";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import Footer from "../../component/footer/Footer";
import SubTopics from "../../component/subtopics/SubTopics";
import { Navigate, useParams } from "react-router-dom";
import Nopage from "../nopage/Nopage";

const SubTopicsList = () => {
  const { topic } = useParams();
  const notAllowed = ["login","register","forgotpassword","signup"]
  if(notAllowed.includes(topic)){
    return <Navigate to = "/"/>
  }
  const allowedTopics = ["QUANTITATIVE_APTITUDE", "DATA_INTERPRETATION", "LOGICAL_REASONING", "VERBAL_ABILITY_AND_READING_COMPREHENSION"];
  if (!allowedTopics.includes(topic)) {
    return <Nopage />;
  }

  return (
    <div>
      <Header />
      <BreadCrumbBanner />
      <SubTopics topic={topic} />
      <Footer />
    </div>
  );
};

export default SubTopicsList;
