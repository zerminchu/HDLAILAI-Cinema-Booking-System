import React from "react";
import CustomModel3 from "./CinemaManagerUpdateRoom/CustomModel3";
import CMUpdateRoom from "./CinemaManagerUpdateRoom/CMUpdateRoom";
import logo from './logo-no-background.png';

function CMUpdateRoomModel() {
  return (
    
    <CustomModel3>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMUpdateRoom />
    </CustomModel3>
  );
}

export default CMUpdateRoomModel;
