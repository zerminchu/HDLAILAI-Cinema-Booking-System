import UsersRolesTable from "./components/UserProfile/UserRolesTable";
import { useEffect, useState } from "react";
import axios from "axios";
//import { Button, TextInput, Group } from "@mantine/core";
import { Group, Text, TextInput, Pagination, Button } from "@mantine/core";
import ButtonMenu from "./components/ButtonMenu";

function UserAdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  function search(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/searchuserprofile?q=${query}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(
    function loadData() {
      // Load data from backend API
      axios
        .get("http://localhost:8080/viewuseraccount/all")
        .then(function (response) {
          // Store data into react state
          console.log(response);
          setUsers(response.data);
        });
      // [] means the loadData function only runs once when the page first loads
    },
    [currentPage, perPage]
  );

  return (
    <div>
      {/* <form onSubmit={search}>
        <Group>
          <CreateUPModel onAddUser={handleAddUser} />
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
      ) : null} */}
      <ButtonMenu />
      <UsersRolesTable data={users} setData={setUsers} />
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
        limit={perPage}
        page={currentPage}
        onChange={(newPage) => setCurrentPage(newPage)}
        total={users.length}
      />
    </div>
  );
}

export default UserAdminHome;
