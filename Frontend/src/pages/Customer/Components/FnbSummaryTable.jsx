import {
    Table,
    Group,
    Text,
  } from "@mantine/core";
  import { useState, useEffect } from "react";

  const FnbSummaryTable = (props) => {
    
    const [orderSummary, setOrderSummary] = useState(props.fnbOrder);

    const rows = orderSummary.items.map(item =>(
          item && (
              <tr key={item.id}>
                <td>
                  <div style={{ textAlign: "left" }}>
                    <Text>{item.name}</Text>
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: "left" }}>
                    <Text>{item.quantity}</Text>
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: "left" }}>
                    <Text>$ {item.price / 100}</Text>
                  </div>
                </td>
              </tr>
        )));
  
    return (
    <Group position="right">
        <Table miw={1200} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
    </Group>
    );
  };
  
  export default FnbSummaryTable;
  