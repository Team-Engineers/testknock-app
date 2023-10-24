import React from "react";
import styled from "styled-components";

const TopicCard = styled.li`
  height: 8rem;
  padding: 1rem;
  margin: 1rem;
  background-color: white;
  box-shadow: 1px 1px 2px 1px #8d8d8d;
  width: 15rem;
  border-radius: 20px;
  display : flex;
  justify-content : center;
  align-items: center;

  &:hover {
    background: blueviolet;
    color: white;
  }
`;

const MarginTop = styled.div`
  margin-top : 7rem;
`

const SubTopics = (props) => {
  // Define an object that maps topics to their respective subtopics
  const subtopicsData = {
    QUANT: [
      "Number System",
      "AVERAGE",
      "PERCENTAGE",
      "PROFIT AND LOSS",
      "S.I AND C.I",
      "PARTNERSHIP",
    ],
    LR: ["PARTNERSHIP"],
    VARC: ["Number System"],
    DI: ["AVERAGE"],
  };

  // Get the subtopics based on the selected topic
  const selectedSubTopics = subtopicsData[props.topic] || [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <MarginTop>
            <h2>{props.topic} Subtopics:</h2>
            <ul>
              {selectedSubTopics.map((topic, index) => (
                <TopicCard key={index}>{topic}</TopicCard>
              ))}
            </ul>
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default SubTopics;
