import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import "./CMCreateHall.css"

function CMCreateHall(onAddHall) {
  const [name, setHallName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewhall/all")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHallName();
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/createhall/add", {
        name: name,
      })
      .then(() => {
        notifications.show({
          title: `Hall`,
          message: "Hall created successfully",
          autoClose: 3000,
        });
        setHallName("");
        //navigateTo("/");
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating Hall",
          message: error.response.data,
          autoClose: 3000,
        });
        setHallName("");
      });
  }

  return (
    <form className="CMCreateRoom" onSumbit={handleSubmit}>
      <div>
        <TextInput
          placeholder="Hall 1"
          label="Hall Name:"
          value={name}
          onChange={(event) => setHallName(event.target.value)}
        />
      </div>

      <Button type="submit">Submit</Button>

    </form>
  );
}

export default CMCreateHall;
