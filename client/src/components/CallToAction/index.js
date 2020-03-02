import React from "react";
import "./style.css";

const CallToAction = () => {
  return (
    <div className='container-fluid call-to-action'>
      <div className='container'>
        <span className='call-to-span'>
          Organize Your Co-op Today!{" "}
          <button className='call-to-btn' href="/signup"><i className="fas fa-arrow-right btn-icon"></i>GET STARTED</button>
        </span>
      </div>
    </div>
  );
};

export default CallToAction;
