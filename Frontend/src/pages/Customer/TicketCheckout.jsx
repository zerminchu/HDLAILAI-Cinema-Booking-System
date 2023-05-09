import { useLocation, Link } from "react-router-dom";
import {
  Text,
  Container,
  Box,
  Select,
  Button,
  Grid,
  Flex,
  ScrollArea,
  Center,
  Divider,
} from "@mantine/core";
import confirmationTick from "../../assets/59865-confirmation-tick.json";
import { useState, useEffect } from "react";
import axios from "axios";

function TicketCheckout() {
  const location = useLocation();
  console.log(location.state);
  const { movieSession, selectedSeats: selectedTickets } = location.state;
  const [tickets, setTickets] = useState(selectedTickets);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchTicketTypes() {
      //console.log(loadedMovieSession);
      const ticketTypeResponse = await axios.get(
        `http://localhost:8080/viewtickettype/all`
      );

      const loadedTicketTypes = ticketTypeResponse.data;
      console.log(loadedTicketTypes);
      setOptions(loadedTicketTypes);
    }
    fetchTicketTypes();
  }, []);

  useEffect(() => {
    setTotal(
      tickets.reduce((prev, next) => {
        return prev + next.ticketType?.price;
      }, 0) / 100
    );
  }, [tickets]);

  function setTicketType(ticketId, value) {
    setTickets(
      tickets.map((ticket) => {
        return ticket.id === ticketId
          ? { ...ticket, ticketType: value }
          : ticket;
      })
    );
  }
  const ticketSummary = tickets.map((ticket) => {
    return (
      <Container
        key={ticket.id}
        size="sm"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === ""
              ? theme.colors.gray[5]
              : theme.colors.gray[3],
          textAlign: "center",
          margin: theme.spacing.sm,
          padding: theme.spacing.sm,
          boxShadow: theme.colors.gray[7],
          borderRadius: theme.radius.md,
        })}
      >
        <Flex justify="space-between" align={"center"}>
          <Text sx={(theme) => ({ textAlign: "center" })}>
            Seat: {(ticket.rowId + 9).toString(36).toUpperCase()}
            {ticket.columnId}
          </Text>
          <Select
            size="sm"
            sx={{ display: "inline" }}
            data={options.map((option) => {
              return {
                key: option.id,
                value: option,
                label: `${option.typeName} - $${(option.price / 100).toFixed(
                  2
                )}`,
              };
            })}
            value={ticket.ticketType}
            onChange={(value) => {
              setTicketType(ticket.id, value);
            }}
          />
        </Flex>
      </Container>
    );
  });
  return (
    <Container size="sm" px="sm">
      <h1>Ticket Summary</h1>
      <Divider my="sm" />
      <ScrollArea h={720}>{ticketSummary}</ScrollArea>
      <Divider my="sm" />
      <Flex direction="column" align={"end"} gap={20}>
        <Text>
          {isNaN(total)
            ? "Select all ticket types to view total price"
            : `Total ticket fee: $${total.toFixed(2)}`}
        </Text>{" "}
        <Button
          component={Link}
          to={"/ticketsummary"}
          state={{ tickets, movieSession }}
          disabled={isNaN(total)}
        >
          Pay Now
        </Button>
      </Flex>
      {}
    </Container>
  );
}

export default TicketCheckout;
