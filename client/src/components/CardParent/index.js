import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "../Grid";
import { useStoreContext } from "../../utils/GlobalState";
import CardStudent from "../CardStudent";
import API from "../../utils/API";

import EditUserForm from "../forms/EditUserForm";
import EditModal from "../EditModal";

import AddModal from "../AddModal";
import AddStudentForm from "../forms/AddStudentForm";
import Avatar from "react-avatar";
import "./style.css";

function CardParent(props) {
  const [studentState, setStudentState] = useState(props.accordion || false);
  const [state] = useStoreContext();

  const onDelete = id => {
    API.removeUser(id)
      .then(res => {
        if (props.updateFunc) {
          props.updateFunc(true);
        }
      })
      .catch(err => {
        props.updateFunc(false);
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
      <Avatar size={200} name={props.user.name} className='avatarCss' />
    ) : (
        <img
          src={props.user.img}
          className='card-img cloud-img'
          alt={props.user.name}
          style={{ width: 200, height: 200 }}
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
                <h2 className='children-of-parent-title'>Children</h2>
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
                <div className='alert-info p-3'>
                  <h2>No Children - Add a child to get started...</h2>
                </div>
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
            //console.log("Done! Here is the image info: ", result.info);
            API.setUserImage(props.user.id, result.info.url).then(data => {
              //console.log(result.info.url);
              props.updateFunc();
            });
          }
        }
      )
      .open();
  };

  const showChangePassword = () => {
    if (!state.user || props.user.id !== state.user.id) {
      return null;
    } else {
      return (
        <React.Fragment>
          <Link to='/changePassword'>
            <button type='button' className='btn btn-warning btn-sm m-2'>
              <i className='fas fa-key'></i> Change Password
            </button>
          </Link>{" "}
        </React.Fragment>
      );
    }
  };

  const showAmountDue = () => {
    if (state.user.id !== props.user.id && !state.user.isAdmin) {
      return null;
    }

    return getAmountDue() === 0 ? (
      <li className='list-group-item list-group-item-success'>
        <i className='fas fa-check' /> PAID IN FULL
      </li>
    ) : (
        <li className='list-group-item list-group-item-danger'>
          <i className='fas fa-exclamation-circle' /> Amount Due:{" "}
          <strong>${getAmountDue()}</strong>
        </li>
      );
  };

  const showDeleteUser = () => {
    return state.user &&
      state.user.isAdmin &&
      state.user.id !== props.user.id ? (
        <button
          className='btn btn-danger btn-sm m-2'
          onClick={() => onDelete(props.user.id)}
        >
          <i className='far fa-trash-alt'></i> Delete User
      </button>
      ) : null;
  };

  const showAddChild = () => {
    if (!state.user) {
      return null;
    }

    if (state.user.id !== props.user.id && !state.user.isAdmin) {
      return null;
    }

    return (
      <React.Fragment>
        <AddModal
          title='Add Child'
          users={[props.user]}
          form={AddStudentForm}
          onReturn={props.updateFunc}
        />{" "}
      </React.Fragment>
    );
  };

  const showEditUser = () => {
    if (!state.user || (state.user.id !== props.user.id && !state.user.isAdmin)) {
      return null;
    }

    return (
      <React.Fragment>
        <EditModal
          title='Edit Account'
          user={props.user}
          form={EditUserForm}
          onReturn={props.updateFunc}
        />{" "}
      </React.Fragment>
    );
  };

  const showUploadWidget = () => {
    if (!state.user || (state.user.id !== props.user.id && !state.user.isAdmin)) {
      return null;
    }

    return (
      <React.Fragment>
        <br />
        <button
          id='upload_widget'
          className='cloudinary-button mb-3'
          onClick={openWidget}
        >
          <i className='fas fa-cloud-upload-alt' /> Upload Image
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className='container'>
      <Row>
        <Col size='lg-12'>
          <div className='card pt-0'>
            <div className='card-header pb-0 mb-4'>
              <div className='float-left'>
                <h1>{props.user.name}</h1>
              </div>
              <div className='float-right pt-2'>
                <span className='account-info-title-card-parent'>
                  Account Info <i className='fas fa-user pl-2' />
                </span>
              </div>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col col-lg-3'>
                  <div className='parent-info'>
                    {showImage()}
                    {showUploadWidget()}
                  </div>
                </div>
                <div className='col col-lg-9'>
                  <ul className='card-text'>
                    <li className='list-group-item'>
                      Email: {props.user.email}
                    </li>
                    <li className='list-group-item'>
                      Phone: {props.user.phone}
                    </li>
                    {showAmountDue()}
                    <br />
                    <div className='float-right'>
                      {showAddChild()}
                      <button
                        className='btn btn-info btn-sm m-2'
                        onClick={() => {
                          setStudentState(!studentState);
                        }}
                      >
                        <i className='far fa-eye'></i>{" "}
                        {studentState ? "Hide Children" : "Show Children"}
                      </button>{" "}
                      {showChangePassword()}
                      {showEditUser()}
                      {showDeleteUser()}
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
