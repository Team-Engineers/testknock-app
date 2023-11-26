
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { subtopicsData } from "../../utils/constants";
import { useParams } from "react-router-dom";


const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0px;
`;

const MarginTop = styled.div`
  margin-top: 2rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;




const SubTopics = (props) => {
  const selectedSubTopics = subtopicsData[props.topic] || [];
  let imageIndex = 1;
  const { topic } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <MarginTop>
            <h2 className="fs-5 fw-bolder mb-5">Subtopics</h2>

            <Wrapper>
              {selectedSubTopics.map((subtopic, index) => {
                let imagePath;

                if (topic === "LOGICAL_REASONING") {
                  imagePath = `${imageIndex + 12}.jpg`;
                } else if (topic === "DATA_INTERPRETATION") {
                  const adjustedIndex = imageIndex % 31;
                  imagePath = `${adjustedIndex}.jpg`;
                } else if (
                  topic === "VERBAL_ABILITY_AND_READING_COMPREHENSION"
                ) {
                  imagePath = `${imageIndex + 21}.jpg`;
                } else {
                  imagePath = `${imageIndex + 1}.jpg`;
                }

                imageIndex++;
                imageIndex = imageIndex % 31;

                return (
                  <Link
                    to={`/${encodeURIComponent(props.topic)}/${subtopic.replace(
                      /\s/g,
                      "_"
                    )}`}
                    key={index}
                  >
                    <li className = "topic-card">
                      <Box>
                        <div className="topic-image">
                          <img
                            src={require(`../../assets/images/subTopicLogo/${imagePath}`)}
                            alt="subtopic-logo"
                            className="img-fluid"
                          />
                        </div>
                        <h6>{subtopic}</h6>
                      </Box>
                    </li>
                  </Link>
                );
              })}
            </Wrapper>
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default SubTopics;
