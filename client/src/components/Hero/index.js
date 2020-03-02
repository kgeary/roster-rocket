import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import btnIcon from "../Nav/rocket.svg";

const Hero = () => {
  return (
    <div className='hero'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>{/* Intentionally Left Blank */}</div>
          <div className='col-lg-9'>
            <div className='hero-text'>
              <h1>Roster Rocket</h1>
              <h2>Helping Homeschool Co-ops Launch!</h2>
              <p className='hero-p'>
                Roster Rocket is the best tool for helping homeschool admin
                teams manage class rosters and enrollments. Whether your group
                has 10 students or 10,000...Roster Rocket is here to help you
                manage it!
              </p>
              <Link to='/signup'>
                <button className='hero-btn wiggle'>
                  <img src={btnIcon} className='btn-icon' alt='Signup' />
                  PREPARE FOR LAUNCH
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
