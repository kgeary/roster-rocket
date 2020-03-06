import React, { useEffect } from "react";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function EditUserForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    let update = false;
    const errors = [];

    const email = document.getElementById("email").value;
    if (!validate.email(email)) {
      errors.push("Invalid Email Address");
    }

    const name = document.getElementById("name").value;
    if (name.length < 2) {
      errors.push("Invalid Name");
    }

    const phone = document.getElementById("phone").value;
    // Validate Phone?

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);
      API.editUser(props.user.id, { email, name, phone })
        .then(res => {
          console.log("USER", res.data);
          update = true;
          props.closeModal(update);
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Username Already Exists!");
          }
        });
    }
  };
  useEffect(() => {
    document.getElementById("email").value = props.user.email;
    document.getElementById("name").value = props.user.name;
    document.getElementById("phone").value = props.user.phone;
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
        <h1>Edit Your Account Info</h1>
        <br />
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* EMAIL */}
          <label htmlFor='email'>Email:</label>
          <InputForm
            id='email'
            type='email'
            length='64'
            defaultValue={props.user.email}
          />

          {/* NAME */}
          <label htmlFor='name'>Full Name:</label>
          <InputForm
            id='name'
            type='text'
            length='32'
            placeholder='Your Name'
            defaultValue={props.user.name}
          />

          {/* PHONE */}
          <label htmlFor='phone'>Phone:</label>
          <InputForm
            id='phone'
            type='tel'
            length='32'
            placeholder='Phone Number'
            defaultValue={props.user.phone}
          />
          <button
            id='submitEditAccount'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            <i className='fas fa-user-plus'></i> Update Account Info
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default EditUserForm;
