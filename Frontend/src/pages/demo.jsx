import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List } from "@mantine/core";

function Demo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/demo/add", { name: name, email: email })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

  return (
    <div>
      <h1>DEMO</h1>
      <div className="card">
        <List>
          <List.Item>
            <Link to="/DisplayRoles">Display Roles</Link>
          </List.Item>
          <List.Item>
            <Link to="/CustomerHome">Customer Home</Link>
          </List.Item>
          <List.Item>
            <Link to="/ManagerHome">Manager Home</Link>
          </List.Item>
          <List.Item>
            <Link to="/OwnerHome">Owner Home</Link>
          </List.Item>
          <List.Item>
            <Link to="/ViewUserAccount">View User Account</Link>
          </List.Item>
          <List.Item>
            <Link to="/CreateUserAccount">Create User Account</Link>
          </List.Item>
          <List.Item>
            <Link to="/CreateRolesPage">Create Role</Link>
          </List.Item>
          <List.Item>
            <Link to="/Login">Login</Link>
          </List.Item>
        </List>
      </div>
    </div>
  );
}

export default Demo;
