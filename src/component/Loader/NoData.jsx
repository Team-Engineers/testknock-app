import React from "react";
import nothing from "../../assets/images/nothing-found.png";
import { Link } from "react-router-dom";
const NoData = () => {
  const loaderStyles = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection : "column"
  };

  const imageStyles = {
    width: "250px",
    height: "250px",
  };

  return (
    <div style={loaderStyles}>
      <img src={nothing} style={imageStyles} alt="noData" />
      <Link to="/">
        <div className="btn submit-button">Go Back To Home</div>
      </Link>
    </div>
  );
};

export default NoData;
