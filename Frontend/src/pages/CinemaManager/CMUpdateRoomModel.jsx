import React from "react";
import CustomModel3 from "../CinemaManager/Components/UpdateRoom/CustomModel3";
import CMUpdateRoom from "../CinemaManager/Components/UpdateRoom/CMUpdateRoom";
import logo from "../CinemaManager/Components/UpdateRoom/logo-no-background.png";

function CMUpdateRoomModel() {
  return (
    <CustomModel3>
      <img src={logo} alt="Logo" width={400} height={140} />
      <CMUpdateRoom />
    </CustomModel3>
  );
}

export default CMUpdateRoomModel;
