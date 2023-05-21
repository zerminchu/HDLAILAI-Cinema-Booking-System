import React, { useState } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";
import { Table, Image } from "@mantine/core";

function FoodTable({ data, onAddToCart }) {
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

  const filteredData = data.filter((item) => item.type === "Food");

  const rows = filteredData.map((item, index) => (
    <tr key={index}>
      <td>
        <Image src={item.imageURL} width={100} height={100} alt={item.name} />
      </td>
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
    <Table miw={1080} verticalSpacing="sm">
      <thead>
        <tr>
          <th>Food Image</th>
          <th>Food Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default FoodTable;
