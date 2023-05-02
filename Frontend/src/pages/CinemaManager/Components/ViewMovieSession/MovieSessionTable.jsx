import MSHomeButton from "./MSHomeButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  TextInput,
  Button,
  Anchor,
} from "@mantine/core";

export function MoviesSessionTable({ data, setData }) {
  function handleSuspend(id) {
    axios
      .delete(`http://localhost:8080/suspendmovieSession/${id}`, {
        suspended: true,
      })
      .then(() => {
        setData(
          data.map((movieSession) =>
          movieSession.id === id ? { ...movieSession, suspended: true } : movieSession
          )
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUnsuspend(id) {
    axios
      .put(`http://localhost:8080/suspendmovieSession/unsuspend/${id}`, {
        suspended: false,
      })
      .then(() => {
        setData(
          data.map((movieSession) =>
          movieSession.id === id ? { ...movieSession, suspended: false } : movieSession
          )
        );
      })
      .catch((error) => console.log(error));
  }

  const rows = data.map(
    (item, index) =>
      item && (
        <tr key={index}>
          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{item.title}</Text>
            </div>
          </td>

          <td>
            <MSHomeButton id={item.id} data={item} />
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
        </tr>
      )
  );

  return (
    <ScrollArea>
      <Table miw={1200} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Movie Name</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default MovieSessionTable;
