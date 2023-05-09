import React, { useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from "@mantine/core";

function ButtonWithModal({ label = "Open", children }) {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button onClick={open}>{label}</Button>
      <Modal opened={opened} onClose={close}>
        {children}
      </Modal>
    </>
  );
}

export default ButtonWithModal;