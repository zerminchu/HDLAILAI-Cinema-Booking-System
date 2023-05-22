import MSHomeButton from "./MSHomeButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table, Text, Button } from "@mantine/core";

function MovieSessionTable({ data, setData }) {
  function handleSuspend(id) {
    axios
      .delete(`http://localhost:8080/suspendmoviesession/${id}`)
      .then(() => {
        setData(
          data.map((movieSession) =>
            movieSession.id === id
              ? { ...movieSession, suspended: true }
              : movieSession
          )
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUnsuspend(id) {
    axios
      .put(`http://localhost:8080/suspendmoviesession/unsuspend/${id}`)
      .then(() => {
        setData(
          data.map((movieSession) =>
            movieSession.id === id
              ? { ...movieSession, suspended: false }
              : movieSession
          )
        );
      })
      .catch((error) => console.log(error));
  }

  const rows = data.map((item, index) => {
    if (item && item.suspended === true) {
      return null;
    }

    return (
      <tr key={index}>
        <td>
          <div style={{ textAlign: "left" }}>
            <Text>
              {new Date(item.startDateTime).toLocaleDateString("en-SG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </div>
        </td>
        <td>
          <div style={{ textAlign: "left" }}>
            <Text>{item.movieName}</Text>
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
          <div style={{ textAlign: "left" }}>
            <Text>
              {new Date(item.startDateTime).toLocaleTimeString("en-SG", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </div>
        </td>
        <td>
          <div style={{ textAlign: "left" }}>
            <Text>
              {new Date(item.endDateTime).toLocaleTimeString("en-SG", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </div>
        </td>
        <td>
          <MSHomeButton id={item.id} data={item} />
        </td>
      </tr>
    );
  });

  return (
    <Table miw={720} verticalSpacing="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Movie Name</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default MovieSessionTable;
