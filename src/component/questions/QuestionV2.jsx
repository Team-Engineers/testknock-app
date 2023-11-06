import React, { useEffect, useState } from "react";
import "./question.css";
import RecommendedSubTopics from "../recommendedSubTopics/RecommendedSubTopics";
import { useParams } from "react-router-dom";
import axios from 'axios';

const QuestionV2 = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {topic , subTopic}  = useParams()
  console.log("topic and subtopic",topic,subTopic)

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      let route = ""; // Local variable to hold the route
      let subTopicRoute = subTopic;
      if(subTopic === "S.I_AND_C.I")subTopicRoute = "simple_interest_and_compound_interest"
      if(subTopic === "RATIO_AND_PROPORTION")subTopicRoute = "ratio_and_praportion"
      if(subTopic === "TIME,_SPEED_AND_DISTANCE")subTopicRoute = "time_speed_and_distance"
      if(subTopic === "FAMILY_TREE_AND_BLOOD_RELATIONS")subTopicRoute = "family_tree_and_blood_relations"
      if(subTopic === "NUMBER_OR_ALPHABET_SERIES")subTopicRoute = "number_alphabet_series"
      if(topic === "QUANTITATIVE_APTITUDE") route = "math";
      if(topic === "DATA_INTERPRETATION") route = "di";
      if(topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION") route = "varc";
      if(topic === "LOGICAL_REASONING") route = "lr";
  
      try {
        const response = await axios.get(`https://ourntamockpapers.onrender.com/api/${route}/question/v2/${subTopicRoute.toLowerCase()}`);
        setData(response.data); // Assuming the response has the data directly
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data with axios: ", error);
      }
    };
  
    fetchData(); // Call the async function
  }, [topic, subTopic]); // Dependency array to trigger the effect when topic or subTopic changes
  

  const handleOptionClick = (questionIndex, optionIndex) => {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[questionIndex] = optionIndex;
    setSelectedOption(updatedSelectedOption);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / 5) - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedOption([]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedOption([]);
    }
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(data.length / 5);
    const maxPagesToShow = 5;
    const pages = [];
    const currentPageIndex = currentPage;

    for (
      let i = currentPageIndex - Math.floor(maxPagesToShow / 2);
      i <= currentPageIndex + Math.floor(maxPagesToShow / 2);
      i++
    ) {
      if (i >= 0 && i < totalPages) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <section className="question-practice">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-3">
            <RecommendedSubTopics />
          </div>
          {isLoading ? (
            <div className="spinner-container">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="col-lg-9">
              <div className="d-flex justify-content-center mt-4 align-items-center flex-column">
                <div className="options-container">
                  {data
                    .slice(currentPage * 5, (currentPage + 1) * 5)
                    .map((question, questionIndex) => (
                      <div key={questionIndex} className="options-grid">
                        <div className="question-box">
                          <div className="question">
                            <div className="question-number-container">
                              <span className="question-number">{`${
                                questionIndex + 1 + currentPage * 5
                              } `}</span>
                            </div>
                            <div className="question-text-container">
                              <span className="question-text">
                                {question.text}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                            {question.image &&
                              question.image.map((image, imageIndex) => (
                                <img
                                  className="question-image"
                                  key={imageIndex}
                                  src={image}
                                  alt={`Img ${imageIndex + 1}`}
                                />
                              ))}
                          </div>
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`option-box ${
                                selectedOption[questionIndex] === optionIndex
                                  ? question.correctOptionIndex - 1 ===
                                    optionIndex
                                    ? "correct"
                                    : "incorrect"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOptionClick(questionIndex, optionIndex)
                              }
                            >
                              <span className="option-alphabet">
                                {alphabets[optionIndex]}
                              </span>
                              <div className="d-flex justify-content-start gap-3 w-100 align-items-center ">
                                {option.text}
                                {option.image ? (
                                  <img
                                    className="question-image"
                                    src={option.image}
                                    alt={`Img ${optionIndex + 1}`}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="d-flex">
                                {question.correctOptionIndex - 1 ===
                                  optionIndex &&
                                  selectedOption[questionIndex] ===
                                    optionIndex && (
                                    <span className="correct-answer">
                                      <i className="fa-solid fa-check"></i>
                                    </span>
                                  )}
                                {selectedOption[questionIndex] ===
                                  optionIndex &&
                                  question.correctOptionIndex - 1 !==
                                    optionIndex && (
                                    <span className="incorrect-answer">
                                      <i className="fa-solid fa-xmark"></i>
                                    </span>
                                  )}
                              </div>
                            </div>
                          ))}
                          <div class="accordion" id={`accordionExample`}>
                            <div class="accordion-item">
                              <h2 class="accordion-header">
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${questionIndex}`}
                                  aria-expanded="true"
                                  aria-controls={`collapse${questionIndex}`}
                                >
                                  <strong>Explain It</strong>
                                </button>
                              </h2>
                              <div
                                id={`collapse${questionIndex}`}
                                class="accordion-collapse collapse"
                              >
                                <div class="accordion-body">
                                  {question.explanation.text.map(
                                    (explanationText, explanationIndex) => (
                                      <p key={explanationIndex}>
                                        {explanationText}
                                      </p>
                                    )
                                  )}
                                  <div className="d-flex justify-content-center align-items-center gap-3">
                                    {question.explanation.image &&
                                      question.explanation.image.map(
                                        (
                                          explanationImage,
                                          explanationImageIndex
                                        ) => (
                                          <img
                                            className="question-image"
                                            key={explanationImageIndex}
                                            src={explanationImage}
                                            alt={`Explanation Img ${
                                              explanationImageIndex + 1
                                            }`}
                                          />
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="pagination col-md-9">
                  <button
                    className={`page-button ${
                      currentPage === 0 ? "disabled" : ""
                    }`}
                    onClick={handlePreviousPage}
                  >
                    Prev
                  </button>
                  {generatePageNumbers().map((pageIndex) => (
                    <button
                      key={pageIndex}
                      className={`page-button ${
                        currentPage === pageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}
                  <button
                    className={`page-button ${
                      currentPage === Math.ceil(data.length / 5) - 1
                        ? "disabled"
                        : ""
                    }`}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionV2;
