import React, { useState } from "react";
import styled from "styled-components";
import "./banner.css";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const BannerSection = styled.section`
  .banner-text h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 800px) {
    
    .banner-text h1 {
      font-size: 2.8rem; 
    }
  }

  @media (max-width: 590px) {
    
    .banner-text h1 {
      font-size: 2rem; 
    }
    button{
      font-size: 1.2rem; 
      display : block !important;
    }
  }

  @media (max-width: 450px) {
    
    .banner-text h1 {
      font-size: 1.5rem; 
    }
    button{
      font-size: 1rem; 

    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;


`;
const CustomModal = styled(Modal)`
  .modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50vh;
    height: 100px;
  }
  .rounded-link {
    width: 320px;
    height: 80px;
    margin: 5px;
    border: 1px solid #79090b;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 1;
  }
  .close {
    background-color: #79090b;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    line-height: 1;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

// New CSS class for styling links
const StyledLink = styled(Link)`
  padding: 7px;
  margin: 9px;
  border: 1px solid #79090b;
  background-color: #79090b;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #fff;
  text-decoration: none;
  .rounded-link:hover {
    color: #fff !important;
  }
`;

const Banner = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const links = [
    { label: "Quantitative Aptitude", url: "/quiz/math" },
    { label: "Data Interpretation", url: "/quiz/di" },
    { label: "Logical Reasoning", url: "/quiz/lr" },
    { label: "Verbal Ability and Reading Comprehension", url: "/quiz/varc" },
  ];

  const scrollDown = () => {
    const remainingHeight = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    const scrollAmount = Math.min(remainingHeight, window.innerHeight); // Minimum of 100 vh or remaining height
    window.scroll({
      top: window.scrollY + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <BannerSection>
      <div className="banner-text bgColor">
        <div className="text-center h-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="fw-bold">Aptitude Practice Platform </h1>
                <h1 className="fw-bold" style ={{color : "#ff5722"}}>For</h1>
                 <h1 className="fw-bold mb-5">Employability Development Skills(EDS)</h1>
          
          <div className="d-flex justify-content-center align-items-center gap-4">
            <button className="btn btn-secondary d-flex justify-content-center align-items-center fw-bold flex-wrap gap-2" onClick={scrollDown}>
             Preparatory <span className="d-flex align-items-center justify-content-center gap-2">Modules <i className="fa-solid fa-arrow-down " ></i></span>
            </button>
            <button className="btn btn-secondary d-flex justify-content-center align-items-center fw-bold flex-wrap gap-2" onClick={openModal}>
              Practice <span className="d-flex align-items-center justify-content-center gap-2">Tests <i className="fa-solid fa-arrow-right "></i><span/></span>
            </button>
          </div>
        </div>
      </div>

      <CustomModal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select the Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {links.map((link, index) => (
              <Row key={index}>
                <Col xs={12}>
                  <StyledLink to={link.url}>{link.label}</StyledLink>
                </Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>
      </CustomModal>
    </BannerSection>
  );
};

export default Banner;
