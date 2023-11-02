import React, { useState, useEffect } from "react";
import "./QuestionSection.css";
import { Modal, Button } from "react-bootstrap";
import gif from "../../assets/images/gif.gif";

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
  const [yourScore, setYourScore] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // correctOptionIndex in api, is 1 index numbering, so reduce it by 1 , whenever in use

  useEffect(() => {
    // Fetch data from the API here
    fetch(
      "https://ourntamockpapers.onrender.com/api/math/question/v2/l1/random"
    )
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
        console.log("resdata", resData);
        if (resData) {
          setSelectedOptions(Array(10).fill(null));
          setExplanationsVisible(Array(10).fill(false));
        }
        // Update the state with the fetched data
        // console.log("taking data", resData, data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);

    // const isCorrect =
    //   optionIndex + 1 === data[questionIndex].correctOptionIndex;
    const updatedOptionsUI = [...optionsUI];

    // updatedOptionsUI[questionIndex] = isCorrect ? "correct" : "incorrect";
    updatedOptionsUI[questionIndex] = optionIndex;

    setOptionsUI(updatedOptionsUI);
  };

  const handleSubmit = () => {
    const areAllQuestionsAnswered = selectedOptions.every(
      (option) => option !== null
    );

    if (areAllQuestionsAnswered) {
      const { correct, wrong, unattempted } = calculateAnswers();
      setCorrectAnswers(correct);
      setWrongAnswers(wrong);
      setUnattemptedAnswers(unattempted);
      const score = calculateScore();
      setYourScore(score);
      handleShowSubmissionModal();
    } else {
      handleShowWarningModal();
    }
  };

  const calculateAnswers = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    selectedOptions.forEach((userAnswerIndex, index) => {
      if (userAnswerIndex === null) {
        unattempted++;
      } else if (
        userAnswerIndex ===
        data[index].correctOptionIndex - 1
        // userAnswerIndex === question.correctOptionIndex
      ) {
        correct++;
      } else {
        wrong++;
      }
    });
    return { correct, wrong, unattempted };
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

  const handleShowSubmissionModal = () => {
    calculateScore();
    setShowSubmissionModal(true);
    setTestSubmitted(true);
    setShowWarningModal(false);
    setShowCorrectAnswer(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattemptedAnswers = 0;

    // const score = data.reduce((totalScore, para) => {
    //   para.questions.forEach((question, index) => {
    //     const userAnswerIndex = selectedOptions[index];
    //     if (userAnswerIndex !== null) {
    //       if (userAnswerIndex === question.correctOptionIndex) {
    //         correctAnswers++; // Increase the count for each correct answer
    //       } else {
    //         wrongAnswers++; // Increase the count for each wrong answer
    //       }
    //     } else {
    //       unattemptedAnswers++; // Increase the count for unattempted questions
    //     }
    //     if (
    //       userAnswerIndex !== null &&
    //       userAnswerIndex === question.correctOptionIndex
    //     ) {
    //       totalScore++; // Increase the score for each correct answer
    //     }
    //   });
    //   return totalScore;
    // }, 0);

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

    return score2;
  };

  const toggleExplanationVisibility = (questionIndex) => {
    const updatedExplanationsVisible = [...explanationsVisible];
    updatedExplanationsVisible[questionIndex] =
      !updatedExplanationsVisible[questionIndex];
    setExplanationsVisible(updatedExplanationsVisible);
  };

  // const logSelectedOptions = () => {
  //   const selectedOptionsData = data.map((question, questionIndex) => {
  //     const selectedOptionIndex = selectedOptions[questionIndex];
  //     const selectedOption =
  //       selectedOptionIndex !== null
  //         ? question.options[selectedOptionIndex]
  //         : null;

  //     const isCorrect =
  //       selectedOptionIndex !== null &&
  //       selectedOptionIndex === question.correctOptionIndex - 1;
  //     // correctoption is 4, but actual it should be 3
  //     const correctOption = question.options[question.correctOptionIndex - 1];

  //     return {
  //       questionIndex: questionIndex,
  //       selectedOptionIndex: selectedOptionIndex,
  //       selectedOption: selectedOption,
  //       isCorrect: isCorrect,
  //       correctOption: correctOption,
  //     };
  //   });

  //   console.log("Selected Options:", selectedOptionsData);
  // };

  const handleRetakeTest = () => {
    // Reload the page to retake the test
    window.location.reload();
  };

  return (
    <section className="quiz-section">
      <div className="mcq-section">
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

      {testSubmitted ? (
        <button className="retake-button btn mb-4" onClick={handleRetakeTest}>
          Retake Test
        </button>
      ) : (
        <button className="submit-button btn  mb-4" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {/* 
      <button
        className="log-options-button btn mb-4"
        onClick={logSelectedOptions}
      >
        Log Selected Options
      </button> */}

      <Modal
        show={showWarningModal}
        onHide={handleCloseWarningModal}
        className="modal-warning"
        centered
        dialogClassName="warning-modal-dialog"
      >
        <Modal.Body>
          <p className="bold-text">You have not answered all the questions.</p>
          <p className="bold-text">Do you want to continue?</p>
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
          <img src={gif} alt="Your GIF" className="gif-image" />
          <p className="score">Your Score: {yourScore}</p>
          <p
            className={`correct-answers ${
              correctAnswers > 0 ? "green-text" : ""
            }`}
          >
            Correct Answers: {correctAnswers}
          </p>
          <p className={`wrong-answers ${wrongAnswers > 0 ? "red-text" : ""}`}>
            Wrong Answers: {wrongAnswers}
          </p>
          <p
            className={`unattempted-answers ${
              unattemptedAnswers > 0 ? "orange-text" : ""
            }`}
          >
            Unattempted Answers: {unattemptedAnswers}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSubmissionModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default MCQSection;
