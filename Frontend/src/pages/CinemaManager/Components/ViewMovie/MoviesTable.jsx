import MovieHomeButton from "./MovieHomeButton";
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

export function MoviesTable({ data, setData }) {
  function handleSuspend(id) {
    axios
      .delete(`http://localhost:8080/suspendmovie/${id}`, {
        suspended: true,
      })
      .then(() => {
        setData(
          data.map((movie) =>
          movie.id === id ? { ...movie, suspended: true } : movie
          )
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUnsuspend(id) {
    axios
      .put(`http://localhost:8080/suspendmovie/unsuspend/${id}`, {
        suspended: false,
      })
      .then(() => {
        setData(
          data.map((movie) =>
          movie.id === id ? { ...movie, suspended: false } : movie
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
            <div style={{ textAlign: "left" }}>
              <Text>{item.genre}</Text>
            </div>
          </td>

          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{item.runTime}</Text>
            </div>
          </td>

          <td>
            <MovieHomeButton id={item.id} data={item} />
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
            <th>Movie</th>
            <th>Genre</th>
            <th>Runtime</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default MoviesTable;
