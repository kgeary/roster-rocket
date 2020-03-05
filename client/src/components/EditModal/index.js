import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  }
};

Modal.setAppElement("#root");

function EditModal(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  };

  const closeModal = args => {
    console.log("CLOSE MODAL ARGS", args, typeof args);
    setIsOpen(false);
    if (props.onReturn && typeof args === "boolean" && args) {
      console.log("UPDATE");
      props.onReturn();
    }
  };

  return (
    <React.Fragment>
      <button className='btn btn-dark btn-sm m-2' onClick={openModal}>
        <i className='fas fa-edit' /> {props.title}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        contentLabel=''
      >
        <props.form user={props.user} closeModal={closeModal} />
      </Modal>
    </React.Fragment>
  );
}

export default EditModal;
