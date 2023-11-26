import React, { useState } from "react";
import "../practicequestions/question.css";
import { MathText } from "../mathJax/MathText";

const QuestionPreview = ({ data, useMathJx }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState([]);
  console.log(
    "data topic",
    data.topic === "simple_interest_and_compound_interest"
  );

  // if (
  //   data.topic === "number_system" ||
  //   data.topic === "profit_and_loss" ||
  //   data.topic === "percentage" ||
  //   data.topic === "average" ||
  //   data.topic === "simple_interest_and_compound_interest" ||
  //   data.topic === "partnership" ||
  //   data.topic === "ratio_and_proportion" ||
  //   data.topic === "time_and_work" ||
  //   data.topic === "time_speed_and_distance" ||
  //   data.topic === "probability" ||
  //   data.topic === "permutation_and_combination"
  // ) {
  //   setUseMathJx(true);
  // }

  const handleOptionClick = (questionIndex, optionIndex) => {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[questionIndex] = optionIndex;
    setSelectedOption(updatedSelectedOption);
  };

  return (
    <section className="question-practice question-practice-v2">
      <div className="w-100 d-flex justify-content-center mt-4 align-items-center flex-column">
        {data.paragraph ? (
          <div className="question-container">
            <div className="question-box paragraph">
              <h6 className="mb-2 ">
                <strong>Direction:</strong> Read the following passage carefully
                and answer the questions that follow.
              </h6>
              <div className="d-flex justify-content-start align-items-center gap-3">
                <div className="question-text ">
                  {data.paragraph.map((paragraph, paraindex) =>
                    useMathJx === "true" ? (
                      <MathText
                        className="mb-2"
                        key={paraindex}
                        text={paragraph}
                        textTag="h6"
                      />
                    ) : (
                      <h6
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                        className="mb-2"
                        key={paraindex}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-3">
                {data.images &&
                  data.images.map((image, imageIndex) => (
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
              {data.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="options-grid">
                  <div className="question-box">
                    <div className="question-option">
                      <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                        <span className="question-number">{`${
                          questionIndex + 1
                        } `}</span>
                        <div>
                          {question.text.map((text, textIndex) =>
                            ( useMathJx === "true"  ? (
                              <MathText
                                className="question-text mb-2"
                                key={textIndex}
                                text={text}
                                textTag="h6"
                              />
                            ) : (
                              <h6
                                className="question-text mb-2"
                                key={textIndex}
                                dangerouslySetInnerHTML={{ __html: text }}
                              />
                            ))
                          )}
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
                    <button className="toggle-explanation-btn">
                      <div className="explanation-wrapper">
                        <div className="explanation">
                          <p class="m-0 pt-3">
                            {question.explanation.text &&
                              question.explanation.text.map((text, index) =>
                                useMathJx === "true" ? (
                                  <MathText
                                    text={text}
                                    key={index}
                                    textTag="h6"
                                  />
                                ) : (
                                  <h6
                                    dangerouslySetInnerHTML={{ __html: text }}
                                    key={index}
                                  />
                                )
                              )}
                          </p>
                          <div className="d-flex justify-content-center align-items-center gap-3">
                            {question.explanation.images &&
                              question.explanation.images.map(
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
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="options-container">
            <div className="options-grid">
              <div className="question-box">
                <div className="question-option">
                  <div className="question">
                    <div className="question-text-container">
                      {data.text.map((text, textIndex) =>
                        useMathJx === "true" ? (
                          <MathText
                            className="question-text mb-2"
                            key={textIndex}
                            text={text}
                            textTag="h6"
                          />
                        ) : (
                          <h6
                            className="question-text mb-2"
                            key={textIndex}
                            dangerouslySetInnerHTML={{ __html: text }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                    {data.images &&
                      data.images.map((image, imageIndex) => (
                        <img
                          className="question-image"
                          key={imageIndex}
                          src={image}
                          alt={`Img ${imageIndex + 1}`}
                        />
                      ))}
                  </div>
                </div>
                {data.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={`option-box`}>
                    <span className="option-alphabet">
                      {alphabets[optionIndex]}
                    </span>
                    <div className="d-flex align-items-center justify-content-start gap-3 w-100 align-items-center ">
                      {useMathJx === "true" ? (
                        <MathText text={option.text} textTag="h6" />
                      ) : (
                        <h6 dangerouslySetInnerHTML={{ __html: option.text }} />
                      )}
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
                  </div>
                ))}
                <button className="toggle-explanation-btn">
                  <div className="explanation-wrapper ">
                    <div className="explanation">
                      <p class="m-0 pt-3">
                        {data.explanation.text.map((text, index) =>
                          useMathJx === "true" ? (
                            <MathText key={index} text={text} textTag="h6" />
                          ) : (
                            <h6
                              key={index}
                              dangerouslySetInnerHTML={{ __html: text }}
                            />
                          )
                        )}
                      </p>
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        {data.explanation.images &&
                          data.explanation.images.map(
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
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionPreview;
