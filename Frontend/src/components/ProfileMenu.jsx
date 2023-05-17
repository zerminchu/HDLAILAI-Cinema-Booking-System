import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  Button,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { useAuth } from "../AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background
    }`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export function ProfileMenu() {
  const { classes, theme, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { currentUser: user } = useAuth();
  console.log(user);
  return (
    <Menu
      width={150}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            {/* <Avatar src={user.image} alt={user.name} radius="xl" size={20} /> */}
            <Text
              weight={500}
              size="sm"
              sx={{
                lineHeight: 1 /* color: theme.white */,
              }}
              mr={3}
            >
              Welcome, {user.name}!
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to={`/ViewAccount/${user.id}`}>
          Account
        </Menu.Item>
        <Menu.Item component={Link} to={`/CustomerPurchaseHistory/${user.id}`}>
          My Purchases
        </Menu.Item>
        <Menu.Item>
          <LogoutButton />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
