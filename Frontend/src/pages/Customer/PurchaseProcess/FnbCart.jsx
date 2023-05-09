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

export function FnbCart({ data, setData }) {
  
  //Number of qty customer purchase for Fnb
  const [totalQty, setTotalqty] = useState(0);

  //Delete button for Fnb Item in Cart
  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/suspendmovie/${id}`, {
        suspended: true,
      })
      .then(() => {
        setData(
          data.map((movie) =>
            movie.id === id ? { ...movie, suspended: true } : movie
          )
        );
      })
      .catch((error) => console.log(error));
  }

 
  const rows = data.map(
    (item, index) =>
      item && (
        <tr key={index}>
          <td>
            {/*Name of Fnb Item*/}
            <div style={{ textAlign: "left" }}>
              <Text>{item.name}</Text>
            </div>
          </td>
          
          <td>
          {/*Qty of Fnb Item*/}
            <div style={{ textAlign: "left" }}>
            <NumberInput
                defaultValue={0}
                className="qtyField"
                value={totalQty}
                onChange={setTotalqty}
              />
            </div>
          </td>

        
          {/*Price of Fnb Item*/}
          <td>
            <div style={{ textAlign: "left" }}>
              <Text>{item.currentPrice}</Text>
            </div>
          </td>

          {/*Delete Button*/}
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
                X
              </Button>

          </td>


        </tr>
      )
  );

  return (
    <ScrollArea>
      <Table miw={1200} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default FnbCart;
