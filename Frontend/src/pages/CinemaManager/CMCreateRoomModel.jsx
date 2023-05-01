import React from "react";
import CustomModel2 from "./Components/UpdateRoom/CustomModel3";
import CMCreateRoom from "./Components/UpdateRoom/CMUpdateRoom";
import logo from './Components/logo-no-background.png';

function CMCreateRoomModel() {
  return (
    
    <CustomModel2>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMCreateRoom />
    </CustomModel2>
  );
}

export default CMCreateRoomModel;
