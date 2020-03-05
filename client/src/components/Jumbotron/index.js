import React from "react";

const Jumbotron = ({ children }) => {
  return (
    <div>
      <div className='gap' />
      <div
        style={{
          height: 360,
          clear: "both",
          paddingTop: 120,
          textAlign: "center"
        }}
        className='jumbotron border border-success'
      >
        {children}
      </div>
      <div className='big-gap' />
    </div>
  );
};

export default Jumbotron;
