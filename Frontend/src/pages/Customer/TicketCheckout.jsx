import { useLocation } from "react-router-dom";
import { Text, Container, Box, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

function TicketCheckout() {
  const location = useLocation();
  const selectedTickets = location.state;
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
      setTotal(tickets.reduce((prev, next) => {
        return prev + next.ticketType?.price;
      }, 0) / 100);
  }, [tickets])

  function setTicketType(ticketId, value) {
    setTickets(tickets.map((ticket) => {
        return ticket.id === ticketId ? {...ticket, ticketType: value }: ticket
    }))
  }
  const ticketSummary = tickets.map((ticket) => {
    return (
      <Box key={ticket.id}>
        <Text>
          Seat: {(ticket.rowId + 9).toString(36).toUpperCase()}
          {ticket.columnId}
        </Text>
        <Select
          data={options.map((option) => {
            return { key: option.id, value: option, label: option.typeName };
          })}
          value={ticket.ticketType}
          onChange={(value) => {
            setTicketType(ticket.id, value);
          }}
        />
      </Box>
    );
  });
  return (
    <Box>
      {ticketSummary}
      <Text>
        {isNaN(total)
          ? "Select all ticket types to view total price"
          : `$${total.toFixed(2)}`}
      </Text>
    </Box>
  );
}

export default TicketCheckout;
