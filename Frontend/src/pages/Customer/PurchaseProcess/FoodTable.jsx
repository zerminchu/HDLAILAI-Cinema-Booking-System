
import axios from "axios";
import React, { useState, useEffect } from "react";



import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  TextInput,
  Button,
  Anchor,
} from "@mantine/core";

function FoodTable({ data }) {
    console.log("data");
    console.log(data);

function handleAdd(id) {
  setData(data.filter((item) => item.id == id));
}

const rows = data.map(
    (item, index) =>
      item && (
        <tr key={index}>
          <td>{item.name}</td>
          <td>${(item.currentPrice / 100).toFixed(2)}</td>
            {/*Add Button*/}
            <td>
          <Button
                variant="outline"
                radius="xl"
                size="xs"
                color="gray"
                uppercase
                onClick={() => {
                  handleAdd(id);
                }}
              >
              Add
              </Button>
          </td>

          
        </tr>
        
      )
  );
  
  console.log("rows");
  console.log(rows);
  return (
    <Table miw={720} verticalSpacing="sm">
      <thead>
        <tr>
          <th>Food name</th>
          <th>Price</th>
          
          
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default FoodTable;
