import React, { useState } from "react";
import CustomPopUp from "./components/CreateUserAccount/CustomPopUp";
import CreateAccountForm from "./components/CreateUserAccount/CreateAccountForm";

import logo from "./Components/UserProfile/logo-no-background.png";

function CreateUAModal({ onAddAccount }) {
  const buttonText = "Add Account";

  return (
    <CustomPopUp buttonText={buttonText} variant="filled">
      <img src={logo} alt="Logo" width={400} height={130} />
      <CreateAccountForm onAddAccount={onAddAccount} />
    </CustomPopUp>
  );
}

export default CreateUAModal;
