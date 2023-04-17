import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateRolesForm from "./CreateRolesForm";
import DisplayRoles from "./DisplayRoles";

function CreateRolesPage() {
  const [users, setUsers] = useState([]);
  //const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin_createAcc/all")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddUser = (profileName, selectedRole) => {
    console.log(profileName, selectedRole); // Check that profileName and selectedRole are received correctly

    // Make sure key of javascript dictionary matches the java object in the backend
    axios
      .post("http://localhost:8080/admin_createAcc/add", {
        profileName, // Means profileName: profileName
        permission: selectedRole,
      })
      .then((response) => {
        console.log(response.data); // Check that the new profile is received correctly

        axios
          .get("http://localhost:8080/admin_createAcc/all")
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  

  return (
    <div>
      <h1>Admin Create Profile</h1>
      <CreateRolesForm onAddUser={handleAddUser} data={users} />
      <DisplayRoles data={users} permissions={[]} />
    </div>
  );
}

export default CreateRolesPage;
