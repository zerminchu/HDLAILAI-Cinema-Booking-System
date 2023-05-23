import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Group,
  Text,
  TextInput,
  Divider,
  Pagination,
  Space,
} from "@mantine/core";
import "./components/SearchBar.css";
import { notifications } from "@mantine/notifications";
import UsersRolesTable from "./components/UserAdminHome/UserAccountTable";
import CreateUAModal from "./CreateUAModal";

function UserAdminHome() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios
      .get("http://localhost:8080/viewuseraccount/all")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleSearch(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/searchuseraccount?q=${query}`)
      .then((response) => {
        setUsers(response.data);
        setCurrentPage(1);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>User Accounts</h1>
      <Space h="md" />
      <Divider my="sm" size="sm" />
      <form onSubmit={handleSearch}>
        <Group>
          <TextInput
            placeholder="Search by account name"
            value={query}
            name="query"
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>
      <CreateUAModal />

      {users.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No user accounts found
        </Text>
      ) : (
        <UsersRolesTable data={users} setData={setUsers} />
      )}
    </div>
  );
}

export default UserAdminHome;
