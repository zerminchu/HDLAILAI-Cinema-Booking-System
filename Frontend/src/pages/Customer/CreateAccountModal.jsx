import React from "react";
import CustomModel from "./Components/CreateAccount/CustomModal";
import CMCreateHall from "./Components/CreateAccount/CreateAccountForm";
import logo from './Components/logo-no-background.png';

function CreateAccountModal() {
  return (
    
    <CustomModel>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMCreateHall />
    </CustomModel>
  );
}

export default CreateAccountModal;
