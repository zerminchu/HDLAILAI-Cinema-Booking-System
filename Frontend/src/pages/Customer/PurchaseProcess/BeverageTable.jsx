import React, { useState } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";
import FnbCart from "./FnbCart";
import { Table, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

function BeverageTable({ data, onAddToCart, isButtonDisabled }) {
  const [selectedItems, setSelectedItems] = useState([]);


  const handleAdd = (id, data) => {
    const itemIndex = selectedItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1 && selectedItems[itemIndex].quantity === 0) {
      updatedItems = [...selectedItems];
      updatedItems[itemIndex] = data;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, data]);
      onAddToCart(data);
    }
  };

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>${(item.currentPrice / 100).toFixed(2)}</td>
      <td>
        <CustomerPurchaseButton
          id={item.id}
          data={item}
          handleAdd={handleAdd}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <Table miw={720} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Beverage name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default BeverageTable;
