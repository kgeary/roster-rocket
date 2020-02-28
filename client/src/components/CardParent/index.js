import React from "react";
import { Link } from "react-router-dom";
import CardStudent from "../CardStudent";

function Card(user) {
  return (
    <div className='container'>
      <div className='card'>
        <img src={user.image} className='card-img-top' alt={user.name} />
        <div className='card-body'>
          <h5 className='card-title'>Parent's Name{user.name}</h5>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>mailing address</li>
          <li className='list-group-item'>email address</li>
          <li className='list-group-item'>phone number</li>
          <li className='list-group-item'>alt phone</li>
        </ul>
        {/* {this.state.students.map(student => (
                <CardStudent />))};
            )*/}
        <div className='card-body'></div>
      </div>
    </div>
  );
}

export default Card;
