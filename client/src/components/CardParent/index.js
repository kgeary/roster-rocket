import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import { useStoreContext } from "../../utils/GlobalState";
import CardStudent from "../CardStudent";
import API from "../../utils/API";
import AddModal from "../AddModal";
import AddStudentForm from "../forms/AddStudentForm";
import Avatar from "react-avatar";
import "./style.css";

function CardParent(props) {
  const [studentState, setStudentState] = useState(props.accordion || false);
  const [state, dispatch] = useStoreContext();

  const onDelete = id => {
    API.removeUser(id).then(res => {
      if (props.updateFunc) {
        props.updateFunc();
      }
    });
  };

  const getAmountDue = () => {
    let sum = 0;
    props.user.Students.forEach(student => {
      student.StudentCourses.forEach(
        sc => (sum += sc.Paid ? 0 : sc.Course.cost)
      );
    });
    return sum;
  };

  const renderStudents = () => {
    return (
      <div>
        <div>
          {props.includeChildren ? (
            props.user.Students.length > 0 ? (
              <React.Fragment>
                <h3>Children</h3>
                <Row>
                  {props.user.Students.map(student => (
                    <Col size='sm-4'>
                      <CardStudent
                        student={student}
                        key={student.name}
                        updateFunc={props.updateFunc}
                      />
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            ) : (
              <h3>No Children</h3>
            )
          ) : null}
        </div>
      </div>
    );
  };

  // Start of Cloudinary Upload Widget

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "ds8zmuetv",
          sources: ["local", "url", "image_search"],
          uploadPreset: "bnlyr9la"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            API.setUserImage(props.user.id, result.info.url).then(data => {
              console.log(result.info.url);
              props.updateFunc();
            });
          }
        }
      )
      .open();
  };
  return (
    <div className='container-fluid'>
      <Row>
        <Col size='sm-4'>
          <div className='parent-info'>
            {!props.user.img.includes("res.cloudinary.com") ? (
              <Avatar name={props.user.name} className='avatarCss' />
            ) : (
              <img
                src={props.user.img}
                className='card-img cloud-img'
                alt={props.user.name}
                style={{ width: 100, height: 100 }}
              />
            )}
            {/*Cloudinary Upload Widget Button*/}<br />
            <button
              id='upload_widget'
              className='cloudinary-button'
              onClick={openWidget}
            >
              Upload Image
            </button>
            <h5 className='card-title parent-info-title'>{props.user.name}</h5>
            <Link to='/changePassword'>Change Password</Link>
          </div>
        </Col>
        <Col size='sm-8'>
          <div className='card'>
            <div className='card-body'>
              <ul className='card-text'>
                <li className='list-group-item'>Email: {props.user.email}</li>
                <li className='list-group-item'>
                  Phone Number: {props.user.phone}
                </li>
                <li className='list-group-item'>
                  Amount Due: ${getAmountDue()}
                </li>
                {state.user && state.user.isAdmin ? (
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => onDelete(props.user.id)}
                  >
                    Delete User
                  </button>
                ) : null}
                <AddModal
                  title='Add Child'
                  users={[props.user]}
                  form={AddStudentForm}
                  onReturn={props.updateFunc}
                />
                <button
                  className='btn btn-info btn-sm'
                  onClick={() => {
                    setStudentState(!studentState);
                  }}
                >
                  {studentState ? "Hide Students" : "Show Students"}
                </button>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <div className='gap' />
      {studentState ? renderStudents() : null}
    </div>
  );
}

export default CardParent;
