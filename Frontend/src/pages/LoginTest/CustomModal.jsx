import React, { useState } from "react";
import "./TestCss.css";
import Modal from "react-modal";
import LoginFormTest from "./LoginFormTest";
import { Button } from "@mantine/core";

Modal.setAppElement("#root");

function CustomModal({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Login</Button>
      <Modal
        className="myModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {children}
        <Button onClick={() => setModalIsOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
}

export default CustomModal;
