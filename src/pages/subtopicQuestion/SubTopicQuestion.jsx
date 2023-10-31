import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import Question from "../../component/questions/Question";
import { useParams } from "react-router-dom";
import Nopage from "../nopage/Nopage";

const SubTopicQuestion = () => {
  const { topic } = useParams();
  const allowedTopics = ["QUANT", "DI", "LR", "VARC"];

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
