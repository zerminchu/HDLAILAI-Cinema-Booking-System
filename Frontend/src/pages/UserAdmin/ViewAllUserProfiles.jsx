import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayRoles from "./components/UserProfile/DisplayRoles";
import CreateRolesForm from "./components/UserProfile/CustomPopUp";
import UserAdminHeader from "./components/UserAdminHeader";
import { notifications } from "@mantine/notifications";
import "./components/SearchBar.css";
import {
  Button,
  Group,
  Text,
  TextInput,
  Modal,
  Space,
  Divider,
} from "@mantine/core";
import CreateUPModal from "./CreateUPModal";

function ViewAllUserProfiles() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  function search(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/searchuserprofile?q=${query}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>User Profiles</h1>
      <Space h="md" />
      <Divider my="sm" size="sm" />
      <form onSubmit={search}>
        <Group>
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
      <CreateUPModal />

      {users.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No user profiles found
        </Text>
      ) : (
        <DisplayRoles data={users} setData={setUsers} />
      )}
    </div>
  );
}

export default ViewAllUserProfiles;
