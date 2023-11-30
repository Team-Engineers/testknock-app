import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";
import "./QuestionUpdate.css";
import { API } from "../../utils/constants";
import QuestionPreview from "./QuestionPreview";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const QuestionUpdate = () => {
  const [version, setVersion] = useState("v1");
  const [collection, setCollection] = useState("math");
  const [questionId, setQuestionId] = useState("");
  const [questionData, setQuestionData] = useState(null);

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
      console.log("fetched Question", response.data);
      setQuestionData(response.data);
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

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const handleDeleteImage = (field, imageUrlToDelete) => {
    const storageRef = firebase.storage().refFromURL(imageUrlToDelete);
    let imageData = ""
    if(field.includes('images')){
      imageData = []
    }
    
    storageRef
      .delete()
      .then(() => {
        console.log("Image deleted from storage.");
        setQuestionData((prevData) => {
          const newData = _.cloneDeep(prevData);
          _.set(newData, field, imageData);
          return newData;
        });
      })
      .catch((error) => {
        console.error("Error deleting image from storage:", error);
      });
  };

  const handleImageChange = async (field, event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;
    const folderPath = "questionImages";
    const fileRef = storageRef.child(`${folderPath}/${uniqueFileName}`);
    let downloadURL = "";
    try {
      await fileRef.put(file);

      downloadURL = await fileRef.getDownloadURL();
      setQuestionData((prevData) => {
        const newData = _.cloneDeep(prevData);
        _.set(newData, field, downloadURL);
        return newData;
      });
    } catch (error) {
      alert("Unable to upload the image");
      return;
    }

  };

  const renderInputFields = () => {
    if (!questionData) return null;

    return (
      <div className="admin-questionEdit">
        <div>
          <label>{version === "v1" ? "Paragraph" : "question"}:</label>
          <textarea
            value={
              version === "v1"
                ? questionData.paragraph
                  ? questionData.paragraph.join("\n")
                  : ""
                : questionData.text
                ? questionData.text.join("\n")
                : ""
            }
            onChange={(e) =>
              handleInputChange(
                version === "v1" ? "paragraph" : "text",
                e.target.value.split("\n")
              )
            }
          />
        </div>

        {version === "v1" ? (
          <>
            <label>Paragraph Images:</label>
            <div>
              <input
                type="file"
                onChange={(event) => handleImageChange(`images[0]`, event)}
              />
              <div
                className="btn btn-danger"
                onClick={() =>
                  handleDeleteImage(`images`, questionData.images[0])
                }
              >
                Delete
              </div>
            </div>
            {/* {questionData.images.map((image, index) => (
              <div key={index} className="my-3">
                <img
                  src={image || ""}
                  alt={`paragraph-img-${index + 1}`}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <input
                  type="file"
                  onChange={(event) =>
                    handleImageChange(`images[${index}]`, event)
                  }
                />
              </div>
            ))} */}
          </>
        ) : null}

        {version === "v2" && (
          <>
            <label>Explanation Text</label>
            <textarea
              value={
                questionData.explanation.text
                  ? questionData.explanation.text.join("\n")
                  : ""
              }
              onChange={(e) =>
                handleInputChange(
                  `explanation.text`,
                  e.target.value.split("\n")
                )
              }
            />

            {questionData.explanation.images.map((explanationImage, index) => (
              <div key={index}>
                <label>{`Explanation Image ${index + 1}:`}</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(`explanation.images[${index}]`, e)
                  }
                />
                <div
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteImage(
                      `explanation.images[${index}]`,
                      questionData.explanation.images[0]
                    )
                  }
                >
                  Delete
                </div>
              </div>
            ))}

            {questionData.explanation.images.map((explanationImage, index) => (
              <div key={index}>
                <label>{`Explanation Image ${index + 1}:`}</label>
                <input
                  type="file"
                  // value={explanationImage || ""}
                  onChange={(e) =>
                    handleImageChange(
                      `explanation.images[${index}]`,
                      e
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
                <label>{`Option ${index + 1} Image:`}</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(`options[${index}].image`, e)
                  }
                />

                <div
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteImage(
                      `options[${index}].image`,
                      questionData.options[index].image
                    )
                  }
                >
                  Delete
                </div>
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

        <div className="mb-2">
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
              <label className="fs-4 text-danger">{`Question ${
                index + 1
              }:`}</label>
              <textarea
                value={question.text ? question.text.join("\n") : ""}
                onChange={(e) =>
                  handleInputChange(
                    `questions[${index}].text`,
                    e.target.value.split("\n")
                  )
                }
              />
              {/* handling with single image only */}
              <div>
                <label>{`Question Image ${index + 1}:`}</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(`questions[${index}].images[0]`, e)
                  }
                />
                <div
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteImage(
                      `questions[${index}].images`,
                      questionData.questions[index].images[0]
                    )
                  }
                >
                  Delete
                </div>
              </div>

              {/* {question.images.map((questionImage, imageIndex) => (
                <div key={index}>
                  <label>{`Question Image ${index + 1}:`}</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleImageChange(
                        `questions[${index}].images[${imageIndex}]`,
                        e
                      )
                    }
                  />
                </div>
              ))} */}

              {question.images.map((questionImage, imageIndex) => (
                <div key={index}>
                  <label>{`Question Image ${index + 1}:`}</label>
                  <input
                    type="file"
                    // value={questionImage || ""}
                    onChange={(e) =>
                      handleImageChange(
                        `questions[${index}].images[${imageIndex}]`,
                        e
                      )
                    }
                  />
                </div>
              ))}

              <div>
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
                      <label>{`Image ${optIndex + 1}:`}</label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageChange(
                            `questions[${index}].options[${optIndex}].image`,
                            e
                          )
                        }
                      />

                      <div
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteImage(
                            `questions[${index}].options[${optIndex}].image`,
                            questionData.questions[index].options[optIndex]
                              .image
                          )
                        }
                      >
                        Delete
                      </div>

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

                {question.explanation && question.explanation.text && (
                  <textarea
                    value={
                      question.explanation.text
                        ? question.explanation.text.join("\n")
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        `questions[${index}].explanation.text`,
                        e.target.value.split("\n")
                      )
                    }
                  />
                )}
              </div>

              <div>
                {/* currently dealing with only single images */}
                <label>Explanations Images:</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(
                      `questions[${index}].explanation.images[0]`,
                      e
                    )
                  }
                />
                <div
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteImage(
                      `questions[${index}].explanation.images`,
                      questionData.questions[index].explanation.images[0]
                    )
                  }
                >
                  Delete
                </div>

                {/* {question.explanation &&
                  question.explanation.images &&
                  question.explanation.images.map(
                    (explanationImage, expIndex) => (
                      <div key={expIndex}>
                        <label>{`Explanation Image ${expIndex + 1}:`}</label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(
                              `questions[${index}].explanation.image[${expIndex}]`,
                              e
                            )
                          }
                        />
                      </div>
                    )
                  )} */}
              </div>

              <div>
                <label>Explanations Images:</label>
                {question.explanation &&
                  question.explanation.images &&
                  question.explanation.images.map(
                    (explanationImage, expIndex) => (
                      <div key={expIndex}>
                        <label>{`Explanation Image ${expIndex + 1}:`}</label>
                        <input
                          type="file"
                          // value={explanationImage || ""}
                          onChange={(e) =>
                            handleImageChange(
                              `questions[${index}].explanation.image[${expIndex}]`,
                              e
                            )
                          }
                        />
                      </div>
                    )
                  )}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="admin-questionEdit">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Question Update Form</h1>
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
                  <option value="di">Data Interpretation (DI)</option>
                </select>
              </label>
              <br />
              <label>
                Enter Question ID (_id):
                <input
                  type="text"
                  value={questionId}
                  onChange={handleIdChange}
                />
              </label>
              <br />
              {renderInputFields()}
              <br />
              <button className="btn btn-primary me-3" type="submit ">
                Fetch Question Data
              </button>
              <button
                className="btn btn-success"
                type="button "
                onClick={handleUpdateQuestion}
              >
                Update Question
              </button>
            </form>
          </div>
          <div className="col-md-6">
            {questionData ? <QuestionPreview data={questionData} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionUpdate;
