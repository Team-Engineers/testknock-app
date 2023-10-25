import React from "react";
import tietLogo from "../../assets/images/white-tietLogo.png";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <section class="row-10 footer">
        <div class="container">
          <div class="row footerContent">
            <div class="col-md-3">
              <div class="logo pcLogo pb-3">
                <img src={tietLogo} alt="Thapar-Logo" className="img-fluid" />
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

            <div class="col-md-3">
              <div class="contactContent text-white  pe-md-2">
                <div class="quickHeading fw-bold">Contact</div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-building"></i>
                    <h6>Thapar Institute of Engineering</h6>
                  </div>
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-location-dot"></i>
                    <h6>
                      P.O. Box 32, Bhadson Road, Patiala, Punjab, Pin -147004,
                      India
                    </h6>
                  </div>
                  <div class=" ">
                    <h6 class="liWrapper mb-0 d-flex justify-content-start  align-items-center gap-3">
                      <i class="fa-solid fa-paper-plane"></i>
                      <h6>admissions@thapar.edu</h6>
                    </h6>
                  </div>
                  <h6 class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-phone-volume"></i>
                    18002024100
                  </h6>
                </div>
              </div>
            </div>
            <div class="col-md-3 ">
              <div class=" text-white ps-md-3">
                <div class="fw-bolder quickHeading">
                  <span>Categories</span>
                </div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <h6 className="liWrapper">Quantitative Aptitude</h6>
                  <h6 className="liWrapper">Data Interpretation</h6>
                  <h6 className="liWrapper">Logical Reasoning</h6>
                  <h6 className="liWrapper">Verbal Ability &amp; Reading Comprehension</h6>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class=" text-white  pe-md-2">
                <div class=" fw-bold">Any Technical Issue?</div>
                <div class=" pt-5 d-flex flex-column gap-4">
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-building"></i>
                    <h6>Temple Of Learning</h6>
                  </div>
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-location-dot"></i>
                    <h6>
                      Head Office L-3, Kanchanjunga Building Barakhamba Road,
                      Connaught Place New Delhi - 110001
                    </h6>
                  </div>
                  <div class=" ">
                    <div class=" liWrapper mb-0 d-flex justify-content-start  align-items-center gap-3">
                      <i class="fa-solid fa-paper-plane"></i>
                      <h6>info@templeoflearning.com</h6>
                    </div>
                  </div>
                  <div class="liWrapper d-flex justify-content-start align-items-center gap-3">
                    <i class="fa-solid fa-phone-volume"></i>
                    <h6 className="d-flex justify-content-center align-items-center">
                      +91- 98100 33495<br></br> 011-45 019 365
                    </h6>
                  </div>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                    >
                      <path
                        d="M8.34018 17.6848C12.8614 17.6848 16.6804 13.8552 16.6804 9.32143C16.6804 4.78762 12.8614 0.958008 8.34018 0.958008C3.81897 0.958008 0 4.78762 0 9.32143C0 13.8552 3.81897 17.6848 8.34018 17.6848ZM8.34018 2.63069C11.9573 2.63069 15.0123 5.69421 15.0123 9.32143C15.0123 12.9486 11.9573 16.0122 8.34018 16.0122C4.72304 16.0122 1.66804 12.9486 1.66804 9.32143C1.66804 5.69421 4.72304 2.63069 8.34018 2.63069Z"
                        fill="white"
                      />
                      <path
                        d="M8.34019 13.5031C9.09164 13.5031 10.4928 13.3626 11.4319 12.4225L10.2526 11.2383C9.88313 11.6088 9.16754 11.8304 8.34019 11.8304C6.98408 11.8304 5.83814 10.6812 5.83814 9.32136C5.83814 7.96147 6.98408 6.81233 8.34019 6.81233C9.16837 6.81233 9.88396 7.03396 10.2526 7.40363L11.4319 6.22104C10.4936 5.28015 9.09164 5.13965 8.34019 5.13965C6.04081 5.13965 4.1701 7.01556 4.1701 9.32136C4.1701 11.6272 6.04081 13.5031 8.34019 13.5031Z"
                        fill="white"
                      />
                    </svg>
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
