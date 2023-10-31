import React, { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BannerSection = styled.section`
  .btn {
    background-color: #ff5722;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #ff5722;
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
    border: 1px solid #007BFF;
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
  background-color: #79090B;
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
    { label: 'Verbal Ability and Reading Comprehension', url: '/quiz/varc' },
    { label: 'Data Interpretation', url: '/quiz/di' },
    { label: 'Logical Reasoning', url: '/quiz/lr' },
    { label: 'Maths', url: '/quiz/math' },
  ];

  return (
    <BannerSection>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="banner-text bgColor">
              <div className="p-md-5">
                <h1 className="fw-bold">Unlock Your Potential</h1>
                <h6 className="mb-5">
                  Master Aptitude: Elevate Your Skills, Ace Tests, and Achieve Academic Excellence Today!
                </h6>
                <button className="btn btn-dark" onClick={openModal}>
                  Start Quiz <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
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
                <Col xs={6}>
                  <StyledLink to={link.url}>
                    {link.label}
                  </StyledLink>
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
