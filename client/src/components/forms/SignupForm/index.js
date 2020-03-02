import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function SignupForm() {

  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const imgRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const formAlert = alertFactory("alert");

  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const email = emailRef.current.value.trim();
    if (!validate.email(email)) { errors.push("Invalid Email Address"); }

    const name = nameRef.current.value.trim();
    if (name.length < 2) { errors.push("Invalid Name"); }

    const phone = phoneRef.current.value.trim();
    // Validate Phone?

    const img = imgRef.current.value.trim();
    // Validate image?

    const password = passwordRef.current.value;
    if (!validate.password(password)) {
      errors.push("Invalid Password.<br>Password must be 6-18 chars and may only contain Letters, Numbers, Space, -, or _");
    }

    const password2 = password2Ref.current.value;
    if (password !== password2) {
      errors.push("Passwords Do Not Match!");
    }
    const newUser = {
      email,
      password,
      name,
      phone
    };

    if (img.includes("http")) {
      newUser.img = img;
    }

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);
      dispatch({ type: ACTIONS.LOADING });
      API.addUser(newUser)
        .then(res => {
          console.log("USER", res.data);
          emailRef.current.value = "";
          nameRef.current.value = "";
          phoneRef.current.value = "";
          imgRef.current.value = "";
          passwordRef.current.value = "";
          password2Ref.current.value = "";
          dispatch({ type: ACTIONS.SET_USER, user: res.data });
        }).catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Username Already Exists!");
          }
        }).finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  }

  return (
    <Container>
      {state.username ? <Redirect to="/" /> : null}
      <div className="form-container">
        <h1>Signup for an Account</h1>
        <form className="form-group mt-3 mb-2 form-signup">

          {/* EMAIL */}
          <InputForm
            id="email"
            inputRef={emailRef}
            type="email"
            length="64"
            placeholder="Email"
          />

          {/* NAME */}
          <InputForm
            id="name"
            inputRef={nameRef}
            type="text"
            length="32"
            placeholder="Your Name"
          />

          {/* PHONE */}
          <InputForm
            id="phone"
            inputRef={phoneRef}
            type="tel"
            length="32"
            placeholder="Phone Number"
          />

          {/* Photo */}
          <InputForm
            id="img"
            inputRef={imgRef}
            type="url"
            length="128"
            placeholder="URL to Your Photo (Leave Blank for Default)"
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
            placeholder="Confirm Password"
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