import React from "react";
import CustomModel2 from "../CinemaManager/Components/CreateRoom/CustomModel2";
import CMCreateRoom from "../CinemaManager/Components/CreateRoom/CMCreateRoom";
import logo from "../CinemaManager/Components/ViewSeats/logo-no-background.png";

function CMCreateRoomModel() {
  return (
    <CustomModel2>
      <img src={logo} alt="Logo" width={400} height={140} />
      <CMCreateRoom />
    </CustomModel2>
  );
}

export default CMCreateRoomModel;
