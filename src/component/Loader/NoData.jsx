import React from "react";
import nothing from '../../assets/images/nothing-found.png'
const NoData = () => {
  const loaderStyles = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles = {
    width: "250px",
    height: "250px",
  };

  return (
    <div style={loaderStyles}>
      <img src={nothing} style={imageStyles} alt="noData" />
    </div>
  );
};

export default NoData;
