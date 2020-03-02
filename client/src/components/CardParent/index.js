import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardStudent from "../CardStudent";
import API from "../../utils/API";
import AddModal from "../AddModal"
import AddStudentForm from "../forms/AddStudentForm";
import Avatar from 'react-avatar'
import "./style.css";


function CardParent(props) {

  const [studentState, setStudentState] = useState(props.accordion || false);

  const onDelete = (id) => {
    API.removeUser(id).then(res => {
      if (props.updateFunc) {
        props.updateFunc();
      }
    });
  }

  const getAmountDue = () => {
    let sum = 0;
    props.user.Students.forEach(student => {
      student.StudentCourses.forEach(sc => sum += (sc.Paid ? 0 : sc.Course.cost));
    })
    return sum;
  }

  const renderStudents = () => {
    return (
      <div className="card">
        <div className="body">
          {
            props.includeChildren ?
              props.user.Students.length > 0 ?
                <React.Fragment>
                  <h3>Children</h3>
                  {
                    props.user.Students.map(student => (
                      <CardStudent student={student} key={student.name} updateFunc={props.updateFunc} />
                    ))
                  }
                </React.Fragment>
                : <h3>No Children</h3>
              : null
          }
        </div>
      </div>
    );
  }

  // Start of Cloudinary Upload Widget

  const openWidget = () => {
    window.cloudinary.createUploadWidget({
      cloudName: 'ds8zmuetv',
      sources: ['local', 'url', 'image_search'],
      uploadPreset: 'bnlyr9la'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        API.setUserImage(props.user.id, result.info.url)
          .then((data) => {
            console.log(result.info.url);
            props.updateFunc();

          });
      }
    }
    ).open()
  }
  return (
    <div className='container'>
      <div className='card parent-card'>
        {
          props.user.img.includes("via.placeholder") ?
            <Avatar name={props.user.name} className='avatarCss' /> :
            <img src={props.user.img} className='card-img avatarCss' alt={props.user.name} style={{ width: 100, height: 100 }} />
        }
        {/*Cloudinary Upload Widget Button*/}
        <button id="upload_widget" className="cloudinary-button" onClick={openWidget}>Upload Image</button>
        <div className='card-body'>
          <h5 className='card-title'>{props.user.name}</h5>
          <Link to="/changePassword">Change Password</Link>
          <ul className='card-text'>
            <li className='list-group-item'>{props.user.email}</li>
            <li className='list-group-item'>{props.user.phone}</li>
            <li className='list-group-item'>Amount Due: ${getAmountDue()}</li>
            <li className='list-group-item'>mailing address</li>
            {props.admin ? <button className="btn btn-danger btn-sm" onClick={() => onDelete(props.user.id)}>Delete User</button> : null}
            <AddModal title="Add Child" users={[props.user]} form={AddStudentForm} onReturn={props.updateFunc} />
            <button className="btn btn-info btn-sm" onClick={() => { setStudentState(!studentState) }}>{studentState ? "Hide Students" : "Show Students"}</button>
          </ul>
        </div>
        {
          studentState ?
            renderStudents() :
            null
        }
      </div>
    </div >
  );
}

export default CardParent;
