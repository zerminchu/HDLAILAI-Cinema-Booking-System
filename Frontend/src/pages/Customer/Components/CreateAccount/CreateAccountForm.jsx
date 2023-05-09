import { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  SimpleGrid,
  Group,
} from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function CreateAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/createuseraccount/addcustomer", {
        name: name,
        password: password,
        email: email,
      })
      .then(() => {
        notifications.show({
          title: `User Account`,
          message: "Account created successfully",
          autoClose: 3000,
        });
        navigateTo("/CustomerHome");
      })
      .catch((error) => {
        console.log(error);
        //errorMessage = Name cannot be empty/Password cannot be empty/Email cannot be empty/User Profile cannot be empty
        let errorMessage = `${error.response.data}`;

        //If Name is empty display the general text "Please fill in all the fields"
        //Else, display the individual fields error messages
        if (errorMessage === "Name cannot be empty") {
          errorMessage = "Please fill in all the fields";
        }
        setError(errorMessage);
        notifications.show({
          title: `Error creating User Account`,
          message: errorMessage,
          autoClose: 1500,
          color: "red",
        });
      });
  }
  function handleReturn(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid cols={1} spacing="md">
        <div>
          <TextInput
            placeholder="Name"
            label="Name:"
            value={name}
            onChange={(event) => setName(event.target.value)}
            withAsterisk
          />
        </div>

        <div>
          <TextInput
            placeholder="name@email.com"
            label="Email Address:"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            withAsterisk
          />
        </div>

        <div>
          <PasswordInput
            placeholder="Password"
            label="Password:"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            description="Make sure to create a strong password!"
            withAsterisk
          />
        </div>

        <div className="createAccSubmitBtn">
          <Group position="right" mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </div>
      </SimpleGrid>
    </form>
  );
}

export default CreateAccountForm;
