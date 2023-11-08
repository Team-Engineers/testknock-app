import React, { useState, useEffect, useCallback } from "react";
import "./QuestionSection.css";
import { Modal, Button } from "react-bootstrap";
import giphy from "../../assets/images/giphy.gif";
import { useParams } from "react-router-dom";
import {API} from '../../utils/constants'
import axios from "axios";

const MCQSection = () => {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedAnswers, setUnattemptedAnswers] = useState(0);
  const [explanationsVisible, setExplanationsVisible] = useState(
    Array(10).fill(false)
  );
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [optionsUI, setOptionsUI] = useState(Array(10).fill(""));
  const [yourScore, setYourScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(600); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false); // Whether the timer is active
  const [isLoading, setIsLoading] = useState(true);
  // correctOptionIndex in api, is 1 index numbering, so reduce it by 1 , whenever in use
  const {topic} = useParams()
  // console.log(topic)
  useEffect(() => {
    const fetchData = async()=>{
      try{
        let version = "v2"
        if(topic === "di")version = "v1"

        const response = await axios.get(`${API}/${topic}/question/${version}/l1/random`)
        const resData = response.data;
        setIsLoading(false);
        setData(resData);
        if (resData) {
          setSelectedOptions(Array(10).fill(null));
          setExplanationsVisible(Array(10).fill(false));
          setTimerActive(true);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        alert("data is not fetched");
      }
    };
    fetchData();
  }, [topic]);

  const calculateScore = useCallback(() => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattemptedAnswers = 0;

    const score2 = data.forEach((question, index) => {
      const correctOptionIndex = question.correctOptionIndex - 1;
      const userAnswerIndex = selectedOptions[index];

      if (userAnswerIndex !== null) {
        if (userAnswerIndex === correctOptionIndex) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }
      } else {
        unattemptedAnswers++;
      }
    });

    setCorrectAnswers(correctAnswers); // Set the correct answer count
    setWrongAnswers(wrongAnswers); // Set the wrong answer count
    setUnattemptedAnswers(unattemptedAnswers); // Set the unattempted answer count
    setYourScore(correctAnswers);
    return score2;
  }, [data, selectedOptions]);

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
        setTimer(timer - 1); // Decrement the timer value
      } else if (timer === 0 && timerActive) {
        handleShowSubmissionModal();
      }
    }, 1000);
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [timer, timerActive, handleShowSubmissionModal]);

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

  const handleRetakeTest = () => {
    window.location.reload();
  };

  return (
    <section className="quiz-section">
      {isLoading ? (
        <div className="spinner-container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mcq-section">
          <div className={`timer ${testSubmitted ? "d-none" : ""}`}>
            Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
          </div>
          <div className="question-section">
            {data.map((question, questionIndex) => (
              <div key={questionIndex} className="question-container">
                <div className="question-header">
                  <h6 className="question-number">{`${questionIndex + 1}`}</h6>
                  <h6>{question.text[0]}</h6>
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
                          ? optionIndex === question.correctOptionIndex - 1
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
                            <h6 className="option-text">{option.text}</h6>
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
                  className={`d-flex justify-content-center align-items-start flex-column ${
                    testSubmitted ? "d-block" : "d-none"
                  }`}
                  style={{ padding: "10px" }}
                >
                  <button
                    className="toggle-explanation-btn"
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
                            <h6 key={index}>{text}</h6>
                          ))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {testSubmitted ? (
        <button className="retake-button btn mb-4" onClick={handleRetakeTest}>
          Take New Test
        </button>
      ) : (
        <button className="submit-button btn  mb-4" onClick={handleSubmit}>
          Submit
        </button>
      )}
      <Modal
        show={showWarningModal}
        onHide={handleCloseWarningModal}
        className="modal-warning"
        centered
        dialogClassName="warning-modal-dialog"
      >
        <Modal.Body>
          <p className="bold-text">Time is Left !!!</p>
          <p className="bold-text">Do you want still want to continue?</p>
          <div className="modal-buttons">
            <Button variant="secondary" onClick={handleCloseWarningModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleShowSubmissionModal}>
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
            Unattempted Answers: {unattemptedAnswers}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSubmissionModal}>
            Review Test
          </Button>
          <a className ="gohome" href="/">
            <Button variant="secondary">Home</Button>
          </a>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default MCQSection;
