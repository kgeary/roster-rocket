import React, { useRef } from "react";

import { Container } from "../../Grid";
// import validate from "../../../utils/validate";
import alertFactory from "../../../utils/alertFactory";
import API from "../../../utils/API";
import { useStoreContext } from "../../../utils/GlobalState";
import * as ACTIONS from "../../../utils/actions";
import InputForm from "../InputForm";

function AddCourseForm(props) {
  const titleRef = useRef();
  const locRef = useRef();
  const capacityRef = useRef();
  const costRef = useRef();
  const formAlert = alertFactory("alert");

  const [, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];

    const title = titleRef.current.value;
    const location = locRef.current.value;
    const capacity = capacityRef.current.value;
    const cost = costRef.current.value;

    if (errors.length > 0) {
      formAlert(errors.join("<br>"));
    } else {
      formAlert(false);

      const TeacherId = document.getElementById("teacher").value || null;

      dispatch({ type: ACTIONS.LOADING });
      API.addCourse({
        title,
        location,
        capacity: parseInt(capacity),
        cost: parseFloat(cost),
        TeacherId: TeacherId
      })
        .then(res => {
          console.log("COURSE", res.data);
          titleRef.current.value = "";
          locRef.current.value = "";
          capacityRef.current.value = "";
          costRef.current.value = "";
        })
        .catch(err => {
          if (err.message) {
            formAlert(err.message);
          } else {
            console.log(err);
            formAlert("Error Adding Course!");
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
        <h1>Create a course</h1>
        <form className='form-group mt-3 mb-2 form-signup'>
          {/* COURSE TITLE */}
          
          <label htmlFor="title">Course Title:</label>
          <InputForm
            id='title'
            inputRef={titleRef}
            type='text'
            length='64'
            placeholder='Course Title...'
          />

          {/* COURSE LOCATION */}
          <label htmlFor="location">Location:</label>
          <InputForm
            id='location'
            inputRef={locRef}
            type='text'
            length='64'
            placeholder='Location...'
          />

          {/* COURSE CAPACITY */}
          <label htmlFor="capacity">Max Class Capacity:</label>
          <InputForm
            id='capacity'
            inputRef={capacityRef}
            type='int'
            length='64'
            placeholder='Max Course Capacity...'
          />

          {/* COURSE COST */}
          <label htmlFor="location">Cost:</label>
          <InputForm
            id='cost'
            inputRef={costRef}
            type='int'
            length='64'
            placeholder='Cost'
          />

          {/* COURSE TEACHER */}
          <label htmlFor="teacher">Teacher:</label>
          <select className="form-control" id="teacher">
            <option key={null} value="">None</option>
            {
              props.users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </select>

          <button
            id='submitCourse'
            className='btn btn-success mt-3 mb-5'
            onClick={handleSubmit}
          ><i class='fas fa-folder-plus'></i> Create Course
          </button>
          <br />
          <div id='alert' role='alert' />
        </form>
      </div>
    </Container>
  );
}

export default AddCourseForm;
