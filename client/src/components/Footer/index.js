import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Icon from "./footer-rocket.png";

const Footer = () => {
  return (
    <div className='container-fluid footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3 footer-brand'>
            <img src={Icon} />
            <p className='footer-brand-title'>Roster Rocket</p>
            <p className='copyright'>
              &copy;2020 Rocket Roster, Inc.
              <br />
              All Rights Reserved
            </p>
          </div>
          <div className='col-sm-3'>
            <p className='footer-title'>Contact Us</p>
            <div className='separator'></div>
            <a href='#'>(800) 707-1337</a>
            <br />
            <a href='mailto:rosterrocket2020@gmail.com'>
              rosterrocket2020@gmail.com
            </a>
          </div>
          <div className='col-sm-3'>
            <p className='footer-title'>Legal</p>
            <div className='separator'></div>
            <a href='#'>Privacy Policy</a>
            <br />
            <a href='#'>Terms of Service</a>
          </div>
          <div className='col-sm-3'>
            <p className='footer-title'>Navigation</p>
            <div className='separator'></div>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/signup'>Signup</Link>
            <br />
            <Link to='/login'>Login</Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
