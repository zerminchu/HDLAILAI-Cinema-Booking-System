import React from "react";
import  "../CinemaManager/Components/UpdateRoom/CustomModel3";
import  "../CinemaManager/Components/UpdateRoom/CMUpdateRoom";
import '../CinemaManager/Components/UpdateRoom/logo-no-background.png';

function CMUpdateRoomModel() {
  return (
    
    <CustomModel3>
      <img src={logo} alt="Logo" width={400} height={140}/>
      <CMUpdateRoom />
    </CustomModel3>
  );
}

export default CMUpdateRoomModel;
