import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { subtopicsData } from "../../utils/constants";
const TopicCard = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height : 11rem;
    width : 13rem;
    border : 1px solid #bababa;
    border-radius : 10px;
  &:hover {
    box-shadow: 1px 1px 1px 1px #eacfcc

  }
  &:hover a {
    color: white;
  }
  img {
    width: 6rem;
    height : 6rem;
    object-fit : cover;
  }
`;

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content : center;
  flex-wrap: wrap;
  gap: 2rem;
  padding : 0px;
`;

const MarginTop = styled.div`
  margin-top: 2rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap:  1rem;
`;

const Box1 = styled.div`
  width: 6rem;
`;
const Box2 = styled.h6`
  width: 12rem;
  margin-bottom: 0px;
  text-transform: uppercase;
`;

const NewHome = () => {
  let imageIndex = 1; 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <MarginTop>
            {Object.keys(subtopicsData).map((topic, index) => (
              <div key={index}>
                <h4
                  className="mt-5 text-center mb-5"
                  style={{ overflowWrap: "break-word" }}
                >
                  {topic.split("_").join(" ")}
                  <hr></hr>
                </h4>

                <Wrapper>
                  {subtopicsData[topic].map((subtopic, subIndex) => {
                    const imagePath = `${imageIndex + 1}.jpg`; // Dynamically generate image path
                    imageIndex++;
                    imageIndex = imageIndex%31;
                    return (
                      <Link
                        to={`/${topic}/${subtopic.split(" ").join("_")}`}
                        key={subIndex}
                      >
                        <TopicCard>
                          <Box>
                            <Box1>
                              <img
                                src={
                                  require(`../../assets/images/subTopicLogo/${imagePath}`)
                                    
                                }
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
              </div>
            ))}
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
