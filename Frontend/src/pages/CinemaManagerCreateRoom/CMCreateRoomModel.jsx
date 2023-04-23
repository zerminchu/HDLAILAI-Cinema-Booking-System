import React from "react";
import CustomModel2 from "./CustomModel2";
import CMCreateRoom from "./CMCreateRoom";
import logo from './logo-no-background.png';

function CMCreateRoomModel() {
  return (
    
    <CustomModel2>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMCreateRoom />
    </CustomModel2>
  );
}

export default CMCreateRoomModel;
