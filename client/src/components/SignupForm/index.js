import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Grid";
import validate from "../../utils/validate";
import alertFactory from "../../utils/alertFactory";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import * as ACTIONS from "../../utils/actions";
import InputForm from "../InputForm";

function SignupForm() {

  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const signupAlert = alertFactory("alert");

  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const user = userRef.current.value;
    if (!validate.user(user)) { errors.push("Invalid User Name"); }

    const email = emailRef.current.value;
    if (!validate.email(email)) { errors.push("Invalid Email Address"); }

    const password = passwordRef.current.value;
    if (!validate.password(password)) { errors.push("Invalid Password"); }

    const password2 = password2Ref.current.value;
    if (password !== password2) { errors.push("Passwords Do Not Match!"); }

    if (errors.length > 0) {
      signupAlert(errors.join("<br>"));
    } else {
      signupAlert(false);
      dispatch({ type: ACTIONS.LOADING });
      API.addUser({
        username: user,
        email,
        password
      }).then(dbUser => {
        console.log("USER", dbUser.user);
        dispatch({ type: ACTIONS.SET_USER, user: dbUser.user });
        dispatch({ type: ACTIONS.DONE });
        setTimeout(() => {
          window.history.push("/");
        }, 1000);
      }).catch(err => {
        console.log("SIGNUP ERR", err);
        signupAlert("Username Already Exists!");
      })
    }
  }

  return (
    <Container>
      <div className="form-container">
        <h1>Signup for an Account</h1>
        <form className="form-group mt-3 mb-2 form-signup">

          {/* USER NAME */}
          <InputForm
            id="user"
            inputRef={userRef}
            type="text"
            length="25"
            placeholder="User"
          />

          {/* EMAIL */}
          <InputForm
            id="email"
            inputRef={emailRef}
            type="email"
            length="64"
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

          {/* PASSWORD2 */}
          <InputForm
            id="password2"
            inputRef={password2Ref}
            type="password"
            length="32"
            placeholder="Password"
          />

          <button
            id="submitAccount"
            className="btn btn-success mt-3 mb-5"
            onClick={handleSubmit}>
            Create Account
          </button>
          <br />
          <Link to="/login">Already a user? Login to your account</Link>
          <div id="alert" role="alert" />

        </form>
      </div>
    </Container>
  );
}



export default SignupForm;