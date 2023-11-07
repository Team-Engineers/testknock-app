import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/subtopic-logo.png";
import {subtopicsData} from '../../utils/constants'
const TopicCard = styled.li`
  height: 6rem;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed;
  text-align: center;
  width: 15rem;

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
  margin-top: 2rem;
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
`;

const NewHome = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <MarginTop>
            {/* <h2 className="fs-5 fw-bolder mb-5">Subtopics</h2> */}
            {Object.keys(subtopicsData).map((topic, index) => (
              <div key={index}>
                <h4
                  className="mt-4 mb-4"
                  style={{ overflowWrap: "break-word" }}
                >
                  {topic.split("_").join(" ")}
                  <hr></hr>
                </h4>

                <Wrapper>
                  {subtopicsData[topic].map((subtopic, subIndex) => (
                    <Link to={`/${topic}/${subtopic.split(" ").join("_")}`} key={subIndex}>
                      <TopicCard>
                        <Box>
                          <Box1>
                            <img
                              src={logo}
                              alt="subtopic-logo"
                              className="img-fluid"
                            />
                          </Box1>
                          <Box2>{subtopic}</Box2>
                        </Box>
                      </TopicCard>
                    </Link>
                  ))}
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
