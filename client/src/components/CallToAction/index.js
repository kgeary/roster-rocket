import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CallToAction = () => {
  return (
    <div className='container-fluid call-to-action'>
      <div className='container'>
        <span className='call-to-span'>
          Organize Your Co-op Today!{" "}
          <Link to='/signup'>
            <button className='call-to-btn'>
              <i className='fas fa-arrow-right btn-icon'></i>GET STARTED
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default CallToAction;
