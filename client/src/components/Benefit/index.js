import React from "react";
import "./style.css";
import Screenshot from "../Benefit/admin-screenshot.png";

const Benefit = () => {
  return (
    <div className='container'>
      <div className='gap'></div>
      <div className='row'>
        <div className='col text-center'>
          <h1>Homeschool Co-op Management Simplified.</h1>
          <br />
          <p>
            With Roster Rocket, you don't have to keep track of teachers,
            parents, students, classes, registrations, and payments with clunky,
            disconnected spreadsheets. Organize homeschool co-op enrollment
            data, manage all your co-op's contacts, simplify your class
            registrations and save yourself time, effort, and stress with our
            smart, simple, and secure app!
          </p>
          <div className='gap'></div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <div className='card benefit'>
            <div className='card-body text-center'>
              <i className='fas fa-clock card-icon' />
              <h5 className='card-title benefit-title'>Save Time</h5>
              <p className='card-text'>
                Save time with our simple enrollment process.
              </p>
            </div>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='card benefit'>
            <div className='card-body text-center'>
              <i className='fas fa-dollar-sign card-icon' />
              <h5 className='card-title benefit-title'>Get Paid</h5>
              <p className='card-text'>
                Track who's paid with just a quick glance.
              </p>
            </div>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='card benefit'>
            <div className='card-body text-center'>
              <i className='fas fa-address-card card-icon' />
              <h5 className='card-title benefit-title'>Manage Contacts</h5>
              <p className='card-text'>
                Keep contacts organized and up to date with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='gap'></div>
      <br />
      <div className='row'>
        <div className='col-sm-6'>
          <h1>Get Organized.</h1>
          <br />
          <p>
            With our powerful Admin dashboard, you'll be able to see all of your
            co-op's important information at a glance.
          </p>
          <p>
            View the parents and student info, add and edit classes, and even
            quickly see a full class roster.
          </p>
          <p>
            <strong>
              With Roster Rocket, your co-op will be ready for take off!
            </strong>
          </p>
        </div>
        <div className='col-sm-6'>
          <img
            src={Screenshot}
            className='screenshot'
            alt='placeholder for screenshot of admin dashboard'
          />
        </div>
      </div>
      <div className='gap'></div>
      <br />
    </div>
  );
};

export default Benefit;
