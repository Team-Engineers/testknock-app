import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"; // Import styled-components
import "./banner.css";

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
            <div className="banner-text bgColor">
              <div className="p-md-5 text-center">
                <h1 className="fw-bold">TIET CTD</h1>
                <h3 className="mb-5">Presents the best test prep platform</h3>
                <Link to="/quizquestion">
                  {" "}
                  <button className="btn text-white" style = {{background:"#79090b"}}>
                    Start Quiz <i className="fa-solid fa-arrow-right"></i>
                  </button>{" "}
                </Link>
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
