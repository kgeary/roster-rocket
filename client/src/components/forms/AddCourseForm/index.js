import React, { useRef } from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import InputForm from "../InputForm";

function AddCourseForm(props) {
  const titleRef = useRef();
  const locRef = useRef();
  const capacityRef = useRef();
  const costRef = useRef();
  const formAlert = alertFactory("alert");

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    let update;

    const title = titleRef.current.value.trim();
    const location = locRef.current.value.trim();
    const capacity = parseInt(capacityRef.current.value.trim());
    const cost = parseInt(costRef.current.value.trim());

    if (title.length < 3) {
      errors.push("Invalid Course Title");
    }

    if (location.length < 1) {
      errors.push("Invalid Location");
    }

    if (isNaN(cost) || cost < 0) {
      errors.push("Invalid Cost");
    }

    if (isNaN(capacity) || capacity < 0) {
      errors.push("Invalid Capacity");
    }

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const TeacherId = document.getElementById("teacher").value || null;

      API.addCourse({
        title,
        location,
        capacity: parseInt(capacity),
        cost: parseFloat(cost),
        TeacherId: TeacherId
      })
        .then(res => {
          //console.log("COURSE", res.data);
          update = true;
          props.closeModal(update);
        })
        .catch(err => {
          update = false;
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Adding Course!");
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
        <h1>Add Class</h1>
        <form>
          <div className='form-group row'>
            {/* COURSE TITLE */}
            <label className='col-sm-4 col-form-label-sm hidden-xs' htmlFor='title'>
              Class Title:
            </label>
            <div className='col-sm-8'>
              <InputForm
                id='title'
                inputRef={titleRef}
                type='text'
                length='64'
                placeholder='Class Title...'
              />
            </div>
          </div>
          <div className='form-group row'>
            {/* COURSE LOCATION */}
            <label className='col-sm-4 col-form-label-sm hidden-xs' htmlFor='location'>
              Location:
            </label>
            <div className='col-sm-8'>
              <InputForm
                id='location'
                inputRef={locRef}
                type='text'
                length='64'
                placeholder='Location...'
              />
            </div>
          </div>
          <div className='form-group row'>
            {/* COURSE CAPACITY */}
            <label className='col-sm-4 col-form-label-sm hidden-xs' htmlFor='capacity'>
              Max Size:
            </label>
            <div className='col-sm-8'>
              <InputForm
                id='capacity'
                inputRef={capacityRef}
                type='int'
                length='64'
                placeholder='Max Class Size...'
              />
            </div>
          </div>
          <div className='form-group row'>
            {/* COURSE COST */}
            <label className='col-sm-4 col-form-label-sm hidden-xs' htmlFor='location'>
              Cost:
            </label>
            <div className='col-sm-8'>
              <InputForm
                id='cost'
                inputRef={costRef}
                type='int'
                length='64'
                placeholder='Cost'
              />
            </div>
          </div>
          <div className='form-group row'>
            {/* COURSE TEACHER */}
            <label className='col-sm-4 col-form-label-sm' htmlFor='teacher'>
              Teacher:
            </label>
            <div className='col-sm-8'>
              <select className='form-control' id='teacher'>
                <option key={null} value=''>
                  None
                </option>
                {props.users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            id='submitCourse'
            className='btn btn-success mt-3'
            onClick={handleSubmit}
          >
            <i className='fas fa-folder-plus'></i> Create Class
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddCourseForm;
