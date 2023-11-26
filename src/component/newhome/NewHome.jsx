import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { subtopicsData } from "../../utils/constants";

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



const NewHome = () => {
  let imageIndex = 1; 
  return (
  <div className="container" >
      <div className="row">
        <div className="col-md-12">
          <MarginTop>
            {Object.keys(subtopicsData).map((topic, index) => (
              <div key={index}>
                <h4
                  className="mt-5 text-center fw-bold mb-5"
                  style={{ overflowWrap: "break-word" }}
                >
                  {topic.split("_").join(" ")}
                  <hr></hr>
                </h4>

                <Wrapper>
                  {subtopicsData[topic].map((subtopic, subIndex) => {
                    const imagePath = `${imageIndex + 1}.jpg`; // Dynamically generate image path
                    imageIndex++;
                    imageIndex = imageIndex%34;
                    return (
                      <Link
                        to={`/${topic}/${subtopic.split(" ").join("_")}`}
                        key={subIndex}
                      >
                        <li className="topic-card">
                          <Box>
                            <div className="topic-image">
                              <img
                                src={
                                  require(`../../assets/images/subTopicLogo/${imagePath}`)
                                    
                                }
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
              </div>
            ))}
          </MarginTop>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
