import {
  Table,
  Group,
  Button,
  Text,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HallTable = (props) => {
  const theme = useMantineTheme();
  const [halls, setHalls] = useState(props.halls);

  useEffect(() => {
    setHalls(props.halls);
  }, [props.halls]);

  const handleStatus = (id, checkOrNot) => {
    const updatedHalls = halls.map((hall) => {
      if (hall.id === id) {
        hall.status = checkOrNot ? "Available" : "Not Available";
        if (hall.status === "Not Available") {
          handleSuspend(id);
        } else {
          axios
            .put(`http://localhost:8080/suspendhall/unsuspend/${id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.log(err));
        }
      }
      return hall;
    });
    setHalls(updatedHalls);
  };
  

  const handleSuspend = (id) => {
    axios
      .delete(`http://localhost:8080/suspendhall/${id}`)
      .then((response) => {
        const updatedHalls = halls.map((hall) => {
          if (hall.id === id) {
            return { ...hall, status: "Not Available" };
          }
          return hall;
        });
        setHalls(updatedHalls);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  
  const rows = halls.map(
    (hall) =>
      hall && (
        <tr key={hall.id}>
          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{hall.name}</Text>
            </div>
          </td>

          <td>
            <Group>
              <Switch
                checked={hall.status === "Available"}
                onChange={(event) => {
                  handleStatus(hall.id, event.currentTarget.checked);
                }}
                color="green"
                size="md"
                label={
                  hall.status === "Available" ? "Available" : "Not Available"
                }
                thumbIcon={
                  hall.status === "Available" ? (
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
            <Button component={Link} to={`/ViewHall/${hall.id}`}>
              View
            </Button>
          </td>
        </tr>
      )
  );

  return (
    <Group>
      <Table miw={1200} verticalSpacing="sm" position="left">
        <thead>
          <tr>
            <th>Hall</th>
            <th>Status</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Group>
  );
};

export default HallTable;
