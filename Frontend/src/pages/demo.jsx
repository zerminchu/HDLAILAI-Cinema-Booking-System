import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image, List } from "@mantine/core";
import LogoutButton from "./Login/LogoutButton";
import { useAuth } from "../AuthContext";
import LoginModal from "./Login/LoginModal";

function Demo() {
  const { currentUser } = useAuth();
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
            <Link to="/CustomerHome">Customer Home</Link>
          </List.Item>
          <List.Item>
            <Link to="/OwnerHome">Owner Home</Link>
          </List.Item>
          <List.Item>
            <Link to="/ViewUserAccount">User Admin Home</Link>
          </List.Item>

          <List.Item>
            <Link to="/CinemaManagerHome">Cinema Manager Home</Link>{" "}
          </List.Item>

          <List.Item>
            <Link to="/FnbPurchase"> Customer F&B</Link>
          </List.Item>
        </List>
      </div>
    </div>
  );
}

export default Demo;
