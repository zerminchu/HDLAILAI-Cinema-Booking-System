import { useEffect, useState } from "react";
import axios from "axios";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";

function CMCreateSeat() {
  const [Rows, setRows] = useState("");
  const [Columns, setColumns] = useState("");
  const [error, setError] = useState("");

  //AXIOS NOT YET CHANGED
  useEffect(() => {
    axios
      .get("http://localhost:8080/createuserprofile/all")
      .then(({ data }) => {
        if (data) {
          const options = data.map((profile) => {
            return { value: profile.id, label: profile.profileName };
          });
          setProfileOptions(options);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Not yet make changes
  function handleSubmit(event) {
    event.preventDefault();
    console.log(userProfile);
    axios
      .post("http://localhost:8080/createuseraccount/add", {
        Rows: Rows,
        Columns: Columns,
        userProfile: {
          id: userProfile,
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        //errorMessage = Rows cannot be empty/Password cannot be empty/Email cannot be empty/User Profile cannot be empty
        let errorMessage = `${error.response.data}`;

        //If Name is empty display the general text "Please fill in all the fields"
        //Else, display the individual fields error messages
        if (errorMessage === "Rows cannot be empty") {
          errorMessage = "Please fill in all the fields"; }
        setError(errorMessage);
        notifications.show({
          title: `Error creating Seats`,
          message: errorMessage,
          autoClose: 3000,
        });
      });
  }
  function handleReturn(event) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Update Seats</h1>
      <Box maw={300} mx="auto">
        <form>
          <TextInput
          label="No.of.Rows"
          value={Rows}
          onChange={(event) => setRows(event.target.value)}
          withAsterisk
        />

        <TextInput
          label="No.of.Columns"
          value={Columns}
          onChange={(event) => setColumns(event.target.value)}
          withAsterisk
        />
          <Group position="right" mt="md">
            <Button onClick={handleSubmit}>Update</Button>
          </Group>

        </form>
        </Box>
      </div>
  );
}

export default CMCreateSeat;
