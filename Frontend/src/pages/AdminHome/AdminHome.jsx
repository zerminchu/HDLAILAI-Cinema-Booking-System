import UsersRolesTable from "./UserRolesTable";
import { useEffect, useState } from "react";
import axios from "axios";

import ButtonMenu from "./ButtonMenu";

function AdminHome() {
  // State to store data
  const [users, setUsers] = useState([]);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/useraccount/all")
      .then(function (response) {
        // Store data into react state
        setUsers(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <h1>Admin Home</h1>
      <ButtonMenu />
      <UsersRolesTable data={users} />
    </div>
  );
}

export default AdminHome;
