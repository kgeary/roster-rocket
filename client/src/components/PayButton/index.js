import React from "react";
import API from "../../utils/API";
function PayButton(props) {

  const onClick = () => {
    API.markPaid(props.StudentId, props.CourseId)
      .then(res => {
        // Call the updateFunc cb on success
        props.updateFunc();
      })
      .catch(err => {
        console.log("ERROR UPDATING PAID", err);
      })
  }

  return (
    props.Paid ?
      null :
      <button className="btn btn-sm btn-info" onClick={onClick}>{props.children}</button>
  )
}

export default PayButton;