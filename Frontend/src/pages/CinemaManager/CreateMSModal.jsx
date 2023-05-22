import React from "react";
import MSCustomModal from "./Components/CreateMovieSession/MSCustomModal";
import MSForm from "./Components/CreateMovieSession/MSForm";
import logo from "./Components/logo-no-background.png";

function CreateMSModal({ hallId }) {
  return (
    <MSCustomModal label={"Create Movie Session"}>
      <img src={logo} alt="Logo" width={400} height={140} />
      <MSForm hallId={hallId} />
    </MSCustomModal>
  );
}

export default CreateMSModal;
