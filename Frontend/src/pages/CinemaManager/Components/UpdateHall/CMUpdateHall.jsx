import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import axios from "axios";

function CMUpdateHall() {
  const [roomName, setHallName] = useState("");

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
    <form className="CMUpdateHall" onSubmit={handleSubmit}>
      <div className="formFields">
        <TextInput
          className="roomNameField"
          label="Hall Name:"
          value={roomName}
          onChange={(event) => setHallName(event.currentTarget.value)}
        />
      </div>
      <Button className="submitBtn" type="submit">
        Update Hall
      </Button>
    </form>
  );
}

export default CMUpdateHall;
