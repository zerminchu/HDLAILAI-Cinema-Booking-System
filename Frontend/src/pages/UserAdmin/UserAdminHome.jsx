import UsersRolesTable from "./components/UserProfile/UserRolesTable";
import { Button, Group, Text, TextInput } from "@mantine/core";
import UserAdminHeader from "./components/UserAdminHeader";
import "./Components/SearchBar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateUAModel from "./CreateUAModel";
import { notifications } from "@mantine/notifications";
import { Pagination } from "@mantine/core";


function UserAdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [query, setQuery] = useState("");

  function search(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/searchuseraccount?q=${query}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleAddAccount = (name, email,password,profile) => {
    console.log(name, email,password,profile); // Check that profileName and selectedRole are received correctly

    // Make sure key of javascript dictionary matches the java object in the backend
    axios
      .post("http://localhost:8080/createuserprofile/add", {
        name: name, // Means name: name
        email: email,
        password: password,
        profile: profile,
      })
      .then((response) => {
        console.log(response.data); // Check that the new profile is received correctly

        axios
          .get("http://localhost:8080/viewuseraccount/all")
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));

        notifications.show({
          title: `User Account`,
          message: "User Account created successfully",
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })

      .catch((error) => {
        notifications.show({
          title: "Error creating User Account",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  };

        /*
  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewuseraccount/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setUsers(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []); */

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / perPage);

  return (
    <div>
      <h1>Admin Home</h1>
      <Group>
        <UserAdminHeader />
      </Group>
      <form onSubmit={search}>
        <Group>
          <CreateUAModel onAddAccount={handleAddAccount} />
          <TextInput
            placeholder={"Search by account name"}
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

      <UsersRolesTable data={currentUsers} setData={setUsers} />
    {users.length > 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
          limit={perPage}
          page={currentPage}
          onChange={handlePageChange}
          total={totalPages}
        />
      )}
    </div>
  );
}

export default UserAdminHome;
