import React, { useState } from "react";
import "./QuestionSection.css";
import commentsImage from "./comment.png";
import { Modal, Button } from "react-bootstrap";
import gif from "../../assets/images/gif.gif";


const MCQSection = () => {
  const data = [
    {
      paragraph: "This is LR question 2 of lr2?",
      images: [
        "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
        "https://wallpapercave.com/wp/wp2599602.jpg",
        "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
      ],
      questions: [
        {
          text: "Question 1 text",
          image: [
            "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            "https://wallpapercave.com/wp/wp2599602.jpg",
            "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
          ],
          options: [
            {
              text: "Option 1 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 2 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 3 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 4 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
          ],
          correctOptionIndex: 2,
          explanation: {
            text: ["Explanation for Question 1"],
            image: [
              "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
              "https://wallpapercave.com/wp/wp2599602.jpg",
              "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
            ],
          },
          difficulty: "Easy",
        },
        {
          text: "Question 2 text",
          image: [
            "https://www.bing.com/ck/a?!&&p=bf9b89d4b0a7911eb315bd00b09a37519JmltdHM9MTY5ODQ5NzQ0MCZpZ3VpZD0zMGFmZjZlZC1kZmNlLTYxMDUtM2EyNC1lNTY2ZGUzYzYwZjkmaW5zaWQ9NTg0MA&ptn=3&hsh=3&fclid=30aff6ed-dfce-6105-3a24-e566de3c60f9&u=a1L2ltYWdlcy9zZWFyY2g_cT1iYAWNrZ3JvdW5kIGltYWdlJkZPUk09SVFGUkJBJmlkPTUzRjFCRTBBRDMyQjZGNURFNkExOUM3OTJGNkEwN0VDQTlENTkyNjc&ntb=1",
          ],
          options: [
            {
              text: "Option 1 for Question 2",
            },
            {
              text: "Option 2 for Question 2",
            },
          ],
          correctOptionIndex: 2,
          explanation: {
            text: ["Explanation for Question 2"],
            image: [
              "https://th.bing.com/th/id/OIP.YU4M4yKdQqheqMuHfB9QCgHaLH?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
            ],
          },
          difficulty: "Medium",
        },
      ],
      difficulty: "Hard",
      topic: "LR",
      subTopic: "varc1",
      entrance_exams: ["Exam 1", "Exam 2"],
    },
    {
      paragraph: "This is LR question 2 of lr2?",
      images: [
        "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
        "https://wallpapercave.com/wp/wp2599602.jpg",
        "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
      ],
      questions: [
        {
          text: "Question 1 text",
          image: [
            "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            "https://wallpapercave.com/wp/wp2599602.jpg",
            "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
          ],
          options: [
            {
              text: "Option 1 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 2 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 3 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
            {
              text: "Option 4 for Question 1",
              image:
                "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
            },
          ],
          correctOptionIndex: 2,
          explanation: {
            text: ["Explanation for Question 1"],
            image: [
              "https://live.staticflickr.com/5571/15071766716_71b3d61b73_b.jpg",
              "https://wallpapercave.com/wp/wp2599602.jpg",
              "https://th.bing.com/th/id/OIP.QPnwx97kDinkxMgFkW1YVAHaLZ?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
            ],
          },
          difficulty: "Easy",
        },
        {
          text: "Question 2 text",
          image: [
            "https://www.bing.com/ck/a?!&&p=bf9b89d4b0a7911eb315bd00b09a37519JmltdHM9MTY5ODQ5NzQ0MCZpZ3VpZD0zMGFmZjZlZC1kZmNlLTYxMDUtM2EyNC1lNTY2ZGUzYzYwZjkmaW5zaWQ9NTg0MA&ptn=3&hsh=3&fclid=30aff6ed-dfce-6105-3a24-e566de3c60f9&u=a1L2ltYWdlcy9zZWFyY2g_cT1iYAWNrZ3JvdW5kIGltYWdlJkZPUk09SVFGUkJBJmlkPTUzRjFCRTBBRDMyQjZGNURFNkExOUM3OTJGNkEwN0VDQTlENTkyNjc&ntb=1",
          ],
          options: [
            {
              text: "Option 1 for Question 2",
            },
            {
              text: "Option 2 for Question 2",
            },
          ],
          correctOptionIndex: 2,
          explanation: {
            text: ["Explanation for Question 2"],
            image: [
              "https://th.bing.com/th/id/OIP.YU4M4yKdQqheqMuHfB9QCgHaLH?pid=ImgDet&w=186&h=285&c=7&dpr=1.6",
            ],
          },
          difficulty: "Medium",
        },
      ],
      difficulty: "Hard",
      topic: "LR",
      subTopic: "varc1",
      entrance_exams: ["Exam 1", "Exam 2"],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(data[0].questions.length).fill(null)
  );
  const [explanationVisible, setExplanationVisible] = useState(
    Array(data[0].questions.length).fill(false)
  );

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleExplanationToggle = (questionIndex) => {
    const updatedExplanationVisible = [...explanationVisible];
    updatedExplanationVisible[questionIndex] =
      !updatedExplanationVisible[questionIndex];
    setExplanationVisible(updatedExplanationVisible);
  };

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedAnswers, setUnattemptedAnswers] = useState(0);

  const handleSubmit = () => {
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

    setCorrectAnswers(correct);
    setWrongAnswers(wrong);
    setUnattemptedAnswers(unattempted);

    handleShowSubmissionModal();
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
  

  const areAllQuestionsAnswered = selectedOptions.every((option) => option !== null);

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
  
  
  

  const getAlphabet = (index) => String.fromCharCode(65 + index);
  return (
    <section className="quiz-section">
      {data.map((item, index) => (
        <div key={index} className="mcq-container">
          <div className="para-header">
            <span className="para-number">{`Para ${index + 1}:`}</span>
            <h2>{item.paragraph}</h2>
          </div>
          <div className="images-container">
            {item.images.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image}
                alt={`Img ${imageIndex + 1}`}
                className="para-images"
              />
            ))}
          </div>
          <div className="question-container">
            {item.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-section">
                <div className="question-header">
                  <span className="question-number">{`Q ${questionIndex + 1}:`}</span>
                  <h2>{question.text}</h2>
                </div>
                <div className="images-container">
                  {question.image.map((image, imageIndex) => (
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
                      className={
                        selectedOptions[questionIndex] === optionIndex
                          ? optionIndex === question.correctOptionIndex
                            ? "correct"
                            : "incorrect"
                          : ""
                      }
                      onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                    >
                      <div className="option-section">
                        <span className="alphabet">
                          {getAlphabet(optionIndex)}.{" "}
                        </span>
                        <div className="option-container">
                          <div className="option-text">{option.text}</div>
                          <img
                            src={option.image}
                            alt={`Img ${optionIndex + 1}`}
                            className="option-image"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
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
                </button>
                {explanationVisible[questionIndex] && (
                  <div className="explanation">
                    {question.explanation.text.map((explanationText, index) => (
                      <p key={index}>{explanationText}</p>
                    ))}
                    <div className="images-container">
                      {question.explanation.image.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={image}
                          alt={`Explanation Img ${imageIndex + 1}`}
                          className="para-images"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
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
      <Button variant="primary" onClick={() => handleShowSubmissionModal(calculateScore())}>
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
