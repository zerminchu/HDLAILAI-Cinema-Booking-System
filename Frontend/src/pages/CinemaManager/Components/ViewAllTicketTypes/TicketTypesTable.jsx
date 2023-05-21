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

const TicketTypesTable = (props) => {
  const theme = useMantineTheme();
  const [ticketTypes, setTicketTypes] = useState(props.ticketTypes);

  useEffect(() => {
    setTicketTypes(props.ticketTypes);
  }, [props.ticketTypes]);

  console.log(props.ticketTypes);

  const handleStatus = (id, checkOrNot) => {
    const updatedTicketTypes = ticketTypes.map((ticketType) => {
      if (ticketType.id === id) {
        ticketType.status = checkOrNot ? "Available" : "Not Available";
        if (ticketType.status === "Not Available") {
          handleSuspend(id);
        } else {
          axios
            .put(`http://localhost:8080/hidetickettype/unhide/${id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.log(err));
        }
      }
      console.log(ticketType.status);
      return ticketType;
    });
    setTicketTypes(updatedTicketTypes);
  };

  const handleSuspend = (id) => {
    axios
      .delete(`http://localhost:8080/hidetickettype/${id}`)
      .then(() => {
        const updatedTicketTypes = ticketTypes.map((ticketType) => {
          if (ticketType.id === id) {
            return { ...ticketType, status: "Not Available" };
          }
          return ticketType;
        });
        setTicketTypes(updatedTicketTypes);
      })
      .catch((err) => console.log(err));
  };

  const rows = ticketTypes.map(
    (ticketType) =>
      ticketType && (
        <tr key={ticketType.id}>
          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{ticketType.typeName}</Text>
            </div>
          </td>

          <td>
            <div style={{ textAlign: "left" }}>
              <Text>$ {(ticketType.price / 100).toFixed(2)}</Text>
            </div>
          </td>

          <td>
            <Group>
              <Switch
                checked={ticketType.status === "Available"}
                onChange={(event) => {
                  handleStatus(ticketType.id, event.currentTarget.checked);
                }}
                color="green"
                size="md"
                label={
                  ticketType.status === "Available"
                    ? "Available"
                    : "Not Available"
                }
                thumbIcon={
                  ticketType.status === "Available" ? (
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
            <Button component={Link} to={`/UpdateTicketType/${ticketType.id}`}>
              Edit
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
            <th>Ticket Type</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Group>
  );
};

export default TicketTypesTable;
