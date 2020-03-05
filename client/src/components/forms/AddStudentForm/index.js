import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function AddStudentForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    let update;
    e.preventDefault();
    const errors = [];

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const ParentId = document.getElementById("parent").value;

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      API.addStudent({
        name,
        age,
        ParentId
      })
        .then(res => {
          console.log("COURSE", res.data);
          update = true;
        })
        .catch(err => {
          update = false;
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Unable to add Student!");
          }
        })
        .finally(() => {
          props.closeModal(update);
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
        <h1>Add Child</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* STUDENT NAME */}
          <label htmlFor='name'>Name:</label>
          <InputForm
            id='name'
            type='text'
            length='64'
            placeholder='Child Name'
          />

          {/* STUDENT AGE */}
          <label htmlFor='age'>Age:</label>
          <InputForm
            id='age'
            type='number'
            length='3'
            placeholder='Child Age'
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
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-user-plus'></i> Add Child
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddStudentForm;
