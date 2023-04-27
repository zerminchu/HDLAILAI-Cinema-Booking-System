import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateRolesForm from "./CreateRolesForm";
import DisplayRoles from "./DisplayRoles";
import { notifications } from "@mantine/notifications";

function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
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
      .post("http://localhost:8080/createuserprofile/add", {
        profileName, // Means profileName: profileName
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
      <h1>Admin Create Profile</h1>
      <CreateRolesForm onAddUser={handleAddUser} data={users} />
      <DisplayRoles data={users} setData={setUsers} permissions={[]} />
    </div>
  );
}

export default ProfilePage;
