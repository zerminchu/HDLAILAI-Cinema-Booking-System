import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Image,
  Anchor,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";
import LoginModal from "../pages/Login/LoginModal";
import { ProfileMenu } from "./ProfileMenu";
import CreateAccountModal from "../pages/Customer/CreateAccountModal";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

/* function getLinksByPermission(permission) {} */

export function HeaderResponsive(/* { links } */) {
  const links = {
    "User Admin": [
      {
        label: "User Accounts",
        link: "/UserAdminHome",
      },
      {
        label: "User Profiles",
        link: "/ViewAllUserProfiles",
      },
    ],
    "Cinema Manager": [
      {
        label: "Halls",
        link: "/CinemaManagerHome",
      },
      {
        label: "Movies",
        link: "/ViewMovies",
      },
      {
        label: "F&B",
        link: "/CinemaManagerFNB",
      },
      {
        label: "Ticket Types",
        link: "/ViewAllTicketTypes",
      },
    ],
    Customer: [
      { label: "Movies", link: "/CustomerHome" },
      { label: "F&B", link: "/FnbPurchase" },
    ],
    "Cinema Owner": [
      { label: "Ticket Sales", link: "/TicketReport" },
      { label: "Fnb Sales", link: "/FnbReport" },
    ],
  };

  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(null);
  const { classes, cx } = useStyles();
  const { currentUser } = useAuth();
  console.log(currentUser);
  const items =
    currentUser !== null
      ? links[currentUser.role].map((link) => (
          <Anchor
            component={Link}
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
              [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
              /*               event.preventDefault(); */
              setActive(link.link);
              close();
            }}
          >
            {link.label}
          </Anchor>
        ))
      : [];

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Flex justify={{ sm: "flex-start" }}>
          <Anchor component={Link} to="/">
            <Image src={logo} alt="logo" height={50} width={"auto"} />
          </Anchor>
        </Flex>
        <Flex justify={{ sm: "flex-end" }}>
          <Group spacing={5} className={classes.links}>
            {items}
            {currentUser ? (
              currentUser.role === "Customer" ? (
                <ProfileMenu />
              ) : (
                <LogoutButton />
              )
            ) : (
              <Group>
                <LoginModal />
                <CreateAccountModal />
              </Group>
            )}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Flex>
      </Container>
    </Header>
  );
}
