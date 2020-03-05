import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import PayButton from "../PayButton";
import EnrollCourseModal from "../EnrollCourseModal";
import EnrollCourseForm from "../forms/EnrollCourseForm";
import EditCourseForm from "../forms/EditCourseForm";
import Avatar from "react-avatar";
import EditModal from "../EditModal";

function CardCourse(props) {
  const [courseState, setCourseState] = useState(props.accordion || false);
  const [state] = useStoreContext();
  //console.log("CARD COURSE", props.course);
  const onDelete = id => {
    API.removeCourse(id).then(res => {
      if (props.updateFunc) {
        props.updateFunc();
      }
    });
  };

  const getPaid = student => {
    if (state.user && (state.user.id === student.id || state.user.isAdmin)) {
      return (
        <React.Fragment>
          <td>
            {student.StudentCourse.Paid ? (
              "PAID"
            ) : (
                <span style={{ fontWeight: "bold", color: "red" }}>NOT PAID</span>
              )}
          </td>
          <td>
            {!student.StudentCourse.Paid ? (
              <PayButton
                StudentId={student.id}
                CourseId={props.course.id}
                updateFunc={props.updateFunc}
                Paid={student.Paid}
              />
            ) : null}
          </td>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <td>N/A</td>
          <td></td>
        </React.Fragment>
      );
    }
  };

  const getEditCourse = () => {
    return (
      state.user && state.user.isAdmin ? (
        <EditModal
          title="Edit Course"
          user={props.course}
          form={EditCourseForm}
          onReturn={props.updateFunc}
        />
      ) : null
    )
  }

  const getDeleteCourse = (course) => {
    return (
      state.user && state.user.isAdmin ? (
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDelete(course.id)}
        >
          <i className='far fa-trash-alt'></i> Delete Course
        </button>
      ) : null
    );
  }

  const showPaidSummary = () => {
    if (!state.user || !state.user.isAdmin) {
      return null;
    }

    return (
      <React.Fragment>
        <li className='list-group-item'>
          Paid: {props.course.Students.filter(s => s.StudentCourse.Paid).length}
        </li>
        <li className='list-group-item list-group-item-danger'>
          Unpaid: {props.course.Students.filter(s => !s.StudentCourse.Paid).length}
        </li>
      </React.Fragment>
    );
  };

  const renderStudents = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead className='thead'>
            <tr className='table-info'>
              <th scope='col'>Student</th>
              <th scope='col'>Parent</th>
              <th scope='col'>Age</th>
              <th scope='col'>Paid</th>
              <th scope='col'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>
              {props.course.Students.length === 0 ? (
                <tr>
                  <td colspan='5'>
                    <p className='p-4 text-center alert-danger'>
                      <strong>
                        Zero students are currently enrolled in this class.
                      </strong>
                    </p>
                  </td>
                </tr>
              ) : null}
              {props.course.Students.map(student => (
                <tr key={student.id}>
                  <td>
                    <Link to={`/student/${student.id}`}>{student.name}</Link>
                  </td>
                  <td>
                    <Link to={`/parent/${student.User.id}`}>
                      {student.User.name}
                    </Link>
                  </td>
                  <td>{student.age}</td>
                  {getPaid(student)}
                </tr>
              ))}
            </React.Fragment>
          </tbody>
        </table>
      </div>
    );
  };

  const showTeacherImage = () => {
    if (!props.course.User) {
      return <Avatar size={200} name="Not Available" className='avatarCss' />
    }

    return (
      !props.course.User.img.includes("res.cloudinary.com") ? (
        <Avatar size={200} name={props.course.User.name} className='avatarCss' />
      ) : (
          <img
            src={props.course.User.img}
            className='card-img cloud-img'
            alt={props.course.User.name}
            style={{ width: 200, height: 200 }}
          />
        )
    );
  };

  const showTeacher = () => {
    return props.course.User ? (
      <Link to={`/parent/${props.course.User.id}`}>
        {props.course.User.name}
      </Link>
    ) : (
        "Not Assigned"
      );
  };

  return (
    <div>
      <div className='card course-card pt-0'>
        <div className='card-header pb-0'>
          <div className='float-left'>
            <h1>{props.course.title}</h1>
          </div>
          <div className='text-right pt-2'>
            {getEditCourse()}
            {getDeleteCourse(props.course)}
          </div>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col col-lg-3 text-center'>{showTeacherImage()}</div>
            <div className='col col-lg-9'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>Teacher: {showTeacher()}</li>
                <li className='list-group-item'>
                  Location: {props.course.location}
                </li>
                <li className='list-group-item'>
                  Enrolled: {props.course.Students.length}
                </li>
                <li className='list-group-item'>
                  Capacity: {props.course.capacity}
                </li>
                {showPaidSummary()}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='card pt-0 mt-5'>
        <div className='card-header pb-0'>
          <div className='float-left'>
            <h1>Students Enrolled In This Class</h1>
          </div>
          <div className='float-right pt-2'>
            <EnrollCourseModal
              course={props.course}
              form={EnrollCourseForm}
              onReturn={props.updateFunc}
            />{" "}
            <button
              className='btn btn-info btn-sm'
              onClick={() => {
                setCourseState(!courseState);
              }}
            >
              <i className='far fa-eye' />{" "}
              {courseState ? "Hide Students" : "Show Students"}
            </button>
          </div>
        </div>
        {courseState ? renderStudents() : null}
      </div>
    </div>
  );
}

export default CardCourse;
