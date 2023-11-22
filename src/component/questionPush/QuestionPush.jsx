import React from "react";
import "./QuestionPush.css";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { API } from "../../utils/constants";
const QuestionPush = () => {
  const [questionCount, setQuestionCount] = useState(1);
  const [optionCounts, setOptionCounts] = useState([5]);
  const [selectedVersion, setSelectedVersion] = useState("v2");
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [paragraph, setParagraph] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("L1");
  const [mathTopic, setMathTopic] = useState("number_system");
  const [lrTopic, setLrTopic] = useState("coding_and_decoding");
  const [varcTopic, setVarcTopic] = useState("sentence_correction");
  const [varcSubTopic, setVarcSubTopic] = useState("subject_verb_agreement");
  const [diTopic, setDiTopic] = useState("pie_chart");
  // const [file, setFile] = useState("");
  const [entranceExams, setEntranceExams] = useState("Gate");

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

  const resetForm = () => {
    window.location.reload();
  };

  const handleFileChange = async (event) => {
    // const file = event.target.files;
    // setFile(file);
  };

  const uploadImage = async (imageFile) => {
    if (!imageFile) return "";

    try {
      const ref = firebase.storage().ref();
      const name = +new Date() + "-" + imageFile.name;
      const metadata = { contentType: imageFile.type };

      const snapshot = await ref
        .child(`questionImages/${name}`)
        .put(imageFile, metadata);
      const url = await snapshot.ref.getDownloadURL();

      console.log("Uploaded image URL:", url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const uploadImages = async (imageFiles) => {
    const uploadedImageUrls = [];

    for (const imageFile of imageFiles) {
      const imageUrl = await uploadImage(imageFile);
      uploadedImageUrls.push(imageUrl);
    }

    return uploadedImageUrls;
  };

  const addQuestion = () => {
    setQuestionCount((prevCount) => prevCount + 1);
    setOptionCounts((prevCounts) => [...prevCounts, 5]);
  };

  const addOption = (questionIndex) => {
    setOptionCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[questionIndex - 1]++;
      return newCounts;
    });
  };

  const generateOptions = (questionIndex, optionCount) => {
    const options = [];

    for (let i = 1; i <= optionCount; i++) {
      options.push(
        <div key={i} className="option-container">
          <label
            htmlFor={`optionText${questionIndex}_${i}`}
          >{`Option ${i} Text:`}</label>
          <input
            type="text"
            id={`optionText${questionIndex}_${i}`}
            name={`questions[${questionIndex}].options[${i}].text`}
            required
          />
          <label
            htmlFor={`optionImage${questionIndex}_${i}`}
          >{`Option ${i} Image:`}</label>
          <input
            type="file"
            id={`optionImage${questionIndex}_${i}`}
            name={`questions[${questionIndex}].options[${i}].image`}
            accept="image/*"
          />
        </div>
      );
    }

    return options;
  };

  const generateQuestionSection = (questionNumber) => {
    const optionCount = optionCounts[questionNumber - 1];
    return (
      <div
        id={`question-${questionNumber}`}
        className="form-section"
        key={questionNumber}
      >
        <h2 className="hidden-for-v1">{`Question ${questionNumber}`}</h2>
        <div className="question-container">
          <label for={`questionText${questionNumber}`}>
            {`Question ${questionNumber} Text`}:
          </label>
          <textarea
            id={`questionText${questionNumber}`}
            name={`questions[${questionNumber}].text`}
            rows="5"
            cols="80"
            required
          ></textarea>

          <label for={`questionImages${questionNumber}`}>
            {" "}
            {`Upload Question ${questionNumber} Images:`}
          </label>
          <input
            type="file"
            id={`questionImages${questionNumber}`}
            name={`questions[${questionNumber}].images`}
            accept="image/*"
            multiple
          />

          <label for={`questionDifficulty${questionNumber}`}>
            Question Difficulty:
          </label>
          <select
            id={`questionDifficulty${questionNumber}`}
            name={`questions${questionNumber}.difficulty`}
          >
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
          </select>

          <h3>Options</h3>
          <div className="question-options">
            {generateOptions(questionNumber, optionCount)}
          </div>

          <label for={`correctOptionIndex${questionNumber}`}>
            Correct Option Index:
          </label>
          <input
            type="number"
            id={`correctOptionIndex${questionNumber}`}
            name={`questions[${questionNumber}].correctOptionIndex`}
            min="1"
            required
          />

          <label for={`explanation${questionNumber}`}>Explanation : </label>
          <textarea
            id={`explanation${questionNumber}`}
            name={`explanation${questionNumber}`}
            required
            rows="5"
            cols="80"
          ></textarea>

          <label for="explanation1images">Upload Paragraph Images:</label>
          <input
            type="file"
            id={`explanation${questionNumber}images`}
            name={`explanation${questionNumber}images`}
            accept="image/*"
            multiple
          />

          <button type="button" onClick={() => addOption(`${questionNumber}`)}>
            Add Option
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    console.log("submit is clicked. Don't do anything, wait for the upload");
    event.preventDefault();

    const subject = document.getElementById("subject").value;
    let version = document.getElementById("formChoice").value;

    if (version === "v1") {
      version = "v2";
    } else {
      version = "v1";
    }

    let questions = [];

    const totalQuestions = document.querySelectorAll(
      ".question-container"
    ).length;

    for (
      let questionIndex = 1;
      questionIndex <= totalQuestions;
      questionIndex++
    ) {
      const questionData = {
        text: document
          .getElementById(`questionText${questionIndex}`)
          .value.split("\n"),
        images: await uploadImages(
          document.getElementById(`questionImages${questionIndex}`).files
        ),
        difficulty: document.getElementById(
          `questionDifficulty${questionIndex}`
        ).value,
        explanation: {
          text: document
            .getElementById(`explanation${questionIndex}`)
            .value.split("\n"),
          images: await uploadImages(
            document.getElementById(`explanation${questionIndex}images`).files
          ),
        },
        correctOptionIndex: document.getElementById(
          `correctOptionIndex${questionIndex}`
        ).value,
        options: [],
      };

      for (
        let optionIndex = 1;
        optionIndex <= optionCounts[questionIndex - 1];
        optionIndex++
      ) {
        const optionData = {
          text: document.getElementById(
            `optionText${questionIndex}_${optionIndex}`
          ).value,
          image: await uploadImage(
            document.getElementById(
              `optionImage${questionIndex}_${optionIndex}`
            ).files[0]
          ),
        };
        questionData.options.push(optionData);
      }

      questions.push(questionData);
    }

    let formData;
    const selectElement = document.getElementById("entranceExams");
    const entranceExams = Array.from(selectElement.selectedOptions).map(
      (option) => option.value
    );

    if (selectedVersion === "v2") {
      formData = {
        paragraph: document.getElementById("paragraph").value.split("\n"),
        images: await uploadImages(
          document.getElementById("paragraphImages").files
        ),
        questions: questions,
        difficulty: document.getElementById("difficulty").value,
        topic: document.getElementById(`${subject}`).value,
        subTopic: document.getElementById("subTopic").value,
        entrance_exams: entranceExams,
      };
    } else {
      formData = {
        ...questions[0],
        topic: document.getElementById(`${subject}`).value,
        subTopic: document.getElementById("subTopic").value,
        entrance_exams: entranceExams,
      };
    }

    const apiEndpoint = `${API}/${subject}/question/${version}`;
    console.log("checking final data", formData, apiEndpoint);

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  return (
    <section className="question-push">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2> Subject </h2>
            <div className="form-section">
              <label htmlFor="subject">Select Subject:</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="math">Quant</option>
                <option value="di">Data Interpretation</option>
                <option value="lr">Logical Reasoning</option>
                <option value="varc">
                  Verbal Ability and Reading Comprehension
                </option>
              </select>
            </div>
            <h2>Version</h2>
            <div className="form-section">
              <label htmlFor="formChoice">Choose Version of Question:</label>
              <select
                id="formChoice"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                <option value="v1">v2</option>
                <option value="v2">v1</option>
              </select>
            </div>

            <h1>Create a New Question</h1>
            <form
              id="question-form"
               onSubmit={handleSubmit}
            >
              <div className="form-section hidden-for-v1">
                <label for="paragraph">Paragraph Text:</label>
                <textarea
                  id="paragraph"
                  name="paragraph"
                  rows="5"
                  cols="80"
                  onChange={(e) => setParagraph(e.target.value)}
                  value={paragraph}
                ></textarea>

                <label for="paragraphImages">Upload Paragraph Images:</label>
                <input
                  type="file"
                  id="paragraphImages"
                  name="paragraphImages"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </div>

              <div className="form-section hidden-for-v1">
                <label for="difficulty">Difficulty:</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                </select>
              </div>

              <div
                className={`form-section math ${
                  selectedSubject === "math" ? "visible" : "hidden"
                }`}
              >
                <label for="topic">Topic:</label>
                <select
                  id="math"
                  name="topic"
                  value={mathTopic}
                  onChange={(e) => setMathTopic(e.target.value)}
                >
                  <option value="number_system">Number System</option>
                  <option value="profit_and_loss">Profit and Losss</option>
                  <option value="percentage">Percentage</option>
                  <option value="average">Average</option>
                  <option value="simple_interest_and_compound_interest">
                    {" "}
                    Simple Interest and Compound Interest
                  </option>
                  <option value="partnership">Partnership </option>
                  <option value="ratio_and_proportion">
                    Ratio and Proportion{" "}
                  </option>
                  <option value="time_and_work">Time and work </option>
                  <option value="time_speed_and_distance">
                    Time Speed and Distance{" "}
                  </option>
                  <option value="probability"> Probability</option>
                  <option value="permutation_and_combination">
                    {" "}
                    Permutation and Combination
                  </option>
                </select>
              </div>
              <div
                className={`form-section di ${
                  selectedSubject === "di" ? "visible" : "hidden"
                }`}
              >
                <label for="topic">Topic:</label>
                <select
                  name="topic"
                  id="di"
                  value={diTopic}
                  onChange={(e) => setDiTopic(e.target.value)}
                >
                  <option value="pie_chart">Pie Chart</option>
                  <option value="bar_chart">Bar Chart</option>
                  <option value="line_chart">Line Chart</option>
                  <option value="table_chart">Table Chart </option>
                </select>
              </div>
              <div
                className={`form-section lr ${
                  selectedSubject === "lr" ? "visible" : "hidden"
                }`}
              >
                <label for="topic">Topic:</label>
                <select
                  name="topic"
                  id="lr"
                  value={lrTopic}
                  onChange={(e) => setLrTopic(e.target.value)}
                >
                  <option value="coding_and_decoding">
                    Coding and Decoding
                  </option>
                  <option value="family_tree_and_blood_relations">
                    Family Tree and Blood relations
                  </option>
                  <option value="directions">Directions</option>
                  <option value="number_alphabet_series">
                    Number/Alphabet series
                  </option>
                  <option value="puzzles">Puzzles</option>
                  <option value="critical_reasoning">
                    Critical Reasoning{" "}
                  </option>
                  <option value="situation_test">Situation Test </option>
                  <option value="arrangements">Arrangements </option>
                  <option value="miscellaneous">Miscellaneous </option>
                </select>
              </div>
              <div
                className={`form-section varc ${
                  selectedSubject === "varc" ? "visible" : "hidden"
                }`}
              >
                <label for="topic">Topic:</label>
                <select
                  name="topic"
                  id="varc"
                  value={varcTopic}
                  onChange={(e) => setVarcTopic(e.target.value)}
                >
                  <option value="sentence_correction">
                    Sentence Correction{" "}
                  </option>
                  <option value="reading_comprehension">
                    Read Comprehension
                  </option>
                  <option value="critical_reasoning">Critical Reasoning</option>
                  <option value="sentence_completion">
                    Sentence Completion{" "}
                  </option>
                  <option value="syllogisms">Syllogisms</option>
                  <option value="vocabulary">Vocabulary </option>
                  <option value="analogy">Analogy </option>
                </select>
              </div>

              <div className="form-section">
                <label for="subTopic" className="form-label">
                  SubTopic:
                </label>
                <select
                  className="form-select"
                  id="subTopic"
                  name="subTopic"
                  value={varcSubTopic}
                  onChange={(e) => setVarcSubTopic(e.target.value)}
                >
                  <option value="subtopic1">Subtopic 1</option>
                  <option value="subject_verb_agreement">
                    Subject Verb Agreement
                  </option>
                  <option value="modifiers">Modifiers</option>
                  <option value="parallel_construction">
                    Parallel Construction
                  </option>
                  <option value="synonyms">Synonyms</option>
                  <option value="antonyms">antonyms</option>
                  <option value="one_word_substitution">
                    One word Substitution
                  </option>
                  <option value="idioms_and_phrases">Idioms and Phrases</option>
                </select>
              </div>

              <div className="form-section">
                <label for="entranceExams">Entrance Exams:</label>
                <select
                  id="entranceExams"
                  name="entrance_exams"
                  value={entranceExams}
                  onChange={(e) => setEntranceExams(e.target.value)}
                  multiple
                >
                  <option value="Gate">Gate</option>
                  <option value="JEE">JEE</option>
                  <option value="MCAT">MCAT</option>
                  <option value="Gre">Gre</option>
                  <option value="CAT">CAT</option>
                  <option value="Gmat">Gmat</option>
                  <option value="CUET">CUET</option>
                  <option value="SAT">SAT</option>
                  <option value="IPMAT,">IPMAT</option>
                  <option value="SLAT">SLAT</option>
                  <option value="NMAT">NMAT</option>
                  <option value="NPMAT">NPMAT</option>
                  <option value="NIMS">NIMS</option>
                </select>
              </div>

              <h2>Questions</h2>
              {[...Array(questionCount)].map((item, index) =>
                generateQuestionSection(index + 1)
              )}

              <div className="form-section">
                <button type="submit">Submit</button>
                <button
                  className="hidden-for-v1"
                  type="button"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
                <button type="button" onClick={()=>resetForm()}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionPush;
