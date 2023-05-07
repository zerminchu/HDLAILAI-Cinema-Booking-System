import React from "react";
import MSCustomModal from "./Components/CreateMovieSession/MSCustomModal";
import CreateMS from "./Components/CreateMovieSession/CreateMS";
import logo from "./Components/logo-no-background.png";

function CreateMSModal({ hallId }) {
  return (
    <MSCustomModal>
      <img src={logo} alt="Logo" width={400} height={140} />
      <CreateMS hallId={hallId} />
    </MSCustomModal>
  );
}

export default CreateMSModal;
