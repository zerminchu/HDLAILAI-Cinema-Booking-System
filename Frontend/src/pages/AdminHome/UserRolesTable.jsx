import UAHomeButton from "./UAHomeButton";

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
  Anchor
} from "@mantine/core";

const rolesData = ["Customer", "Manager", "Owner", "User Admin"];

export function UsersRolesTable({ data }) {
  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>
      <div style={{ textAlign: "left" }}>
        <TextInput placeholder={item.name} defaultValue={item.name} disabled />
      </div>
      </td>

      <td>
      <div style={{ textAlign: "left" }}>
        <TextInput placeholder={item.email} defaultValue={item.email} disabled />
      </div>
      </td>

      <td>
        <Select data={rolesData} defaultValue={item.role} variant="unstyled" />
      </td>
      <td>
        {item.suspended = true ? (
            <Button variant="outline" radius="xl" size="xs" uppercase>
              Active
            </Button>
        ) : (
          <Button variant="outline" radius="xl" size="xs" color="gray" uppercase>
          Suspended
          </Button>
        )}
      </td>

      <td>
          <UAHomeButton />
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table miw={1200} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default UsersRolesTable;
