import { Button, Menu, Text, useMantineTheme, Avatar, ActionIcon  } from '@mantine/core';
import {
  IconSquareCheck,
  IconPackage,
  IconChevronDown,
  IconAdjustments
} from '@tabler/icons-react';

export function ButtonMenu() {
  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />} pr={12}>
          Create New
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon = {<Avatar color="red" radius="xl">UP</Avatar>}
        >
          User Profile
        </Menu.Item>
        <Menu.Item
          icon={<Avatar color="cyan" radius="xl">UA</Avatar>}
        >
          User Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ButtonMenu;