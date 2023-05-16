import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayRoles from "./components/UserProfile/DisplayRoles";
import CreateRolesForm from "./components/UserProfile/CustomPopUp";
import UserAdminHeader from "./components/UserAdminHeader";
import { notifications } from "@mantine/notifications";
import "./Components/SearchBar.css";
import { Button, Group, Text, TextInput, Modal } from "@mantine/core";
import CreateUPModal from "./CreateUPModal";

function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  /*   useEffect(() => {
    axios
      .get(`http://localhost:8080/searchuserprofile?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data); // Fix: should be setUsers instead of setData
      })
      .catch((error) => console.log(error));
  }, [query]); */
  function search(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/searchuserprofile?q=${query}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleAddUser = (profileName, selectedRole) => {
    console.log(profileName, selectedRole); // Check that profileName and selectedRole are received correctly

    // Make sure key of javascript dictionary matches the java object in the backend
    axios
      .post("http://localhost:8080/createuserprofile/add", {
        profileName: profileName, // Means profileName: profileName
        permission: selectedRole,
      })
      .then((response) => {
        console.log(response.data); // Check that the new profile is received correctly

        axios
          .get("http://localhost:8080/viewuserprofile/all")
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));

        notifications.show({
          title: `User Profile`,
          message: "Profile created successfully",
          autoClose: 3000,
        });
        /* setTimeout(() => {
          window.location.reload();
        }, 1000); */
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating User Profile",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <h1>Admin Home</h1>
      <Group>
        <UserAdminHeader />
      </Group>
      <form onSubmit={search}>
        <Group>
          <CreateUPModal onAddUser={handleAddUser} />
          <TextInput
            placeholder={"Search by profile name"}
            value={query}
            name={"query"}
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>

      {users.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No user profiles found
        </Text>
      ) : null}
      <DisplayRoles data={users} setData={setUsers} />
    </div>
  );
}

export default ProfilePage;
