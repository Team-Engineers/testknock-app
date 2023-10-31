import React, { useState } from "react";
import "./QuestionSection.css";
import commentsImage from "./comment.png";

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

  const getAlphabet = (index) => String.fromCharCode(65 + index);

  return (
    <section className="quiz-section">
      <div className="mcq-section">
        {data.map((item, paraIndex) => (
          <div key={paraIndex} className="para-container">
            <div className="para-header">
              <span className="para-number">{`Para ${paraIndex + 1}:`}</span>
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
            <div className="question-section">
              {item.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-container">
                  <div className="question-header">
                    <span className="question-number">{`Q ${
                      questionIndex + 1
                    }:`}</span>
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
                        onClick={() =>
                          handleOptionSelect(questionIndex, optionIndex)
                        }
                      >
                        <div className="option-section">
                          <span className="alphabet">
                            {getAlphabet(optionIndex)}.{" "}
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
                      {question.explanation.text.map(
                        (explanationText, index) => (
                          <p key={index}>{explanationText}</p>
                        )
                      )}
                      {question.explanation.image && (
                        <div className="images-container">
                          {question.explanation.image.map(
                            (image, imageIndex) => (
                              <img
                                key={imageIndex}
                                src={image}
                                alt={`Explanation Img ${imageIndex + 1}`}
                                className="para-images"
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MCQSection;
