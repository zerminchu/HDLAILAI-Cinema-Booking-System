import React from "react";
import CustomModel2 from "./Components/CreateHall/CustomModel2";
import CMCreateHall from "./Components/CreateHall/CMCreateHall";
import logo from './Components/logo-no-background.png';

function CMCreateRoomModel() {
  return (
    
    <CustomModel2>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMCreateHall />
    </CustomModel2>
  );
}

export default CMCreateRoomModel;
