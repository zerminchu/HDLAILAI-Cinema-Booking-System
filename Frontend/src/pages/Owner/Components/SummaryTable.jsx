import { Table } from "@mantine/core";

export default function SummaryTable({ data }) {
  const rows = data.map((item) => {
    return (
      <tr>
        <td>{item.itemName}</td>
        <td>{item.numberSold}</td>
        <td>$ {(item.grossRevenueEarned / 100).toFixed(2)}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number Sold</th>
          <th>Gross Revenue Earned</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
