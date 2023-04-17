import { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import axios from "axios";
import "./TestCss.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import { EmailFieldTest, PasswordFieldTest } from "./LoginFieldsTest";

function LoginFormTest() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    // Prevent submit from refreshing the page
    event.preventDefault();
    // handle submit here
    console.log(role, email, password);
    axios
      .post("http://localhost:8080/login/loginUA", {
        role: role,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  const options = [
    'Customer', 'Owner', 'Manager', 'Admin'
    ];
    const defaultOption = options[0];

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formFields">
        
            <Dropdown 
            options={options} 
            value={role} 
            placeholder="Login As"
            onChange={(event) => setRole(event.currentTarget.value)} 
            />

            <TextInput
            className="EmailFieldTest"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
            className="PasswordFieldTest"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Button className="loginBtn" type="submit">Submit</Button>
        </div>
      
    </form>
  );
}

export default LoginFormTest;
