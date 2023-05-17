import UsersRolesTable from "./components/UserProfile/UserRolesTable";
import { Button, Group, Text, TextInput } from "@mantine/core";
import UserAdminHeader from "./components/UserAdminHeader";

import { useEffect, useState } from "react";
import axios from "axios";

import ButtonMenu from "./components/ButtonMenu";
import { Pagination } from "@mantine/core";

function AdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

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
  }, []);

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

      <ButtonMenu />
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

export default AdminHome;
