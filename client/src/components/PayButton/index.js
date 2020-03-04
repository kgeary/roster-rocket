import React from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
function PayButton(props) {

  const [state] = useStoreContext();

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
    (props.Paid || !state.user || !state.user.isAdmin) ?
      null :
      <button className="btn btn-sm btn-info" onClick={onClick}><i class='fas fa-check'></i>  MARK PAID</button>
  )
}

export default PayButton;