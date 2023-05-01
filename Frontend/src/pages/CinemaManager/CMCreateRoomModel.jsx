import React from "react";
import  "../CinemaManager/Components/CreateRoom/CustomModel2";
import  "../CinemaManager/Components/CreateRoom/CMCreateRoom";
import '../CinemaManager/Components/ViewSeats/logo-no-background.png';

function CMCreateRoomModel() {
  return (
    
    <CustomModel2>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMCreateRoom />
    </CustomModel2>
  );
}

export default CMCreateRoomModel;
