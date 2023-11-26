import React, { useEffect, useState } from "react";
import "./question.css";
import { useParams } from "react-router-dom";
import { API } from "../../utils/constants";
import QuestionV2 from "./QuestionV2";
import axios from "axios";
import RecommendedSubTopics from "../recommendedSubTopics/RecommendedSubTopics";
import TietLoader from "../Loader/Loader";
import NoData from "../Loader/NoData";

const PracticeQuestions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic, subTopic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let route = "";
      let subTopicRoute = subTopic;
      if (subTopic === "S.I_AND_C.I")
        subTopicRoute = "simple_interest_and_compound_interest";
      if (subTopic === "NUMBER_OR_ALPHABET_SERIES")
        subTopicRoute = "number_alphabet_series";
      if (topic === "QUANTITATIVE_APTITUDE") route = "math";
      if (topic === "DATA_INTERPRETATION") route = "di";
      if (topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION") route = "varc";
      if (topic === "LOGICAL_REASONING") route = "lr";
      let version = "v2";
      if (
        topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION" &&
        subTopic === "READING_COMPREHENSION"
      ) {
        version = "v1";
        subTopicRoute = "";
      }

      if(topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION" && (subTopic === "IDIOMS_AND_PHRASES" ||
      subTopic === "SYNONYMS" ||
      subTopic === "ANTONYMS" ||
      subTopic === "ONE_WORD_SUBSTITUTION")){
        subTopicRoute = `sub/vocabulary/${subTopic.toLowerCase()}`
      }
      if (topic === "DATA_INTERPRETATION") {
        version = "v1";
      }
      if(topic === "LOGICAL_REASONING" && (subTopic === "MISCELLANEOUS" || subTopic === "ARRANGEMENTS")){
        version = "v1";
      }
      const lastSubTopic = localStorage.getItem('currentSubTopic')
      if(lastSubTopic && lastSubTopic !== subTopic){
        localStorage.removeItem('currentPage')
      }
      localStorage.setItem('currentSubTopic', subTopic);
      try {
        const response = await axios.get(
          `${API}/${route}/question/${version}/${subTopicRoute.toLowerCase()}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [topic, subTopic]);

  if (isLoading) {
    return <TietLoader />;
  }

  return (
    <section className="question-practice">
      {data.length > 0 ? (
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-3">
              <RecommendedSubTopics />
            </div>
            <div className="col-lg-8">
              <QuestionV2 data={data} />
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default PracticeQuestions;
