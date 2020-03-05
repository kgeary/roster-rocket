import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import * as ACTIONS from "../../../utils/actions";
import { useStoreContext } from "../../../utils/GlobalState";
import InputForm from "../InputForm";

function PasswordChangeForm() {
  const [, dispatch] = useStoreContext();
  const oldPassword = useRef();
  const newPassword = useRef();
  const newPassword2 = useRef();
  const formAlert = alertFactory("alert");
  const [finished, setFinished] = useState(false);

  // Submit Click
  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    // Old Password
    const pwOld = oldPassword.current.value;
    if (!validate.password(pwOld)) {
      errors.push("Invalid Old Password");
    }

    // New Password
    const pwNew = newPassword.current.value;
    if (!validate.password(pwNew)) {
      errors.push("Invalid Password");
    }

    const pwNew2 = newPassword2.current.value;
    if (pwNew !== pwNew2) {
      errors.push("New Passwords do not match!");
    }

    if (errors.length > 0) {
      // Errors found during validaition - Set an alert and do not proceed
      formAlert(errors.join("<br>"));
    } else {
      // No Errors in validation - Clear and hide the alert
      formAlert(false);

      dispatch({ type: ACTIONS.LOADING });

      API.changePassword({ pwOld, pwNew })
        .then(res => {
          // Successful Login
          console.log("Password Changed", res);
          oldPassword.current.value = "";
          newPassword.current.value = "";
          newPassword2.current.value = "";
          formAlert("Password Updated");
          setTimeout(() => setFinished(true), 2000);
        })
        .catch(err => {
          // Login Failed
          console.log("PASSWORD CHANGE", err.data);
          if (err.status) {
            console.log("ERROR STATUS", err.status);
          }
          if (err.message) {
            formAlert(err.message);
          } else {
            formAlert("Invalid Password");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  };

  if (finished) {
    return <Redirect to='/parent' />;
  }

  return (
    <Container>
      <div className='form-container'>
        <div className='gap' />
        <h1>Change Password</h1>
        <div className='gap' />
        <form className='form-group mt-3 mb-2 form-login'>
          {/* OLD PASSWORD */}
          <label htmlFor='old'>Old Password:</label>
          <InputForm
            id='old'
            inputRef={oldPassword}
            type='password'
            length='25'
            placeholder='Old Password'
          />
          {/* PASSWORD */}
          <label htmlFor='password'>New Password:</label>
          <InputForm
            id='password'
            inputRef={newPassword}
            type='password'
            length='32'
            placeholder='New Password'
          />

          {/* CONFIRM PASSWORD */}
          <label htmlFor='password2'>Confirm New Password:</label>
          <InputForm
            id='password2'
            inputRef={newPassword2}
            type='password'
            length='32'
            placeholder='Confirm New Password'
          />
          {/* SUBMIT */}
          <button
            id='submit'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            Change Password
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default PasswordChangeForm;
