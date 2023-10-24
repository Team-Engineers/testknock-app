import React from "react";
import styled from "styled-components"; // Import styled-components

const TopicCard = styled.button`
  height: 8rem;
  padding: 1rem;
  margin: 1rem;
  background-color: white;
  box-shadow: 1px 1px 2px 1px #8d8d8d;
  width: 15rem;
  border-radius: 20px;

  &:hover {
    background: blueviolet;
    color: white;
  }
`;

const Subjects = ({setSelectedTopic}) => {

  const changeTopic = (topicName) => {
    setSelectedTopic(topicName)
  };
  

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="position-relative">
              <ul
                className="nav nav-pills d-flex align-items-center justify-content-center flex-wrap mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item " role="presentation">
                  <TopicCard
                    className={`nav-link active`}
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={() => changeTopic('QUANT')}
                  >
                    QUANTITATIVE APTITUDE
                  </TopicCard>
                </li>
                <li className="nav-item " role="presentation">
                  <TopicCard
                    className={`nav-link`}
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    onClick={() => changeTopic('DI')}
                  >
                    DATA INTERPRETATION
                  </TopicCard>
                </li>
                <li className="nav-item" role="presentation">
                  <TopicCard
                    className={`nav-link`}
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    onClick={() => changeTopic('LR')}
                  >
                    LOGICAL REASONING
                  </TopicCard>
                </li>
                <li className="nav-item " role="presentation">
                  <TopicCard
                    className={`nav-link`}
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-disabled"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                    onClick={() => changeTopic('VARC')}
                  >
                    VERBAL ABILITY & READING COMPREHENSION
                  </TopicCard>
                </li>
              </ul>
            </div>
            {/* <SubTopics topic={selectedTopic} /> */}
          </div>
        </div>
      </div>
  );
};

export default Subjects;
