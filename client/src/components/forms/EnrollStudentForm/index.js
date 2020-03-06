import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";

function EnrollStudentForm(props) {
  const formAlert = alertFactory("alert");
  const [state] = useStoreContext();

  console.log("ENROLL STUDENT FORM", props.student);

  const coursesTaken = props.student.StudentCourses.map(sc => sc.Course.id);
  const availableCourses = state.courses.filter(
    course => !coursesTaken.includes(course.id)
  );

  if (availableCourses.length < 1) {
    // Alert the user then close the modal
    return <h1>No Available Courses</h1>;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    let updateParent = false;

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      API.enrollCourse(
        props.student.id,
        document.getElementById("course").value
      )
        .then(res => {
          console.log("COURSE", res.data);
          updateParent = true;
          props.closeModal(updateParent);
        })
        .catch(err => {
          updateParent = false;
          console.log("ENROLL STUDENT ERROR", err);
          formAlert("Unable to Enroll!");
        });
    }
  };

  return (
    <Container>
      <div className='form-container'>
        <div className='close-modal'>
          <i
            className='far fa-times-circle'
            onClick={() => {
              props.closeModal(false);
            }}
          ></i>
        </div>
        <h1>Enroll in Course</h1>
        {/* COURSE */}
        <form className='form-group'>
          <label htmlFor='course'>Course:</label>
          <select required className='form-control' id='course'>
            {availableCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <button
            id='submitCourse'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            Enroll
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default EnrollStudentForm;
