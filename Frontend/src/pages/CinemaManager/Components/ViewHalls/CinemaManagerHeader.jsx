import { createStyles, Header, Group, Box, rem, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const CinemaManagerHeader = () => {
  const { classes, theme } = useStyles();

  return (
    <Box pb={20}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={50}
            className={classes.hiddenMobile}
          >
            <Anchor
              component={Link}
              to="/CinemaManagerHome"
              className={classes.link}
            >
              Halls
            </Anchor>
            <Anchor component={Link} to="/ViewMovies" className={classes.link}>
              Movies
            </Anchor>
            <Anchor
              component={Link}
              to="/CinemaManagerFNB"
              className={classes.link}
            >
              F&B
            </Anchor>
            <Anchor
              component={Link}
              to="/ViewAllTicketTypes"
              className={classes.link}
            >
              Ticket Types
            </Anchor>
          </Group>
        </Group>
      </Header>
    </Box>
  );
};

export default CinemaManagerHeader;
