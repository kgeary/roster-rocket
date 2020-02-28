import React from "react";
import { Link } from "react-router-dom";
import CardStudent from "../CardStudent";

function Card(props) {
  return (
    <div className='container'>
      <div className='card parent-card'>
        <img src={props.user.img} className='card-img-top' alt={props.user.name} style={{ width: 150, height: 150 }} />
        <div className='card-body'>
          <h5 className='card-title'>{props.user.name}</h5>
          <ul className='card-text'>
            <li className='list-group-item'>{props.user.email}</li>
            <li className='list-group-item'>{props.user.phone}</li>
            <li className='list-group-item'>mailing address</li>
          </ul>
        </div>
      </div>
      <div>
        <ul className='list-group list-group-flush'>
        </ul>
        {
          props.user.Students.map(student => (
            <CardStudent student={student} key={student.name} />
          ))
        }
        <div className='card-body'></div>
      </div>
    </div >
  );
}

export default Card;
