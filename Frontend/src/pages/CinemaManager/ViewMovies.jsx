import "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

function AdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <h1>View Movies</h1>
      {/* <ButtonMenu /> */}
      <Button component={Link} to="/AddMovie">
        Add New
      </Button>
      <MoviesTable data={users} setData={setUsers} />
    </div>
  );
}

export default AdminHome;
