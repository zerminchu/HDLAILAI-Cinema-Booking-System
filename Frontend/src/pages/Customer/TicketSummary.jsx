import { useLocation, Link } from "react-router-dom";
import {
  Text,
  Container,
  Box,
  Select,
  Button,
  Table,
  Center,
  Modal,
  Space,
  Divider,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import ButtonWithModal from "../../components/ButtonWithModal";
import Lottie from "lottie-react";
import axios from "axios";
import confirmationTick from "../../assets/59865-confirmation-tick.json";

function TicketSummary() {
  const location = useLocation();
  const { movieSession, tickets: selectedTickets } = location.state;
  console.log(selectedTickets);
  const [ticketSummary, setTicketSummary] = useState([]);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalGrossPrice, setTotalGrossPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalNetPrice, setTotalNetPrice] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    function summariseTickets() {
      setTicketSummary(
        selectedTickets.reduce((prev, next) => {
          const matchIndex = prev.findIndex(
            (ticket) => ticket.typeName === next.ticketType.typeName
          );
          console.log(matchIndex);
          if (matchIndex === -1) {
            return [
              ...prev,
              {
                id: next.ticketType.id,
                typeName: next.ticketType.typeName,
                price: next.ticketType.price,
                quantity: 1,
              },
            ];
          }
          prev[matchIndex].quantity += 1;
          return prev;
        }, [])
      );
    }
    summariseTickets();
  }, []);

  useEffect(() => {
    const gross = ticketSummary.reduce((prev, next) => {
      return prev + next.price * next.quantity;
    }, 0);
    const gst = gross * 0.08;
    const net = gross + gst;
    setTotalGrossPrice(gross);
    setGST(gst);
    setTotalNetPrice(net);
  }, [ticketSummary]);

  const rows = ticketSummary.map((ticketType) => {
    return (
      <tr key={`${ticketType.id}`}>
        <td>Movie Ticket(s) - {ticketType.typeName}</td>
        <td>x{ticketType.quantity}</td>
        <td>${(ticketType.quantity * ticketType.price) / 100}</td>
      </tr>
    );
  });

  async function addTransaction(event) {
    event.preventDefault();
    try {
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
          tickets: selectedTickets.map((ticket) => ({
            movieSessionId: movieSession.id,
            seatId: ticket.id,
            ticketTypeId: ticket.ticketType.id,
            paidPrice: ticket.ticketType.price,
          })),
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container size="sm">
      <h1>Purchase Summary</h1>
      <Space h="xl" />
      <ScrollArea h={720}>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Ticket Type</th>
                <th>Quantity</th>
                <th>Total cost</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </ScrollArea>
      <Divider />
      <Space h="xl" />
      <Text align="right">
        Total Gross Price:{" "}
        {!isNaN(totalGrossPrice) && `$${(totalGrossPrice / 100).toFixed(2)}`}
      </Text>
      <Text>{!isNaN(GST) && `$${(GST / 100).toFixed(2)}`}</Text>
      <Text>
        {!isNaN(totalNetPrice) && `$${(totalNetPrice / 100).toFixed(2)}`}
      </Text>
      <Button component={Link} to="/">
        Go Home
      </Button>
    </Container>
  );
}

export default TicketSummary;
