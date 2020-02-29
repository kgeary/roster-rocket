import React, { useState } from "react";
import Modal from "react-modal";

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

function AddModal(props) {

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
    if (props.onReturn) {
      props.onReturn();
    }
  }

  return (
    <React.Fragment>
      <button className="btn btn-primary btn-sm" onClick={openModal}>{props.title}</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=""
      >
        <props.form users={props.users} closeModal={closeModal} />
      </Modal>
    </React.Fragment>
  );
}

export default AddModal;