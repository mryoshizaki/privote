import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="left">
        <div className="logo">
          <img src="logo.jpg" />
        </div>

        <div className="title-large">Privote:</div>
        <div className="title-large">An Ethereum-based Internet Voting System</div>
        <div className="title-small">for Barangay SK Elections</div>

        <div className="button-wrapper">
          <Link to="/login">
            <button className="button-black">Login</button>
          </Link>

          <Link to="/view">
            <button>View Votes</button>
          </Link>
        </div>
      </div>

      <div className="right">
        <img src="privote.png" />
      </div>
    </div>
  );
};

export default Landing;
