import React, { useState } from "react";
import CustomPopUp from "./components/UserProfile/CustomPopUp";
import CreateAccountForm from "./components/UserProfile/CreateAccountForm";

import logo from "./Components/UserProfile/logo-no-background.png";

function CreateUPModel({ onAddAccount }) {
  const buttonText = "Add Account";

  return (
    <CustomPopUp buttonText={buttonText} variant="filled">
      <img src={logo} alt="Logo" width={400} height={130} />
      <CreateAccountForm onAddAccount={onAddAccount} />
    </CustomPopUp>
  );
}

export default CreateUPModel;
