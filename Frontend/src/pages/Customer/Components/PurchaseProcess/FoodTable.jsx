import React, { useState } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";
import { Table, Image, Pagination } from "@mantine/core";

function FoodTable({ data, onAddToCart }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredData = data.filter((item) => item.type === "Food");
  const visibleData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const rows = visibleData.map((item, index) => (
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
    <>
      <Table miw={1080} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Food Image</th>
            <th>Food Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          position="center"
          total={totalPages}
          limit={itemsPerPage}
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default FoodTable;
