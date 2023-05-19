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

  return (
    <div>
      <Group position="center">
        <Text mt="20px" mb="20px" mr="20px" ta="left" fw="500" fz="25px">
          Thank you for your purchase!
        </Text>
      </Group>
      <Group>
        <Table>
          <thead>
            <tr>
              <th>Ticket Type</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ticketSummary.map((ticketType) => (
              <tr key={`${ticketType.id}`}>
                <td>Movie Ticket(s) - {ticketType.typeName}</td>
                <td>{ticketType.quantity}</td>
                <td>${(ticketType.price * ticketType.quantity) / 100}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Group>
      <Group mt="30px" mb="30px" position="center">
        <Text>Total Amount Paid including GST: $ {totalNetPrice / 100}</Text>
      </Group>
      <Group position="center">
        <Button component={Link} to="/">
          Go Back
        </Button>
      </Group>
    </div>
  );
}

export default TicketSummary;
