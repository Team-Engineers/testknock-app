import React from "react";
import tietLogo from "../../assets/images/white-tietLogo.png";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section class="row-10 footer mt-5">
        <div class="container">
          <div class="row footerContent">
            <div class="col-lg-3 col-sm-6">
              <div class="logo pcLogo pb-3">
                <Link to="https://www.thapar.edu/">
                  <img src={tietLogo} alt="Thapar-Logo" className="img-fluid" />
                </Link>
              </div>
              <div class=" text-white pt-2 width90 pb-3">
                <h6 className="liWrapper">
                  Thapar Institute of Engineering and Technology in Patiala,
                  India, is a distinguished technical university renowned for
                  its quality education, research, and innovation in engineering
                  and technology fields, offering diverse programs.
                </h6>
              </div>
              <div class="social">
                <h6 className="text-white">Follow us</h6>
                <div class="icons  d-flex align-items-start gap-3">
                  <a href="https://www.facebook.com/officialTIET">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/tietofficial/">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://in.pinterest.com/pin/1061160730921621150/">
                    <i class="fa-brands fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-sm-6">
              <div class="contactContent text-white  pe-md-2">
                <div class="quickHeading fw-bold">Contact</div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <a href="https://www.thapar.edu/">
                    <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                      <i class="fa-solid fa-building"></i>
                      <h6>Thapar Institute of Engineering</h6>
                    </div>
                  </a>
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-location-dot"></i>
                    <h6>
                      P.O. Box 32, Bhadson Road, Patiala, Punjab, Pin -147004,
                      India
                    </h6>
                  </div>
                  <a href="mailto:admissions@thapar.edu">
                    <h6 class="liWrapper mb-0 d-flex justify-content-start  align-items-center gap-3">
                      <i class="fa-solid fa-paper-plane"></i>
                      <h6>admissions@thapar.edu</h6>
                    </h6>
                  </a>
                  <a href="tel:18002024100">
                    <h6 class="liWrapper d-flex justify-content-start align-items-center gap-3">
                      <i class="fa-solid fa-phone-volume"></i>
                      18002024100
                    </h6>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class=" text-white ps-md-3">
                <div class="fw-bolder quickHeading">
                  <span>Categories</span>
                </div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <Link to="/QUANTITATIVE_APTITUDE">
                    <h6 className="liWrapper">Quantitative Aptitude</h6>
                  </Link>
                  <Link to="/DATA_INTERPRETATION">
                    <h6 className="liWrapper">Data Interpretation</h6>
                  </Link>
                  <Link to="/LOGICAL_REASONING">
                    <h6 className="liWrapper">Logical Reasoning</h6>
                  </Link>
                  <Link to="/VERBAL_ABILITY_AND_READING_COMPREHENSION">
                    <h6 className="liWrapper">
                      Verbal Ability &amp; Reading Comprehension
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class=" text-white  pe-md-2">
                <div class=" fw-bold">Any Technical Issue?</div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <a href="https://www.templeoflearning.in/">
                    <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                      <i class="fa-solid fa-building"></i>
                      <h6>Temple Of Learning</h6>
                    </div>
                  </a>
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-location-dot"></i>
                    <h6>
                      Head Office L-3, Kanchanjunga Building Barakhamba Road,
                      Connaught Place New Delhi - 110001
                    </h6>
                  </div>
                  <a href="mailto:info@templeoflearning.com">
                    <div class=" liWrapper mb-0 d-flex justify-content-start  align-items-center gap-3">
                      <i class="fa-solid fa-paper-plane"></i>
                      <h6>info@templeoflearning.com</h6>
                    </div>
                  </a>
                  <a href="tel:9810033495">
                    <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                      <i class="fa-solid fa-phone-volume"></i>
                      <h6 className="d-flex justify-content-center align-items-center">
                        +91- 98100 33495<br></br> 011-45 019 365
                      </h6>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="row-11 termsConditions mt-1 familyMont">
        <div class="container">
          <div class="row  text-white">
            <div class="col-md-12 ">
              <div class="row">
                <div class="col-md-4 order-3 order-md-1">
                  <h6 class="condition mb-0">
                    <i class="fa-regular fa-copyright"></i>
                    All Rights Reserved. Thapar Institute of Engineering
                  </h6>
                </div>
                <div class="col-md-4 order-1 order-md-2 ">
                  <h6 class=" mb-0 condition">
                    Terms and Conditions | Privacy Policy
                  </h6>
                </div>
                <div class="col-md-4 order-2 order-md-3">
                  <h6 class=" mb-0 condition">
                    Website Designed by{" "}
                    <a href="https://www.templeoflearning.in/">
                      Temple Of Learning
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
