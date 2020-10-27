import React from "react";
import "../styles.css";
//import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="Home Page" description="Here is the description of Home">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Card</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Card</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Card</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
