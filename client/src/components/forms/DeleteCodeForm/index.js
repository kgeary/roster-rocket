import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function DeleteCodeForm(props) {
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    let update;
    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const code = parseInt(document.getElementById("code").value.trim()) || 0;
      if (isNaN(code) || code.length < 2 || code < 1) {
        errors.push("Invalid Code!");
      }
      API.removeCode(code)
        .then(res => {
          console.log("CODE", res.data);
          update = true;
          props.closeModal(update);
        })
        .catch(err => {
          update = false;
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Removing Code!");
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
        <h1>Delete a Group Code</h1>
        <form className='form-group mt-3 mb-2 form-signup'>

          <label htmlFor='code'>Group Code to Remove:</label>
          <select className='form-control' id='code'>
            {props.users.map(code => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <button
            id='submitCode'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-envelope'></i> Delete Code
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default DeleteCodeForm;
