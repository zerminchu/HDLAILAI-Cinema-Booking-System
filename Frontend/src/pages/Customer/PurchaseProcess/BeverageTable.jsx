

import React, { useState, useEffect } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";


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

function BeverageTable({ data }) {
    console.log("data");
    console.log(data);

const rows = data.map(
    (item, index) =>
      item && (
        <tr key={index}>
          <td>
            <td>{item.name}</td>
            <td>${(item.currentPrice / 100).toFixed(2)}</td>
            <td><CustomerPurchaseButton id={item.id} data={item} /></td>
          

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
          <th>Beverage name</th>
          <th>Price</th>
          
          
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default BeverageTable;
