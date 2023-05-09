import React from "react";
import CustomModel from "./Components/CreateAccount/CustomModal";
import CreateAccountForm from "./Components/CreateAccount/CreateAccountForm";
import logo from "./Components/logo-no-background.png";
import { Space } from "@mantine/core";

function CreateAccountModal() {
  return (
    <CustomModel>
      <img src={logo} alt="Logo" width={400} height={140} />
      <Space h="lg" />
      <CreateAccountForm />
    </CustomModel>
  );
}

export default CreateAccountModal;
