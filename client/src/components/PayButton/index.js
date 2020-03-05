import React from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
function PayButton(props) {
  const [state] = useStoreContext();

  const onClick = () => {
    API.markPaid(!props.Paid, props.StudentId, props.CourseId)
      .then(res => {
        // Call the updateFunc cb on success
        props.updateFunc();
      })
      .catch(err => {
        console.log("ERROR UPDATING PAID", err);
      });
  };

  const btnClass = props.Paid ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success';
  const btnText = props.Paid ? "UNDO PAID" : "MARK PAID";
  return !state.user || !state.user.isAdmin ? null : (
    <button className={btnClass} onClick={onClick}>
      <i className='fas fa-check'></i> {btnText}
    </button>
  );
}

export default PayButton;
