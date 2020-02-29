import React, { useRef, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function AddCourseForm() {
  const titleRef = useRef();
  const locRef = useRef();
  const capacityRef = useRef();
  const teacherRef = useRef();
  const formAlert = alertFactory("alert");

  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const title = titleRef.current.value;
    const location = locRef.current.value;
    const capacity = capacityRef.current.value;
    const teacher = teacherRef.current.value;

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);
      dispatch({ type: ACTIONS.LOADING });
      API.addCourse({
        title,
        location,
        capacity,
        teacher
      })
        .then(res => {
          console.log("COURSE", res.data);
          titleRef.current.value = "";
          locRef.current.value = "";
          capacityRef.current.value = "";
          teacherRef.current.value = "";
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Course Already Exists!");
          }
        })
        .finally(() => {
          dispatch({ type: ACTIONS.DONE });
        });
    }
  };

  return (
    <Container>
      <div className='form-container'>
        <h1>Create a course</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* COURSE TITLE */}
          <InputForm
            id='title'
            inputRef={titleRef}
            type='text'
            length='64'
            placeholder='Course Title...'
          />

          {/* COURSE LOCATION */}
          <InputForm
            id='location'
            inputRef={locRef}
            type='text'
            length='64'
            placeholder='Location...'
          />

          {/* COURSE CAPACITY */}
          <InputForm
            id='capacity'
            inputRef={capacityRef}
            type='int'
            length='64'
            placeholder='Max Course Capacity...'
          />

          {/* COURSE TEACHER */}
          <InputForm
            id='teacher'
            inputRef={teacherRef}
            type='text'
            length='64'
            placeholder='Teacher Name...'
          />

          <button
            id='submitCourse'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          >
            Create Course
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddCourseForm;
