import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { subtopicsData } from "../../utils/constants";

const TopicCard = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 11rem;
  width: 13rem;
  border: dashed;
  border-radius: 10px;
  &:hover {
    box-shadow: 1px 1px 1px 1px #eacfcc;
  }

  &:hover {
    background: blueviolet;
    color: white;
  }
  &:hover a {
    color: white;
  }
  img {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
  }
`;

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

const Box1 = styled.div`
  width: 6rem;
`;
const Box2 = styled.h6`
  width: 12rem;
  margin-bottom: 0px;
  text-transform: uppercase;
`;

const SubTopics = (props) => {
  const selectedSubTopics = subtopicsData[props.topic] || [];
  let imageIndex = 1;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <MarginTop>
            <h2 className="fs-5 fw-bolder mb-5">Subtopics</h2>

            <Wrapper>
              {selectedSubTopics.map((subtopic, index) => {
                const imagePath = `${imageIndex + 1}.jpg`; // Dynamically generate image path
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
                    <TopicCard>
                      <Box>
                        <Box1>
                          <img
                            src={require(`../../assets/images/subTopicLogo/${imagePath}`)}
                            alt="subtopic-logo"
                            className="img-fluid"
                          />
                        </Box1>
                        <Box2>{subtopic}</Box2>
                      </Box>
                    </TopicCard>
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
