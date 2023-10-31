import React from "react";
import Header from "../../component/header/Header";
import BreadCrumbBanner from "../../component/breadcrumb/BreadCrumbBanner";
import Footer from "../../component/footer/Footer";
import SubTopics from "../../component/subtopics/SubTopics";
import { useParams } from "react-router-dom";
import Nopage from "../nopage/Nopage";

const SubTopicsList = () => {
  const { topic } = useParams();
  const allowedTopics = ["QUANT", "DI", "LR", "VARC"];
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
