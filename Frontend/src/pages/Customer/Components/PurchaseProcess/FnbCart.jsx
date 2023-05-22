import React, { useState } from "react";
import {
  Table,
  Text,
  Button,
  ScrollArea,
  NumberInput,
  Container,
} from "@mantine/core";

function FnbCart({ data, setData }) {
  const handleQuantityChange = (id, quantity) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>
        <div style={{ textAlign: "left" }}>
          <Text>{item.name}</Text>
        </div>
      </td>
      <td>
        <div style={{ textAlign: "left" }}>
          <NumberInput
            defaultValue={1}
            min={1}
            className="qtyField"
            value={item.quantity}
            onChange={(value) => handleQuantityChange(item.id, value)}
          />
        </div>
      </td>

      <td>
        <Button
          variant="outline"
          radius="xl"
          size="xs"
          color="gray"
          uppercase
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container size="lg" px="sm">
      <ScrollArea>
        <Table miw={1200} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}

export default FnbCart;
