import { Container, Table, Text, Button, Modal, Center } from "@mantine/core";
import { useLocation, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import axios from "axios";

function FnbSummary() {
  const location = useLocation();
  const { selectedItems } = location.state;
  const [paymentMessage, setPaymentMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const [totalGrossPrice, setTotalGrossPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalNetPrice, setTotalNetPrice] = useState(0);

  useEffect(() => {
    const calculatePrices = () => {
      let grossPrice = 0;
      selectedItems.forEach((item) => {
        grossPrice += item.currentPrice * item.quantity;
      });

      const gst = Math.round(grossPrice * 0.07);
      const netPrice = grossPrice + gst;

      setTotalGrossPrice(grossPrice);
      setGST(gst);
      setTotalNetPrice(netPrice);
    };

    calculatePrices();
  }, [selectedItems]);

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/createtransaction/fnb",
        {
          transaction: {
            userAccountId: 1,
            type: "fnb",
            totalGrossPrice: totalGrossPrice.toFixed(0),
            gst: GST.toFixed(0),
            dateTime: new Date(),
            totalNetPrice: totalNetPrice.toFixed(0),
          },
          transactionItem: selectedItems.map((item) => ({
            paidPrice: item.paidPrice,
            quantity: item.quantity,
            fnbId: item.id,
            fnbName: item.name,
          })),
        }
      );
      setOpened(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                ${(Number(item.currentPrice * item.quantity) / 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Text>
        Total Gross Price: ${(Number(totalGrossPrice) / 100).toFixed(2)}
      </Text>
      <Text>GST: ${(Number(GST) / 100).toFixed(2)}</Text>
      <Text>Total Net Price: ${(Number(totalNetPrice) / 100).toFixed(2)}</Text>

      <Button onClick={handlePayment}>Pay Now</Button>

      <Modal opened={opened}>
        <Lottie
          loop={false}
          onComplete={() => {
            setPaymentMessage("Payment Complete");
          }}
        />
        <Center>
          <Text>{paymentMessage}</Text>
        </Center>{" "}
      </Modal>
    </Container>
  );
}

export default FnbSummary;
