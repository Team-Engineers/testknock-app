import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/subtopic-logo.png";
const TopicCard = styled.li`
  height: 3rem;
  background-color: white;
  // border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed;
  text-align: center;
  background:  ${(props) => (props.isCurrentTopic ? "blueviolet" : "inherit")} ;
  color:  ${(props) => (props.isCurrentTopic ? "white" : "inherit")};
  &:hover {
    background: blueviolet;
    color: white;
  }
  &:hover a {
    color: white;
  }
  img {
    height: 20px;
    width: 20px;
  }
`;

const Wrapper = styled.ul`
  width: fit-content;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const MarginTop = styled.div`
  margin-top: 7rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box1 = styled.div`
  width: 3rem;
`;
const Box2 = styled.h6`
  width: 12rem;
  margin-bottom: 0px;
  text-transform: uppercase;
  font-weight: ${(props) => (props.isCurrentTopic ? "bolder" : "normal")};


`;

const RecommendedSubTopics = () => {
  const subtopicsData = {
    "QUANTITATIVE APTITUDE": [
      "NUMBER SYSTEM",
      "AVERAGE",
      "PERCENTAGE",
      "PROFIT AND LOSS",
      "S.I AND C.I",
      "PARTNERSHIP",
      "RATIO & PROPORTION",
      "TIME AND WORK",
      "TIME, SPEED AND DISTANCE",
      "PROBABILITY",
      "PERMUTATION AND COMBINATION",
    ],
    "LOGICAL REASONING": [
      "CODING AND DECODING",
      "FAMILY TREE / BLOOD RELATIONS",
      "DIRECTIONS",
      "NUMBER/ALPHABET SERIES",
      "PUZZLES",
      "CRITICAL REASONING",
      "SITUTATION TEST",
      "MISCELLANEOUS",
      "ARRANGEMENTS",
    ],
    "VERBAL ABILITY AND READING COMPREHENSION": [
      "Sentence correction",
      "Reading comprehension",
      "Critical reasoning",
      "Sentence completion",
      " Syllogisms(verbal reasoning)",
      "Vocabulary ",
      "Analogy ",
    ],
    "DATA INTERPRETATION": [
      "Bar chart",
      "Pie chart ",
      "Table chart",
      "Line chart",
    ],
  };

  const { topic, subTopic } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <MarginTop>
            <Wrapper>
              <h4>List of Subtopics</h4>
              {subtopicsData[topic].map((currentTopic, subIndex) => (
                <Link to={`/${topic}/${currentTopic}`} key={subIndex}>
                  <TopicCard isCurrentTopic={subTopic === currentTopic}>
                    <Box>
                      <Box1>
                        <img src={logo} className="img-fluid" alt="Logo" />
                      </Box1>
                      <Box2
                        isCurrentTopic={currentTopic === subTopic}
                      >
                        {currentTopic}
                      </Box2>
                    </Box>
                  </TopicCard>
                </Link>
              ))}
            </Wrapper>
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSubTopics;