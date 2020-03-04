import React from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function AddParentForm(props) {
  const formAlert = alertFactory("alert");

  const [, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const email = document.getElementById("email").value || "";

      dispatch({ type: ACTIONS.LOADING });
      API.emailParent({
        email
      })
        .then(res => {
          console.log("EMAIL", res.data);
          document.getElementById("email").value = "";
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Inviting Parent!");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
          props.closeModal();
        });
    }
  };

  return (
    <Container>
      <div className='form-container'>
        <h1>Invite a Parent</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* PARENT EMAIL */}
          <InputForm
            id='email'
            type='email'
            length='64'
            placeholder='Email...'
          />

          <button
            id='submitParent'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            Send Invite
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddParentForm;
