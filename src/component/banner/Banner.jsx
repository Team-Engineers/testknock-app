import React from "react";
import styled from "styled-components"; // Import styled-components
import './banner.css'

const BannerSection = styled.section`
  .banner-text h1 {
    font-size: 48px;
    margin-bottom: 1rem;
  }

  .banner-text h6 {
    font-size: 1rem;
  }
`;

const Banner = () => {
  return (
    <BannerSection>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12">
          <div className="banner-text bgColor" >
              <div className="p-md-5">
                <h1 className="fw-bold">Unlock Your Potential</h1>
                <h6 className="mb-5">
                  Master Aptitude: Elevate Your Skills, Ace Tests, and Achieve
                  Academic Excellence Today!
                </h6>
                <button className="btn btn-dark">
                  Start Quiz <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

                {/* <div className="banner-image">
                  
                </div> */}

        </div>
      </div>
    </BannerSection>
  );
};


export default Banner;
