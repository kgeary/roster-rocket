import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "../Grid";
import { useStoreContext } from "../../utils/GlobalState";
import CardStudent from "../CardStudent";
import API from "../../utils/API";
import AddModal from "../AddModal";
import AddStudentForm from "../forms/AddStudentForm";
import Avatar from "react-avatar";
import "./style.css";

function CardParent(props) {
  const [studentState, setStudentState] = useState(props.accordion || false);
  const [state] = useStoreContext();

  const onDelete = id => {
    API.removeUser(id).then(res => {
      if (props.updateFunc) {
        props.updateFunc(true);
      }
    })
      .catch(err => {
        props.updateFunc(false)
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

  const showImage = () => {
    return !props.user.img.includes("res.cloudinary.com") ? (
      <Avatar name={props.user.name} className='avatarCss' />
    ) : (
        <img
          src={props.user.img}
          className='card-img cloud-img'
          alt={props.user.name}
          style={{ width: 100, height: 100 }}
        />
      );
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
                    <Col size='lg-4'>
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
    <div className='container'>
      <Row>
        <Col size='lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col col-lg-3'>
                  <div className='parent-info'>
                    {!props.user.img.includes("res.cloudinary.com") ? (
                      <Avatar name={props.user.name} className='avatarCss' />
                    ) : (
                        <img
                          src={props.user.img}
                          className='card-img cloud-img'
                          alt={props.user.name}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    {/*Cloudinary Upload Widget Button*/}
                    <br />
                    <button
                      id='upload_widget'
                      className='cloudinary-button'
                      onClick={openWidget}
                    >
                      <i className='fas fa-cloud-upload-alt' /> Upload Image
                    </button>
                  </div>
                </div>
                <div className='col col-lg-9'>
                  <h5 className='card-title parent-info-title'>
                    {props.user.name}
                  </h5>
                  <ul className='card-text'>
                    <li className='list-group-item'>
                      Email: {props.user.email}
                    </li>
                    <li className='list-group-item'>
                      Phone Number: {props.user.phone}
                    </li>
                    <li className='list-group-item list-group-item-danger'>
                      Amount Due: ${getAmountDue()}
                    </li>
                    <br />
                    <div className='float-right'>
                      <Link to='/changePassword'>
                        <button
                          type='button'
                          className='btn btn-warning btn-sm'
                        >
                          <i className='fas fa-key'></i> Change Password
                        </button>
                      </Link>{" "}
                      <AddModal
                        title='Add Child'
                        users={[props.user]}
                        form={AddStudentForm}
                        onReturn={props.updateFunc}
                      />{" "}
                      <button
                        className='btn btn-info btn-sm'
                        onClick={() => {
                          setStudentState(!studentState);
                        }}
                      >
                        <i className='far fa-eye'></i>{" "}
                        {studentState ? "Hide Students" : "Show Students"}
                      </button>{" "}
                      {/* NEED TO MAKE EDIT FUNCTION FOR BUTTON */}
                      <button type='button' className='btn btn-dark btn-sm'>
                        <i className='fas fa-pencil-alt'></i> Edit User{" "}
                      </button>{" "}
                      {state.user && state.user.isAdmin ? (
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => onDelete(props.user.id)}
                        >
                          <i className='far fa-trash-alt'></i> Delete User
                        </button>
                      ) : null}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='gap' />
      {studentState ? renderStudents() : null}
      <div className='gap' />
    </div>
  );
}

export default CardParent;
