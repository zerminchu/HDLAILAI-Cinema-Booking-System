import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

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
  Modal,
  Group,
} from "@mantine/core";
import confirmationTick from "../../assets/59865-confirmation-tick.json";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import axios from "axios";

function TicketCheckout() {
  const location = useLocation();
  const { movieSession, selectedSeats: selectedTickets } = location.state;
  const [tickets, setTickets] = useState(selectedTickets);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [opened, setOpened] = useState(false);
  const [totalGrossPrice, setTotalGrossPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalNetPrice, setTotalNetPrice] = useState(0);
  const navigate = useNavigate();

  /*   const userAccountId = getUserAccountId(); // Replace this with your own logic to get the userAccountId dynamically

  function getUserAccountId() {
    const user = useAuth();
    return user.userAccountId;
  }

  console.log(userAccountId); */

  useEffect(() => {
    async function fetchTicketTypes() {
      const ticketTypeResponse = await axios.get(
        `http://localhost:8080/viewtickettype/all`
      );

      const loadedTicketTypes = ticketTypeResponse.data.filter(
        (ticketType) => ticketType.status !== "Not Available"
      );

      setOptions(loadedTicketTypes);
    }
    fetchTicketTypes();
  }, []);

  useEffect(() => {
    const gross = tickets.reduce((prev, next) => {
      return prev + next.ticketType?.price;
    }, 0);
    const gst = gross * 0.08;
    const net = gross + gst;
    setTotalGrossPrice(gross);
    setGST(gst);
    setTotalNetPrice(net);
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

  async function addTransaction(event) {
    event.preventDefault();
    try {
      /*     const user = useAuth();
      const userAccountId = user.userAccountId;
      console.log("User Account ID:", userAccountId); */
      const response = await axios.post(
        "http://localhost:8080/createtransaction/ticket",
        {
          transaction: {
            userAccountId: 1,
            type: "ticket",
            totalGrossPrice: totalGrossPrice.toFixed(0),
            gst: GST.toFixed(0),
            dateTime: new Date(),
            totalNetPrice: totalNetPrice.toFixed(0),
          },
          tickets: tickets.map((ticket) => ({
            movieSessionId: movieSession.id,
            seatId: ticket.id,
            ticketTypeId: ticket.ticketType.id,
            paidPrice: ticket.ticketType.price,
          })),
        }
      );
      console.log(response);
      setOpened(true);
    } catch (e) {
      console.log(e);
    }
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
        {isNaN(totalGrossPrice) ? (
          <Text>Select all ticket types to view total price</Text>
        ) : (
          <Grid columns={4} sx={{ width: "300px" }}>
            <Grid.Col span={3}>
              <Text>Total Gross Ticket Fees:</Text>
            </Grid.Col>
            <Grid.Col span={1} sx={{ textAlign: "right" }}>
              <Text>{`$${(totalGrossPrice / 100).toFixed(2)}`}</Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Text>GST (8%):</Text>{" "}
            </Grid.Col>
            <Grid.Col span={1} sx={{ textAlign: "right" }}>
              <Text>{`$${(GST / 100).toFixed(2)}`}</Text>{" "}
            </Grid.Col>
            <Grid.Col span={3}>
              <Text>Total Nett Ticket Fees:</Text>{" "}
            </Grid.Col>
            <Grid.Col span={1} sx={{ textAlign: "right" }}>
              <Text>{`$${(totalNetPrice / 100).toFixed(2)}`}</Text>{" "}
            </Grid.Col>
          </Grid>
        )}

        <form onSubmit={addTransaction}>
          <Button onClick={addTransaction} disabled={isNaN(total)}>
            Pay Now
          </Button>
        </form>
      </Flex>
      <Modal opened={opened}>
        <Lottie
          animationData={confirmationTick}
          loop={false}
          onComplete={() => {
            navigate("/ticketSummary", {
              state: { tickets, movieSession },
            });
          }}
        />
        <Center>
          <Text>Payment Complete</Text>
        </Center>
      </Modal>
    </Container>
  );
}

export default TicketCheckout;
