import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function AddStudentForm(props) {
  const formAlert = alertFactory("alert");
  const [, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const ParentId = document.getElementById("parent").value;

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      dispatch({ type: ACTIONS.LOADING });
      API.addStudent({
        name,
        age,
        ParentId
      })
        .then(res => {
          console.log("COURSE", res.data);
          document.getElementById("name").value = "";
          document.getElementById("age").value = "";
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Unable to add Student!");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
          props.closeModal();
        });
    }
  };

  return (
    <Container>
      <div className='form-container'>
        <h1>Add Student</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* STUDENT NAME */}
          <label htmlFor='name'>Name:</label>
          <InputForm
            id='name'
            type='text'
            length='64'
            placeholder='Student Name'
          />

          {/* STUDENT AGE */}
          <label htmlFor='age'>Age:</label>
          <InputForm
            id='age'
            type='number'
            length='3'
            placeholder='Student Age'
          />

          {/* STUDENT PARENT */}
          <label htmlFor='parent'>Parent:</label>
          <select required className='form-control' id='parent'>
            {props.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button
            id='submitCourse'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            <i class='fas fa-user-plus'></i> Add Student
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddStudentForm;
