import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Base = ({ title = "", description = "", className = "", children }) => {
  return (
    <div>
      <Navigation />
      <div className="container-fluid">
        <div className="jumbotron text-black text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
