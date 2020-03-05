import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import EnrollStudentModal from "../EnrollStudentModal";
import EnrollStudentForm from "../forms/EnrollStudentForm";
import PayButton from "../PayButton";
import Avatar from "react-avatar";
import "./style.css";

function CardStudent(props) {
  const [courseState, setCourseState] = useState(false);
  const [state] = useStoreContext();

  // console.log("CARD STUDENT", props.student);
  const onDelete = id => {
    API.removeStudent(id).then(res => {
      if (props.updateFunc) {
        props.updateFunc();
      }
    });
  };

  const onDrop = (StudentId, CourseId) => {
    API.dropCourse(StudentId, CourseId).then(res => {
      if (props.updateFunc) {
        props.updateFunc();
      }
    });
  };

  const showDropBtn = sc => {
    if (props.student.ParentId !== state.user.id && !state.user.isAdmin) {
      return null;
    }

    return (
      <React.Fragment>
        <div className='drop-class-button'>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => onDrop(props.student.id, sc.CourseId)}
          >
            <i className="far fa-times-circle" /> Drop Class
          </button>
        </div>
      </React.Fragment>
    );
  };

  const showStudentPaid = sc => {
    if (props.student.ParentId !== state.user.id && !state.user.isAdmin) {
      return null;
    }

    return (
      <h6>
        Paid:{" "}
        {sc.Paid ? (
          "PAID"
        ) : (
          <span style={{ fontWeight: "bold", color: "red" }}>NOT YET PAID</span>
        )}
      </h6>
    );
  };

  const showTeacher = sc => {
    if (!sc.Course.User) {
      return <h6>Teacher: Not Assigned</h6>;
    }
    return (
      <React.Fragment>
        <h6>
          Teacher:{" "}
          <Link to={`/parent/${sc.Course.User.id}`}>{sc.Course.User.name}</Link>
        </h6>
        <h6>Teacher's Phone: {sc.Course.User.phone}</h6>
      </React.Fragment>
    );
  };

  const renderCourses = () => {
    return (
      <React.Fragment>
        {props.student.StudentCourses.length > 0 ? (
          <h3 className='subtitle'>Enrolled Classes:</h3>
        ) : null}
        {props.student.StudentCourses.map(sc => (
          <div className='card' key={sc.Course.title}>
            <div className='card-body'>
              {showDropBtn(sc)}
              <Link to={`/course/${sc.Course.id}`}>
                <h3 className="enrolled-course-title">{sc.Course.title}</h3>
              </Link>

              {showTeacher(sc)}
              <h6>Location: {sc.Course.location}</h6>
              <h6>Cost: {sc.Course.cost}</h6>
              {showStudentPaid(sc)}

              {!sc.Paid ? (
                <PayButton
                  StudentId={props.student.id}
                  CourseId={sc.Course.id}
                  updateFunc={props.updateFunc}
                  Paid={props.student.Paid}
                />
              ) : null}
            </div>
          </div>
        ))}
      </React.Fragment>
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
            API.setStudentImage(props.student.id, result.info.url).then(
              data => {
                console.log(result.info.url);
                props.updateFunc();
              }
            );
          }
        }
      )
      .open();
  };
  // End of Cloudinary Upload Widget

  const showCoursesBtn = () => {
    if (props.student.StudentCourses.length === 0) {
      return null;
    } else {
      return (
        <button
          className='btn btn-info btn-sm m-2'
          disabled={props.student.StudentCourses.length === 0}
          onClick={() => {
            setCourseState(!courseState);
          }}
        >
          <i className='far fa-eye'></i>{" "}
          {courseState ? "Hide Classes" : "Show Classes"}
        </button>
      );
    }
  };

  const showEditChild = () => {
    if (!state.user || state.user.id !== props.student.ParentId) {
      return null;
    }

    // TODO - UPDATE RETURN WITH EDIT CHILD MODAL

    return (
      <React.Fragment>
        <button type='button' className='btn btn-dark btn-sm m-2'>
          <i className='fas fa-pencil-alt'></i> Edit Child{" "}
        </button>
      </React.Fragment>
    );
  };

  const showImage = () => {
    return !props.student.img.includes("res.cloudinary.com") ? (
      <Avatar name={props.student.name} className='avatarCss' />
    ) : (
      <img
        src={props.student.img}
        className='card-img cloud-img'
        alt={props.student.name}
        style={{ width: 200, height: 200 }}
      />
    );
  };

  const showUploadWidget = () => {
    return (
      <button
        id='upload_widget'
        className='cloudinary-button'
        onClick={openWidget}
      >
        <i className='fas fa-cloud-upload-alt'></i> Upload Image
      </button>
    );
  };

  const showEnrollBtn = () => {
    if (!state.user || state.user.id !== props.student.ParentId) {
      return null;
    }

    return (
      <React.Fragment>
        <EnrollStudentModal
          student={props.student}
          form={EnrollStudentForm}
          onReturn={props.updateFunc}
        />
      </React.Fragment>
    );
  };

  const showCourseInfo = () => {
    return (
      <ul className='list-group'>
        <li className='list-group-item list-group-item-primary text-center mb-2'>
          Number of Classes:{" "}
          <span className='badge badge-primary badge-pill'>
            {props.student.StudentCourses.length}
          </span>
        </li>
      </ul>
    );
  };

  const showAmountPaid = () => {
    if (state.user.id !== props.student.ParentId && !state.user.isAdmin) {
      return null;
    }

    return (
      <ul className='list-group'>
        {props.student.StudentCourses.reduce((a, c) => {
          if (c.Paid) {
            return (
              <li className='list-group-item list-group-item-success text-center'>
                <i className='fas fa-check' /> PAID IN FULL
              </li>
            );
          } else {
            return (
              <li className='list-group-item list-group-item-danger text-center'>
                <i className='fas fa-exclamation-circle' /> Amount Due:{" "}
                <strong>${c.Course.cost} </strong>
              </li>
            );
          }
        }, 0)}
      </ul>
    );
  };

  const showParentName = () => {
    return (
      <ul className='list-group'>
        <li className='list-group-item list-group-item-dark text-center'>
          Parent:{" "}
          <Link to={`/parent/${props.student.User.id}`}>
            {props.student.User.name}
          </Link>
        </li>
      </ul>
    );
  };

  const showDeleteStudent = () => {
    return state.user && state.user.isAdmin ? (
      <button
        className='btn btn-danger btn-sm m-2'
        onClick={() => onDelete(props.student.id)}
      >
        <i className='far fa-trash-alt'></i> Delete Student
      </button>
    ) : null;
  };

  return (
    <div className='card student-card benefit'>
      {showImage()}
      {showUploadWidget()}
      <div className='card-body'>
        <Link to={`/student/${props.student.id}`}>
          <h5 className='card-title student-card-title'>
            {props.student.name}
          </h5>
        </Link>

        <div className='age-text'>Age: {props.student.age}</div>
        {showParentName()}
        {showAmountPaid()}
        {showCourseInfo()}
        <div className='text-center'>
          {showEnrollBtn()}
          {showCoursesBtn()}
          {/* NEED TO MAKE EDIT FUNCTION FOR BUTTON */}
          {showEditChild()}
          {showDeleteStudent()}
        </div>
      </div>
      {courseState ? <div className='card-body'>{renderCourses()}</div> : null}
    </div>
  );
}

export default CardStudent;
