import React, { useState } from "react";
import "./question.css";
import { MathText } from "../mathJax/MathText";

const QuestionV2 = ({ data }) => {
  console.log("data received to preview",data)
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [explanationsVisible, setExplanationsVisible] = useState(
    Array(10).fill(false)
  );
  const [explanationsVisiblePara, setExplanationsVisiblePara] = useState(
    Array(10)
      .fill(null)
      .map(() => Array(10).fill(false))
  );

  const handleOptionClick = (questionIndex, optionIndex) => {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[questionIndex] = optionIndex;
    setSelectedOption(updatedSelectedOption);
  };

  const handlePageChange = (pageIndex) => {
    setSelectedOption([]);
    setCurrentPage(pageIndex);
    setExplanationsVisible(Array(10).fill(false));
    setExplanationsVisiblePara(
      Array(10)
        .fill(null)
        .map(() => Array(10).fill(false))
    );
    window.scrollTo(0, 0);
  };

  const generatePageNumbers2 = () => {
    const totalPages = Math.ceil(data.length);
    const maxPagesToShow = 5;
    const pages = [];
    const currentPageIndex = currentPage;

    let startPage = Math.max(
      currentPageIndex - Math.floor(maxPagesToShow / 2),
      0
    );
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

    while (
      endPage - startPage < maxPagesToShow - 1 &&
      endPage < totalPages - 1
    ) {
      endPage++;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(data.length / 5);
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    let endPage = currentPage + Math.floor(maxPagesToShow / 2);

    if (startPage < 0) {
      endPage -= startPage;
      startPage = 0;
    }

    if (endPage > totalPages - 1) {
      startPage -= endPage - totalPages + 1;
      endPage = totalPages - 1;
    }

    startPage = Math.max(startPage, 0);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    while (pages.length > maxPagesToShow) {
      if (currentPage - startPage <= endPage - currentPage) {
        pages.pop();
      } else {
        pages.shift();
      }
    }

    return pages;
  };

  const toggleExplanationVisibility = (questionIndex) => {
    const updatedExplanationsVisible = [...explanationsVisible];
    updatedExplanationsVisible[questionIndex] =
      !updatedExplanationsVisible[questionIndex];
    setExplanationsVisible(updatedExplanationsVisible);
  };

  const toggleExplanationVisibilityPara = (itemIndex, questionIndex) => {
    setExplanationsVisiblePara((prevExplanationsVisible) => {
      const updatedExplanationsVisible = [...prevExplanationsVisible];
      updatedExplanationsVisible[itemIndex] = [
        ...prevExplanationsVisible[itemIndex],
      ];
      updatedExplanationsVisible[itemIndex][questionIndex] =
        !prevExplanationsVisible[itemIndex][questionIndex];
      return updatedExplanationsVisible;
    });
  };

  return (
    <section className="question-practice question-practice-v2">
      <div className="w-100 d-flex justify-content-center mt-4 align-items-center flex-column">
        {data.paragraph || data[0].paragraph ? (
          data.paragraph ?  data : data.slice(currentPage * 1, currentPage + 1)
            .map((item, itemIndex) => (
              <div key={itemIndex} className="question-container">
                <div className="question-box paragraph">
                  <h6 className="mb-2 ">
                    <strong>Direction:</strong> Read the following passage
                    carefully and answer the questions that follow.
                  </h6>
                  <div className="d-flex justify-content-start align-items-center gap-3">
                    <span className="question-number">{`P${
                      itemIndex + 1 + currentPage
                    } `}</span>
                    <div className="question-text ">
                      {item.paragraph.map((paragraph, paraindex) => (
                        <MathText
                          className="mb-2"
                          key={paraindex}
                          text={paragraph}
                          textTag="h6"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    {item.images &&
                      item.images.map((image, imageIndex) => (
                        <img
                          className="question-image"
                          key={imageIndex}
                          src={image}
                          alt={`Img ${imageIndex + 1}`}
                        />
                      ))}
                  </div>
                </div>
                <div className="options-container">
                  {item.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="options-grid">
                      <div className="question-box">
                        <div className="question-option">
                          <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                            <span className="question-number">{`${
                              questionIndex + 1
                            } `}</span>
                            <div>
                              {question.text.map((text, textIndex) => (
                                <MathText
                                  className="question-text mb-2"
                                  key={textIndex}
                                  text={text}
                                  textTag="h6"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                            {question.images &&
                              question.images.map((image, imageIndex) => (
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
                              <h6 className="option-alphabet">
                                {alphabets[optionIndex]}
                              </h6>
                              <div className="d-flex justify-content-start gap-3 w-100 align-items-center">
                                <h6>{option.text}</h6>
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
                        </div>
                        <button
                          className="toggle-explanation-btn"
                          onClick={() =>
                            toggleExplanationVisibilityPara(
                              itemIndex,
                              questionIndex
                            )
                          }
                        >
                          {explanationsVisiblePara[itemIndex] &&
                          explanationsVisiblePara[itemIndex][questionIndex]
                            ? "Hide Explanation"
                            : "Show Explanation"}
                          <div className="explanation-wrapper">
                            {explanationsVisiblePara[itemIndex] &&
                              explanationsVisiblePara[itemIndex][
                                questionIndex
                              ] && (
                                <div className="explanation">
                                  <p class="m-0 pt-3">
                                    {question.explanation.text &&
                                      question.explanation.text.map(
                                        (text, index) => (
                                          <MathText
                                            text={text}
                                            key={index}
                                            textTag="h6"
                                          />
                                        )
                                      )}
                                  </p>
                                  <div className="d-flex justify-content-center align-items-center gap-3">
                                    {question.explanation.images &&
                                      question.explanation.images.map(
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
                              )}
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pagination">
                  <button
                    className={`page-button ${
                      currentPage === 0 ? "disabled" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </button>
                  {generatePageNumbers2().map((pageIndex) => (
                    <button
                      key={pageIndex}
                      className={`page-button ${
                        currentPage === pageIndex ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}
                  <button
                    className={`page-button ${
                      currentPage === Math.ceil(data.length / 1) - 1
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="options-container">
            {data
              .slice(currentPage * 5, (currentPage + 1) * 5)
              .map((question, questionIndex) => (
                <div key={questionIndex} className="options-grid">
                  <div className="question-box">
                    <div className="question-option">
                      <div className="question">
                        <div className="question-number-container">
                          <span className="question-number">{`${
                            questionIndex + 1 + currentPage * 5
                          } `}</span>
                        </div>
                        <div className="question-text-container">
                          {question.text.map((text, textIndex) => (
                            <MathText
                              className="question-text mb-2"
                              key={textIndex}
                              text={text}
                              textTag="h6"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        {question.images &&
                          question.images.map((image, imageIndex) => (
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
                              ? question.correctOptionIndex - 1 === optionIndex
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
                          <div className="d-flex align-items-center justify-content-start gap-3 w-100 align-items-center ">
                            <MathText text={option.text} textTag="h6" />
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
                            {question.correctOptionIndex - 1 === optionIndex &&
                              selectedOption[questionIndex] === optionIndex && (
                                <span className="correct-answer">
                                  <i className="fa-solid fa-check"></i>
                                </span>
                              )}
                            {selectedOption[questionIndex] === optionIndex &&
                              question.correctOptionIndex - 1 !==
                                optionIndex && (
                                <span className="incorrect-answer">
                                  <i className="fa-solid fa-xmark"></i>
                                </span>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="toggle-explanation-btn"
                      onClick={() => toggleExplanationVisibility(questionIndex)}
                    >
                      {explanationsVisible[questionIndex]
                        ? "Hide Explanation"
                        : "Show Explanation"}
                      <div className="explanation-wrapper ">
                        {explanationsVisible[questionIndex] && (
                          <div className="explanation">
                            <p class="m-0 pt-3">
                              {question.explanation.text.map((text, index) => (
                                <MathText
                                  key={index}
                                  text={text}
                                  textTag="h6"
                                />
                              ))}
                            </p>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              {question.explanation.image &&
                                question.explanation.image.map(
                                  (explanationImage, explanationImageIndex) => (
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
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))}

            <div className="pagination">
              <button
                className={`page-button ${currentPage === 0 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              {generatePageNumbers().map((pageIndex) => (
                <button
                  key={pageIndex}
                  className={`page-button ${
                    currentPage === pageIndex ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageIndex)}
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
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionV2;
