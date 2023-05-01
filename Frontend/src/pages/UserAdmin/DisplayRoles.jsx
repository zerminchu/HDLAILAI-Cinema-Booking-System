import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import {
  IconPencil,
  IconCheck,
  IconX,
  IconCircleMinus,
  IconArrowBack,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

// data=[] means if data is not provided, default to an empty array instead
function DisplayRoles({ data = [], setData = null }) {
  const [editProfileName, setEditProfileName] = useState("");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const handleEdit = (id, profileName) => {
    setEditingId(id);
    setEditProfileName(profileName);
  };

  const handleUpdate = (id) => {
    const updatedProfile = {
      id,
      profileName: editProfileName,
    };

    axios
      .put(
        `http://localhost:8080/updateuserprofile/update/${id}`,
        updatedProfile
      )
      .then((response) => {
        console.log(response.data);

        axios
          .get("http://localhost:8080/viewuserprofile/all")
          .then((response) => {
            setData((prevUsers) =>
              prevUsers.map((user) =>
                user.id === id
                  ? { ...user, profileName: editProfileName }
                  : user
              )
            );
            setEditingId(response.data);
          }) // call setUsers instead of setData
          .catch((error) => console.log(error));

        notifications.show({
          title: `User Profile`,
          message: "Profile updated successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error updating profile name",
          message: error.response.data,
          autoClose: 3000,
        });
      });

    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditProfileName("");
  };

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

  const rows = data.map((item) => {
    const isEditing = item.id === editingId;

    const isSuspended = item.suspended;

    const rowStyles = isSuspended
      ? { textDecoration: "line-through", color: "gray" }
      : {};

    return (
      <tr key={item.id} style={rowStyles}>
        <td>
          <span
            style={
              isSuspended
                ? { textDecoration: "line-through", color: "grey" }
                : null
            }
          >
            {isEditing ? (
              <input
                type="text"
                value={editProfileName}
                onChange={(e) => {
                  // Prevent spacebar input
                  if (e.target.value.indexOf(" ") === -1) {
                    setEditProfileName(e.target.value);
                  }
                }}
              />
            ) : (
              item.profileName
            )}
          </span>
        </td>
        <td>{item.permission}</td>
        <td>
          {isSuspended ? (
            <Group spacing={0} position="right">
              <Text size="sm" color="gray">
                Suspended
              </Text>
              <ActionIcon onClick={() => handleUnsuspend(item.id)}>
                <IconArrowBack CircleMinus size="1rem" stroke={1.5} />
              </ActionIcon>
            </Group>
          ) : isEditing ? (
            <Group spacing={0} position="right">
              <ActionIcon onClick={() => handleUpdate(item.id)}>
                <IconCheck size="1rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon onClick={handleCancelEdit}>
                <IconX size="1rem" stroke={1.5} />
              </ActionIcon>
            </Group>
          ) : (
            <Group spacing={0} position="right">
              <ActionIcon onClick={() => handleEdit(item.id, item.profileName)}>
                <IconPencil size="1rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon onClick={() => handleSuspend(item.id)}>
                <IconCircleMinus size="1rem" stroke={1.5} />
              </ActionIcon>
            </Group>
          )}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Group>
        <h3>Existing Profiles:</h3>
      </Group>
      <TextInput
        value={query}
        name={"query"}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      {rows.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No user profiles found
        </Text>
      ) : (
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Profile Name</th>
              <th>Permission</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </ScrollArea>
  );
}

export default DisplayRoles;
