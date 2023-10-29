import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import Question from "../../component/questions/Question";
const SubTopicQuestion = () => {
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
