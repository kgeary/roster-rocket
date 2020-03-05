import React, { useEffect } from "react";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function EditStudentForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    let update = false;
    const errors = [];

    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
      errors.push("Invalid Name");
    }

    const age = parseInt(document.getElementById("age").value.trim());
    if (isNaN(age) || age < 1) {
      errors.push("Invalid Age");
    }
    // Validate age

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);
      API.editStudent(props.user.id, { name, age })
        .then(res => {
          console.log("Student Updated", res.data);
          update = true;
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Name Already Exists!");
          }
        })
        .finally(() => {
          props.closeModal(update);
        });
    }
  };
  useEffect(() => {
    document.getElementById("name").value = props.user.name;
    document.getElementById("age").value = props.user.age;
  }, []);

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
        <h1>Edit Child's Info</h1>
        <br />
        <form className='form-group'>
          {/* NAME */}
          <label htmlFor='name'>Full Name:</label>
          <InputForm
            id='name'
            type='text'
            length='32'
            placeholder='Child Name'
            defaultValue={props.user.name}
          />

          {/* AGE */}
          <label htmlFor='age'>Age:</label>
          <InputForm
            id='age'
            type='number'
            length='3'
            placeholder='Age'
            defaultValue={props.user.age}
          />
          <button
            id='submitEditStudent'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-user-plus'></i> Update Child's Info
          </button>
        </form>
      </div>
    </Container>
  );
}

export default EditStudentForm;
