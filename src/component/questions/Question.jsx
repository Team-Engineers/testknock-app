import React, { useState } from "react";
import "./question.css";

const Question = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState(null); // Initialize selectedOption to null
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

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {data.map((item, index) => (
            <div key={index} className="question-container">
              <div className="question-box">
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <span className="question-number">{`P${index + 1} `}</span>
                  <span className="question-text">{item.paragraph}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  {item.images && item.images.map((image, imageIndex) => (
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
                      <div className="d-flex justify-content-start align-items-center gap-3">
                        <span className="question-number">{`${
                          questionIndex + 1
                        } `}</span>
                        <span className="question-text">{question.text}</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-3">
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
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`option-box ${
                          selectedOption !== null &&
                          selectedOption === optionIndex
                            ? question.correctOptionIndex === optionIndex
                              ? "correct"
                              : "incorrect"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(optionIndex)}
                      >
                        <span className="option-alphabet">
                          {alphabets[optionIndex]}
                        </span>
                        <div className="d-flex justify-content-start gpa-3 w-100 align-items-start flex-column">
                          {option.text}
                          {question.correctOptionIndex === optionIndex &&
                            selectedOption === optionIndex && (
                              <span className="correct-answer">
                                <i className="fa-solid fa-check"></i>
                              </span>
                            )}
                          {selectedOption !== null &&
                            selectedOption === optionIndex &&
                            question.correctOptionIndex !== optionIndex && (
                              <span className="incorrect-answer">
                                <i className="fa-solid fa-xmark"></i>
                              </span>
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
                  </div>
                ))}
              </div>
              <div class="accordion" id={`accordionExample-${index}`}>
                <div class="accordion-item">
                  <h2 class="accordion-header" id={`heading${index}`}>
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                    >
                      Explain It
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    class="accordion-collapse collapse"
                    //   aria-labelledby={`heading${index}`}
                    data-bs-parent={`#accordionExample-${index}`}
                  >
                    <div class="accordion-body">
                      <strong>
                        This is the explanation for this question.
                      </strong>
                      {item.questions[index].explanation.text.map(
                        (explanationText, explanationIndex) => (
                          <p key={explanationIndex}>{explanationText}</p>
                        )
                      )}
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        {item.questions[index].explanation.image &&
                          item.questions[index].explanation.image.map(
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
