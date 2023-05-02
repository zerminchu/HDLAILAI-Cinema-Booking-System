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
            <Link to="/DisplayRoles">Display Roles</Link>
          </List.Item>
          <List.Item>
            <Link to="/CustomerHome">Customer Home</Link>
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
            <Link to="/ProfilePage  ">Create Role</Link>
          </List.Item>
          <List.Item>
            <Link to="/CreateRoom">Create Cinema Room</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/UpdateRoom">Update Cinema Room</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/CinemaManagerHome">Cinema Manager Home</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/CreateSeat">Create Cinema Seats</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/UpdateSeat">Update Cinema Seats</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/ViewHall/:id">View Cinema Seats</Link>{" "}
          </List.Item>
          <List.Item>
            <Link to="/CreateMS">Create Movie Session</Link>{" "}
          </List.Item>
          {currentUser ? (
            <List.Item>
              <LogoutButton />
            </List.Item>
          ) : (
            <List.Item>
              <LoginModal />
            </List.Item>
          )}
        </List>
        <Image
          width={200}
          height={400}
          src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81rvqkDIVseCWKxu7UfkjzFLj7dbQBnBiiRRkI_UgmHJDX57ePJRveri1i_dYx5Qe7u_vHMC9sgbNqjsW9X-sC-zqhSqag=s1600"
        />
      </div>
    </div>
  );
}

export default Demo;
