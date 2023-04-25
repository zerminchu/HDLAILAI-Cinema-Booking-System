import { useEffect, useState } from "react";
import { TextInput, Button} from "@mantine/core";
import axios from "axios";


function CMUpdateRoom() {
    const [roomName, setroomName] = useState("");
    

//axios
  function handleSubmit(event) {
    // Prevent submit from refreshing the page
    event.preventDefault();
    // handle submit here
    const id = 1;
    axios
    //need change
      //.post("http://localhost:8080/login", {
      .put(`http://localhost:8080/updatehall/update/${id}`, {
        name: roomName,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
    }

   return (
    <form className="CMUpdateRoom" onSubmit={handleSubmit}>
      <div className="formFields">

      <TextInput
          className="roomNameField"
          label="Room Name:"
          value={roomName}
          onChange={(event) => setroomName(event.currentTarget.value)}
        />
        </div>
        <Button className="submitBtn" type="submit">
          Submit
        </Button>
    </form>
   );
}

export default CMUpdateRoom;