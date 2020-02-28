import React, { useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import * as ACTIONS from "../../../utils/actions";
import { useStoreContext } from "../../../utils/GlobalState";
import InputForm from "../InputForm";

function PasswordResetForm() {

  const [state, dispatch] = useStoreContext();
  const emailRef = useRef();
  const formAlert = alertFactory("alert");

  // Submit Click
  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    // Old Password
    const email = emailRef.current.value;
    if (!validate.email(email)) { errors.push("Invalid Email Address"); }

    if (errors.length > 0) {
      // Errors found during validaition - Set an alert and do not proceed
      formAlert(errors.join("<br>"));
    } else {
      // No Errors in validation - Clear and hide the alert
      formAlert(false);

      dispatch({ type: ACTIONS.LOADING });

      API.resetPassword(email)
        .then(res => {
          // Successful Login
          console.log("Password Reset Submitted");
          emailRef.current.value = "";
        })
        .catch((err) => {
          // Login Failed
          console.log("PASSWORD CHANGE", err);
          if (err.status) { console.log("ERROR STATUS", err.status); }
          if (err.message.includes("status code 404")) {
            formAlert("Unable to connect to server");
          } else {
            formAlert("Invalid Email or Password");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  }


  return (
    <Container>
      <div className="form-container">
        <h1>Reset Password</h1>
        <form className="form-group mt-3 mb-2 form-login">
          {/* EMAIL */}
          <InputForm
            id="email"
            inputRef={emailRef}
            type="email"
            length="32"
            placeholder="Email Address"
          />
          {/* SUBMIT */}
          <button
            id="submit"
            className="btn btn-success mt-3 mb-5"
            onClick={handleSubmit}>
            Reset Password
        </button>
        </form>
        <div id="alert" role="alert" />
      </div>
    </Container >
  );
}



export default PasswordResetForm;