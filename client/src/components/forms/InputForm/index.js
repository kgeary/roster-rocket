import React from "react";

function InputForm(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.placeholder}</label>
      <input
        required
        id={props.id}
        ref={props.inputRef}
        type={props.type}
        className="form-control mb-4"
        length={props.length}
        placeholder={props.placeholder}
      />
    </React.Fragment>
  );
}

export default InputForm;