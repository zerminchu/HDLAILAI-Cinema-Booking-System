import { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import axios from "axios";
import { EmailField, PasswordField } from "./LoginFields";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    // handle submit here
    event.preventDefault();
    console.log(email, password);
    axios
      .post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <EmailField
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <PasswordField
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LoginForm;
