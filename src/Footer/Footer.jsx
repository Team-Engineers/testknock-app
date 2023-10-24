import React from "react";
import "./Footer.scss";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="Footer_layout">
      <div className="Footer">
        <div className="Footer section_padding">
          <div className="Footer-links loream">
            <h2>Colorlib</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              vero a enim illo minima ratione similique nobis earum, omnis
              labore sapiente adipisci molestias! Expedita quis iure aliquam
              reiciendis corrupti quisquam!
            </p>
          </div>
          <div className="Footer-links-div1">
            <a href="/Home">
              <p>Home</p>
            </a>
            <a href="/AboutUs">
              <p>AboutUs</p>
            </a>
            <a href="/Portfolio">
              <p>Portfolio</p>
            </a>
            <a href="/Contact">
              <p>Contact</p>
            </a>
          </div>
          <div className="Footer-links-div1">
            <a href="/Clients">
              <p>Clients</p>
            </a>
            <a href="/Team">
              <p>Team</p>
            </a>
            <a href="/Career">
              <p>Career</p>
            </a>
            <a href="/Journal">
              <p>Journal</p>
            </a>
          </div>

          <div className="Footer-links-div2">
            <a href="/Privacy Policy">
              <p>Private Policy</p>
            </a>
            <a href="/Terms & Condition">
              <p>Teams & Conditions</p>
            </a>
            <a href="/Partners">
              <p>Partners</p>
            </a>
          </div>
          <div className="Footer-links-div3">
            <h3>Coming Soon on</h3>
            <div className="socialmedia">
              <p>
                <SocialIcon url="www.instagram.com" />
              </p>
              <p>
                <SocialIcon url="www.facebook.com" />
              </p>
              <p>
                <SocialIcon url="www.twitter.com" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer-below">
        <hr></hr>
        <div className="Footer-copyright">
          <p>@{new Date().getFullYear()} CodeInn. All right reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
