import UAHomeButton from "../UAHomeButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table, Text, ScrollArea, Button, Pagination } from "@mantine/core";

export function UsersRolesTable({ data, setData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentUsers = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / perPage);
  function handleSuspend(id) {
    axios
      .delete(`http://localhost:8080/suspenduseraccount/${id}`, {
        suspended: true,
      })
      .then(() => {
        setData(
          data.map((user) =>
            user.id === id ? { ...user, suspended: true } : user
          )
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUnsuspend(id) {
    axios
      .put(`http://localhost:8080/suspenduseraccount/unsuspend/${id}`, {
        suspended: false,
      })
      .then(() => {
        setData(
          data.map((user) =>
            user.id === id ? { ...user, suspended: false } : user
          )
        );
      })
      .catch((error) => console.log(error));
  }

  const rows = !currentUsers ? (
    <></>
  ) : (
    currentUsers.map(
      (item, index) =>
        item && (
          <tr key={index}>
            <td>
              <div style={{ textAlign: "left" }}>
                <Text>{item.name}</Text>
              </div>
            </td>

            <td>
              <div style={{ textAlign: "left" }}>
                <Text>{item.email}</Text>
              </div>
            </td>

            <td>
              {/*  <Select data={rolesData} defaultValue={item.role} variant="unstyled" /> */}
              <Text>{item.profile.profileName}</Text>
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
              <UAHomeButton id={item.id} data={item} />
            </td>
          </tr>
        )
    )
  );

  return (
    <ScrollArea>
      <Table miw={1200} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {data.length > 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
          limit={perPage}
          page={currentPage}
          onChange={handlePageChange}
          total={totalPages}
        />
      )}
    </ScrollArea>
  );
}

export default UsersRolesTable;
