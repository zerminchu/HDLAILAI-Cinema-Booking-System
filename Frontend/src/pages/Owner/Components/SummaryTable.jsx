import {
  Table,
  Container,
  Group,
  Text,
  Pagination,
  Center,
  Divider,
  Space,
} from "@mantine/core";
import { useState } from "react";

export default function SummaryTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / perPage);
  // nvr touch
  const rows = currentData.map((item) => {
    return (
      <tr>
        <td>{item.itemName}</td>
        <td>{item.numberSold}</td>
        <td>$ {(item.grossRevenueEarned / 100).toFixed(2)}</td>
      </tr>
    );
  });
  return (
    <Container>
      <Space h="md" />
      <Divider />
      <Center>
        <Group>
          <Text>Total Gross Revenue: </Text>
          <Text fw={"bold"}>
            ${" "}
            {(
              data.reduce((prev, next) => prev + next.grossRevenueEarned, 0) /
              100
            ).toFixed(2)}
          </Text>
        </Group>
      </Center>
      <Space h="md" />
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
      {totalPages > 1 && (
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
        />
      )}
    </Container>
  );
}
