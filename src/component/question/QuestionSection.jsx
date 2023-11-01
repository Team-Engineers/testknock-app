import React, { useState, useEffect } from "react";
import "./QuestionSection.css";
// import commentsImage from "./comment.png";
import { Modal, Button } from "react-bootstrap";
import gif from "../../assets/images/gif.gif";


const MCQSection = () => {
  
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [setExplanationVisible] = useState(Array(10).fill(false));

  useEffect(() => {
    // Fetch data from the API here
    fetch("https://ourntamockpapers.onrender.com/api/math/question/v2/l1/random")
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
        if (data) {

          setSelectedOptions(Array(10).fill(null));
          setExplanationVisible(Array(10).fill(false));
        }
        // Update the state with the fetched data
        console.log("taking data",resData, data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, );

  const [optionsUI, setOptionsUI] = useState(Array(10).fill('')); 
  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  
    // Check if the selected option is correct or incorrect and update the UI accordingly
    const isCorrect = optionIndex === data[0].questions[questionIndex].correctOptionIndex;
    const updatedOptionsUI = [...optionsUI];
    updatedOptionsUI[questionIndex] = isCorrect ? 'correct' : 'incorrect';
    setOptionsUI(updatedOptionsUI);
  };
  

  // const handleExplanationToggle = (questionIndex) => {
  //   const updatedExplanationVisible = [...explanationVisible];
  //   updatedExplanationVisible[questionIndex] =
  //     !updatedExplanationVisible[questionIndex];
  //   setExplanationVisible(updatedExplanationVisible);
  // };

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedAnswers, setUnattemptedAnswers] = useState(0);
  const handleSubmit = () => {
    const areAllQuestionsAnswered = selectedOptions.every((option) => option !== null);
  
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
      } else if (userAnswerIndex === data[0].questions[index].correctOptionIndex) {
        correct++;
      } else {
        wrong++;
      }
    });
  
    return { correct, wrong, unattempted };
  };

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

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
    setShowSubmissionModal(true);
  };

  const [yourScore, setYourScore] = useState(null);


  const calculateScore = () => {
    // Fetch user's selected answers and correct answers from your API
    // For demonstration, I'm assuming you have userAnswers and correctAnswers arrays.
  
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattemptedAnswers = 0;
  
    const score = data.reduce((totalScore, para) => {
      para.questions.forEach((question, index) => {
        const userAnswerIndex = selectedOptions[index];
        if (userAnswerIndex !== null) {
          if (userAnswerIndex === question.correctOptionIndex) {
            correctAnswers++; // Increase the count for each correct answer
          } else {
            wrongAnswers++; // Increase the count for each wrong answer
          }
        } else {
          unattemptedAnswers++; // Increase the count for unattempted questions
        }
        if (userAnswerIndex !== null && userAnswerIndex === question.correctOptionIndex) {
          totalScore++; // Increase the score for each correct answer
        }
      });
      return totalScore;
    }, 0);
  
    setCorrectAnswers(correctAnswers); // Set the correct answer count
    setWrongAnswers(wrongAnswers); // Set the wrong answer count
    setUnattemptedAnswers(unattemptedAnswers); // Set the unattempted answer count
  
    return score;
  };
  

  // const areAllQuestionsAnswered = selectedOptions.every((option) => option !== null);

  // const handleSubmit = () => {
  //   if (areAllQuestionsAnswered) {
  //     const score = calculateScore();
  //     console.log("Score calculated:", score); // Debugging statement
  //     setYourScore(score);
  //     console.log("Your score:", yourScore); // Debugging statement
  //     handleShowSubmissionModal(score);
  //   } else {
  //     handleShowWarningModal();
  //   }
  // };
  
  
  

  // const getAlphabet = (index) => String.fromCharCode(65 + index);
  return (
    <section className="quiz-section">
    <div className="mcq-section">
      <div className="question-section">
        {data.map((question, questionIndex) => (
          <div key={questionIndex} className="question-container">
            <div className="question-header">
              <span className="question-number">{`Q ${questionIndex + 1}:`}</span>
              <h2>{question.text[0]}</h2>
            </div>
            <div className="images-container">
              {question.images.map((image, imageIndex) => (
                <img key={imageIndex}
                  src={image}
                  alt={`Img ${imageIndex + 1}`}
                  className="para-images"/>
              ))}
            </div>
         <ul>
  {question.options.map((option, optionIndex) => (
    <li
      key={optionIndex}
      className={`${
        selectedOptions[questionIndex] === optionIndex
          ? optionsUI[questionIndex] === 'correct'
            ? 'correct'
            : 'incorrect'
          : ''
      }`}
      onClick={() => handleOptionSelect(questionIndex, optionIndex)}
    >
                  <div className="option-section">
                    <span className="alphabet">
                      {String.fromCharCode(65 + optionIndex)}.{" "}
                    </span>
                    <div className="option-container">
                      <div className="option-text">{option.text}</div>
                      {option.image && (
                        <img
                          src={option.image}
                          alt={`Img ${optionIndex + 1}`}
                          className="option-image"
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* <button
              className="explanation-button"
              onClick={() => handleExplanationToggle(questionIndex)}
            >
              {explanationVisible[questionIndex]
                ? "Hide Explanation"
                : "Show Explanation"}
              <img
                src={commentsImage}
                alt="Explanation"
                className="explanation-icon"
              />
            </button> */}
          
{/* {explanationVisible[questionIndex] && (
  <div className="explanation-text">
    {question.explanation.text.map((currText, textIndex) => (
    <p>{question.explanation.currText}</p>
    ))}
    {question.explanation.images.map((image, imageIndex) => (
      <img
        key={imageIndex}
        src={image}
        alt={`Explanation Img ${imageIndex + 1}`}
      />
    ))}
  </div>
)} */}
          </div>
        ))}
      </div>
    </div>
       <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
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


<Modal show={showSubmissionModal} onHide={handleCloseSubmissionModal} dialogClassName="scorecard-modal" centered>
  <Modal.Body>
    <img src={gif} alt="Your GIF" className="gif-image" />
    <p className="score">Your Score: {yourScore}</p>
    <p className={`correct-answers ${correctAnswers > 0 ? "green-text" : ""}`}>
      Correct Answers: {correctAnswers}
    </p>
    <p className={`wrong-answers ${wrongAnswers > 0 ? "red-text" : ""}`}>
      Wrong Answers: {wrongAnswers}
    </p>
    <p className={`unattempted-answers ${unattemptedAnswers > 0 ? "orange-text" : ""}`}>
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
