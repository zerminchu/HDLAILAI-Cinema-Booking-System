import React, { useState } from "react";
import CustomPopUp from "./components/UserProfile/CustomPopUp";
import CreateRolesForm from "./components/UserProfile/CreateRolesForm";

import logo from "./Components/UserProfile/logo-no-background.png";

function CreateUPModel({ onAddUser }) {
  const buttonText = "Add Profile";

  return (
    <CustomPopUp buttonText={buttonText} variant="filled">
      <img src={logo} alt="Logo" width={400} height={130} />
      <CreateRolesForm onAddUser={onAddUser} />
    </CustomPopUp>
  );
}

export default CreateUPModel;
