import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/subtopic-logo.png";
const TopicCard = styled.li`
  height: fit-content;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ;
  text-align: center;
  background: ${(props) => (props.isCurrentTopic ? "blueviolet" : "inherit")};
  color: ${(props) => (props.isCurrentTopic ? "white" : "inherit")};
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
  align-items: center;
  justify-content : center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0px;
`;

const MarginTop = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  algin-items: center;
  flex-direction: column;
  top : 0;
  position: sticky;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box1 = styled.div`
  min-width: 2rem;
`;
const Box2 = styled.h6`
  width : 10rem;
  padding : 10px 5px;
  margin-bottom: 0px;
  text-transform: uppercase;
  font-weight: ${(props) => (props.isCurrentTopic ? "bolder" : "normal")};
  overflow-wrap: break-word;
`;

const RecommendedSubTopics = () => {
  const subtopicsData = {
    QUANTITATIVE_APTITUDE: [
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
    LOGICAL_REASONING: [
      "CODING AND DECODING",
      "FAMILY TREE || BLOOD RELATIONS",
      "DIRECTIONS",
      "NUMBER || ALPHABET SERIES",
      "PUZZLES",
      "CRITICAL REASONING",
      "SITUTATION TEST",
      "MISCELLANEOUS",
      "ARRANGEMENTS",
    ],
    VERBAL_ABILITY_AND_READING_COMPREHENSION: [
      "SENTENCE CORRECTION",
      "READING COMPREHENSION",
      "CRITICAL REASONING",
      "SENTENCE COMPLETION",
      " SYLLOGISMS(VERBAL REASONING)",
      "VOCABULARY ",
      "ANALOGY ",
    ],
    DATA_INTERPRETATION: [
      "BAR CHART",
      "PIE CHART ",
      "TABLE CHART",
      "LINE CHART",
    ],
  };
  const { topic, subTopic } = useParams();

  return (
    <MarginTop>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item ">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              List of Subtopics
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body p-1 my-3">
              <Wrapper>
                {subtopicsData[topic].map((currentTopic, subIndex) => (
                  <Link
                    to={`/${topic.split(" ").join("_")}/${currentTopic
                      .split(" ")
                      .join("_")}`}
                    key={subIndex}
                  >
                    <TopicCard
                      isCurrentTopic={
                        subTopic.split("_").join(" ") === currentTopic
                      }
                    >
                      <Box>
                        <Box1>
                          <img src={logo} className="img-fluid" alt="Logo" />
                        </Box1>
                        <Box2
                          isCurrentTopic={
                            currentTopic === subTopic.split("_").join(" ")
                          }
                        >
                          {currentTopic}
                        </Box2>
                      </Box>
                    </TopicCard>
                  </Link>
                ))}
              </Wrapper>
            </div>
          </div>
        </div>
      </div>
    </MarginTop>
  );
};

export default RecommendedSubTopics;
