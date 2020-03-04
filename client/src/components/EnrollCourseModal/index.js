import React, { useState } from "react";
import Modal from "react-modal";
import { useStoreContext } from "../../utils/GlobalState";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

function EnrollCourseModal(props) {

  console.log("ECM", props.course);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [state] = useStoreContext();

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  const closeModal = (update = false) => {
    setIsOpen(false);
    if (props.onReturn && update && typeof update === "boolean") {
      console.log("UPDATE", update);
      props.onReturn();
    }
  }

  return (
    <React.Fragment>
      <button className="btn btn-primary btn-sm" onClick={openModal}>Add Student</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=""
      >
        <props.form students={state.students} course={props.course} closeModal={closeModal} />
      </Modal>
    </React.Fragment>
  );
}

export default EnrollCourseModal;