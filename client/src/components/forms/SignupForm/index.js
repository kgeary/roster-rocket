import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../../Grid";
import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function SignupForm() {
  const formAlert = alertFactory("alert");
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const email = document.getElementById("email").value.trim();
    if (!validate.email(email)) {
      errors.push("Invalid Email Address");
    }

    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
      errors.push("Invalid Name");
    }

    const phone = document.getElementById("phone").value.trim();
    if (phone.length < 7) {
      errors.push("Invalid Phone Number")
    }

    const code = document.getElementById("code").value.trim();
    // Validate Group Code?

    const password = document.getElementById("password").value;
    if (!validate.password(password)) {
      errors.push(
        "Invalid Password.<br>Password must be 6-18 chars and may only contain Letters, Numbers, Space, -, or _"
      );
    }

    const password2 = document.getElementById("password2").value;
    if (password !== password2) {
      errors.push("Passwords Do Not Match!");
    }

    const newUser = {
      email,
      password,
      name,
      phone,
      code
    };

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);
      dispatch({ type: ACTIONS.LOADING });
      API.addUser(newUser)
        .then(res => {
          document.getElementById("email").value = "";
          document.getElementById("name").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("password").value = "";
          document.getElementById("password2").value = "";
          dispatch({ type: ACTIONS.SET_USER, user: res.data });
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("A user with that email already exists!");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  };

  return (
    <Container>
      {
        state.user ?
          (
            state.user.isAdmin ?
              <Redirect to='/admin' /> :
              <Redirect to='/parent' />
          ) :
          null
      }
      <div className='form-container'>
        <br />
        <div className='gap'></div>
        <br />
        <h1>Signup for an Account</h1>
        <br />
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* EMAIL */}
          <label htmlFor='email'>Email:</label>
          <InputForm
            id='email'
            type='email'
            length='64'
            placeholder='Email'
          />

          {/* NAME */}
          <label htmlFor='name'>Full Name:</label>
          <InputForm
            id='name'
            type='text'
            length='32'
            placeholder='Your Name'
          />

          {/* PHONE */}
          <label htmlFor='phone'>Phone:</label>
          <InputForm
            id='phone'
            type='tel'
            length='32'
            placeholder='Phone Number'
          />

          {/* Group Code */}
          <label htmlFor='code'>Co-op Group Code:</label>
          <InputForm
            id='code'
            type='tel'
            length='32'
            placeholder='Group Code'
          />

          {/* PASSWORD */}
          <label htmlFor='password'>Password:</label>
          <InputForm
            id='password'
            type='password'
            length='32'
            placeholder='Password'
          />

          {/* PASSWORD2 */}
          <label htmlFor='password2'>Confirm Password:</label>
          <InputForm
            id='password2'
            type='password'
            length='32'
            placeholder='Confirm Password'
          />

          <button
            id='submitAccount'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            <i className='fas fa-user-plus'></i> Create Account
          </button>
          <br />
          <Link to='/login'>Already a user? Login to your account</Link>
          <div id='alert' role='alert' />
        </form>
      </div>
      <div className='gap'></div>
      <br />
    </Container>
  );
}

export default SignupForm;
