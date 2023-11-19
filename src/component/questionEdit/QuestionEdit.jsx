import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import "./QuestionEdit.css";
import { API } from "../../utils/constants";
import QuestionV2 from "../practicequestions/QuestionV2";

const QuestionEdit = () => {
  const [version, setVersion] = useState("v1");
  const [collection, setCollection] = useState("math");
  const [questionId, setQuestionId] = useState("");
  const [questionData, setQuestionData] = useState(null);
  const [dataArray, setDataArray] = useState([]); 

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setCollection(event.target.value);
  };

  const handleIdChange = (event) => {
    setQuestionId(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${API}/${collection}/question/${version}/getById/${questionId}`
      );
      console.log("fetched Question",response.data)
      setQuestionData(response.data);
      setDataArray(response.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setQuestionData((prevData) => {
      const newData = _.cloneDeep(prevData);
      _.set(newData, field, value);
      return newData;
    });
  };

  const handleUpdateQuestion = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")).token;
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        await axios
          .put(
            `${API}/${collection}/question/${version}/${questionId}`,
            questionData,
            {
              headers: headers,
            }
          )
          .then((response) => {
            console.log("updated Question", response.data);
            alert("Question updated successfully!");
          });
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  const renderInputFields = () => {
    if (!questionData) return null;

    return (
      <div>
        <div>
          <label>{version === "v1" ? "Paragraph" : "Text"}:</label>
          <textarea
            value={
              version === "v1"
                ? questionData.paragraph
                  ? questionData.paragraph.join("\n")
                  : ""
                : questionData.text
                ? questionData.text[0]
                : ""
            }
            onChange={(e) =>
              handleInputChange(
                version === "v1" ? "paragraph" : "text[0]",
                e.target.value.split("\n")
              )
            }
          />
        </div>

        {version === "v2" && (
          <>
            {questionData.explanation.text.map((explanationText, index) => (
              <div key={index}>
                <label>{`Explanation Text ${index + 1}:`}</label>
                <input
                  type="text"
                  value={explanationText}
                  onChange={(e) =>
                    handleInputChange(
                      `explanation.text[${index}]`,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            {questionData.options.map((option, index) => (
              <div key={option._id}>
                <label>{`Option ${index + 1} Text:`}</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleInputChange(`options[${index}].text`, e.target.value)
                  }
                />
              </div>
            ))}
          </>
        )}

        <div>
          <label>Correct Option Index:</label>
          <input
            type="text"
            value={questionData.correctOptionIndex}
            onChange={(e) =>
              handleInputChange("correctOptionIndex", e.target.value)
            }
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <input
            type="text"
            value={questionData.difficulty || ""}
            onChange={(e) => handleInputChange("difficulty", e.target.value)}
          />
        </div>

        <div>
          <label>Topic:</label>
          <input
            type="text"
            value={questionData.topic || ""}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />
        </div>

        <div>
          <label>Subtopic:</label>
          <input
            type="text"
            value={questionData.subTopic || ""}
            onChange={(e) => handleInputChange("subTopic", e.target.value)}
          />
        </div>

        <div>
          <label>Entrance Exams:</label>
          <input
            type="text"
            value={
              questionData.entrance_exams
                ? questionData.entrance_exams.join(", ")
                : ""
            }
            onChange={(e) =>
              handleInputChange("entrance_exams", e.target.value.split(", "))
            }
          />
        </div>

        {questionData.questions &&
          questionData.questions.map((question, index) => (
            <div key={index}>
              <label>{`Question ${index + 1}:`}</label>
              <input
                type="text"
                value={question.text ? question.text.join(", ") : ""}
                onChange={(e) =>
                  handleInputChange(
                    `questions[${index}].text`,
                    e.target.value.split(", ")
                  )
                }
              />

              <div>
                <label>Options:</label>
                {question.options &&
                  question.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label>{`Option ${optIndex + 1}:`}</label>
                      <input
                        type="text"
                        value={option.text || ""}
                        onChange={(e) =>
                          handleInputChange(
                            `questions[${index}].options[${optIndex}].text`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
              <div>
                <label>Correct Option Index:</label>
                <input
                  type="text"
                  value={question.correctOptionIndex}
                  onChange={(e) =>
                    handleInputChange("correctOptionIndex", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Difficulty:</label>
                <input
                  type="text"
                  value={question.difficulty}
                  onChange={(e) =>
                    handleInputChange("correctOptionIndex", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Explanations:</label>
                {question.explanation &&
                  question.explanation.text &&
                  question.explanation.text.map((explanationText, expIndex) => (
                    <div key={expIndex}>
                      <label>{`Explanation Text ${expIndex + 1}:`}</label>
                      <input
                        type="text"
                        value={explanationText}
                        onChange={(e) =>
                          handleInputChange(
                            `questions[${index}].explanation.text[${expIndex}]`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Question Form</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Select Version:
          <select value={version} onChange={handleVersionChange}>
            <option value="v1">Version 1</option>
            <option value="v2">Version 2</option>
          </select>
        </label>
        <br />
        <label>
          Select Collection:
          <select value={collection} onChange={handleCollectionChange}>
            <option value="math">Math</option>
            <option value="varc">
              Verbal Ability and Reading Comprehension
            </option>
            <option value="lr">LR (Logical Reasoning)</option>
          </select>
        </label>
        <br />
        <label>
          Enter Question ID (_id):
          <input type="text" value={questionId} onChange={handleIdChange} />
        </label>
        <br />
        {renderInputFields()}
        <br />
        <button type="submit">Fetch Question Data</button>
        <button type="button" onClick={handleUpdateQuestion}>
          Update Question
        </button>
      </form>
      {/* {Array.isArray(questionData) && questionData.length > 0 && <QuestionV2 data={questionData} />} */}

      {/* {questionData ? <QuestionV2 data={dataArray} /> : ""} */}
    </div>
  );
};

export default QuestionEdit;
