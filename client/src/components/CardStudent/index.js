import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import EnrollStudentModal from "../EnrollStudentModal";
import EnrollStudentForm from "../forms/EnrollStudentForm";
import EditStudentForm from "../forms/EditStudentForm"
import EditModal from "../EditModal"
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

  const showDropBtn = (sc) => {
    if (props.student.ParentId !== state.user.id && !state.user.isAdmin) {
      return null;
    }

    return (
      <React.Fragment>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDrop(props.student.id, sc.CourseId)}
        >
          Drop Class
        </button>{" "}
      </React.Fragment>
    );
  }

  const showStudentPaid = (sc) => {
    if (props.student.ParentId !== state.user.id && !state.user.isAdmin) {
      return null;
    }

    return (
      <h6>
        Paid:{" "}
        {sc.Paid ? (
          "PAID"
        ) : (
            <span style={{ fontWeight: "bold", color: "red" }}>
              NOT YET PAID
        </span>
          )}
      </h6>
    )
  }

  const showTeacher = (sc) => {
    if (!sc.Course.User) {
      return (
        <h6>Teacher: Not Assigned</h6>
      )
    }
    return (
      <React.Fragment>
        <h6>
          <Link to={`/parent/${sc.Course.User.id}`}>Teacher: {sc.Course.User.name}</Link>
        </h6>
        <h6>
          Teacher Phone: {sc.Course.User.phone}
        </h6>
      </React.Fragment>
    )
  }

  const renderCourses = () => {
    return (
      <React.Fragment>
        {props.student.StudentCourses.length > 0 ? (
          <h3 className='subtitle'>Classes</h3>
        ) : null}
        {props.student.StudentCourses.map(sc => (
          <div className='card' key={sc.Course.title}>
            <div className='card-body'>
              <h4 className='card-title'>
                <Link to={`/course/${sc.Course.id}`}>{sc.Course.title}</Link>
              </h4>
              {showTeacher(sc)}
              <h6>Location: {sc.Course.location}</h6>
              <h6>Cost: {sc.Course.cost}</h6>
              {showStudentPaid(sc)}
              {showDropBtn(sc)}
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
          className='btn btn-info btn-sm'
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

    return (
      <React.Fragment>
        <EditModal
          title='Edit Student'
          user={props.student}
          form={EditStudentForm}
          onReturn={props.updateFunc}
        />
      </React.Fragment>
    );
  }

  const showImage = () => {
    return (
      !props.student.img.includes("res.cloudinary.com") ? (
        <Avatar name={props.student.name} className='avatarCss' />
      ) : (
          <img
            src={props.student.img}
            className='card-img cloud-img'
            alt={props.student.name}
            style={{ width: 200, height: 200 }}
          />
        )
    );
  }

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
  }

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
        />{" "}
      </React.Fragment>
    )
  }

  const showCourseInfo = () => {
    return (
      props.student.StudentCourses.length === 0 ? (
        <div className='age-text'>Not Enrolled</div>
      ) : (
          <div className='age-text'>
            Number of classes:{" "}
            <span className='badge badge-primary badge-pill'>
              {props.student.StudentCourses.length}
            </span>
          </div>
        )
    );
  }

  const showAmountPaid = () => {
    if (state.user.id !== props.student.ParentId && !state.user.isAdmin) {
      return null;
    }

    return (
      <div className='age-text'>
        Amount Owed: $
          {props.student.StudentCourses.reduce((a, c) => {
          return c.Paid ?
            a :
            a + c.Course.cost;
        }, 0)}
      </div>
    )
  }

  const showDeleteStudent = () => {
    return (
      state.user && state.user.isAdmin ? (
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDelete(props.student.id)}
        >
          <i className='far fa-trash-alt'></i> Delete Student
        </button>
      ) : null
    )
  }

  return (
    <div className='card student-card benefit'>
      {showImage()}
      {showUploadWidget()}
      <div className='card-body'>
        <h5 className='card-title student-card-title'>
          <Link to={`/student/${props.student.id}`}>{props.student.name}</Link>
        </h5>
        <div className='age-text'>Age: {props.student.age}</div>
        {showCourseInfo()}
        {showAmountPaid()}
        <ul className='list-group'>
          <li className='list-group-item text-center'>
            Parent:{" "}
            <Link to={`/parent/${props.student.User.id}`}>
              {props.student.User.name}
            </Link>
          </li>
        </ul>
        <div className='text-center pt-4'>
          {showEnrollBtn()}
          {showCoursesBtn()}
          <br />
          <br />
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
