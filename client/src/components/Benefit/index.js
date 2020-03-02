import React from "react";
import "./style.css";

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
            doloribus officiis dolore perferendis labore impedit a similique
            adipisci..
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
            maiores, iusto possimus modi cupiditate soluta veniam inventore odio
            corporis aliquam.
          </p>
        </div>
        <div className='col-sm-6'>
          <img
            src='https://via.placeholder.com/540x325'
            class='screenshot'
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
