import {
  Container,
  Table,
  Text,
  Button,
  Group,
  Center,
  Divider,
} from "@mantine/core";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function FnbPurchaseReceipt() {
  const location = useLocation();
  const { selectedItems } = location.state;
  const [totalGrossPrice, setTotalGrossPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalNetPrice, setTotalNetPrice] = useState(0);

  useEffect(() => {
    const calculatePrices = () => {
      if (selectedItems && selectedItems.length > 0) {
        let grossPrice = 0;
        selectedItems.forEach((item) => {
          grossPrice += item.currentPrice * item.quantity;
        });

        const gst = Math.round(grossPrice * 0.07);
        const netPrice = grossPrice + gst;

        setTotalGrossPrice(grossPrice);
        setGST(gst);
        setTotalNetPrice(netPrice);
      }
    };

    calculatePrices();
  }, [selectedItems]);

  return (
    <Container size="sm">
      <Center mt="20px">
        <Text size="xl" weight={500}>
          Thank you for your purchase!
        </Text>
      </Center>
      <Divider my="20px" />
      {selectedItems && selectedItems.length > 0 ? (
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
      ) : (
        <Text>No items selected.</Text>
      )}
      <Divider my="30px" />
      <Group justify="center" align="center">
        <Text size="lg">Total Amount Paid:</Text>
        <Text size="lg" weight={500}>
          ${totalNetPrice / 100}
        </Text>
      </Group>
      <Center mt="30px">
        <Button component={Link} to="/">
          Go Back
        </Button>
      </Center>
    </Container>
  );
}

export default FnbPurchaseReceipt;
