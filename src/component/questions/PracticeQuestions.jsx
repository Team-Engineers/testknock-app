import React, { useEffect, useState } from "react";
import "./question.css";
import { useParams } from "react-router-dom";
import { API } from "../../utils/constants";
import QuestionV1 from "./QuestionV1";
import QuestionV2 from "./QuestionV2";
import axios from "axios";
import RecommendedSubTopics from "../recommendedSubTopics/RecommendedSubTopics";

const QuizPage = () => {
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
      try {
        const response = await axios.get(
          `${API}/${route}/question/${version}/${subTopicRoute.toLowerCase()}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data with axios: ", error);
      }
    };

    fetchData();
  }, [topic, subTopic]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  let ComponentToRender;

  if (
    topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION" &&
    subTopic === "READING_COMPREHENSION"
  ) {
    ComponentToRender = QuestionV1;
  } else {
    ComponentToRender = QuestionV2;
  }

  return (
    <section className="question-practice">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-3">
            <RecommendedSubTopics />
          </div>
          <div className="col-lg-9">
            <ComponentToRender data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;
