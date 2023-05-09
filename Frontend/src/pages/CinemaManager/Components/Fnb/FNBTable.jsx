import {
  Table,
  Group,
  ScrollArea,
  Button,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function FNBTable(props) {
  const theme = useMantineTheme();
  const [fnbs, setFnbs] = useState(props.fnbs);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    setFnbs(props.fnbs);
  }, [props.fnbs]);

  useEffect(() => {
    axios.get(`http://localhost:8080/viewfnb/all`).then((response) => {
      setFnbs(response.data);
      console.log(response.data);
    });
  }, [updateStatus]);

  const handleAvailability = (id, checkOrNot) => {
    console.log(id);
    console.log(checkOrNot);

    if (checkOrNot === false) {
      axios
        .delete(`http://localhost:8080/suspendfnb/${id}`)
        .then((response) => {
          console.log(response.data);
          console.log("unsuspended");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`http://localhost:8080/suspendfnb/unsuspend/${id}`)
        .then((response) => {
          console.log(response.data);
          console.log("suspended");
        })
        .catch((err) => console.log(err));
    }

    setUpdateStatus(!updateStatus);
  };

  const rows = fnbs.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>${(item.currentPrice / 100).toFixed(2)}</td>
        <td>
          <Group>
            <Switch
              checked={!item.suspended}
              onChange={(event) => {
                console.log(item.id);
                console.log(event.currentTarget.checked);
                handleAvailability(item.id, event.currentTarget.checked);
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
          <Button
            component={Link}
            to={`/CinemaManagerFNBEdit/${item.id}`}
            state={item}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default FNBTable;
