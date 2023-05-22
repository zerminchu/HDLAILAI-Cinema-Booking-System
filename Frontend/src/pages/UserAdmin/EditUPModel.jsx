import React, { useState } from "react";
import CustomPopUp from "./components/UserProfile/CustomPopUp";
import EditUserProfile from "./EditUserProfile";
import { Button } from "@mantine/core";
import logo from "./components/UserProfile/logo-no-background.png";

function EditUPModel({ id, data }) {
  const buttonText = "Edit";
  return (
    <CustomPopUp buttonText={buttonText} variant="outline">
      <img src={logo} alt="Logo" width={400} height={130} />
      <EditUserProfile id={id} data={data} />
    </CustomPopUp>
  );
}

export default EditUPModel;
