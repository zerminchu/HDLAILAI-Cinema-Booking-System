import {
  Container,
  Table,
  Text,
  Button,
  Group,
  Center,
  Grid,
  Col,
  Flex,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import axios from "axios";

function FnbPurchaseReceipt() {
  const location = useLocation();
  const { selectedItems } = location.state;
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
                <td>${(item.currentPrice * item.quantity) / 100}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Group>
      <Group mt="30px" mb="30px" position="center">
        <Text>Total Amount Paid including GST:</Text>
        <Text>$ {totalNetPrice / 100}</Text>
      </Group>
      <Group position="center">
        <Button component={Link} to="/">
          Go Back
        </Button>
      </Group>
    </div>
  );
}

export default FnbPurchaseReceipt;
