import React, { useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import * as ACTIONS from "../../../utils/actions";
import { useStoreContext } from "../../../utils/GlobalState";
import InputForm from "../InputForm";

function LoginForm() {

  const [state, dispatch] = useStoreContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginAlert = alertFactory("alert");

  // Submit Click
  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    // Email
    const email = emailRef.current.value;
    if (!validate.email(email)) { errors.push("Invalid Email"); }

    // Password
    const password = passwordRef.current.value;
    if (!validate.password(password)) { errors.push("Invalid Password"); }

    if (errors.length > 0) {
      // Errors found during validaition - Set an alert and do not proceed
      loginAlert(errors.join("<br>"));
    } else {
      // No Errors in validation - Clear and hide the alert
      loginAlert(false);

      dispatch({ type: ACTIONS.LOADING });

      API.loginUser({ email, password })
        .then(res => {
          // Successful Login
          console.log("LOGGED IN");
          emailRef.current.value = "";
          passwordRef.current.value = "";
          dispatch({ type: ACTIONS.SET_USER, user: res.data });
        })
        .catch((err) => {
          // Login Failed
          console.log("LOGIN ERROR", err);
          if (err.status) { console.log("ERROR STATUS", err.status); }
          if (err.message.includes("status code 404")) {
            loginAlert("Unable to connect to server");
          } else {
            loginAlert("Invalid Email or Password");
          }

        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  }


  return (
    <Container>
      {state.username ? <Redirect to="/" /> : null}
      <div className="form-container">
        <h1>Login</h1>
        <form className="form-group mt-3 mb-2 form-login">
          {/* EMAIL */}
          <InputForm
            id="email"
            inputRef={emailRef}
            type="text"
            length="25"
            placeholder="Email"
          />
          {/* PASSWORD */}
          <InputForm
            id="password"
            inputRef={passwordRef}
            type="password"
            length="32"
            placeholder="Password"
          />
          {/* SUBMIT */}
          <button
            id="submitAccount"
            className="btn btn-success mt-3 mb-5"
            onClick={handleSubmit}>
            Login
        </button>
          <br />
          <div id="alert" role="alert" />
          <Link to="/signup">Signup for a new Account</Link>
          <Link to="/resetPassword">Forgot Password?</Link>
        </form>
      </div>
    </Container >
  );
}



export default LoginForm;