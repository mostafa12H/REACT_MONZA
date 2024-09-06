import React from "react";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <iframe
        src="https://my.spline.design/loadinggif-b8a3a03685ef86c96797c12cc3242252/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 1,
        }}
        title="Loading Screen"
      ></iframe>
    </div>
  );
};

export default LoadingScreen;
