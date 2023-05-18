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
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  function validateForm() {
    let isValid = true;

    const fields = [
      { value: name, errorSetter: setNameError, fieldName: "Name" },
      { value: email, errorSetter: setEmailError, fieldName: "Email" },
      { value: password, errorSetter: setPasswordError, fieldName: "Password" },
    ];

    fields.forEach(({ value, errorSetter, fieldName }) => {
      const trimmedValue = value.trim();

      if (trimmedValue === "") {
        errorSetter(`${fieldName} is empty`);
        isValid = false;
      } else if (value !== trimmedValue) {
        errorSetter(`${fieldName} contains trailing/leading whitespace`);
        isValid = false;
      } else {
        errorSetter("");
      }
    });

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
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
          let errorMessage = error.response?.data || "An error occurred";
          setError(errorMessage);
          notifications.show({
            title: `Error creating User Account`,
            message: errorMessage,
            autoClose: 1500,
            color: "red",
          });
        });
    }
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
            error={nameError}
            withAsterisk
          />
        </div>

        <div>
          <TextInput
            placeholder="name@email.com"
            label="Email Address:"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
            withAsterisk
          />
        </div>

        <div>
          <PasswordInput
            placeholder="Password"
            label="Password:"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
            description="Make sure to create a strong password!"
            withAsterisk
          />
        </div>

        <div className="createAccSubmitBtn">
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </div>
      </SimpleGrid>
    </form>
  );
}

export default CreateAccountForm;
