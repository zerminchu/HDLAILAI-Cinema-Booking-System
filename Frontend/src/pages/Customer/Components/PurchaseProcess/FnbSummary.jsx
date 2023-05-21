import {
  Container,
  Table,
  Text,
  Button,
  Modal,
  Center,
  Grid,
  Col,
  Flex,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import confirmationTick from "../../../../assets/59865-confirmation-tick.json";
import Lottie from "lottie-react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

function FnbSummary() {
  const location = useLocation();
  const { selectedItems } = location.state;
  const [opened, setOpened] = useState(false);
  const [totalGrossPrice, setTotalGrossPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalNetPrice, setTotalNetPrice] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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
    console.log(selectedItems);
    try {
      const response = await axios.post(
        "http://localhost:8080/createtransaction/fnb",
        {
          transaction: {
            userAccountId: currentUser.id,
            type: "fnb",
            totalGrossPrice: totalGrossPrice.toFixed(0),
            gst: GST.toFixed(0),
            dateTime: new Date(),
            totalNetPrice: totalNetPrice.toFixed(0),
          },
          transactionItem: selectedItems.map((item) => ({
            paidPrice: item.currentPrice,
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
    <Container size="sm" px="sm">
      <h1>F&B Purchase Summary</h1>
      <Divider my="sm" />
      <ScrollArea h={720}>
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
                  $
                  {(Number(item.currentPrice * item.quantity) / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      <Divider my="sm" />
      <Flex direction="column" align={"end"} gap={20}>
        <Grid columns={4} sx={{ width: "300px" }}>
          <Grid.Col span={3}>
            <Text>Total Gross F&B Price:</Text>
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
            <Text>Total Nett F&B Price:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={1} sx={{ textAlign: "right" }}>
            <Text>{`$${(totalNetPrice / 100).toFixed(2)}`}</Text>{" "}
          </Grid.Col>
        </Grid>

        <form onSubmit={handlePayment}>
          <Button onClick={handlePayment}>Pay Now</Button>
        </form>
      </Flex>
      <Modal opened={opened}>
        <Lottie
          animationData={confirmationTick}
          loop={false}
          onComplete={() => {
            navigate("/FnbPurchaseReceipt", { state: { selectedItems } });
          }}
        />
        <Center>
          <Text>Payment Complete</Text>
        </Center>
      </Modal>
    </Container>
  );
}
export default FnbSummary;
