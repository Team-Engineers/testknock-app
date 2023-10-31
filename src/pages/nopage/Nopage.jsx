import React from "react";
import "./Nopage.css";
import { Link } from "react-router-dom";

const Nopage = () => {
  return (
    <section className="noPage">
      <div id="notfound">
        <div class="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Page Not Found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Link to="/">Homepage</Link>
          <div class="notfound-social">
            <a href="https://www.facebook.com/officialTIET">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/tietofficial/">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="https://in.pinterest.com/pin/1061160730921621150/">
              <i class="fa fa-pinterest"></i>
            </a>
            <a href="https://www.linkedin.com/school/tietofficial/">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nopage;
