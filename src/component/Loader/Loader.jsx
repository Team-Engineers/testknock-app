import React from "react";
import Loading from "../../assets/images/loader.gif";

const TietLoader = () => {
  const loaderStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, 
  };

  const imageStyles = {
    width: "250px", 
    height: "250px", 
  };

  return (
    <div style={loaderStyles}>
      <img src={Loading} style={imageStyles} alt="Loading" />
    </div>
  );
};

export default TietLoader;
