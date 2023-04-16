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
  import React, { useState, useEffect } from 'react';

  
  const jobColors = {
    engineer: "blue",
    manager: "cyan",
    designer: "pink",
  };
  
  function DisplayRoles({ data = [], permissions = [] }) {
    const rows = data.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{permissions.find((p) => p.id === item.permissionId)?.name}</td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
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
        permissionId: PropTypes.number.isRequired
      })
    ),
  };
  
  export default DisplayRoles;
  