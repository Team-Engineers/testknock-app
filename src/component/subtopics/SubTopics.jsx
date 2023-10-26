import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopicCard = styled.li`
  height: 4rem;
  padding: 1rem;
  margin: 1rem;
  background-color: white;
  width: 15rem;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed;
  text-align: center;

  &:hover {
    background: blueviolet;
    color: white;
  }
  &:hover a {
    color: white;
  }
`;

const MarginTop = styled.div`
  margin-top: 7rem;
`;

const SubTopics = (props) => {
  // Define an object that maps topics to their respective subtopics
  const subtopicsData = {
    QUANT: [
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
    LR: ["PARTNERSHIP"],
    VARC: ["NUMBER SYSTEM "],
    DI: ["AVERAGE"],
  };

  // Get the subtopics based on the selected topic
  const selectedSubTopics = subtopicsData[props.topic] || [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <MarginTop>
            <h2 className="fs-5 fw-bolder mb-5">Subtopics</h2>
            <ul>
              {selectedSubTopics.map((subtopic, index) => (
                <TopicCard key={index}>
                  <Link to={`/${props.topic}/${subtopic}`}>{subtopic}</Link>
                </TopicCard>
              ))}
            </ul>
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default SubTopics;
