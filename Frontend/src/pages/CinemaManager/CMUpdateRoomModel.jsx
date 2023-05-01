import React from "react";
import CustomModel3 from "./Components/UpdateRoom/CustomModel3";
import CMUpdateRoom from "./Components/UpdateRoom/CMUpdateRoom";
import logo from './Components/logo-no-background.png';

function CMUpdateRoomModel() {
  return (
    
    <CustomModel3>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMUpdateRoom />
    </CustomModel3>
  );
}

export default CMUpdateRoomModel;
