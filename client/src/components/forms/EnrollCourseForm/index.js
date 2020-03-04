import React from "react";
import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";

function EnrollCourseForm(props) {
  const formAlert = alertFactory("alert");
  const [state] = useStoreContext();

  console.log("ENROLL COURSE FORM", state.students);

  const studentsEnrolled = props.course.Students.map(student => student.id);
  const availableStudents = state.students.filter(
    student => !studentsEnrolled.includes(student.id)
  );

  if (availableStudents.length < 1) {
    // Alert the user then close the modal
    return <h1>No Available Students</h1>;
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
        document.getElementById("student").value,
        props.course.id
      )
        .then(res => {
          console.log("STUDENT", res.data);
          updateParent = true;
        })
        .catch(err => {
          updateParent = false;
          console.log("ENROLL COURSE ERROR", err);
          formAlert("Unable to Enroll!");
        })
        .finally(() => {
          props.closeModal(updateParent);
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
        <h1>Enroll Student in Course</h1>
        {/* COURSE */}
        <form className='form-group'>
          <label htmlFor='course'>Student:</label>
          <select required className='form-control' id='student'>
            {availableStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <button
            id='submitCourse'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            <i className='fas fa-user-plus'></i> Enroll
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default EnrollCourseForm;
