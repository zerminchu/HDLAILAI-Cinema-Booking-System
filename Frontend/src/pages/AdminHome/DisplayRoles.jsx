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
import { IconPencil, IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";
import CreateRolesForm from "./CreateRolesForm";
import axios from "axios";
import React, { useState, useEffect } from "react";

// data=[] means if data is not provided, default to an empty array instead
function DisplayRoles({ data = [], permissions = [] }) {
  const rows = data.map((item) => {
    console.log(item);
    console.log(item.profileName);
    console.log(permissions);
    return (
      <tr key={item.id}>
        <td><Group>{item.profileName}</Group></td>
        <td><Group>{item.permission}</Group></td>
        <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
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
