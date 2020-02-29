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

function EnrollStudentModal(props) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useStoreContext();

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
      <button className="btn btn-primary btn-sm" onClick={openModal}>Add Class</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=""
      >
        <props.form courses={state.courses} student={props.student} closeModal={closeModal} />
      </Modal>
    </React.Fragment>
  );
}

export default EnrollStudentModal;