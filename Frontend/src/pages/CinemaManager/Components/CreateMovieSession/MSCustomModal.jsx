import React, { useState } from "react";
import "./MSModalStyle.css";
// import Modal from "react-modal";
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from "@mantine/core";

// Modal.setAppElement("#root");

function MSCustomModal({ children }) {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button onClick={open}>Create MovieSession</Button>
      {/* <Modal
        className="myModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {children}
        <Button onClick={() => setModalIsOpen(false)}>Close</Button>
      </Modal> */}
      <Modal opened={opened} onClose={close}>
        {children}
      </Modal>
    </div>
  );
}

export default MSCustomModal;