import {
  Button,
  Menu,
  Text,
  useMantineTheme,
  Avatar,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import {
  IconSquareCheck,
  IconPackage,
  IconChevronDown,
  IconAdjustments,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function MSButtonMenu() {
  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}
          pr={12}
        >
          Add New Movie Session
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          icon={
            <Avatar color="red" radius="xl">
              UP
            </Avatar>
          }
          to="/CreateRolesPage"
        >
          User Profile
        </Menu.Item>
        <Menu.Item
          component={Link}
          icon={
            <Avatar color="cyan" radius="xl">
              UA
            </Avatar>
          }
          to="/createUserAccount"
        >
          User Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MSButtonMenu;
