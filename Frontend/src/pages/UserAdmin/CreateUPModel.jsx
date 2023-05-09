import React, { useState } from "react";
import CustomPopUp from "./components/UserProfile/CustomPopUp";
import CreateRolesForm from "./components/UserProfile/CreateRolesForm";

import logo from "./Components/UserProfile/logo-no-background.png";

function CreateUPModel({ onAddUser }) {
  return (
    <CustomPopUp>
      <img src={logo} alt="Logo" width={400} height={140} />
      <CreateRolesForm onAddUser={onAddUser} />
    </CustomPopUp>
  );
}

export default CreateUPModel;
