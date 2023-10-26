import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import QuestionSeries from "../../component/questions/QuestionSeries";
const SubTopicQuestion = () => {
  return (
    <div>
      <Header />
      <BreadCrumbBanner />
      <QuestionSeries />
      <Footer />
    </div>
  );
};

export default SubTopicQuestion;
