import UsersRolesTable from "./UserRolesTable";
import { useEffect, useState } from "react";
import axios from "axios";
const rolesData = ["Manager", "Collaborator", "Contractor"];

function AdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);

  useEffect(function loadData() {
    // Load data from backend API
    axios.get("http://localhost:8080/demo/all").then(function (response) {
      // Store data into react state
      setUsers(response.data);
    });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <h1>Admin Home</h1>
      <UsersRolesTable data={users} />
    </div>
  );
}

export default AdminHome;
