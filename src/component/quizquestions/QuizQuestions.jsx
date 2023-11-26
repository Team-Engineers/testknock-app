import React, { useState, useEffect, useCallback } from "react";
import "./QuizQuestions.css";
import { Modal, Button } from "react-bootstrap";
import giphy from "../../assets/images/giphy.gif";
import { Link, useParams } from "react-router-dom";
import { API } from "../../utils/constants";
import axios from "axios";
import TietLoader from "../Loader/Loader";
import NoData from "../Loader/NoData";
import { MathText } from "../mathJax/MathText";

const QuizQuestions = () => {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedAnswers, setUnattemptedAnswers] = useState(0);
  const [correctAnswersArray, setCorrectAnswersArray] = useState([]);
  const [explanationsVisible, setExplanationsVisible] = useState(
    Array(10).fill(false)
  );
  const [explanationsVisiblePara, setExplanationsVisiblePara] = useState(
    Array(10)
      .fill(null)
      .map(() => Array(10).fill(false))
  );

  const [testSubmitted, setTestSubmitted] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [optionsUI, setOptionsUI] = useState(Array(10).fill([]));
  const [selectedOptionsPara, setSelectedOptionsPara] = useState(
    Array(10).fill([])
  );

  const [yourScore, setYourScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(600);
  const [timerActive, setTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let version = "v2";
        if (topic === "di") version = "v1";

        const response = await axios.get(
          `${API}/${topic}/question/${version}/l1/random`
        );
        const resData = response.data;
        setIsLoading(false);
        setData(resData);
        if (resData) {
          setSelectedOptions(Array(10).fill(null));
          setExplanationsVisible(Array(10).fill(false));
          setTimerActive(true);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [topic]);

  const calculateScore = useCallback(() => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattemptedAnswers = 0;
    const newCorrectAnswersArray = [];
    if (data[0].paragraph) {
      data.slice(0, 2).forEach((item, itemIndex) => {
        if (item.paragraph) {
          // For paragraph-type questions
          item.questions.forEach((question, questionIndex) => {
            const correctOptionIndex = question.correctOptionIndex - 1;
            const userAnswerIndex =
              selectedOptionsPara[itemIndex][questionIndex];
            if (userAnswerIndex !== undefined) {
              if (userAnswerIndex === correctOptionIndex) {
                correctAnswers++;
                newCorrectAnswersArray.push(question._id);
              } else {
                wrongAnswers++;
              }
            } else {
              unattemptedAnswers++;
            }
          });
        }
      });
    } else {
      // For non-paragraph-type questions
      data.forEach((question, index) => {
        const correctOptionIndex = question.correctOptionIndex - 1;
        const userAnswerIndex = selectedOptions[index];

        if (userAnswerIndex !== null) {
          if (userAnswerIndex === correctOptionIndex) {
            correctAnswers++;
            newCorrectAnswersArray.push(question._id);
          } else {
            wrongAnswers++;
          }
        } else {
          unattemptedAnswers++;
        }
      });
    }

    setCorrectAnswers(correctAnswers);
    setWrongAnswers(wrongAnswers);
    setUnattemptedAnswers(unattemptedAnswers);
    setYourScore(correctAnswers);
    setCorrectAnswersArray(newCorrectAnswersArray);
  }, [data, selectedOptions, selectedOptionsPara]);

  const handleShowSubmissionModal = useCallback(() => {
    calculateScore();
    setShowSubmissionModal(true);
    setTestSubmitted(true);
    setShowWarningModal(false);
    setShowCorrectAnswer(true);
    setTimerActive(false);
    setTimer(0);
  }, [calculateScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && timerActive) {
        setTimer(timer - 1);
      } else if (timer === 0 && timerActive) {
        handleShowSubmissionModal();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, timerActive, handleShowSubmissionModal]);

  const handleOptionSelectPara = (itemIndex, questionIndex, optionIndex) => {
    const updatedSelectedOptionsPara = [...selectedOptionsPara];
    updatedSelectedOptionsPara[itemIndex] = [...selectedOptionsPara[itemIndex]];
    updatedSelectedOptionsPara[itemIndex][questionIndex] = optionIndex;
    setSelectedOptionsPara(updatedSelectedOptionsPara);
    const updatedOptionsUI = [...optionsUI];
    updatedOptionsUI[itemIndex] = [...optionsUI[itemIndex]];
    updatedOptionsUI[itemIndex][questionIndex] = optionIndex;
    setOptionsUI(updatedOptionsUI);
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
    const updatedOptionsUI = [...optionsUI];

    updatedOptionsUI[questionIndex] = optionIndex;

    setOptionsUI(updatedOptionsUI);
  };

  const handleSubmit = () => {
    if (timer > 0 && timerActive) {
      calculateScore();
      handleShowWarningModal();
    } else {
      handleShowSubmissionModal();
    }
  };
  const updateProgress = useCallback(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (storedUserData?._id && correctAnswersArray.length > 0) {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")).token;

      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const existingProgress = storedUserData.subject_progress[topic] || [];

        const updatedProgress = [...existingProgress, ...correctAnswersArray];

        const progressUserData = {
          subject_progress: {
            ...storedUserData.subject_progress,
            [topic]: updatedProgress,
          },
        };

        axios
          .put(`${API}/users/${storedUserData._id}`, progressUserData, {
            headers: headers,
          })
          .then((response) => {
            if (response.status === 200) {
              const user = response.data;
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              // console.log(`Error updating ${topic} progress`);
            }
          })
          .catch((error) => {
            // console.log(`Error updating ${topic} progress`, error);
          });
      } else {
        // console.log("Error in updating subject");
      }
    }
  }, [correctAnswersArray, topic]);

  useEffect(() => {
    if (correctAnswersArray.length > 0) {
      updateProgress();
    }
  }, [correctAnswersArray, updateProgress]);

  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };

  const handleShowWarningModal = () => {
    setShowWarningModal(true);
  };

  const handleCloseSubmissionModal = () => {
    setShowSubmissionModal(false);
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

  const handleRetakeTest = () => {
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <section className="quiz-section">
      {isLoading ? (
        <TietLoader />
      ) : data.length > 0 ? (
        <div className="mcq-section">
          <div className={`timer ${testSubmitted ? "d-none" : ""}`}>
            Time Remaining: {Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")}
          </div>

          {data[0].paragraph ? (
            data.slice(0, 2).map((item, itemIndex) => (
              <div key={itemIndex} className="question-container">
                <div className="p-2 question-box paragraph">
                  <h6 className="mb-2 ">
                    <strong>Direction:</strong> Read the following passage
                    carefully and answer the questions that follow.
                  </h6>
                  <div className="d-flex justify-content-start align-items-center gap-3">
                    <span className={`question-number id-${item._id}`}>{`P${
                      itemIndex + 1
                    } `}</span>
                    <p className="subtopic-name">
                      Subtopic - {item.topic?.split("_").join(" ")}
                    </p>
                    <div className="question-text ">
                      {item.paragraph.map((paragraph, paraindex) => (
                        <h6 className="mb-2" key={paraindex}>
                          {paragraph}
                        </h6>
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
                <div className="question-section">
                  {item.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-container">
                      <div className="question-header">
                        <h6 className={`question-number`}>{`${
                          questionIndex + 1
                        }`}</h6>

                        {question.text.map((text, textIndex) => (
                          <MathText
                            key={textIndex}
                            className="mb-2"
                            text={text}
                            textTag="h6"
                          />
                        ))}
                      </div>
                      <div className="images-container">
                        {question.images.map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={image}
                            alt={`Img ${imageIndex + 1}`}
                            className="para-images"
                          />
                        ))}
                      </div>
                      <ul>
                        {question.options.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            onClick={() =>
                              handleOptionSelectPara(
                                itemIndex,
                                questionIndex,
                                optionIndex
                              )
                            }
                          >
                            <div
                              className={`option-section 
                            ${
                              showCorrectAnswer
                                ? optionIndex ===
                                  question.correctOptionIndex - 1
                                  ? ""
                                  : "incorrect"
                                : ""
                            }
                            ${
                              optionsUI[itemIndex] &&
                              optionsUI[itemIndex][questionIndex] ===
                                optionIndex
                                ? "selected-option"
                                : "unselected-option"
                            }
      
                             `}
                            >
                              <div className="d-flex justify-content-center align-items-center gap-4">
                                <h6 className="alphabet">
                                  {String.fromCharCode(65 + optionIndex)}{" "}
                                </h6>
                                <div className="option-container">
                                  <MathText
                                    className="option-text"
                                    text={option.text}
                                    textTag="h6"
                                  />
                                  {option.image && (
                                    <img
                                      src={option.image}
                                      alt={`Img ${optionIndex + 1}`}
                                      className="option-image"
                                    />
                                  )}
                                </div>
                              </div>

                              {showCorrectAnswer ? (
                                optionIndex ===
                                optionsUI[itemIndex][questionIndex] ? (
                                  optionsUI[itemIndex][questionIndex] ===
                                  question.correctOptionIndex - 1 ? (
                                    <i class="fa-solid fa-check"></i>
                                  ) : (
                                    <i class="fa-solid fa-xmark"></i>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`d-flex justify-content-center align-items-center flex-column ${
                          testSubmitted ? "d-block" : "d-none"
                        }`}
                        style={{ margin: "10px" }}
                      >
                        <button
                          className="btn-tertiary"
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
                        </button>

                        <div className="explanation-wrapper">
                          {explanationsVisiblePara[itemIndex] &&
                            explanationsVisiblePara[itemIndex][
                              questionIndex
                            ] && (
                              <div className="explanation">
                                <p>
                                  {question.explanation.text.map(
                                    (text, index) => (
                                      <MathText
                                        key={index}
                                        text={text}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="question-section">
              {data.map((question, questionIndex) => (
                <div key={questionIndex} className="question-container">
                  <div className="question-header">
                    <h6 className={`question-number id-${question._id}`}>{`${
                      questionIndex + 1
                    }`}</h6>
                    <p className="subtopic-name">
                      Subtopic -{" "}
                      {question.topic === "vocabulary"
                        ? question.subTopic.split("_").join(" ")
                        : question.topic.split("_").join(" ")}
                    </p>

                    {question.text.map((text, textIndex) => (
                      <MathText
                        key={textIndex}
                        className="mb-2"
                        text={text}
                        textTag="h6"
                      />
                    ))}
                  </div>
                  <div className="images-container">
                    {question.images.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={image}
                        alt={`Img ${imageIndex + 1}`}
                        className="para-images"
                      />
                    ))}
                  </div>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        onClick={() =>
                          handleOptionSelect(questionIndex, optionIndex)
                        }
                      >
                        <div
                          className={`option-section 
                            ${
                              showCorrectAnswer
                                ? optionIndex ===
                                  question.correctOptionIndex - 1
                                  ? ""
                                  : "incorrect"
                                : ""
                            }
                            ${
                              optionsUI[questionIndex] === optionIndex
                                ? "selected-option"
                                : "unselected-option"
                            }
      
                             `}
                        >
                          <div className="d-flex justify-content-center align-items-center gap-4">
                            <h6 className="alphabet">
                              {String.fromCharCode(65 + optionIndex)}{" "}
                            </h6>
                            <div className="option-container">
                              <MathText
                                className="option-text"
                                text={option.text}
                                textTag="h6"
                              />
                              {option.image && (
                                <img
                                  src={option.image}
                                  alt={`Img ${optionIndex + 1}`}
                                  className="option-image"
                                />
                              )}
                            </div>
                          </div>

                          {showCorrectAnswer ? (
                            optionIndex === optionsUI[questionIndex] ? (
                              optionsUI[questionIndex] ===
                              question.correctOptionIndex - 1 ? (
                                <i class="fa-solid fa-check"></i>
                              ) : (
                                <i class="fa-solid fa-xmark"></i>
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`d-flex justify-content-center align-items-center flex-column ${
                      testSubmitted ? "d-block" : "d-none"
                    }`}
                    style={{ margin: "10px" }}
                  >
                    <button
                      className="btn-tertiary"
                      onClick={() => toggleExplanationVisibility(questionIndex)}
                    >
                      {explanationsVisible[questionIndex]
                        ? "Hide Explanation"
                        : "Show Explanation"}
                    </button>

                    <div className="explanation-wrapper ">
                      {explanationsVisible[questionIndex] && (
                        <div className="explanation">
                          <p>
                            {question.explanation.text.map((text, index) => (
                              <MathText key={index} text={text} textTag="h6" />
                            ))}
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
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <NoData />
      )}

      {data.length > 0 ? (
        testSubmitted ? (
          <div className="d-flex justify-content-center align-items-center gap-5">
            <button
              className="retake-button btn btn-primary"
              onClick={handleRetakeTest}
            >
              Take New Test
            </button>
            <Link className="home-button btn btn-primary" to="/">
              Home
            </Link>
          </div>
        ) : (
          <button
            className="submit-button btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )
      ) : (
        ""
      )}

      <Modal
        show={showWarningModal}
        onHide={handleCloseWarningModal}
        className="modal-warning"
        centered
        dialogClassName="warning-modal-dialog"
      >
        <Modal.Body>
          <h6 className="bold-text mb-2">You've got time left.</h6>
          <h6 className="bold-text mb-2">{`Time remains ${Math.floor(timer / 60)}:${timer % 60}`}</h6>
          <h6 className="bold-text">Do you want still want to continue?</h6>
          <div className="modal-buttons">
            <Button
              className="btn btn-primary"
              onClick={handleCloseWarningModal}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary"
              onClick={handleShowSubmissionModal}
            >
              Submit Anyway
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSubmissionModal}
        onHide={handleCloseSubmissionModal}
        dialogClassName="scorecard-modal"
        centered
      >
        <Modal.Body>
          <img src={giphy} alt="Your GIF" className="giphy-image" />
          <h6 className="score">Your Score: {yourScore}</h6>
          <p className="correct-answers green-text">
            Correct Answers: {correctAnswers}
          </p>
          <p className="wrong-answers red-text">
            Wrong Answers: {wrongAnswers}
          </p>
          <p className="unattempted-answers orange-text">
            Unattempted Questions: {unattemptedAnswers}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary" onClick={handleCloseSubmissionModal}>
            Review Test
          </Button>
          <Link className="gohome" to="/">
            <Button className="btn-primary">Home</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default QuizQuestions;
