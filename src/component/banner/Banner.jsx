import React, { useState } from "react";
import styled from "styled-components"; // Import styled-components
import "./banner.css";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
const BannerSection = styled.section`
  .banner-text h1 {
    font-size: 48px;
    margin-bottom: 1rem;
  }

  .banner-text h6 {
    font-size: 1rem;
  }
  .btn:hover {
    background-color: #ff5722;
  }

  .btn {
    background-color: #ff5722;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  }
`;
const CustomModal = styled(Modal)`
  .modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50vh;
    height: 100px;
  }
  .modal-content {
    width: 600px;
    height: 500px;
  }
  .rounded-link {
    width: 320px;
    height: 80px;
    margin: 5px;
    border: 1px solid #007bff;
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
    background-color: #79090b; /* Background color for close button */
    color: #fff; /* Text color for close button */
    border: none;
    border-radius: 50%; /* Make it a circle */
    font-size: 24px;
    line-height: 1;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

// New CSS class for styling links
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 80px;
  margin: 9px;
  border: 1px solid #79090b;
  background-color: #79090b;
  // background: linear-gradient(to right,#ec232b,#79090b);
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff; /* Bold white text */
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
    { label: "Verbal Ability and Reading Comprehension", url: "/quiz/varc" },
    { label: "Data Interpretation", url: "/quiz/di" },
    { label: "Logical Reasoning", url: "/quiz/lr" },
    { label: "Quantitative Aptitude", url: "/quiz/math" },
  ];
  return (
    <BannerSection>
      <div className="banner-text bgColor">
        <div className="p-md-5 text-center">
          <h1 className="fw-bold">TIET CTD</h1>
          <h3 className="mb-5">Presents the best test prep platform</h3>
          <button className="btn btn-dark" onClick={openModal}>
            Start Quiz <i className="fa-solid fa-arrow-right"></i>
          </button>
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
                <Col xs={6}>
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
