import React, { useState } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";
import { Table } from "@mantine/core";

function BeverageTable({ data, onAddToCart }) {
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
            <th>Beverage Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default BeverageTable;
