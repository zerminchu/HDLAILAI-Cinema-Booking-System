import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck, IconX, IconCircleMinus } from "@tabler/icons-react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";

// data=[] means if data is not provided, default to an empty array instead
function DisplayRoles({ data = [], permissions = [] }) {
  const [editProfileName, setEditProfileName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, profileName) => {
    setEditingId(id);
    setEditProfileName(profileName);
  };

  const handleUpdate = (id) => {
    const updatedProfile = {
      profileName: editProfileName,
    };

    axios
      .put(`http://localhost:8080/createuserprofile/update/${id}`, updatedProfile)
      .then((response) => {
        console.log(response.data);

        axios
          .get("http://localhost:8080/createuserprofile/all")
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditProfileName("");
  };
  const handleSuspend = (id) => {
    axios
      .delete(`http://localhost:8080/createuserprofile/${id}`, {
        suspended: true,
      })
      .then(() => {
        // Update the state to add the strikethrough and gray out
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, suspended: true } : user
          )
        );
      })
      .catch((error) => console.log(error));
  };
  

/*   const handleUnsuspend = (id) => {
    axios
      .put(`http://localhost:8080/createuserprofile/unsuspend/${id}`, {
        suspended: false,
      })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, suspended: false } : user
          )
        );
      })
      .catch((error) => console.log(error));
  }; */
  

  const rows = data.map((item) => {
    console.log(item);
    console.log(item.profileName);
    console.log(permissions);

    const isEditing = item.id === editingId;

    const isSuspended = item.suspended;

    const rowStyles = isSuspended
      ? { textDecoration: "line-through", color: "gray" }
      : {};

    return (
      <tr key={item.id} style={rowStyles}>
        <td>
        <span style={isSuspended ? { textDecoration: 'line-through', color: 'grey' } : null}>
          {isEditing ? (
            <input
              type="text"
              value={editProfileName}
              onChange={(e) => setEditProfileName(e.target.value)}
            />
          ) : (
            item.profileName
          )}
          </span>
        </td>
        <td>{item.permission}</td>
        <td>
          {isSuspended ? (
            <Text size="sm" color="gray">
              Suspended
            </Text>
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
              <IconCircleMinus  size="1rem" stroke={1.5} />
            </ActionIcon>
            </Group>
          )}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Group><h3>Existing Profiles:</h3></Group>
      <Table sx={{ minWidth: 400}} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Profile Name</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

DisplayRoles.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      permissionId: PropTypes.number.isRequired,
    })
  ),
};

export default DisplayRoles;
