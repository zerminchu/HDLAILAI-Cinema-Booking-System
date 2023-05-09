import axios from "axios";
import React, { useState, useEffect } from "react";
import MovieHomeButton from "./MovieHomeButton";
import { IconCheck, IconX } from "@tabler/icons-react";
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
  Switch,
  Anchor,
  useMantineTheme,
} from "@mantine/core";

export function MoviesTable({ data, setData }) {
  const theme = useMantineTheme();
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
            <Group>
              <Switch
                checked={!item.suspended}
                onChange={(event) => {
                  item.suspended === false
                    ? handleSuspend(item.id)
                    : handleUnsuspend(item.id);
                }}
                color="green"
                size="md"
                label={item.suspended === false ? "Available" : "Not Available"}
                thumbIcon={
                  item.suspended === false ? (
                    <IconCheck
                      size="0.8rem"
                      color={theme.colors.teal[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      size="0.8rem"
                      color={theme.colors.red[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  )
                }
              />
            </Group>
          </td>
          <td>
            <MovieHomeButton id={item.id} data={item} />
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
