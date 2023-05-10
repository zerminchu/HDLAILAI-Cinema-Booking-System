import {
  Table,
  Group,
  Text,
  ScrollArea,
  TextInput,
  Button,
} from "@mantine/core";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import EditUPModel from "./EditUPModel";

// data=[] means if data is not provided, default to an empty array instead
function DisplayRoles({ data = [], setData = null }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/searchuserprofile?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [query]);

  const handleSuspend = (id) => {
    const updatedUser = {
      suspended: true,
    };
    axios
      .delete(`http://localhost:8080/suspenduserprofile/${id}`, updatedUser)
      .then(() => {
        // Update the state to add the strikethrough and gray out
        setData((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, suspended: true } : user
          )
        );

        notifications.show({
          title: `User Profile`,
          message: "User suspended successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error suspending user",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  };

  const handleUnsuspend = (id) => {
    const updatedUser = {
      suspended: false,
    };
    axios
      .put(`http://localhost:8080/suspenduserprofile/unsuspend/${id}`, {
        updatedUser,
      })
      .then(() => {
        setData((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, suspended: false } : user
          )
        );
        notifications.show({
          title: `User Profile`,
          message: "User un-suspended successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error un-suspending user",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  };

  const rows = data.map(
    (item, index) =>
      item && (
        <tr key={index}>
          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{item.profileName}</Text>
            </div>
          </td>

          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{item.permission}</Text>
            </div>
          </td>
          <td>
            {item.suspended === false ? (
              <Button
                variant="outline"
                radius="xl"
                size="xs"
                uppercase
                onClick={() => {
                  handleSuspend(item.id);
                }}
              >
                Active
              </Button>
            ) : (
              <Button
                variant="outline"
                radius="xl"
                size="xs"
                color="gray"
                uppercase
                onClick={() => {
                  handleUnsuspend(item.id);
                }}
              >
                Suspended
              </Button>
            )}
          </td>

          <td>
            <EditUPModel id={item.id} data={item} />
          </td>
        </tr>
      )
  );

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Profile Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default DisplayRoles;
