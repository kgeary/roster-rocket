import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function AddCodeForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    let update;
    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const code = document.getElementById("code").value.trim() || "";

      API.addCode(code)
        .then(res => {
          update = true;
          props.closeModal(update);
        })
        .catch(err => {
          update = false;
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Adding Code!");
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
        <h1>Add a Group Code</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* PARENT EMAIL */}
          <label htmlFor='email'>New Group Code:</label>
          <InputForm
            id='code'
            type='number'
            length='10'
            placeholder='Group Code...'
          />

          <button
            id='submitCode'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-envelope'></i> Add Code
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddCodeForm;
