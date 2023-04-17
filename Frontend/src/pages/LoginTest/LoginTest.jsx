import React from 'react';
import LoginModalTest from './LoginModalTest';
import axios from "axios";

function LoginTest() {
    const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    axios
      .post("http://localhost:8080/login", { 
        role: role,
        email: email, 
        password: password })
      .then((response) => {
        console.log(response);
      }).catch(e => {
        console.log(e);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginModalTest />
    </form>
  );
}

export default LoginTest;