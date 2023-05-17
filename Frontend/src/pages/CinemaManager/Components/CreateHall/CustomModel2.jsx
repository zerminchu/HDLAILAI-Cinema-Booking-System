import React, { useState } from "react";
// import Modal from "react-modal";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";

// Modal.setAppElement("#root");

function CustomModel2({ children }) {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button
        onClick={open}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Create Hall
      </Button>
      <Modal opened={opened} onClose={close}>
        {children}
      </Modal>
    </div>
  );
}

export default CustomModel2;
