import React, { useState } from "react";
// import Modal from "react-modal";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";

// Modal.setAppElement("#root");

function CustomPopUp({ children }) {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button onClick={open}>Add Profile</Button>
      <Modal opened={opened} onClose={close}>
        {children}
      </Modal>
    </div>
  );
}

export default CustomPopUp;
