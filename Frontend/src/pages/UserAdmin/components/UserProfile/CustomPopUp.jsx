import React, { useState } from "react";
// import Modal from "react-modal";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";

function CustomPopUp({ children, buttonText, variant, color }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button
        onClick={open}
        variant={variant}
        color={color}
        style={{ margin: "10px" }}
      >
        {buttonText}
      </Button>
      <Modal opened={opened} onClose={close}>
        {children}
      </Modal>
    </div>
  );
}

export default CustomPopUp;
