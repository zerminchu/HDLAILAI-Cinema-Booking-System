import React from "react";
import CustomModal from "./CustomModal";
import LoginForm from "./LoginForm";
import logo from "./logo-no-background.png";

function LoginModal() {
  return (
    <CustomModal buttonName={"Login"}>
      <img src={logo} alt="Logo" width={400} height={140} />
      <LoginForm />
    </CustomModal>
  );
}

export default LoginModal;
