import React from "react";

import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function AddParentForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    let update;
    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const email = document.getElementById("email").value.trim();
      const code = document.getElementById("code").value;

      if (!validate.email(email)) {
        errors.push("Invalid Email Address");
      }

      if (code.length < 1) {
        errors.push("Invalid Group Code");
      }

      API.emailParent(email, code)
        .then(res => {
          //console.log("EMAIL", res.data);
          update = true;
          props.closeModal(update);
        })
        .catch(err => {
          update = false;
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Inviting Parent!");
          }
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
        <h1>Invite a Parent</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* PARENT EMAIL */}
          <label htmlFor='email'>Enter parent's email address:</label>
          <InputForm
            id='email'
            type='email'
            length='64'
            placeholder='Email...'
          />

          <label htmlFor='teacher'>Group Code:</label>
          <select className='form-control' id='code'>
            {props.users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <button
            id='submitParent'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-envelope'></i> Send Invite
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddParentForm;
