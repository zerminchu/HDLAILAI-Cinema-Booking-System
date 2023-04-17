import React, { useState } from "react";
import "./TestCss.css";
import Modal from "react-modal";
import LoginForm from "./LoginFormTest";

Modal.setAppElement("#root");

function CustomModal({ children }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setModalIsOpen(true)}>Login</button>
        <Modal
          className="myModal"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {children}
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    );
  }
  
  function LoginModalTest() {
    return (
      <CustomModal>
        <LoginForm />
      </CustomModal>
    );
  }
  
  export default LoginModalTest;